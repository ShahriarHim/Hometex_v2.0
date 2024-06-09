import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { RiShoppingBasketFill, RiExchangeFill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';
import ReactStars from 'react-rating-stars-component';
import WishComponent from './WishComponent/WishComponent';
import Swal from 'sweetalert2';

const ProductCard = ({ product, openModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [wishItems, setWishItems] = useState([]);

  const wishRef = useRef(null);
  const [redirect, setRedirect] = useState(false); // Stat

  const updateWishItems = (updatedWishItems) => {
    setWishItems(updatedWishItems);
  };

  const addToWishlist = (product) => {
    const wishItems = JSON.parse(localStorage.getItem('wishItems')) || [];
    const isProductInWishlist = wishItems.some((item) => item.id === product.id);

    if (!isProductInWishlist) {
      const updatedWishItems = [...wishItems, product];
      localStorage.setItem('wishItems', JSON.stringify(updatedWishItems));
      updateWishItems(updatedWishItems); // Update the wishItems state

      // Show SweetAlert notification
      Swal.fire({
        icon: 'success',
        title: 'Added to Wishlist',
        text: `${product.name} has been added to your wishlist!`,
      }).then(() => {
        // Redirect to the same page
        setRedirect(true);
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Already in Wishlist',
        text: `${product.name} is already in your wishlist!`,
      });
    }
  };

  useEffect(() => {
    const wishItems = JSON.parse(localStorage.getItem('wishItems')) || [];
    setWishItems(wishItems);
  }, []);


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };



  return (
    <div
      key={product.id}
      className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/Shop/product/${product.id}`}>
        <img
          src={product.primary_photo}
          alt={product.name}
          className="w-full object-fit rounded-t-lg"
        />
      </Link>
      <div
        className={`absolute top-10 right-0 p-2 bg-[#999] ${isHovered ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
      >
        <RiShoppingBasketFill
          size={34}
          color="#fff"
          className="bg-[#999] hover:bg-[#009688] m-2 p-2"
        />
        <MdFavorite
          size={34}
          color="#fff"
          className="bg-[#999] hover:bg-[#009688] m-2 p-2"
          onClick={() => addToWishlist(product)}
        />
        <RiExchangeFill
          size={34}
          color="#fff"
          className="bg-[#999] hover:bg-[#009688] m-2 p-2"
        />
      </div>
      <div className="p-4">
        <ReactStars
          count={5}
          size={24}
          value={5}
          edit={false}
          activeColor="#ffd700"
        />
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <div className="flex justify-between mt-2">
          <p className="text-gray-700">${product.price}</p>
          <p className="text-gray-700">{product.color}</p>
        </div>
      </div>
      <div className="p-4  border-t border-gray-200">
        <button
          onClick={() => openModal(product)}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          ADD TO CART
        </button>

      </div>
      <div className="p-4  border-t border-gray-200">
        <button
          // onClick={() => openModal(product)}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          OR MAKE AN OFFER
        </button>
      </div>
    </div >
  );
};

export default ProductCard;
