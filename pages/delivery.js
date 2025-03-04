import { useState } from 'react';
import Head from 'next/head';

const CheckIcon = () => (
  <svg className="w-6 h-6 text-blue-600 mx-auto transform transition-transform duration-300 hover:scale-110" 
    fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-6 h-6 text-red-600 mx-auto transform transition-transform duration-300 hover:scale-110" 
    fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
  </svg>
);

const DeliveryPage = () => {
  const [zipCode, setZipCode] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  const deliveryFeatures = [
    { name: 'Room-of-Choice delivery', notes: { indoor: 'inside your front door', outdoor: 'outside your doorstep' } },
    { name: 'Full assembly of all items', notes: {} },
    { name: 'Removal of boxes and debris', notes: {} },
    { name: 'Same Day Delivery', notes: {} },
    { name: 'Removal of old mattress with purchase of new mattress', notes: {} },
    { name: '3-hour window provided before delivery', notes: {} }
  ];

  const deliveryOptions = [
    {
      id: 'full-service',
      title: 'Full-Service Delivery',
      description: 'Adult 18+ Required*',
      price: '$119**',
      priceNote: 'One flat rate for unlimited items',
      features: [true, true, true, true, true, true],
      videoText: 'How Full-Service Delivery Works',
      videoUrl: '#full-service-video'
    },
    {
      id: 'indoor',
      title: 'Indoor Drop Off',
      description: 'Adult 18+ Required*',
      price: '$39**',
      priceNote: 'delivered inside your front door',
      features: [false, false, false, false, true, true],
      videoText: 'How Indoor Drop Off Works',
      videoUrl: '#indoor-video'
    },
    {
      id: 'outdoor',
      title: 'Outdoor Drop Off',
      description: 'No Presence Required',
      price: 'Free**',
      priceNote: 'delivered outside your doorstep',
      features: [false, false, false, false, false, false],
      videoText: 'How Outdoor Drop Off Works',
      videoUrl: '#outdoor-video'
    }
  ];

  const handleZipCodeSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (zipCode.length !== 5) {
      setError('Please enter a valid 5-digit ZIP code');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setShowOptions(true);
    }, 800);
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleVideoClick = (videoId) => {
    setActiveVideo(videoId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Delivery Options | Living Spaces</title>
      </Head>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Delivery Times & Fees
          </h1>
          
          <form onSubmit={handleZipCodeSubmit} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter ZIP Code"
                className={`w-full p-4 text-lg border-2 rounded-lg transition-colors duration-300 
                  ${error ? 'border-red-500' : 'border-gray-300'} 
                  ${showOptions ? 'border-green-500' : ''}`}
                value={zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5));
                  setError('');
                }}
                pattern="[0-9]{5}"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="absolute right-2 top-2 px-6 py-2 bg-red-600 text-white rounded-md
                  transition-all duration-300 hover:bg-red-700 disabled:opacity-75 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Checking...' : 'View Options'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>

        <div className="space-y-8">
          <h2 className="text-xl font-semibold">Delivery Options at a Glance</h2>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-gray-500 font-medium border-b">Fees</th>
                  {deliveryOptions.map((option) => (
                    <th 
                      key={option.id}
                      className={`px-6 py-4 text-center border-b transition-colors duration-300
                        ${selectedOption === option.id ? 'bg-blue-50' : ''}`}
                      onClick={() => handleOptionSelect(option.id)}
                    >
                      <div className="flex flex-col items-center space-y-2 cursor-pointer">
                        <div className="font-semibold text-lg">{option.title}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                        <div className="text-2xl font-bold mt-2">{option.price}</div>
                        <div className="text-xs text-gray-500 italic">{option.priceNote}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deliveryFeatures.map((feature, idx) => (
                  <tr 
                    key={idx}
                    className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-300`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 border-b">{feature.name}</td>
                    {deliveryOptions.map((option) => (
                      <td 
                        key={`${option.id}-${idx}`}
                        className={`px-6 py-4 text-center border-b ${selectedOption === option.id ? 'bg-blue-50' : ''}`}
                      >
                        {option.features[idx] ? <CheckIcon /> : <XIcon />}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="px-6 py-4"></td>
                  {deliveryOptions.map((option) => (
                    <td key={option.id} className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleVideoClick(option.id)}
                        className="group inline-flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-105"
                      >
                        <PlayIcon />
                        <span className="ml-2 text-sm">Click Play To Watch + Learn</span>
                      </button>
                      <div className="text-xs text-gray-600 mt-1">{option.videoText}</div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-sm text-gray-500 space-y-2">
            <p>* Adult signature (18+) required for delivery</p>
            <p>** Prices may vary based on delivery location and date</p>
          </div>
        </div>
      </main>

      {activeVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setActiveVideo(null)}
        >
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {deliveryOptions.find(opt => opt.id === activeVideo)?.videoText}
              </h3>
              <button 
                onClick={() => setActiveVideo(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg">
              <p className="flex items-center justify-center h-full">Video Player Placeholder</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPage; 