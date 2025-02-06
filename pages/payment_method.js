import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Constants from "@/ults/Constant";



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

  useEffect(() => {
    if (query) {
      setFormData(query);
      setCartItems(JSON.parse(query.cartItems || '[]'));
      setTotalPrice(query.totalPrice);
      setDiscountedTotal(query.discountedTotal);
    }
  }, [query]);

  useEffect(() => {
    // const storedToken = localStorage.getItem('accessToken');
    // if (storedToken) {
    //   setAccessToken(storedToken);
    // } else {
    //   const requestOptions = {
    //     method: "GET",
    //     redirect: "follow"
    //   };
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      fetch(`${Constants.BASE_URL}/api/get-token`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setAccessToken(result);
          console.log(result);
          localStorage.setItem('accessToken', result);
        })
        .catch((error) => console.error(error));
        
    }, []);
  // useEffect(() => {
  //   const requestOptions = {
  //     method: "GET",
  //     redirect: "follow"
  //   };
    
  //   fetch("https://htbapi.hometexbd.ltd/api/get-token", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     // setAccessToken(result);
  //     // .catch((error) => console.error(error));
  // });

console.log(accessToken);
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

        const dummyData = {
          "client_id" : "3",
          "amount" : "1",
          "currency_of_transaction" : "BDT",
          "order_id_of_merchant" : "test- 06",
          "order_details" : "Payment Id: 123457",
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
        myHeaders.append("Authorization", `Bearer ${accessToken}`);
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(dummyData),
          redirect: "follow"
        };
  
        fetch(url, requestOptions)
          .then((response) => response.json())
          .then(data => {
            console.log(data);
            if (data.expected_response) {
              const newUrl = data.expected_response;
              console.log(newUrl);
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
