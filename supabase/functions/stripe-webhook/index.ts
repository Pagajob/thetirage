import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

Deno.serve(async (req) => {
  try {
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // get the signature from the header
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return new Response('No signature found', { status: 400 });
    }

    // get the raw body
    const body = await req.text();

    // verify the webhook signature
    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return new Response(`Webhook signature verification failed: ${error.message}`, { status: 400 });
    }

    EdgeRuntime.waitUntil(handleEvent(event));

    return Response.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function handleEvent(event: Stripe.Event) {
  const stripeData = event?.data?.object ?? {};

  if (!stripeData) {
    return;
  }

  if (!('customer' in stripeData)) {
    return;
  }

  // for one time payments, we only listen for the checkout.session.completed event
  if (event.type === 'payment_intent.succeeded' && event.data.object.invoice === null) {
    return;
  }

  const { customer: customerId } = stripeData;

  if (!customerId || typeof customerId !== 'string') {
    console.error(`No customer received on event: ${JSON.stringify(event)}`);
  } else {
    let isSubscription = true;

    if (event.type === 'checkout.session.completed') {
      const { mode } = stripeData as Stripe.Checkout.Session;

      isSubscription = mode === 'subscription';

      console.info(`Processing ${isSubscription ? 'subscription' : 'one-time payment'} checkout session`);
    }

    const { mode, payment_status } = stripeData as Stripe.Checkout.Session;

    if (isSubscription) {
      console.info(`Starting subscription sync for customer: ${customerId}`);
      await syncCustomerFromStripe(customerId);
    } else if (mode === 'payment' && payment_status === 'paid') {
      try {
        // Extract the necessary information from the session
        const {
          id: checkout_session_id,
          payment_intent,
          amount_subtotal,
          amount_total,
          currency,
          discount,
        } = stripeData as Stripe.Checkout.Session;

        // Insert the order into the stripe_orders table
        const { error: orderError } = await supabase.from('stripe_orders').insert({
          checkout_session_id,
          payment_intent_id: payment_intent,
          customer_id: customerId,
          amount_subtotal,
          amount_total,
          currency,
          payment_status,
          status: 'completed', // assuming we want to mark it as completed since payment is successful
        });

        if (orderError) {
          console.error('Error inserting order:', orderError);
          return;
        }

        // Envoyer l'email de confirmation de participation
        await sendParticipationConfirmationEmail(checkout_session_id, customerId);

        // Traiter la commission d'affiliation si un code promo a été utilisé
        if (discount && discount.promotion_code) {
          await processAffiliateCommission(checkout_session_id, discount.promotion_code, amount_total);
        }

        console.info(`Successfully processed one-time payment for session: ${checkout_session_id}`);
      } catch (error) {
        console.error('Error processing one-time payment:', error);
      }
    }
  }
}

async function processAffiliateCommission(checkoutSessionId: string, promotionCodeId: string, amountTotal: number) {
  try {
    // Récupérer les détails du promotion code depuis Stripe
    const promotionCode = await stripe.promotionCodes.retrieve(promotionCodeId);
    
    if (!promotionCode.metadata?.promoter_user_id) {
      return; // Pas un code promoteur
    }

    // Récupérer les détails de la session pour connaître le produit
    const session = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
      expand: ['line_items.data.price']
    });

    if (!session.line_items?.data[0]) {
      return;
    }

    const priceId = session.line_items.data[0].price?.id;
    let commissionRate = 0;
    let productName = 'Ticket Thetirage';

    // Déterminer le taux de commission selon le produit
    switch (priceId) {
      case 'price_1SBHBREWa5JpT2nEQSe5Jx3e': // Bronze
        commissionRate = 0.15; // 15%
        productName = 'Ticket Bronze';
        break;
      case 'price_1SBHCeEWa5JpT2nEJrt20BIh': // Silver
        commissionRate = 0.30; // 30%
        productName = 'Ticket Silver';
        break;
      case 'price_1SBHEeEWa5JpT2nEg1K6tDSs': // Gold
        commissionRate = 0.35; // 35%
        productName = 'Ticket Gold';
        break;
      default:
        commissionRate = 0.20; // Taux par défaut
    }

    // Récupérer le promoteur
    const { data: promoter } = await supabase
      .from('promoters')
      .select('id, promo_code')
      .eq('stripe_promotion_code_id', promotionCodeId)
      .single();

    if (!promoter) {
      console.error('Promoter not found for promotion code:', promotionCodeId);
      return;
    }

    // Calculer la commission (sur le montant avant réduction)
    const originalAmount = amountTotal / 0.9; // Retrouver le montant avant 10% de réduction
    const commissionAmount = originalAmount * commissionRate;

    // Enregistrer la vente d'affiliation
    const { error: affiliateError } = await supabase
      .from('affiliate_sales')
      .insert({
        promoter_id: promoter.id,
        checkout_session_id: checkoutSessionId,
        customer_email: session.customer_details?.email,
        amount: originalAmount / 100, // Convertir en euros
        commission_amount: commissionAmount / 100, // Convertir en euros
        product_name: productName,
      });

    if (affiliateError) {
      console.error('Error recording affiliate sale:', affiliateError);
      return;
    }

    // Mettre à jour les totaux du promoteur
    const { error: updateError } = await supabase
      .from('promoters')
      .update({
        total_sales: promoter.total_sales + 1,
        total_revenue: promoter.total_revenue + (originalAmount / 100),
        total_commission: promoter.total_commission + (commissionAmount / 100),
        updated_at: new Date().toISOString(),
      })
      .eq('id', promoter.id);

    if (updateError) {
      console.error('Error updating promoter totals:', updateError);
    }

    console.info(`Processed affiliate commission: ${commissionAmount / 100}€ for promoter ${promoter.promo_code}`);
  } catch (error) {
    console.error('Error processing affiliate commission:', error);
  }
}
// based on the excellent https://github.com/t3dotgg/stripe-recommendations
async function syncCustomerFromStripe(customerId: string) {
  try {
    // fetch latest subscription data from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    // TODO verify if needed
    if (subscriptions.data.length === 0) {
      console.info(`No active subscriptions found for customer: ${customerId}`);
      const { error: noSubError } = await supabase.from('stripe_subscriptions').upsert(
        {
          customer_id: customerId,
          subscription_status: 'not_started',
        },
        {
          onConflict: 'customer_id',
        },
      );

      if (noSubError) {
        console.error('Error updating subscription status:', noSubError);
        throw new Error('Failed to update subscription status in database');
      }
    }

    // assumes that a customer can only have a single subscription
    const subscription = subscriptions.data[0];

    // store subscription state
    const { error: subError } = await supabase.from('stripe_subscriptions').upsert(
      {
        customer_id: customerId,
        subscription_id: subscription.id,
        price_id: subscription.items.data[0].price.id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        ...(subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
          ? {
              payment_method_brand: subscription.default_payment_method.card?.brand ?? null,
              payment_method_last4: subscription.default_payment_method.card?.last4 ?? null,
            }
          : {}),
        status: subscription.status,
      },
      {
        onConflict: 'customer_id',
      },
    );

    if (subError) {
      console.error('Error syncing subscription:', subError);
      throw new Error('Failed to sync subscription in database');
    }
    console.info(`Successfully synced subscription for customer: ${customerId}`);
  } catch (error) {
    console.error(`Failed to sync subscription for customer ${customerId}:`, error);
    throw error;
  }
}