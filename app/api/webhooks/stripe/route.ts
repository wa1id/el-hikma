import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

// Stripe webhook secret - use CLI webhook secret for development
const isDevelopment = process.env.NODE_ENV === 'development';
// Enable bypass by default in development
const bypassVerification = isDevelopment && (process.env.BYPASS_WEBHOOK_VERIFICATION !== 'false');
const webhookSecret = isDevelopment 
  ? process.env.STRIPE_WEBHOOK_SECRET_CLI || process.env.STRIPE_WEBHOOK_SECRET || ''
  : process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: Request) {
  try {
    // Allow raw access to headers for debugging
    const rawHeaders = Object.fromEntries(request.headers.entries());
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature') || '';

    // Log complete debugging info in development
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.log('----------------- WEBHOOK DEBUG -----------------');
      // eslint-disable-next-line no-console
      console.log('Raw Headers:', JSON.stringify(rawHeaders, null, 2));
      // eslint-disable-next-line no-console
      console.log('Stripe Signature:', signature);
      // eslint-disable-next-line no-console
      console.log('Webhook Secret (first 4 chars):', webhookSecret ? webhookSecret.slice(0, 4) : 'none');
      // eslint-disable-next-line no-console
      console.log('Bypass Verification:', bypassVerification);
      // eslint-disable-next-line no-console
      console.log('Body Preview:', body.slice(0, 100) + '...');
      // eslint-disable-next-line no-console
      console.log('------------------------------------------------');
    }

    if (!webhookSecret && !bypassVerification) {
      // eslint-disable-next-line no-console
      console.warn('Missing Stripe webhook secret. Webhook events cannot be verified.');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Verify the webhook signature or bypass in development
    let event: Stripe.Event;
    
    if (bypassVerification) {
      try {
        // eslint-disable-next-line no-console
        console.log('Bypassing webhook signature verification for development');
        event = JSON.parse(body) as Stripe.Event;
      } catch (parseError) {
        // eslint-disable-next-line no-console
        console.error('Failed to parse webhook body:', parseError);
        return NextResponse.json({ error: 'Invalid JSON in webhook body' }, { status: 400 });
      }
    } else {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        
        // Log successful verification in development
        if (isDevelopment) {
          // eslint-disable-next-line no-console
          console.log('Webhook signature verified successfully!');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Invalid webhook signature';
        // eslint-disable-next-line no-console
        console.error(`Webhook signature verification failed: ${errorMessage}`);
        return NextResponse.json({ error: errorMessage }, { status: 400 });
      }
    }

    // Handle specific events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        // eslint-disable-next-line no-console
        console.log(`Payment successful for session: ${session.id}`);
        
        // Forward the payment information to n8n
        try {
          const submissionId = session.client_reference_id || session.metadata?.submissionId || '';
          const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
          
          if (!n8nWebhookUrl) {
            throw new Error('N8N_WEBHOOK_URL is not configured');
          }

          // Send the data to n8n
          const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              submissionId,
              paymentStatus: 'paid',
              paymentId: session.id,
              metadata: session.metadata,
              amount: session.amount_total,
              currency: session.currency,
              customerEmail: session.customer_email,
            }),
          });

          if (!response.ok) {
            throw new Error(`Failed to send data to n8n: ${response.statusText}`);
          }

          // eslint-disable-next-line no-console
          console.log(`Payment data for submission ${submissionId} sent to n8n successfully`);
        } catch (n8nError) {
          // eslint-disable-next-line no-console
          console.error('Error sending data to n8n:', n8nError);
        }
        
        break;
      }

      default:
        // eslint-disable-next-line no-console
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Webhook error';
    // eslint-disable-next-line no-console
    console.error(`Webhook error: ${errorMessage}`);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 