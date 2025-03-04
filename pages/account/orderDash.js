// pages/dashboard.js
import React, { useState } from 'react';
import Link from 'next/link';
import { FaClipboardList, FaShippingFast, FaUserCircle, FaQuestionCircle } from 'react-icons/fa';
import Sidebar from './components/Sidebar';

const OrderDash = () => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrackShipment = (e) => {
    e.preventDefault();
    // Implement tracking logic here
    // console.log('Tracking shipment:', trackingNumber);
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
                  <p className="text-lg">0</p>
                </div>
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="flex items-center">
                <FaShippingFast className="text-green-500 text-2xl mr-3" />
                <div>
                  <h3 className="font-semibold">In Transit</h3>
                  <p className="text-lg">0</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <div className="flex items-center">
                <FaUserCircle className="text-purple-500 text-2xl mr-3" />
                <div>
                  <h3 className="font-semibold">Delivered</h3>
                  <p className="text-lg">0</p>
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
              >
                Track Order
              </button>
            </form>
          </div>
        </div>

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