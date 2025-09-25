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
        } = stripeData as Stripe.Checkout.Session;

        console.log(`Processing payment for session: ${checkout_session_id}`);

        // Récupérer la session complète avec les détails du discount
        const fullSession = await stripe.checkout.sessions.retrieve(checkout_session_id, {
          expand: ['discount.promotion_code']
        });

        console.log('Full session discount info:', fullSession.discount);
        console.log('Promotion code details:', fullSession.discount?.promotion_code);
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

        console.log('Order inserted successfully');

        // Envoyer l'email de confirmation de participation
        await sendParticipationConfirmationEmail(checkout_session_id, customerId);

        // Traiter la commission d'affiliation si un code promo a été utilisé
        if (fullSession.discount?.promotion_code) {
          const promotionCodeId = typeof fullSession.discount.promotion_code === 'string' 
            ? fullSession.discount.promotion_code 
            : fullSession.discount.promotion_code.id;
          
          console.log(`Processing affiliate commission for promotion code: ${promotionCodeId}`);
          await processAffiliateCommission(checkout_session_id, promotionCodeId, amount_total || 0);
        } else {
          console.log('No promotion code used in this transaction');
        }

        console.info(`Successfully processed one-time payment for session: ${checkout_session_id}`);
      } catch (error) {
        console.error('Error processing one-time payment:', error);
      }
    }
  }
}

