import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Constants from "@/ults/Constant";
import { FaCreditCard, FaMoneyBillWave, FaGift } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { getCookie } from "cookies-next";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isGift, setIsGift] = useState(false);
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const [giftDetails, setGiftDetails] = useState({
    wrapping: "with_wrapping",
    senderName: "",
    recipientName: "",
    message: ""
  });
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

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleGiftDetailsChange = (e) => {
    const { name, value } = e.target;
    setGiftDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (paymentMethod) {
      const orderId = `${new Date().getTime()}`;
      const invoiceData = {
        formData,
        cartItems,
        totalPrice,
        discountedTotal,
        isGift,
        giftDetails: isGift ? giftDetails : null
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

  const renderGiftPopup = () => {
    if (!showGiftPopup) return null;

    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800/50 backdrop-blur-sm z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl max-w-md w-full mx-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Gift Details</h2>
            <button
              onClick={() => setShowGiftPopup(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaGift />
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Wrapping Option</label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="wrapping"
                    value="with_wrapping"
                    checked={giftDetails.wrapping === "with_wrapping"}
                    onChange={handleGiftDetailsChange}
                    className="form-radio text-gray-600"
                  />
                  <span>With Wrapping (+$5)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="wrapping"
                    value="without_wrapping"
                    checked={giftDetails.wrapping === "without_wrapping"}
                    onChange={handleGiftDetailsChange}
                    className="form-radio text-gray-600"
                  />
                  <span>Without Wrapping</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Sender's Name</label>
              <input
                type="text"
                name="senderName"
                value={giftDetails.senderName}
                onChange={handleGiftDetailsChange}
                className="w-full py-2 px-3 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Recipient's Name</label>
              <input
                type="text"
                name="recipientName"
                value={giftDetails.recipientName}
                onChange={handleGiftDetailsChange}
                className="w-full py-2 px-3 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none transition-all duration-300"
                placeholder="Recipient's name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Gift Message</label>
              <textarea
                name="message"
                value={giftDetails.message}
                onChange={handleGiftDetailsChange}
                rows="3"
                className="w-full py-2 px-3 bg-gray-50/80 backdrop-blur-sm border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none transition-all duration-300 resize-none"
                placeholder="Write your message here..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowGiftPopup(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 text-gray-700 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowGiftPopup(false);
                  setIsGift(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-950 text-white rounded-xl transition-all duration-300 font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-4xl">
            <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Payment Method</h2>
                  <p className="text-gray-500 mt-1">Choose how you'd like to pay</p>
                </div>
                <div className="bg-gradient-to-r from-primary/10 to-primary/20 p-3 rounded-full">
                  <FaCreditCard className="text-primary text-2xl" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-4">
                  {/* Online Payment Option */}
                  <label 
                    className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 
                      ${paymentMethod === "Online Payment" 
                        ? 'border-gray-800 bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'}`}
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
                        ${paymentMethod === "Online Payment" ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <FaCreditCard className={`w-6 h-6 ${paymentMethod === "Online Payment" ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Online Payment</p>
                        <p className="text-sm text-gray-500">Pay securely with your credit/debit card</p>
                      </div>
                    </div>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label 
                    className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300
                      ${paymentMethod === "Cash on Delivery" 
                        ? 'border-gray-800 bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'}`}
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
                        ${paymentMethod === "Cash on Delivery" ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <FaMoneyBillWave className={`w-6 h-6 ${paymentMethod === "Cash on Delivery" ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when you receive your order</p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Gift Option */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl">
                  <input
                    type="checkbox"
                    id="isGift"
                    checked={isGift}
                    onChange={(e) => {
                      setIsGift(e.target.checked);
                      if (e.target.checked) {
                        setShowGiftPopup(true);
                      }
                    }}
                    className="w-5 h-5 text-gray-800 rounded focus:ring-gray-800"
                  />
                  <label htmlFor="isGift" className="flex items-center space-x-2 cursor-pointer">
                    <FaGift className="text-gray-600" />
                    <span className="text-gray-700 font-medium">Send as Gift</span>
                  </label>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Payment</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
      {renderGiftPopup()}
    </div>
  );
};

export default PaymentMethod;
