import React from 'react';
import Link from 'next/link';

const AdPromotionSection = () => {
  return (
    <div className="bg-purple-900 rounded-lg py-1">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile View */}
        <div className="block sm:hidden text-center">
          <p className="text-sm font-semibold">Special offer is going on!</p>
        </div>
        
        {/* Desktop View */}
        <div className="hidden sm:flex flex-col sm:flex-row items-center justify-between space-y-1 sm:space-y-0 sm:space-x-5">
          {/* Ad 1 */}
          <div className="bg-blue-400 rounded-lg shadow-md overflow-hidden flex-1">
            <Link href="/special-offer" className="block p-1 hover:bg-blue-500 transition-colors duration-300">
              <div className="flex items-center">
                <div className="mr-2">
                  <svg
                    className="h-6 w-6 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm text-red font-semibold mb-1">Special Offer</h3>
                  <p className="text-xs text-yellow-300">Get 20% off</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Ad 2 */}
          <div className="bg-blue-400 rounded-lg shadow-md overflow-hidden flex-1">
            <Link href="/new-arrivals" className="block p-1 hover:bg-blue-500 transition-colors duration-300">
              <div className="flex items-center">
                <div className="mr-2">
                  <svg
                    className="h-6 w-6 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">New Arrivals</h3>
                  <p className="text-xs text-yellow-300">Check out latest</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Ad 3 */}
          <div className="bg-blue-400 rounded-lg shadow-md overflow-hidden flex-1">
            <Link href="/free-shipping" className="block p-1 hover:bg-blue-500 transition-colors duration-300">
              <div className="flex items-center">
                <div className="mr-2">
                  <svg
                    className="h-6 w-6 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 1h10l8.594 18L21 12.081V3a1 1 0 00-1-1h-3a1 1 0 00-1 1v9.819"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Free Shipping</h3>
                  <p className="text-xs text-yellow-300">Orders over ৳100</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPromotionSection;
