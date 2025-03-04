import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import CartContext from '@/context/CartContext';

const Modal = ({ isOpen, closeModal, products = [], saleEndTime: propSaleEndTime }) => {
  const router = useRouter();
  const modalRef = useRef();
  const { addItemToCart } = useContext(CartContext);
  
  // Use the prop saleEndTime if provided, otherwise create a default one
  const defaultSaleEndTime = useMemo(() => new Date(Date.now() + 2 * 60 * 60 * 1000), []); // 2 hours from now
  const effectiveSaleEndTime = propSaleEndTime || defaultSaleEndTime;
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(effectiveSaleEndTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(effectiveSaleEndTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [effectiveSaleEndTime]);

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
  }, [closeModal]);

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  if (!isOpen) return null;

  const handleAddToCart = (product) => {
    addItemToCart({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      stock: product.stock,
      total_price: parseFloat(product.price),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex justify-center items-center">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-6xl mx-4"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Flash Sale</h2>
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(products) && products.map((product, index) => (
            <div 
              key={product.id || index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {product.name}
                </h3>
                
                {/* Price */}
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                </div>

                {/* Stock Status */}
                {product.stock <= 5 && product.stock > 0 && (
                  <p className="text-sm text-orange-500 mb-2">
                    Only {product.stock} left!
                  </p>
                )}

                {/* Buttons */}
                <div className="flex gap-2">
                  <Link 
                    href={`/product/${product.id}`}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center text-sm"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                    title="Add to Cart"
                  >
                    <FaShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!Array.isArray(products) || products.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available in this sale.</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => router.push('/shop')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Shop More
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
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
