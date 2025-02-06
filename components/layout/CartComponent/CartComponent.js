// CartComponent.js
import React, { useEffect } from 'react';
import { HiShoppingCart } from 'react-icons/hi';
import { AiTwotoneDelete } from 'react-icons/ai';
import Link from 'next/link';
// import { FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';
import { redirect } from 'next/dist/server/api-utils';

const CartComponent = ({
  cartRef,
  handleCartClick,
  cartItems,
  isOpen,
  cart,
  deleteItemFromCart,
  totalPrice,
  handleCheckout
}) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target) && isOpen) {
        handleCartClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleCartClick]);

   // Function to handle checkout
   const handleCheckoutClick = () => {
    // Call the handleCheckout function
    redirect('/Checkout');
    // Close the cart popup
    handleCartClick();
  };


  return (
    <div className="relative z-[9999]">
      {isOpen && (
        <>
          {/* Solid overlay instead of transparent */}
          <div 
            className="fixed inset-0 bg-gray-900 opacity-50 transition-opacity duration-300"
            onClick={handleCartClick}
          />
          
          {/* Cart Panel with enhanced animation */}
          <div className="fixed inset-y-0 right-0 w-96 z-[9999] shadow-2xl bg-gradient-to-b from-gray-700 to-gray-900 text-white overflow-hidden
            animate-slide-in transform transition-all duration-300 ease-out">
            <div className="flex justify-between items-center p-4 border-b border-gray-600
              animate-fade-in-down">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button
                onClick={handleCartClick}
                className="text-gray-400 hover:text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-500
                  transition-all duration-200 hover:rotate-90 transform"
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

            {/* Cart Items with stagger animation */}
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
              <table className="w-full">
                <tbody>
                  {cart?.cartItems?.map((cartItem, index) => (
                    <tr key={cartItem.product_id} 
                      className="border-b border-gray-600 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="py-4 pl-4">
                        <img
                          src={cartItem.image}
                          alt={cartItem.name}
                          className="w-20 h-20 object-cover rounded-lg shadow-md"
                        />
                      </td>
                      <td className="px-2 py-4">{cartItem.name}</td>
                      <td className="px-2 py-4">{cartItem.quantity}</td>
                      <td className="px-2 py-4">BDT {cartItem.price}</td>
                      <td className="px-2 py-4">
                        <button
                          className="text-red-400 hover:text-red-600"
                          onClick={() => deleteItemFromCart(cartItem.product_id)}
                        >
                          <AiTwotoneDelete size={24} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom section with slide-up animation */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 animate-slide-up">
              <div className="p-4 text-right border-t border-gray-600">
                <div className="text-xl font-semibold mb-4">
                  Total: BDT {totalPrice}
                </div>
                <div className="flex justify-end space-x-4">
                  <Link href="/cart">
                    <button className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded
                      transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                      View Cart
                    </button>
                  </Link>
                  <button
                    onClick={handleCheckoutClick}
                    className="inline-block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded
                      transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
