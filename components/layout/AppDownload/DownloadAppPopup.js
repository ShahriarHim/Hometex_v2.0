import React, { useState } from 'react';

const DownloadAppPopup = ({ isOpen, onClose }) => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send SMS with app download link
    // console.log(`Sending app download link to ${mobileNumber}`);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-3xl flex">
        <div className="mr-6">
          <img src="/phone-mockup.png" alt="Phone Mockup" className="h-64" />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">Get hometexbd App</h2>
          <p className="mb-4 text-center">
            Search for products/services and connect with verified sellers on the go!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 w-full">
              <input
                type="tel"
                placeholder="+91 Enter Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-teal-600"
            >
              Send me the link
            </button>
          </form>
          <div className="flex justify-center">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <img src="/appstore.png" alt="App Store" className="h-10" />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/googleplay.png" alt="Google Play" className="h-10" />
            </a>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadAppPopup;