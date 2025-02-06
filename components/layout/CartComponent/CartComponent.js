// CartComponent.js
import React from 'react';
import { HiShoppingCart } from 'react-icons/hi';
import { AiTwotoneDelete } from 'react-icons/ai';
import Link from 'next/link';
import { FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';
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
   // Function to handle checkout
   const handleCheckoutClick = () => {
    // Call the handleCheckout function
    redirect('/Checkout');
    // Close the cart popup
    handleCartClick();
  };


  return (
    <div className="relative" ref={cartRef} style={{ zIndex: 21 }}>
    
      <div className="relative">
        <button onClick={handleCartClick} type="button">
          <div className="px-2 flex flex-col items-center text-center">
            <FaShoppingCart className="h-6 w-6 text-blue-600" aria-hidden="true" />
            <span className="text-sm mt-2 font-semibold text-gray-800">Cart</span>
          </div>
        </button>
        {cartItems?.length > 0 && (
          <span className="absolute -top-3 -right-3 bg-red-600 rounded-full text-white px-2 py-1 text-xs flex items-center justify-center animate-pulse">
            {cartItems.length}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-96 z-50 shadow-xl bg-gradient-to-b from-gray-700 to-gray-900 text-white overflow-hidden transform translate-x-0 transition-transform ease-out duration-300" style={{ zIndex: 10000 }}>
          <div className="flex justify-between items-center p-4 border-b border-gray-600">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button
              onClick={handleCartClick} // Assuming this closes the cart
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
          <div className="overflow-y-auto max-h-60" style={{ maxHeight: "calc(100vh - 200px)" }}>
            <table className="w-full">
              <tbody>
                {cart?.cartItems?.map((cartItem) => (
                  <tr key={cartItem.product_id} className="border-b border-gray-600">
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
          <div className="relative m-10 ml-40">
            Total: BDT {totalPrice}
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-end space-x-4 p-4 bg-gray-800">
            <Link href="/cart">
              <button className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-200">
                View Cart
              </button>
            </Link>
            <button
              onClick={handleCheckoutClick}
              className="inline-block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors duration-200"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
