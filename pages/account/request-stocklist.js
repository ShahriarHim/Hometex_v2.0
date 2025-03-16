import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import Sidebar from './components/Sidebar';
import Constants from '@/ults/Constant';
import Link from 'next/link';
import { FaBoxOpen } from 'react-icons/fa';

const RequestStockList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestockRequests = async () => {
      try {
        const token = getCookie('home_text_token');
        if (!token) {
          setError('Please login to view your restock requests');
          setLoading(false);
          return;
        }

        const response = await fetch(`${Constants.BASE_URL}/api/product/restock-request-list`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        
        if (data.success) {
          setRequests(data.data);
        } else {
          setError(data.message || 'Failed to fetch restock requests');
        }
      } catch (err) {
        setError('Failed to fetch restock requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRestockRequests();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md">
            <div className="card">
              <div className="card-header bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-lg">
                <h2 className="text-2xl font-bold text-white mb-2">Restock Requests</h2>
                <p className="text-gray-100 text-sm">Track your product restock requests</p>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-center py-4 bg-red-50 rounded-lg">
                    {error}
                  </div>
                ) : requests.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <FaBoxOpen className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No restock requests found</p>
                    <Link href="/" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {requests.map((request) => (
                          <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap font-medium">#{request.product_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                              {request.quentity || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                {request.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                              {new Date(request.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                              {new Date(request.updated_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestStockList; 