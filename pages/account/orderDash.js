// pages/dashboard.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaClipboardList, FaShippingFast, FaUserCircle, FaQuestionCircle } from 'react-icons/fa';
import Sidebar from './components/Sidebar';

const OrderDash = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [balance, setBalance] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch current balance
  // const fetchBalance = async () => {
  //   try {
  //     const response = await fetch('https://portal.packzy.com/api/v1/get_balance', {
  //       headers: {
  //         'Api-Key': process.env.NEXT_PUBLIC_API_KEY,
  //         'Secret-Key': process.env.NEXT_PUBLIC_SECRET_KEY
  //       }
  //     });
  //     const data = await response.json();
  //     if (data.status === 200) {
  //       setBalance(data.current_balance);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching balance:', error);
  //   }
  // };

  // Track order status
  const handleTrackShipment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrderStatus(null);

    try {
      // Try tracking by tracking code first
      const response = await fetch(`https://portal.packzy.com/api/v1/status_by_trackingcode/${trackingNumber}`, {
        headers: {
          'Api-Key': process.env.NEXT_PUBLIC_API_KEY,
          'Secret-Key': process.env.NEXT_PUBLIC_SECRET_KEY
        }
      });

      const data = await response.json();
      if (data.status === 200) {
        setOrderStatus(data.delivery_status);
      } else {
        setError('Order not found');
      }
    } catch (error) {
      setError('Failed to track order');
      console.error('Error tracking shipment:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load orders from localStorage and track their status
  useEffect(() => {
    const loadOrders = async () => {
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(storedOrders);

      // Track status for each order
      const updatedOrders = await Promise.all(
        storedOrders.map(async (order) => {
          try {
            const response = await fetch(`https://portal.packzy.com/api/v1/status_by_trackingcode/${order.trackingCode}`, {
              headers: {
                'Api-Key': process.env.NEXT_PUBLIC_API_KEY,
                'Secret-Key': process.env.NEXT_PUBLIC_SECRET_KEY
              }
            });
            const data = await response.json();
            return { ...order, status: data.delivery_status };
          } catch (error) {
            return { ...order, status: 'unknown' };
          }
        })
      );

      setOrders(updatedOrders);
    };

    // fetchBalance();
    loadOrders();
  }, []);

  // Calculate order statistics
  const stats = {
    total: orders.length,
    inTransit: orders.filter(order => ['pending', 'in_review', 'hold'].includes(order.status)).length,
    delivered: orders.filter(order => ['delivered', 'partial_delivered'].includes(order.status)).length
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Order Tracking Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <div className="flex items-center">
                <FaClipboardList className="text-blue-500 text-2xl mr-3" />
                <div>
                  <h3 className="font-semibold">Total Orders</h3>
                  <p className="text-lg">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="flex items-center">
                <FaShippingFast className="text-green-500 text-2xl mr-3" />
                <div>
                  <h3 className="font-semibold">In Transit</h3>
                  <p className="text-lg">{stats.inTransit}</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <div className="flex items-center">
                <FaUserCircle className="text-purple-500 text-2xl mr-3" />
                <div>
                  <h3 className="font-semibold">Delivered</h3>
                  <p className="text-lg">{stats.delivered}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Track Your Shipment</h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleTrackShipment} className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className="flex-1 border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              />
              <button 
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-md transition-colors duration-200 w-full md:w-auto"
                disabled={loading}
              >
                {loading ? 'Tracking...' : 'Track Order'}
              </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {orderStatus && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h4 className="font-semibold">Order Status:</h4>
                <p className="capitalize">{orderStatus.replace(/_/g, ' ')}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Tracking Code</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{order.orderId}</td>
                    <td className="px-4 py-2">{order.trackingCode}</td>
                    <td className="px-4 py-2 capitalize">{(order.status || 'pending').replace(/_/g, ' ')}</td>
                    <td className="px-4 py-2">{order.finalTotal}৳</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Current Balance</h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-2xl font-bold">{balance}৳</p>
          </div>
        </div> */}

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Need Help?</h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <FaQuestionCircle className="text-indigo-500 text-2xl mr-3" />
              <div>
                <h4 className="font-semibold">Support Center</h4>
                <p className="text-gray-600">Having trouble with your order? Our support team is here to help.</p>
                <button className="mt-3 text-indigo-500 hover:text-indigo-600 font-semibold">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDash;