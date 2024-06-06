// ProductCard.js
import React from 'react';
import Link from 'next/link';
import { RiShoppingBasketFill, RiExchangeFill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';
import ReactStars from 'react-rating-stars-component';

const ProductCard = ({ product, openModal, addToWishlist }) => {
  return (
    <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 relative">
      <Link href={`/Shop/product/${product.id}`}>
        <img
          src={product.primary_photo}
          alt={product.name}
          className="w-full object-fit rounded-t-lg"
        />
      </Link>
      <div className="absolute top-10 right-0 p-2 opacity-0 hover:opacity-100 transition duration-300 bg-[#999]">
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
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => openModal(product)}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
