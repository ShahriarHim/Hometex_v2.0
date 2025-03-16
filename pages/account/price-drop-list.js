import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import Sidebar from './components/Sidebar';
import Constants from '@/ults/Constant';
import Link from 'next/link';
import { FaBell } from 'react-icons/fa';

const PriceDropList = () => {
  const [priceDrops, setPriceDrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPriceDrops = async () => {
      try {
        const token = getCookie('home_text_token');
        if (!token) {
          setError('Please login to view your price drop notifications');
          setLoading(false);
          return;
        }

        const response = await fetch(`${Constants.BASE_URL}/api/product/price-drop-list`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        
        if (data.success) {
          setPriceDrops(data.data);
        } else {
          setError(data.message || 'Failed to fetch price drop list');
        }
      } catch (err) {
        setError('Failed to fetch price drop list');
      } finally {
        setLoading(false);
      }
    };

    fetchPriceDrops();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md">
            <div className="card">
              <div className="card-header bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-lg">
                <h2 className="text-2xl font-bold text-white mb-2">Price Drop Notifications</h2>
                <p className="text-gray-100 text-sm">Get notified when prices drop on your favorite items</p>
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
                ) : priceDrops.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <FaBell className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No price drop notifications found</p>
                    <Link href="/" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notification Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {priceDrops.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="font-medium text-gray-900">
                                  {item.product ? item.product.name : 'Product Unavailable'}
                                </span>
                                <span className="text-xs text-gray-500">
                                  SKU: {item.product ? item.product.sku : 'N/A'}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.is_notification ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {item.is_notification ? 'Notified' : 'Pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                              {new Date(item.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                              {new Date(item.updated_at).toLocaleDateString()}
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

export default PriceDropList; 