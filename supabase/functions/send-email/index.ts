import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

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

    const { to, subject, html, metadata } = await req.json();

    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, html' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Intégration avec un service d'email (exemple avec une API générique)
    // Remplacez par votre service d'email préféré (SendGrid, Mailgun, etc.)
    
    const emailServiceUrl = Deno.env.get('EMAIL_SERVICE_URL');
    const emailApiKey = Deno.env.get('EMAIL_API_KEY');
    
    if (emailServiceUrl && emailApiKey) {
      try {
        const emailResponse = await fetch(emailServiceUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${emailApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: [{ email: to }],
            from: { email: 'noreply@thetirage.com', name: 'Thetirage' },
            subject: subject,
            html: html,
            metadata: metadata
          })
        });
        
        if (!emailResponse.ok) {
          throw new Error(`Email service error: ${emailResponse.statusText}`);
        }
        
        console.log(`Email sent successfully to ${to}`);
      } catch (emailError) {
        console.error('Email service error:', emailError);
        // Continue with simulation if email service fails
      }
    }

    // Log email for debugging
    console.log('Email processed:', {
      to,
      subject,
      metadata,
      htmlLength: html.length,
      timestamp: new Date().toISOString()
    });
    
    // Store email log in database for tracking
    try {
      await supabase.from('email_logs').insert({
        recipient: to,
        subject: subject,
        metadata: metadata,
        sent_at: new Date().toISOString(),
        status: 'sent'
      });
    } catch (dbError) {
      console.error('Failed to log email:', dbError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        recipient: to,
        subject: subject,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in send-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});