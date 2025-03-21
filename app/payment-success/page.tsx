'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

interface SessionDetails {
  id: string;
  amount_total?: number;
  currency?: string;
  payment_status?: string;
  submissionId?: string;
  ticketType?: string;
  customer_email?: string;
  tickets?: number;
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<SessionDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSessionDetails() {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch session details from Stripe via our API
        const response = await fetch(`/api/checkout-sessions/${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch session details');
        }
        
        const data = await response.json();
        // If we have tickets count, calculate the total amount
        if (data.tickets && !data.amount_total) {
          data.amount_total = data.tickets * 1250; // 12.50 euros in cents
        }
        setOrderDetails(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching session details:', error);
      } finally {
        setLoading(false);
      }
    }

    getSessionDetails();
  }, [sessionId]);

  const formatAmount = (amount?: number, currency?: string) => {
    if (!amount) return '0';
    const value = amount / 100; // Convert cents to euros
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: currency || 'EUR'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-beige py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-500 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Betaling geslaagd
          </h1>
        </div>

        <div className="p-8 text-center">
          <div className="mb-8 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-berkshire-swash text-secondary mb-2">
              Bedankt voor je betaling!
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Je betaling is succesvol verwerkt.
            </p>
            
            {loading ? (
              <p className="text-sm text-gray-500">Laden van betalingsgegevens...</p>
            ) : (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg w-full max-w-md">
                {orderDetails?.ticketType && (
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-medium text-gray-600">Ticket:</span>
                    <span className="text-secondary">{orderDetails.ticketType}</span>
                  </div>
                )}
                {orderDetails?.tickets && (
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-medium text-gray-600">Aantal tickets:</span>
                    <span className="text-secondary">{orderDetails.tickets}</span>
                  </div>
                )}
                {orderDetails?.amount_total !== undefined && (
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-medium text-gray-600">Bedrag:</span>
                    <span className="text-secondary">{formatAmount(orderDetails.amount_total, orderDetails.currency)}</span>
                  </div>
                )}
                {orderDetails?.customer_email && (
                  <div className="flex justify-between border-b pb-2 mb-2">
                    <span className="font-medium text-gray-600">Email:</span>
                    <span className="text-secondary">{orderDetails.customer_email}</span>
                  </div>
                )}
                {orderDetails?.submissionId && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Bestelling ID:</span>
                    <span className="text-secondary">{orderDetails.submissionId}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-secondary">
              We hebben een bevestiging naar je e-mail gestuurd.
            </p>
            <p className="text-secondary">
              Als je vragen hebt, <Button
                variant="link"
                className="p-0 text-secondary underline"
                data-tally-open="mOkWlg"
                data-tally-layout="modal"
                data-tally-width="500"
                data-tally-emoji-text="👋"
                data-tally-emoji-animation="wave"
                data-tally-auto-close="0"
                data-umami-event="contact-button"
              >
                neem gerust contact met ons op
              </Button>.
            </p>
          </div>

          <div className="mt-8">
            <Link href="/" passHref>
              <Button>Terug naar de homepage</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 