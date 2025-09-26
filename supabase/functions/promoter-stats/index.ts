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
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

    if (req.method !== 'GET') {
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

    // Récupérer les données du promoteur
    const { data: promoter, error: promoterError } = await supabase
      .from('promoters')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (promoterError || !promoter) {
      return new Response(
        JSON.stringify({ error: 'Promoter not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Récupérer les ventes d'affiliation depuis la base de données
    const { data: affiliateSales, error: salesError } = await supabase
      .from('affiliate_sales')
      .select('*')
      .eq('promoter_id', promoter.id)
      .order('created_at', { ascending: false });

    if (salesError) {
      console.error('Error fetching affiliate sales:', salesError);
    }

    // Calculer les statistiques
    const dbTotalSales = parseFloat(promoter.total_sales) || 0;
    const dbTotalRevenue = parseFloat(promoter.total_revenue) || 0;
    const dbTotalCommission = parseFloat(promoter.total_commission) || 0;
    
    const calculatedTotalSales = affiliateSales?.length || 0;
    const calculatedTotalRevenue = affiliateSales?.reduce((sum, sale) => sum + parseFloat(sale.amount.toString()), 0) || 0;
    const calculatedTotalCommission = affiliateSales?.reduce((sum, sale) => sum + parseFloat(sale.commission_amount.toString()), 0) || 0;

    // Récupérer les statistiques depuis Stripe pour validation
    let stripeStats = {
      usage_count: 0,
      total_amount: 0,
    };

    try {
      if (promoter.stripe_promotion_code_id) {
        // Récupérer les sessions de checkout qui ont utilisé ce code promo
        const sessions = await stripe.checkout.sessions.list({
          limit: 100,
          expand: ['data.line_items', 'data.discounts.data.promotion_code'],
        });

        // Filtrer les sessions qui ont utilisé notre code promo
        const relevantSessions = sessions.data.filter(session => {
          if (!session.discounts || session.discounts.length === 0) {
            return false;
          }
          
          return session.discounts.some(discount => {
            const promotionCode = discount.promotion_code;
            if (typeof promotionCode === 'string') {
              return promotionCode === promoter.stripe_promotion_code_id;
            } else if (promotionCode && typeof promotionCode === 'object') {
              return promotionCode.id === promoter.stripe_promotion_code_id;
            }
            return false;
          });
        }
        );

        stripeStats.usage_count = relevantSessions.length;
        stripeStats.total_amount = relevantSessions.reduce((sum, session) => 
          sum + (session.amount_total || 0), 0
        ) / 100; // Convertir de centimes en euros
      }
    } catch (stripeError) {
      console.error('Error fetching Stripe stats:', stripeError);
    }

    // Préparer les données de réponse
    const stats = {
      promoter: {
        promo_code: promoter.promo_code,
        commission_rate: promoter.commission_rate,
        is_active: promoter.is_active,
        created_at: promoter.created_at,
      },
      stats: {
        total_sales: Math.max(dbTotalSales, calculatedTotalSales, stripeStats.usage_count),
        total_revenue: Math.max(dbTotalRevenue, calculatedTotalRevenue, stripeStats.total_amount),
        total_commission: Math.max(dbTotalCommission, calculatedTotalCommission),
        commission_rate: promoter.commission_rate,
      },
      recent_sales: affiliateSales?.slice(0, 10) || [],
      stripe_validation: stripeStats,
    };

    return new Response(
      JSON.stringify(stats),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in promoter-stats:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});