import { useContext, useEffect, useState } from "react";
import CartContext from "@/context/CartContext";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";

const FloatingCart = () => {
  const { cart } = useContext(CartContext);
  const cartItems = cart?.cartItems;
  const [totalPrice, setTotalPrice] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Calculate total price whenever cart items change
  useEffect(() => {
    if (cartItems) {
      const finalAmount = cartItems.reduce((total, cartItem) => {
        let str = cartItem.price;

        // Convert to string if it's not already a string
        if (typeof str !== 'string') {
          console.warn(`Expected string but got ${typeof str}:`, str);
          str = String(str);
        }

        // Replace commas
        str = str.replace(/[,]/g, "");

        // Parse integer and calculate amount
        const amount = parseInt(str, 10) * cartItem.quantity;
        return total + amount;
      }, 0);

      setTotalPrice(finalAmount);
    }
  }, [cartItems]);

  const itemCount = cartItems ? cartItems.length : 0;

  // Check if the screen size is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMobile) {
    return null;
  }

  return (
    <div className="floating-cart">
      <Link href="/cart" passHref>
        <div className="icon-container">
          <MdShoppingCart className="w-6 h-6 text-white" />
        </div>
        <div className="text-container">
          <span className="item-count">{itemCount} ITEMS</span>
          <br />
          <span className="total-price">৳ {totalPrice}</span>
        </div>
      </Link>
    </div>
  );
};

export default FloatingCart;
