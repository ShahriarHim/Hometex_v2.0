import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CheckCircle } from 'lucide-react';

const SuccessfulPaymentPopup = () => {
  const router = useRouter();
  const [paymentId, setPaymentId] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('paymentId');
    if (id) {
      setPaymentId(id);
    }
  }, []);

  const handleViewInvoice = () => {
    if (paymentId) {
      router.push(`/invoice/${paymentId}`);
    }
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="border-b border-green-500 p-4 flex items-center">
          <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
          <h2 className="text-2xl font-bold text-green-700">Payment Successful!</h2>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-gray-600">
            Thank you for your purchase. Your order {paymentId} has been confirmed.
          </p>
          <p className="text-center text-gray-700">
            We've sent a confirmation email with order details to your registered email address.
          </p>
          <div className="flex flex-col space-y-2">
            <button 
              onClick={handleViewInvoice}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              View Invoice
            </button>
            <button 
              onClick={handleContinueShopping}
              className="border border-green-500 text-green-700 hover:bg-green-50 font-bold py-2 px-4 rounded"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulPaymentPopup;