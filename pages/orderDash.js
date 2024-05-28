// pages/dashboard.js
import React, { useState } from 'react';
import Link from 'next/link';
import { FaClipboardList, FaShippingFast, FaUserCircle, FaQuestionCircle } from 'react-icons/fa';

const OrderDash = () => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrackShipment = (e) => {
    e.preventDefault();
    // Implement tracking logic here
    console.log('Tracking shipment:', trackingNumber);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-indigo-900 text-gray-100 px-4 py-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Customer Dashboard</h2>
        </div>
        <nav>
          <ul>
            <li className="mb-2">
              <Link href="/orderDash" className="hover:text-white flex items-center">
                <FaClipboardList className="mr-2" />
                Overview
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/orderDash/orders" className="hover:text-white flex items-center">
                <FaShippingFast className="mr-2" />
                Orders
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/orderDash/account" className="hover:text-white flex items-center">
                <FaUserCircle className="mr-2" />
                Account Settings
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/orderDash/support" className="hover:text-white flex items-center">
                <FaQuestionCircle className="mr-2" />
                Support
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          {/* Add your overview content here */}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Track Your Shipments</h3>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <form onSubmit={handleTrackShipment} className="flex items-center">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className="flex-1 border-2 border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Link href="/order-tracking">
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-r-md">Track</button>
              </Link>
            </form>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Support</h3>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <span className="bg-red-500 text-white rounded-full px-3 py-1 mr-2">
              <i className="fas fa-phone"></i>
            </span>
            <span>Support Requests</span>
            <span className="ml-2">You don't have support requests.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDash;