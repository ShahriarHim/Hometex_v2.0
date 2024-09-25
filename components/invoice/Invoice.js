import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CheckCircle } from 'lucide-react';

const SuccessfulPaymentPopup = ({ onClose }) => {
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentId, setPaymentId] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('paymentId');
    if (id) {
      setPaymentId(id);
    }
  }, []);

  useEffect(() => {
    if (paymentId) {
      fetchPaymentDetails(paymentId);
    }
  }, [paymentId]);

  const fetchPaymentDetails = async (paymentTxnId) => {
    try {
      const storedData = localStorage.getItem('accessToken');

      const response = await fetch('https://pay.hometexbd.ltd/api/v1.0/payment-transaction-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedData}`
        },
        body: JSON.stringify({ "payment-txnid": paymentTxnId }),
      });
      const data = await response.json();

      if (data.status) {
        setPaymentDetails(data.data);
      } else {
        setError('Failed to fetch payment details');
      }
    } catch (err) {
      setError('An error occurred while fetching payment details');
    } finally {
      setLoading(false);
    }
  };

  const handleViewInvoice = () => {
    if (paymentId) {
      router.push(`/invoice/${paymentId}`);
    }
  };

  const handleContinueShopping = () => {
    if (onClose) {
      onClose();
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading payment details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="border-b border-green-500 p-4 flex items-center">
          <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
          <h2 className="text-2xl font-bold text-green-700">Payment Successful!</h2>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          {paymentDetails && (
            <div className="space-y-2 text-sm">
              <p><strong>Transaction ID:</strong> {paymentDetails.merchant_txnid}</p>
              <p><strong>Payment Status:</strong> {paymentDetails.payment_status}</p>
              <p><strong>Amount:</strong> {paymentDetails.amount} BDT</p>
              <p><strong>Payment Method:</strong> {paymentDetails.remarks.payment_type}</p>
            </div>
          )}
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
