import React, { useState, useEffect, useContext } from 'react';
import { MdFavorite } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { FaHeart } from 'react-icons/fa';
import WishListContext from '@/context/WishListContext';

const WishComponent = ({
  wishRef,
  handleWishClick,
  isOpen,
}) => {
  const { wishlist, removeFromWishlist } = useContext(WishListContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wishRef.current && !wishRef.current.contains(event.target) && isOpen) {
        handleWishClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleWishClick]);

  // Function to handle "View Wishlist" button click
  const handleViewWishlistClick = () => {
    handleWishClick();
  };

  return (
    <div className="relative z-[9999]">
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-gray-900 opacity-50 transition-opacity duration-300"
            onClick={handleWishClick}
          />

          <div className="fixed inset-y-0 right-0 w-96 z-[9999] shadow-2xl bg-gradient-to-b from-gray-700 to-gray-900 text-white overflow-hidden animate-slide-in transform transition-all duration-300 ease-out">
            <div className="flex justify-between items-center p-4 border-b border-gray-600">
              <h2 className="text-xl font-semibold">Your Wishlist</h2>
              <button
                onClick={handleWishClick}
                className="text-gray-400 hover:text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
              <table className="w-full">
                <tbody>
                  {wishlist && wishlist.length > 0 ? (
                    wishlist.map((item) => (
                      <tr key={item.product_id} className="border-b border-gray-600 animate-fade-in-up">
                        <td className="py-4 pl-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                        </td>
                        <td className="px-2 py-4">{item.name}</td>
                        <td className="px-2 py-4">{item.quantity}</td>
                        <td className="px-2 py-4">BDT {item.price}</td>
                        <td className="px-2 py-4">
                          <button 
                            className="text-red-400 hover:text-red-600"
                            onClick={() => removeFromWishlist(item.product_id)}
                          >
                            <AiTwotoneDelete size={24} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key="empty-wishlist" className="border-b border-gray-600">
                      <td colSpan="5" className="text-center py-4">Your wishlist is empty.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-end space-x-4 p-4 bg-gray-800">
              <Link href="/account/Wishlist">
                <button onClick={handleViewWishlistClick} className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-200">
                  View Wishlist
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WishComponent;
