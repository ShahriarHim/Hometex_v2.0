import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaPrint, FaShoppingBag, FaCheckCircle } from 'react-icons/fa';

const Invoice = () => {
  console.log('API Key:', process.env.NEXT_PUBLIC_API_KEY); // Debug: Check if env vars are loaded
  console.log('Secret Key:', process.env.NEXT_PUBLIC_SECRET_KEY); // Debug: Check if env vars are loaded

  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [tax, setTax] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const storedToken = localStorage.getItem('home_text_token');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const id = path.split('/').pop();
      setOrderId(id);
    }
  }, []);

  useEffect(() => {
    if (!router.isReady || !orderId) return;

    const storedData = localStorage.getItem('invoiceData');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Construct complete address from form data
      const fullAddress = `${parsedData.formData.address || ''}, ${parsedData.formData.city || ''}, ${parsedData.formData.District || ''}, ${parsedData.formData.Division || ''}, ${parsedData.formData.postcode || ''}`.trim().replace(/^,\s*|,\s*$/g, '');
      
      setFormData({
        ...parsedData.formData,
        address: fullAddress // Add the constructed address to formData
      });
      setCartItems(parsedData.cartItems);
      setTotalPrice(parsedData.totalPrice);
      setDiscountedTotal(parsedData.discountedTotal);
    } else {
      // If no stored data, try to get from URL query params
      const queryParams = router.query;
      if (Object.keys(queryParams).length > 0) {
        // Construct address from URL parameters
        const fullAddress = `${queryParams.city || ''}, ${queryParams.District || ''}, ${queryParams.Division || ''}, ${queryParams.postcode || ''}`.trim().replace(/^,\s*|,\s*$/g, '');
        
        setFormData({
          firstName: queryParams.firstName || '',
          lastName: queryParams.lastName || '',
          email: queryParams.email || '',
          phoneNumber: queryParams.phoneNumber || '',
          address: fullAddress
        });

        // Parse cartItems if present in URL
        if (queryParams.cartItems) {
          try {
            const decodedCartItems = JSON.parse(decodeURIComponent(queryParams.cartItems));
            setCartItems(decodedCartItems);
          } catch (error) {
            console.error('Error parsing cartItems from URL:', error);
          }
        }

        setTotalPrice(parseFloat(queryParams.totalPrice) || 0);
        setDiscountedTotal(parseFloat(queryParams.discountedTotal) || 0);
      } else {
        alert('No order data found. Redirecting to home.');
        router.push('/');
      }
    }

    console.log('Constructed formData:', formData); // Debug: Check the constructed formData
  }, [router.isReady, orderId, router.query]);

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

  const handleConfirm = async () => {
    try {
      const orderData = {
        invoice: orderId,
        recipient_name: `${formData.firstName} ${formData.lastName}`,
        recipient_phone: formData.phoneNumber,
        recipient_address: formData.address,
        cod_amount: parseFloat(finalTotal.toFixed(2))
      };

      console.log('Sending order data:', orderData); // Debug: Log request data

      const response = await fetch('https://portal.packzy.com/api/v1/create_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': process.env.NEXT_PUBLIC_API_KEY,
          'Secret-Key': process.env.NEXT_PUBLIC_SECRET_KEY
        },
        body: JSON.stringify(orderData)
      });

      console.log('Response status:', response.status); // Debug: Log response status
      console.log('Response headers:', Object.fromEntries(response.headers)); // Debug: Log headers

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse); // Debug: Log non-JSON response
        throw new Error(`Invalid response format: ${textResponse}`);
      }

      const data = await response.json();
      console.log('Response data:', data); // Debug: Log parsed response

      if (data.status === 200) {
        const order = {
          orderId,
          formData,
          cartItems,
          totalPrice,
          discountedTotal,
          vat,
          tax,
          finalTotal,
          trackingCode: data.consignment.tracking_code
        };

        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push(order);
        localStorage.setItem('orders', JSON.stringify(existingOrders));

        localStorage.removeItem('invoiceData');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('accessToken');

        alert(`Order confirmed! Tracking code: ${data.consignment.tracking_code}`);
        router.push('/');
      } else {
        throw new Error(data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      // More detailed error message
      alert(`Failed to confirm order: ${error.message}. Please check the console for more details.`);
    }
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
          <div id="invoice-section" className="w-full max-w-4xl bg-white/50 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Order Summary</h2>
                  <p className="text-gray-500 mt-1">Order ID: {orderId}</p>
                </div>
                <div className="bg-gradient-to-r from-gray-800/10 to-gray-900/10 p-3 rounded-full">
                  <FaShoppingBag className="text-gray-800 text-2xl" />
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Customer Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Name</span>
                      <span className="text-gray-800">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Email</span>
                      <span className="text-gray-800">{formData.email}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Phone</span>
                      <span className="text-gray-800">{formData.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Address</span>
                      <span className="text-gray-800 text-right">{formData.address}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Order Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Total Price</span>
                      <span className="text-gray-800">{totalPrice}৳</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Discounted Total</span>
                      <span className="text-gray-800">{discountedTotal}৳</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">VAT (10%)</span>
                      <span className="text-gray-800">{vat.toFixed(2)}৳</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Tax (10%)</span>
                      <span className="text-gray-800">{tax.toFixed(2)}৳</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Delivery Fee</span>
                      <span className="text-gray-800">90৳</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-xl font-bold text-gray-800">Final Total</span>
                      <span className="text-xl font-bold text-gray-800">{finalTotal.toFixed(2)}৳</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-white/90 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800">Items</h3>
                <div className="overflow-hidden rounded-lg border border-gray-100">
                  <div className="overflow-y-auto max-h-[400px]">
                    <table className="min-w-full divide-y divide-gray-100">
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {cartItems.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-800">{item.name}</div>
                                  <div className="text-sm text-gray-500">{item.sub_categoryName}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                              {typeof item.price === 'string' ? parseFloat(item.price.replace(/[,৳]/g, '')) : item.price}৳
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{item.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                              {typeof item.price === 'string' ? parseFloat(item.price.replace(/[,৳]/g, '')) * item.quantity : item.price * item.quantity}৳
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-100">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <FaShoppingBag />
                  <span>Continue Shopping</span>
                </button>
                {!storedToken && (
                  <button
                    onClick={handleConfirm}
                    className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:from-gray-900 hover:to-gray-950 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <FaCheckCircle />
                    <span>Confirm Order</span>
                  </button>
                )}
                <button
                  onClick={handlePrint}
                  className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <FaPrint />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Invoice;
