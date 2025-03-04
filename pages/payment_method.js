import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Constants from "@/ults/Constant";
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

import { getCookie } from "cookies-next";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const router = useRouter();

  const { query } = router;
  const orderId = `Id#-${new Date().getTime()}`;

  const [formData, setFormData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [accessToken, setAccessToken] = useState('');
  const url = 'https://payment.hometex.store/api/v1.0/pay';
  let auth_token = decodeURIComponent(getCookie("home_text_token"));

  useEffect(() => {
    if (query) {
      setFormData(query);
      setCartItems(JSON.parse(query.cartItems || '[]'));
      setTotalPrice(query.totalPrice);
      setDiscountedTotal(query.discountedTotal);
    }
  }, [query]);

  useEffect(() => {
    console.log('Fetching token with auth_token:', auth_token);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    };
    fetch(`${Constants.BASE_URL}/api/get-token`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('Received accessToken:', result);
        if (result.data && result.data.token) {
          const token = result.data.token;
          setAccessToken(token);
          localStorage.setItem('accessToken', token);
        } else {
          console.error('Token not found in response:', result);
        }
      })
      .catch((error) => console.error(error));
  }, [auth_token]);

// console.log(accessToken);
  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (paymentMethod) {
      const orderId = `${new Date().getTime()}`;
      const invoiceData = {
        formData,
        cartItems,
        totalPrice,
        discountedTotal
      };

      localStorage.setItem('invoiceData', JSON.stringify(invoiceData));

      if (paymentMethod === "Online Payment") {
        const buyerName = formData.firstName + ' ' + formData.lastName;
        const buyerContactNumber = formData.phoneNumber;
        const buyer_email = formData.email;
   

        const PayAbleAmount = totalPrice < discountedTotal ? totalPrice : discountedTotal;

        let min = 1;
        let max = 999999;
        let random = Math.floor(Math.random() * (max - min + 1)) + min;

        const dummyData = {
          "client_id" : "3",
          "amount" : "1",
          "currency_of_transaction" : "BDT",
          "order_id_of_merchant" : "test-"+random,
          "order_details" : "Payment Id: "+random,
          "buyer_name": "S.M.F.Karim",
          "buyer_email" : "smfkarim.24@gmail.com",
          "buyer_address" : "dhaka",
          "buyer_contact_number" : "01670885658",
          "callback_success_url" : "http://localhost:3000/success",
          "callback_fail_url" : "http://gopaysenz.com/invoice/fail.php",
          "callback_cancel_url" : "http://localhost:3000/cancel",
          "expected_response_type" : "JSON",
          "cus_city" : "",
          "cus_state" : "",
          "cus_postcode" : "",
          "cus_country" : "",
          "currency" : "BDT",
          "custom_1" : "",
          "custom_2" : "",
          "custom_3" : "",
          "custom_4":""
      };  

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${decodeURIComponent(accessToken)}`);
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(dummyData),
          redirect: "follow"
        };
  
        fetch(url, requestOptions)
          .then((response) => response.json())
          .then(data => {
            // console.log(data);
            if (data.expected_response) {
              const newUrl = data.expected_response;
              // console.log(newUrl);
              window.location = newUrl;
              const success_api = 'https://payment.hometex.store/api/v1.0/payment-transaction-details'
            } else {
              console.log(data.errorMessage);
              alert(data.errorMessage);
            }
          })
          .catch((error) => console.error(error));
  
      } else {
        router.push({
          pathname: `/invoice/${orderId}`,
        });
      }
    } else {
      alert("Please select a payment method");
    }
  };

  return (
    <div className='px-4 py-8 bg-gradient-to-br from-white to-gray-50 min-h-[60vh] rounded-lg shadow-xl mt-4'>
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-green-500 w-2 h-8 rounded mr-3"></span>
            Select Payment Method
          </h4>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              {/* Online Payment Option */}
              <label 
                className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 
                  ${paymentMethod === "Online Payment" 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-200'}`}
              >
                <input
                  type="radio"
                  id="onlinePayment"
                  name="paymentMethod"
                  value="Online Payment"
                  checked={paymentMethod === "Online Payment"}
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                    ${paymentMethod === "Online Payment" ? 'bg-green-500' : 'bg-gray-100'}`}>
                    <FaCreditCard className={`w-6 h-6 ${paymentMethod === "Online Payment" ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Online Payment</p>
                    <p className="text-sm text-gray-500">Pay securely with your credit/debit card</p>
                  </div>
                </div>
                <div className={`absolute right-4 w-5 h-5 border-2 rounded-full 
                  ${paymentMethod === "Online Payment" 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-gray-300'}`}>
                  {paymentMethod === "Online Payment" && (
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </div>
              </label>

              {/* Cash on Delivery Option */}
              <label 
                className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300
                  ${paymentMethod === "Cash on Delivery" 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-200'}`}
              >
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                    ${paymentMethod === "Cash on Delivery" ? 'bg-green-500' : 'bg-gray-100'}`}>
                    <FaMoneyBillWave className={`w-6 h-6 ${paymentMethod === "Cash on Delivery" ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive your order</p>
                  </div>
                </div>
                <div className={`absolute right-4 w-5 h-5 border-2 rounded-full 
                  ${paymentMethod === "Cash on Delivery" 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-gray-300'}`}>
                  {paymentMethod === "Cash on Delivery" && (
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </div>
              </label>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="group relative inline-flex items-center justify-center py-3 px-8 w-full md:w-64 
                  border border-transparent text-base font-medium rounded-full text-white bg-green-500 
                  hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
                  transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg 
                    className="h-5 w-5 text-green-300 group-hover:text-green-400" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </span>
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