async function sendParticipationConfirmationEmail(checkoutSessionId: string, customerId: string) {
  try {
    // Récupérer les détails de la session pour obtenir l'email du client
    const session = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
      expand: ['line_items.data.price']
    });

    if (!session.customer_details?.email) {
      console.error('No customer email found for session:', checkoutSessionId);
      return;
    }

    const customerEmail = session.customer_details.email;
    const customerName = session.customer_details.name || 'Participant';
    const amountPaid = (session.amount_total || 0) / 100; // Convertir en euros
    
    // Déterminer le type de ticket et le nombre de participations
    let ticketType = 'Ticket';
    let participations = 1;
    let bonusText = '';
    
    if (session.line_items?.data[0]) {
      const priceId = session.line_items.data[0].price?.id;
      switch (priceId) {
        case 'price_1SBHBREWa5JpT2nEQSe5Jx3e': // Bronze
          ticketType = 'Ticket Bronze';
          participations = 1;
          break;
        case 'price_1SBHCeEWa5JpT2nEJrt20BIh': // Silver
          ticketType = 'Ticket Silver';
          participations = 2;
          break;
        case 'price_1SBHEeEWa5JpT2nEg1K6tDSs': // Gold
          ticketType = 'Ticket Gold';
          participations = 4;
          bonusText = ' + 1 participation pour gagner une carte cadeau Boulanger 100€';
          break;
      }
    }

    // Générer un numéro de participation unique basé sur la session
    const participationNumber = `TT-${checkoutSessionId.slice(-8).toUpperCase()}`;

    // Contenu de l'email de confirmation
    const emailSubject = `🎉 Confirmation de participation - Thetirage ${new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`;
    
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Confirmation de participation - Thetirage</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2848ca, #4f46e5); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #6b7280; }
          .ticket-info { background: #fef3c7; border: 2px solid #f59e0b; border-radius: 10px; padding: 20px; margin: 20px 0; }
          .participation-number { background: #dbeafe; border: 2px solid #3b82f6; border-radius: 10px; padding: 15px; margin: 20px 0; text-align: center; }
          .cta-button { display: inline-block; background: #2848ca; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
          .highlight { color: #2848ca; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Félicitations ${customerName} !</h1>
            <p style="font-size: 18px; margin: 0;">Votre participation est confirmée</p>
          </div>
          
          <div class="content">
            <p>Bonjour <strong>${customerName}</strong>,</p>
            
            <p>Merci pour votre participation au tirage Thetirage ! Votre paiement a été traité avec succès et vous participez maintenant au tirage de ce mois.</p>
            
            <div class="ticket-info">
              <h3>📋 Détails de votre participation</h3>
              <ul>
                <li><strong>Ticket :</strong> ${ticketType}</li>
                <li><strong>Nombre de participations :</strong> ${participations}${bonusText}</li>
                <li><strong>Montant payé :</strong> ${amountPaid.toFixed(2)}€</li>
                <li><strong>Date :</strong> ${new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</li>
              </ul>
            </div>
            
            <div class="participation-number">
              <h3>🎫 Votre numéro de participation unique</h3>
              <p style="font-size: 24px; font-weight: bold; color: #2848ca; margin: 10px 0;">${participationNumber}</p>
              <p style="margin: 0; font-size: 14px;">Conservez précieusement ce numéro</p>
            </div>
            
            <h3>📅 Prochaines étapes</h3>
            <ul>
              <li><strong>Tirage au sort :</strong> 31 octobre 2025 à 23h59 (heure de Paris)</li>
              <li><strong>Annonce du gagnant :</strong> En direct sur nos réseaux sociaux</li>
              <li><strong>Contact du gagnant :</strong> Dans les 48h suivant le tirage</li>
            </ul>
            
            <p><strong class="highlight">🏆 Prix à gagner ce mois-ci :</strong></p>
            <ul>
              <li>iPhone 17 Pro Max (valeur 1 479€)</li>
              ${bonusText ? '<li>Carte cadeau Boulanger 100€ (tirage bonus pour les tickets Gold)</li>' : ''}
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://thetirage.com" class="cta-button">Visiter Thetirage.com</a>
            </div>
            
            <p><strong>Suivez-nous pour ne rien manquer :</strong></p>
            <ul>
              <li>📱 Snapchat : @thetirage</li>
              <li>📸 Instagram : @thetirage</li>
            </ul>
            
            <p style="margin-top: 30px;">Bonne chance pour le tirage ! 🍀</p>
            
            <p>L'équipe Thetirage</p>
          </div>
          
          <div class="footer">
            <p>© 2025 Thetirage. Tous droits réservés.</p>
            <p>Jeu autorisé - Participation limitée aux résidents européens de plus de 18 ans</p>
            <p>Si vous avez des questions, contactez-nous à : contact@thetirage.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Utiliser l'API Supabase pour envoyer l'email
    const { error: emailError } = await supabase.functions.invoke('send-email', {
      body: {
        to: customerEmail,
        subject: emailSubject,
        html: emailContent,
        metadata: {
          type: 'participation_confirmation',
          checkout_session_id: checkoutSessionId,
          participation_number: participationNumber,
          ticket_type: ticketType,
          participations: participations
        }
      }
    });

    if (emailError) {
      console.error('Error sending confirmation email:', emailError);
    } else {
      console.info(`Confirmation email sent to ${customerEmail} for session ${checkoutSessionId}`);
    }

  } catch (error) {
    console.error('Error in sendParticipationConfirmationEmail:', error);
  }
}

async function processAffiliateCommission(checkoutSessionId: string, promotionCodeId: string, amountTotal: number) {
  try {
    console.log(`Processing affiliate commission for session: ${checkoutSessionId}, promotion code: ${promotionCodeId}`);
    
    // Récupérer les détails du promotion code depuis Stripe
    const promotionCode = await stripe.promotionCodes.retrieve(promotionCodeId);
    console.log('Promotion code details:', promotionCode);
    
    if (!promotionCode.metadata?.promoter_user_id) {
      console.log('No promoter_user_id in promotion code metadata');
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
      .select('id, promo_code, total_sales, total_revenue, total_commission')
      .eq('stripe_promotion_code_id', promotionCodeId)
      .single();

    if (!promoter) {
      console.error('Promoter not found for promotion code:', promotionCodeId);
      return;
    }

    console.log('Found promoter:', promoter);

    // Calculer la commission (sur le montant avant réduction)
    const originalAmount = amountTotal; // Le montant total est déjà le montant payé
    const commissionAmount = originalAmount * commissionRate;

    console.log(`Commission calculation: original=${originalAmount/100}€, rate=${commissionRate*100}%, commission=${commissionAmount/100}€`);

    // Enregistrer la vente d'affiliation
    const { error: affiliateError } = await supabase
      .from('affiliate_sales')
      .insert({
        promoter_id: promoter.id,
        checkout_session_id: checkoutSessionId,
        customer_email: session.customer_details?.email,
        amount: (originalAmount / 100), // Convertir en euros
        commission_amount: commissionAmount / 100, // Convertir en euros
        product_name: productName,
      });

    if (affiliateError) {
      console.error('Error recording affiliate sale:', affiliateError);
      return;
    }

    console.log('Affiliate sale recorded successfully');

    // Mettre à jour les totaux du promoteur
    const { error: updateError } = await supabase
      .from('promoters')
      .update({
        total_sales: (promoter.total_sales || 0) + 1,
        total_revenue: (promoter.total_revenue || 0) + (originalAmount / 100),
        total_commission: (promoter.total_commission || 0) + (commissionAmount / 100),
        updated_at: new Date().toISOString(),
      })
      .eq('id', promoter.id);

    if (updateError) {
      console.error('Error updating promoter totals:', updateError);
      return;
    }

    console.log('Promoter totals updated successfully');
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