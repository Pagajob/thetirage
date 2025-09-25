import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export async function createCheckoutSession(
  priceId: string,
  affiliateCode?: string | null
) {
  try {
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
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}${affiliateCode ? `&ref=${affiliateCode}` : ''}`,
          cancel_url: `${window.location.origin}/`,
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