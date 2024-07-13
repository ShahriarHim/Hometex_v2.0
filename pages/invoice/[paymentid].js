// pages/invoice/[paymentId].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Invoice = () => {
  const router = useRouter();
  const { paymentId } = router.query;
  const [formData, setFormData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [tax, setTax] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    if (!router.isReady) return;

    const storedData = localStorage.getItem('invoiceData');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData.formData);
      setCartItems(parsedData.cartItems);
      setTotalPrice(parsedData.totalPrice);
      setDiscountedTotal(parsedData.discountedTotal);
    } else if (paymentId) {
      alert('No order data found. Redirecting to home.');
      router.push('/');
    }
  }, [router.isReady, paymentId]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const finalAmount = cartItems.reduce((total, cartItem) => {
        let price = typeof cartItem.price === 'string' ? parseFloat(cartItem.price.replace(/[,৳]/g, '')) : cartItem.price;
        return total + price * cartItem.quantity;
      }, 0);

      setTotalPrice(finalAmount);

      const calculatedVat = finalAmount * 0.1;
      const calculatedTax = finalAmount * 0.1;
      setVat(calculatedVat);
      setTax(calculatedTax);

      const calculatedFinalTotal = parseFloat(discountedTotal) + 90 + calculatedVat + calculatedTax;
      setFinalTotal(calculatedFinalTotal);
    }
  }, [cartItems, discountedTotal]);

  const handlePrint = () => {
    const printContents = document.getElementById('invoice-section').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handleConfirm = () => {
    const order = {
      orderId: paymentId,
      formData,
      cartItems,
      totalPrice,
      discountedTotal,
      vat,
      tax,
      finalTotal,
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    localStorage.removeItem('invoiceData');
    localStorage.removeItem('cartItems');

    alert('Order confirmed!');
    router.push('/');
  };

  return (
    <div className="container mx-auto py-8">
      <div id="invoice-section" className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-2xl font-semibold text-gray-800">Order Summary of {paymentId}</h3>
        </div>
        <div className="px-6 py-4">
          <dl>
            <div className="flex justify-between py-2 border-b">
              <dt className="text-sm font-medium text-gray-600">Name</dt>
              <dd className="text-sm text-gray-900">{formData.firstName} {formData.lastName}</dd>
            </div>
            <div className="flex justify-between py-2 border-b">
              <dt className="text-sm font-medium text-gray-600">Email</dt>
              <dd className="text-sm text-gray-900">{formData.email}</dd>
            </div>
            <div className="flex justify-between py-2 border-b">
              <dt className="text-sm font-medium text-gray-600">Phone</dt>
              <dd className="text-sm text-gray-900">{formData.phoneNumber}</dd>
            </div>
            <div className="flex justify-between py-2 border-b">
              <dt className="text-sm font-medium text-gray-600">Address</dt>
              <dd className="text-sm text-gray-900">{formData.address}</dd>
            </div>
            <div className="py-4">
              <dt className="text-sm font-medium text-gray-600">Items</dt>
              <dd className="text-sm text-gray-900">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                          {typeof item.price === 'string' ? parseFloat(item.price.replace(/[,৳]/g, '')) : item.price}৳
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                          {typeof item.price === 'string' ? parseFloat(item.price.replace(/[,৳]/g, '')) * item.quantity : item.price * item.quantity}৳
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </dd>
            </div>
          </dl>
        </div>
        <div className="px-6 py-4 border-t">
          <div className="flex justify-between py-2">
            <dt className="text-sm font-medium text-gray-600">Total Price</dt>
            <dd className="text-sm text-gray-900">{totalPrice}৳</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-sm font-medium text-gray-600">Discounted Total</dt>
            <dd className="text-sm text-gray-900">{discountedTotal}৳</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-sm font-medium text-gray-600">VAT (10%)</dt>
            <dd className="text-sm text-gray-900">{vat.toFixed(2)}৳</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-sm font-medium text-gray-600">Tax (10%)</dt>
            <dd className="text-sm text-gray-900">{tax.toFixed(2)}৳</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-sm font-medium text-gray-600">Delivery Fee</dt>
            <dd className="text-sm text-gray-900">90৳</dd>
          </div>
          <hr className="mb-1 border-t-2 border-gray-300" />
          <div className="flex justify-between py-2">
            <dt className="text-sm font-medium text-gray-600">Final Total</dt>
            <dd className="text-sm text-gray-900">{finalTotal.toFixed(2)}৳</dd>
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-between px-0 mt-3 gap-10'>
        <div>
          <button onClick={() => router.push('/')} className='bg-green-500 mt-15 flex gap-2 items-center justify-between border rounded-full px-3 py-2'>
            <span className='text-xl'>Continue Shopping</span>
          </button>
        </div>
        <div>
          <button onClick={handleConfirm} className='bg-green-500 mt-15 flex gap-2 items-center justify-between border rounded-full px-3 py-2'>
            <span className='text-xl'>Confirm Order</span>
          </button>
        </div>
        <div>
          <button onClick={handlePrint} className='bg-green-500 mt-15 flex gap-2 items-center justify-between border rounded-full px-3 py-2'>
            <span className='text-xl'>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
