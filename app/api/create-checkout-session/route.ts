import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with test key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia', // Updated to latest API version
});

export async function POST(request: Request) {
  try {
    const { tickets, submissionId, paymentMethod, type, email } = await request.json();

    if (!tickets || !submissionId) {
      return NextResponse.json(
        { error: 'Missing required payment information' },
        { status: 400 }
      );
    }

    // Parse tickets and validate
    const ticketCount = parseInt(tickets);
    if (isNaN(ticketCount) || ticketCount <= 0) {
      return NextResponse.json(
        { error: 'Invalid ticket count' },
        { status: 400 }
      );
    }

    // Calculate price (12.50 EUR per ticket)
    const ticketPrice = 12.50;
    
    // Determine payment method types based on selection
    let paymentMethodTypes: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = [];
    
    if (paymentMethod === 'bancontact') {
      paymentMethodTypes.push('bancontact');
    } else if (paymentMethod === 'ideal') {
      paymentMethodTypes.push('ideal');
    } else if (paymentMethod === 'creditcard') {
      paymentMethodTypes.push('card');
    } else {
      // Default fallback
      paymentMethodTypes = ['card', 'bancontact', 'ideal'];
    }

    const domain = 'https://' + (process.env.VERCEL_URL || 'localhost:3000');
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodTypes,
      customer_email: email || undefined,
      client_reference_id: submissionId,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: type || 'Betaling El Hikma',
              description: `Bestelling ID: ${submissionId}`,
            },
            unit_amount: Math.round(ticketPrice * 100), // Stripe requires amounts in cents
          },
          quantity: ticketCount,
        },
      ],
      mode: 'payment',
      success_url: `${domain}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/payment-cancelled`,
      metadata: {
        submissionId,
        ticketType: type || 'Unknown',
        tickets: tickets.toString()
      },
    });

    return NextResponse.json({ url: session.url });
    
  } catch (error) {
    // Use a more type-safe approach for error handling
    const errorMessage = error instanceof Error ? error.message : 'Error creating checkout session';
    // eslint-disable-next-line no-console
    console.error('Checkout session error:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 