import CartContext from '@/context/CartContext';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { FaShoppingCart, FaTimes, FaTrashAlt } from 'react-icons/fa';
import Constants from "../../../ults/Constant";

const PurchaseHistory = () => {
    const { cart, deleteItemFromCart } = useContext(CartContext);
    const [totalPrice,setTotalPrice] = useState(0)
    const cartItems = cart?.cartItems;

    // Only render the component if there are items in the cart
    if (!cartItems || cartItems.length === 0) {
        return null;
    }

    const [isStickyOpen, setIsStickyOpen] = useState(false);
    const ref = useRef(null);

    const handleStickyCartClick = () => {
        setIsStickyOpen(prevIsOpen => !prevIsOpen);
    };

    const handleOutsideClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsStickyOpen(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setIsStickyOpen(false);
        }
    };

    useEffect(() => {
        if (isStickyOpen) {
            window.addEventListener('mousedown', handleOutsideClick);
            window.addEventListener('keydown', handleKeyDown);
        } else {
            window.removeEventListener('mousedown', handleOutsideClick);
            window.removeEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('mousedown', handleOutsideClick);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isStickyOpen]);


    useEffect(() => {
      if (cartItems) {
        const finalAmount = cartItems.reduce((total, cartItem) => {
          let str = cartItem.price;
          str = str.replace(/[,৳]/g, "");
          const amount = parseInt(str) * cartItem.quantity;
          return total + amount;
        }, 0);
        setTotalPrice(finalAmount);
      }
    }, [cart?.cartItems]);

    const lastItem = cartItems?.[cartItems.length - 1];

    return (
      <div className="fixed bottom-0 left-0 m-4 z-50">
        <a
          onClick={handleStickyCartClick}
          className={`purchase-history-trigger flex items-center w-[300px] h-12 p-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 ease-in-out ${
            isStickyOpen
              ? "bg-teal-600 text-white"
              : "bg-teal-200 text-teal-800"
          }`}
          data-target="popup"
          data-popup="#popup-mycart"
        >
          {lastItem ? (
            <>
              <img
                src={lastItem.image}
                alt={lastItem.name}
                className="product-thumbnail w-8 h-8 object-cover rounded mr-2"
              />
              <span className="product-details">
                {lastItem.name}, Quantity: {lastItem.quantity}, Total Price:{" "}
                {lastItem.price}
              </span>
            </>
          ) : (
            <span className="text-xl">
              <FaShoppingCart />
            </span>
          )}
        </a>

        {isStickyOpen && (
          <div
            className="fixed bottom-0 left-0 w-72 bg-white rounded shadow-lg"
            ref={ref}
          >
            <div className="bg-[#009688] hover:bg-[#19574c] text-white mb-4 p-2 rounded-t">
              <div className="flex justify-between items-center mx-2">
                <h2 className="text-lg font-medium">
                  <FaShoppingCart className="mr-2" /> Purchase History
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={handleStickyCartClick}
                >
                  <FaTimes className="text-white" />
                </button>
              </div>
            </div>
            <div className="border m-2 p-2 bg-[#8080803d]">
              There are{" "}
              <span className="text-[#991515]">
                {" "}
                {cartItems?.length || 0} item(s)
              </span>{" "}
              in your cart
            </div>
            <div className="m-2 p-2">
              <table className="w-full">
                <tbody>
                  {cart?.cartItems?.map((cartItem) => (
                    <tr key={cartItem.product_id}>
                      <td>
                        <img
                          src={cartItem.image}
                          alt={cartItem.name}
                          width={50}
                          height={50}
                        />
                      </td>
                      <td>{cartItem.name}</td>
                      <td>{cartItem.quantity} </td>
                      <td className="text-[#ff0000]">TK {cartItem.price} </td>
                      <td>
                        <FaTrashAlt
                          onClick={() =>
                            deleteItemFromCart(cartItem?.product_id)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="w-full table-fixed table-striped text-center">
                <tbody>
                  <tr>
                    <td className="w-1/2 py-2 text-left font-medium">
                      Sub-Total
                    </td>
                    <td className="w-1/2 py-2 text-right font-medium">
                      TK {totalPrice}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/2 py-2 text-left font-medium">Total</td>
                    <td className="w-1/2 py-2 text-right font-medium">
                      TK {totalPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center mt-2 mb-2">
              <Link
                href="/cart"
                className="inline-block px-4 py-1 mx-1 font-medium text-white bg-[#000] hover:bg-[#009688]"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                className="inline-block px-4 py-1 mx-1 font-medium text-white bg-[#009688] hover:bg-[#000]"
              >
                Checkout
              </Link>
            </p>
          </div>
        )}
      </div>
    );
};

export default PurchaseHistory;
