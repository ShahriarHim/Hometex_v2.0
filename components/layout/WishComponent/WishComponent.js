import React, { useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { FaHeart} from 'react-icons/fa';


const WishComponent = (props) => {
  const { wishRef, handleWishClick, wishItems, isWishOpen, removeFromWishlist } = props;
  const [redirect, setRedirect] = useState(false); // State to handle redirection

  const removeFromWishlistHandler = (productId) => {
    console.log('Removing from wishlist:', productId);
    removeFromWishlist(productId);
  };

 
// Handle redirection to wishlist page
const handleViewWishlist = () => {
  router.push('/account/Wishlist');
};

  // Redirect to the wishlist page
  if (redirect) {
    return <Link href="/wishlist" />;
  }

  return (
    <div className="relative" ref={wishRef} >
      <div className="relative">
        <button onClick={handleWishClick} type="button">
          <div className="px-2 flex flex-col items-center text-center">
          <FaHeart className="h-6 w-6 text-blue-600" aria-hidden="true" />
          <span className="text-sm mt-2 font-semibold text-gray-800">Wishlist</span>
          </div>
        </button>
        {wishItems?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 rounded-full text-white px-2 py-1 text-xs flex items-center justify-center animate-pulse">
            {wishItems.length}
          </span>
        )}
      </div>
      {isWishOpen && (
        <div className="fixed inset-y-0 right-0 w-96 z-50 shadow-xl bg-gradient-to-b from-gray-700 to-gray-900 text-white overflow-hidden transform translate-x-0 transition-transform ease-out duration-300">
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
          <div className="overflow-y-auto max-h-60" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <table className="w-full">
              <tbody>
                {wishItems?.map((wishItem) => (
                  <tr key={wishItem.id} className="border-b border-gray-600">
                    <td className="py-4 pl-4">
                      <img
                        src={wishItem.primary_photo}
                        alt={wishItem.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />
                    </td>
                    <td className="px-2 py-4">{wishItem.name}</td>
                    <td className="px-2 py-4">BDT {wishItem.price}</td>
                    <td className="px-2 py-4">
                      <button
                        className="text-red-400 hover:text-red-600"
                        onClick={() => removeFromWishlistHandler(wishItem.id)}
                      >
                        <AiTwotoneDelete size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-end space-x-4 p-4 bg-gray-800">
            <Link href="/account/Wishlist">
              <button  onClick={handleViewWishlist} className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-200">
                View Wishlist
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishComponent;
