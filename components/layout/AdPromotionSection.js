import React from 'react';
import Link from 'next/link';

const AdPromotionSection = () => {
  return (
    <div className="bg-yellow-300 py-2">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Ad 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-1 sm:mb-0 sm:mr-1">
            <Link href="/special-offer" className="block p-1 sm:p-2 hover:bg-yellow-100 transition-colors duration-300">
              <div className="flex items-center">
                <div className="mr-1 sm:mr-2">
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
                  <h3 className="text-xs sm:text-sm font-semibold mb-1">Special Offer</h3>
                  <p className="text-xs sm:text-xs text-gray-700">Get 20% off</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Ad 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-1 sm:mb-0 sm:mx-1">
            <Link href="/new-arrivals" className="block p-1 sm:p-2 hover:bg-yellow-100 transition-colors duration-300">
              <div className="flex items-center">
                <div className="mr-1 sm:mr-2">
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
                  <h3 className="text-xs sm:text-sm font-semibold mb-1">New Arrivals</h3>
                  <p className="text-xs sm:text-xs text-gray-700">Check out latest</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Ad 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden sm:ml-1">
            <Link href="/free-shipping" className="block p-1 sm:p-2 hover:bg-yellow-100 transition-colors duration-300">
              <div className="flex items-center">
                <div className="mr-1 sm:mr-2">
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
                  <h3 className="text-xs sm:text-sm font-semibold mb-1">Free Shipping</h3>
                  <p className="text-xs sm:text-xs text-gray-700">Orders over $100</p>
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