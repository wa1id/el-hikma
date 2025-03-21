'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

const PaymentMethodCard = ({ 
  name, 
  icon, 
  selected, 
  onClick 
}: { 
  name: string; 
  icon: string; 
  selected: boolean; 
  onClick: () => void 
}) => (
  <div 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-all ${
      selected ? 'bg-primary/10 border-2 border-primary' : 'bg-white border border-gray-200 hover:shadow-md'
    }`}
  >
    <div className="text-4xl mb-2">{icon}</div>
    <h3 className="font-semibold text-secondary">{name}</h3>
  </div>
);

export default function PayPage() {
  const searchParams = useSearchParams();
  const tickets = searchParams.get('tickets') || '1';
  const submissionId = searchParams.get('submissionId') || '';
  const email = searchParams.get('email') || '';
  const type = searchParams.get('type') || '';
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate price based on number of tickets
  const ticketPrice = 12.50;
  const totalPrice = (parseInt(tickets) * ticketPrice).toFixed(2);

  useEffect(() => {
    // Validate that we have both tickets and submissionId
    if (!tickets || !submissionId) {
      setError('Missing required payment information');
    } else {
      // Store payment details in localStorage for reference if user cancels
      localStorage.setItem('payment_tickets', tickets);
      localStorage.setItem('payment_submissionId', submissionId);
      localStorage.setItem('payment_email', email);
      localStorage.setItem('payment_type', type);
    }
  }, [tickets, submissionId, email, type]);

  const handlePayment = async () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Create a payment session with Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tickets,
          submissionId,
          paymentMethod: selectedMethod,
          email,
          type
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment session');
      }
      
      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-primary p-6">
          <h1 className="text-2xl font-bold text-white text-center">Betaling</h1>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-berkshire-swash text-secondary mb-2">Te betalen bedrag</h2>
            <p className="text-4xl font-bold text-primary">€{totalPrice}</p>
            <div className="mt-4 space-y-1 text-sm text-gray-500">
              {type && (
                <p>Type: {type}</p>
              )}
              {tickets && (
                <p>Aantal tickets: {tickets}</p>
              )}
              {email && (
                <p>Email: {email}</p>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Kies een betaalmethode</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PaymentMethodCard 
                name="Bancontact" 
                icon="💳" 
                selected={selectedMethod === 'bancontact'}
                onClick={() => setSelectedMethod('bancontact')}
              />
              <PaymentMethodCard 
                name="iDEAL" 
                icon="🏦" 
                selected={selectedMethod === 'ideal'}
                onClick={() => setSelectedMethod('ideal')}
              />
              <PaymentMethodCard 
                name="Creditcard" 
                icon="💳" 
                selected={selectedMethod === 'creditcard'}
                onClick={() => setSelectedMethod('creditcard')}
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              className="w-full md:w-64" 
              disabled={!selectedMethod || loading}
              onClick={handlePayment}
            >
              {loading ? 'Even geduld...' : 'Betaal nu'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 