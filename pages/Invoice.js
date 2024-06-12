import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import Link from 'next/link';
import {  AiOutlineLeft, AiFillPrinter } from 'react-icons/ai';

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
      <div id="invoice-section" className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-2xl font-semibold text-gray-800">Order Summary</h3>
        </div>
        <div className="px-6 py-4">
          <dl>
            <div className="flex justify-between py-2 border-b">
              <dt className="text-sm font-medium text-gray-600">Name</dt>
              <dd className="text-sm text-gray-900">{formData.firstName}</dd>
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
            <dt className="text-sm font-medium text-gray-600">Delivery Fee</dt>
            <dd className="text-sm text-gray-900">10৳</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-sm font-medium text-gray-600">Tax</dt>
            <dd className="text-sm text-gray-900">5৳</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-sm font-medium text-gray-600">Final Total</dt>
            <dd className="text-sm text-gray-900">{parseFloat(discountedTotal) + 10 + 5}৳</dd>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-end mt-8">
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Print Invoice
        </button>
      </div> */}
      <div className='flex flex-row justify-between px-0 mt-3 gap-10'>
        <div>
          <Link href="/">
            <button className='bg-green-500 mt-15 flex gap-2 items-center justify-between border rounded-full px-3 py-2 '><AiOutlineLeft /> <span className='text-xl'>Continue Shopping</span></button>
          </Link>
        </div>
        <div>
          <button onClick={handlePrint} className='bg-green-500 mt-15 flex gap-2 items-center justify-between border rounded-full px-3 py-2 '>  <AiFillPrinter/><span className='text-xl'>Print</span></button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
