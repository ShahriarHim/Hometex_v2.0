import React from 'react';

const DisclaimerModal = ({ isOpen, onClose, onAccept, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
        <p className="mb-4">
          Each product on Hometex Bangladesh website is a representation of the
          actual product. We attempt to display product images as accurately as
          possible.
        </p>
        <p className="mb-4">
          However, due to lighting and different devices you might be using, the
          color in the image may vary slightly for the actual color of the
          product.
        </p>
        <p className="mb-4">
          Please review all the images of the product you desire BEFORE placing
          your order. If you have any questions about any of our products please
          feel free to contact us by clicking the contact us link on our
          website.
        </p>
        <p className="mb-4">
          Customer satisfaction is our number one priority, and we will gladly
          provide more information and clarifications because, we want you to
          feel confident about your purchase with us at Hometex Bangladesh.
        </p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:shadow-outline-gray"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
            onClick={onAccept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;