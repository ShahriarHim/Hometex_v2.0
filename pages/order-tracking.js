import React from 'react';

const orderStatuses = [
  { id: 1, name: 'Order Placed', text: 'We have received your order.', color: 'bg-green-600', img: '/images/icons/order-placed.png' },
  { id: 2, name: 'Order Confirmed', text: 'Your order has been confirmed.', color: 'bg-red-500', img: '/images/icons/order-confirmed.png' },
  { id: 3, name: 'Order Processed', text: 'We are preparing your order.', color: 'bg-red-500', img: '/images/icons/order-processed.png' },
  { id: 4, name: 'Ready to Pick Up', text: 'Your order is ready for pickup.', color: 'bg-red-500', img: '/images/icons/ready-to-pickup.png' }, // Changed color for visual diversity
  { id: 5, name: 'Delivered', text: 'Order Delivered.', color: 'bg-red-500', img: '/images/icons/delivered.png' }, // Darker green for delivered status
];

const OrderTracking = () => {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b pb-8 shadow-sm px-5">
        <div className="text-lg font-semibold mb-4 sm:mb-0">Estimated Time: <span className="text-gray-600">45 mins</span></div>
        <div className="text-lg font-semibold">Order Number: <span className="text-gray-600">#123456</span></div>
      </div>
      <div className="relative border-l-2 border-gray-200">
        {orderStatuses.map((status, index) => (
          <div key={status.id} className={`ml-4 pb-8 ${index === 0 ? 'pt-0' : 'pt-8'}`}>
            <div className={`absolute -left-3 mt-0.5 ${status.color} rounded-full w-6 h-6 flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-110`}>
              {/* Icons can be added here if desired */}
            </div>
            <div className='flex gap-8 items-start sm:items-center'>
                <img src={status.img} alt={status.name} className='h-16 w-16 sm:h-24 sm:w-24 object-cover rounded-full shadow-lg'/>
                <div>
                    <h4 className="text-lg font-semibold">{status.name}</h4>
                    <p className='text-sm sm:text-base'>{status.text}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
