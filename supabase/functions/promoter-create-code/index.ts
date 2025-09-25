import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  appInfo: {
    name: 'Thetirage Affiliate System',
    version: '1.0.0',
  },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Vérifier l'authentification
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { promo_code } = await req.json();

    if (!promo_code || typeof promo_code !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Promo code is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Vérifier si le promoteur existe déjà
    const { data: existingPromoter } = await supabase
      .from('promoters')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (existingPromoter) {
      return new Response(
        JSON.stringify({ 
          promo_code: existingPromoter.promo_code,
          message: 'Promo code already exists'
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Créer un coupon Stripe (20% de réduction)
    // Créer un coupon Stripe (10% de réduction)
    const coupon = await stripe.coupons.create({
      percent_off: 10,
      duration: 'forever',
      name: `Coupon promoteur ${promo_code}`,
      metadata: {
        promoter_code: promo_code,
        promoter_user_id: user.id,
      },
    });

    // Créer le promotion code Stripe
    const promotionCode = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: promo_code,
      active: true,
      metadata: {
        promoter_user_id: user.id,
      },
    });

    // Enregistrer le promoteur dans la base de données
    const { data: promoter, error: insertError } = await supabase
      .from('promoters')
      .insert({
        user_id: user.id,
        promo_code: promo_code,
        stripe_promotion_code_id: promotionCode.id,
        commission_rate: 25.00, // Taux moyen pour affichage
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting promoter:', insertError);
      // Nettoyer Stripe si l'insertion échoue
      await stripe.promotionCodes.update(promotionCode.id, { active: false });
      
      return new Response(
        JSON.stringify({ error: 'Failed to create promoter' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        promo_code: promoter.promo_code,
        commission_rate: promoter.commission_rate,
        message: 'Promo code created successfully'
      }),
      {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in promoter-create-code:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});