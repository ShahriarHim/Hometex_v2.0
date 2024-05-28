import React, { useState } from "react";
import { useRouter } from 'next/router';

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod) {
      console.log("Selected payment method: ", paymentMethod);
      router.push('/order_summary');
    } else {
      alert("Please select a payment method");
    }
  };

  return (
    <div className="py-10">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-2 px-24">
        <div className="lg:col-span-4 mx-8 md:mx-14">
          <h4 className="mt-5 font-bold">Select Payment Method</h4>
          <form onSubmit={handleSubmit} className="space-y-6 mt-5">
            <div className="block text-sm font-medium text-gray-700">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="onlinePayment"
                  name="paymentMethod"
                  value="Online Payment"
                  checked={paymentMethod === "Online Payment"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="onlinePayment">Online Payment</label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="cashOnDelivery">Cash on Delivery</label>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-6 w-48 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;