'use client';

import Link from 'next/link';
import { Suspense,useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

function PaymentCancelledContent() {
  const [returnUrl, setReturnUrl] = useState('/');
  
  useEffect(() => {
    // Try to get the original values from localStorage if they were saved
    const tickets = localStorage.getItem('payment_tickets');
    const submissionId = localStorage.getItem('payment_submissionId');
    const email = localStorage.getItem('payment_email');
    const type = localStorage.getItem('payment_type');
    
    if (tickets && submissionId) {
      let url = `/pay?tickets=${tickets}&submissionId=${submissionId}`;
      
      if (email) {
        url += `&email=${encodeURIComponent(email)}`;
      }
      
      if (type) {
        url += `&type=${encodeURIComponent(type)}`;
      }
      
      setReturnUrl(url);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-beige py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-amber-500 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Betaling geannuleerd
          </h1>
        </div>

        <div className="p-8 text-center">
          <div className="mb-8 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-berkshire-swash text-secondary mb-2">
              Betaling geannuleerd
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              De betaling werd geannuleerd of is niet voltooid.
            </p>
          </div>

          <div>
            <p className="text-secondary">
              Er is geen bedrag van je rekening afgeschreven.
            </p>
            <p className="text-secondary">
              Je kunt het opnieuw proberen of later terugkomen.
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

          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Link href={returnUrl} passHref>
              <Button>Opnieuw proberen</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelledPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-amber-500 mb-4 text-center">Laden...</h1>
          <p className="text-gray-600">Een moment geduld alstublieft.</p>
        </div>
      </div>
    }>
      <PaymentCancelledContent />
    </Suspense>
  );
} 