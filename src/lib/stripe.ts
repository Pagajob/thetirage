import { createClient } from '@supabase/supabase-js';
import { trackBeginCheckout, trackPixelInitiateCheckout } from './analytics';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export async function createCheckoutSession(
  priceId: string,
  affiliateCode?: string | null
) {
  try {
    // Track checkout initiation
    const priceValue = getPriceFromPriceId(priceId);
    trackBeginCheckout(priceValue);
    trackPixelInitiateCheckout(priceValue);
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // If user is not authenticated, create a temporary session or redirect to auth
      // For now, we'll proceed without authentication for guest checkout
      console.warn('User not authenticated, proceeding with guest checkout');
    }

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
      {
        method: 'POST',
        headers: {
          'Authorization': session ? `Bearer ${session.access_token}` : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: priceId,
          success_url: `https://thetirage.com/success?session_id={CHECKOUT_SESSION_ID}${affiliateCode ? `&ref=${affiliateCode}` : ''}`,
          cancel_url: `https://thetirage.com/`,
          mode: 'payment',
          metadata: affiliateCode ? { affiliate_code: affiliateCode } : undefined
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checkout session');
    }

    const { url } = await response.json();
    
    if (url) {
      window.location.href = url;
    } else {
      throw new Error('No checkout URL received');
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

function getPriceFromPriceId(priceId: string): number {
  switch (priceId) {
    case 'price_1SBHBREWa5JpT2nEQSe5Jx3e': // Bronze
      return 5.99;
    case 'price_1SBHCeEWa5JpT2nEJrt20BIh': // Silver
      return 9.99;
    case 'price_1SBHEeEWa5JpT2nEg1K6tDSs': // Gold
      return 15.99;
    default:
      return 0;
  }
}