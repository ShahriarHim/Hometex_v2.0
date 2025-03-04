import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';

const Modal = ({ isOpen, closeModal, products }) => {
  const router = useRouter();
  const modalRef = useRef(); // Reference to the modal content
  const saleEndTime = useMemo(() => new Date(Date.now() + 2 * 60 * 60 * 1000), []); // 2 hours from now
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(saleEndTime));

  // Add demo products as fallback
  const demoProducts = [
    {
      name: "Luxury Bedding Set",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a74e?w=500&auto=format",
      price: "89.99",
      originalPrice: "179.99",
      discount: "50"
    },
    {
      name: "Premium Throw Pillow",
      image: "https://images.unsplash.com/photo-1584100936771-f5d8d2c627ae?w=500&auto=format",
      price: "24.99",
      originalPrice: "49.99",
      discount: "50"
    },
    {
      name: "Cotton Bath Towel Set",
      image: "https://images.unsplash.com/photo-1584100936775-68c4d4653fbd?w=500&auto=format",
      price: "34.99",
      originalPrice: "69.99",
      discount: "50"
    },
    {
      name: "Decorative Vase",
      image: "https://images.unsplash.com/photo-1584100936778-62e31e7bd92d?w=500&auto=format",
      price: "44.99",
      originalPrice: "89.99",
      discount: "50"
    },
    {
      name: "Table Runner",
      image: "https://images.unsplash.com/photo-1584100936780-91e5a6c02d3f?w=500&auto=format",
      price: "19.99",
      originalPrice: "39.99",
      discount: "50"
    },
    {
      name: "Wall Art Canvas",
      image: "https://images.unsplash.com/photo-1584100936782-9e92b3d7dbc3?w=500&auto=format",
      price: "59.99",
      originalPrice: "119.99",
      discount: "50"
    }
  ];

  // Use passed products or fall back to demo products
  const displayProducts = products?.length > 0 ? products : demoProducts;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(saleEndTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [saleEndTime]);

  const saveModalState = (state) => {
    const expiryTime = new Date().getTime() + 5 * 60 * 1000; // 5 minutes from now
    localStorage.setItem('modalState', JSON.stringify({ isOpen: state, expiryTime, manuallyClosed: false }));
  };
  
  const getModalState = () => {
    const savedState = localStorage.getItem('modalState');
    if (savedState) {
      const { isOpen, expiryTime, manuallyClosed } = JSON.parse(savedState);
      if (!manuallyClosed && new Date().getTime() < expiryTime) {
        return isOpen;
      }
    }
    return false;
  };
  

  useEffect(() => {
    const savedIsOpen = getModalState();
    if (savedIsOpen) {
      closeModal();
    }
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(saleEndTime));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    saveModalState(isOpen);
  }, [isOpen]);

  // Close modal on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  if (!isOpen) return null;

  const handleShopMoreClick = () => {
    closeModal();
    router.push('/shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex justify-center items-center">
      <div 
        className="bg-white dark:bg-gray-800 p-4 md:p-8 max-w-5xl mx-auto rounded-lg shadow-lg" 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className="text-2xl font-semibold text-gray-800 dark:text-white">Flash Sale</h2>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <span className="text-md text-gray-500 dark:text-gray-400">On Sale Now!</span>
            <span className="ml-4 text-md font-semibold text-gray-700 dark:text-gray-300">Ending in {formatTime(timeLeft)}</span>
          </div>
          <button
            onClick={handleShopMoreClick}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-300"
          >
            Shop More
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {displayProducts.map((product, index) => (
            <div key={index} className="border dark:border-gray-700 rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover object-center" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">${product.price}</p>
                <p className="text-md text-gray-500 dark:text-gray-400 line-through">${product.originalPrice}</p>
                <p className="text-md text-green-600 dark:text-green-400">{product.discount}% off</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

function calculateTimeLeft(endTime) {
  const difference = +new Date(endTime) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return timeLeft;
}

function formatTime(timeLeft) {
  return `${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;
}

export default Modal;
