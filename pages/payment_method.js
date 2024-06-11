import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const router = useRouter();

  const { query } = router;

  const [formData, setFormData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);

  useEffect(() => {
    if (query) {
      setFormData(query);
      setCartItems(JSON.parse(query.cartItems || '[]'));
      setTotalPrice(query.totalPrice);
      setDiscountedTotal(query.discountedTotal);

      // console.log("Form Data:", query);
      // console.log("Cart Items:", JSON.parse(query.cartItems || '[]'));
      // console.log("Total Price:", query.totalPrice);
      // console.log("Discounted Total:", query.discountedTotal);
    }
  }, [query]);

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    if (paymentMethod) {
      console.log("Selected payment method: ", paymentMethod);
      if (paymentMethod === "Online Payment") {
        router.push('https://pay.hometexbd.ltd/process/324061010361217');
      } else {
        router.push({
          pathname: '/Invoice',
          query: { ...formData, cartItems: JSON.stringify(cartItems), totalPrice, discountedTotal },
        });
      }
    } else {
      alert("Please select a payment method");
    }
  };

  return (
    <div className='px-2 py-2 shadow-lg rounded-full bg-white mt-4'>
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
                className="inline-flex justify-center py-2 px-6 w-48 border border-transparent shadow-sm text-sm font-medium rounded-full text-black bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
