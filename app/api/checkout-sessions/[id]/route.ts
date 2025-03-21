import {  NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params before accessing its properties
    const {id} = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ['line_items']
    });

    // Return relevant session data
    // Notice we are only returning necessary info, not the entire session object
    return NextResponse.json({
      id: session.id,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      submissionId: session.client_reference_id || session.metadata?.submissionId,
      ticketType: session.metadata?.ticketType,
      tickets: session.metadata?.tickets,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve session';
    // eslint-disable-next-line no-console
    console.error('Session retrieval error:', error);
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 