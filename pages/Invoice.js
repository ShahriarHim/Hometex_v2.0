import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const Invoice = () => {
  const router = useRouter();
  const { query } = router;
  let auth_name = getCookie("home_text_name");
  let auth_phone = getCookie("home_text_phone");
  const [formData, setFormData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);

  useEffect(() => {
    if (query) {
      const {
        country,
        city,
        postcode,
        Division,
        District,
        cartItems,
        totalPrice,
        discountedTotal,
        ...rest
      } = query;
      
      const address = `${country}, ${city}, ${postcode}, ${Division}, ${District}`;

      setFormData({
        ...rest,
        address
      });

      setCartItems(JSON.parse(cartItems || '[]'));
      setTotalPrice(totalPrice);
      setDiscountedTotal(discountedTotal);
    }
  }, [query]);

  useEffect(() => {
    if (cartItems) {
      const finalAmount = cartItems.reduce((total, cartItem) => {
        let str = cartItem.price;
        if (typeof str === 'string') {
          str = str.replace(/[,৳]/g, ""); // Remove commas and the currency symbol
        } else {
          console.error("Price is not a string:", str);
          return total;
        }
        const amount = parseFloat(str) * cartItem.quantity;
        return total + amount;
      }, 0);
      
      setTotalPrice(finalAmount);
    }
  }, [cartItems]);

  const handlePrint = () => {
    const printContents = document.getElementById('invoice-section').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // reload the page to restore the original content
  };

  return (
    <div className="container mx-auto py-8">
      <div id="invoice-section" className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Order Summary</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{auth_name}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.email}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{auth_phone}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.address}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Items</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {typeof item.price === 'string' ? parseFloat(item.price.replace(/[,৳]/g, '')) : item.price}৳
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Total Price</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{totalPrice}৳</dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Discounted Total</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{discountedTotal}৳</dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Delivery Fee</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">10৳</dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Tax</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">5৳</dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Final Total</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{parseFloat(discountedTotal) + 10 + 5}৳</dd>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
