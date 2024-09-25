import React from 'react';

const ThreeLayer = () => {
  return (
    <div className="bg-gray-100 py-2">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    

      <div className="block sm:hidden grid grid-cols-3 gap-4">
        {/* Column 1: Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-1">Details</h3>
         
          </div>
        </div>

        {/* Column 2: Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-1">Questions</h3>
          
          </div>
        </div>

        {/* Column 3: Questions & Reviews */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-1"> Reviews</h3>
           </div>
        </div>
      </div>
    </div>
  </div>
);
 
};

export default ThreeLayer;
