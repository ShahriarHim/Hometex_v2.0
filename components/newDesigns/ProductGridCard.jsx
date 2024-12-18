import React from 'react';
import Link from 'next/link';
import { FaHeart, FaSync, FaSearch, FaShoppingCart } from 'react-icons/fa';

const ProductGridCard = ({ product }) => {
  return (
    <div className="product-card relative bg-white p-4 rounded-lg transition-all hover:shadow-lg">
      {/* Product Image */}
      <div className="relative aspect-square mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="text-lg font-medium mb-2 hover:text-purple-600">
          <Link href={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>

        {/* Rating Stars */}
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, index) => (
            <span key={index} className={`text-sm ${index < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-purple-600">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-2">
          <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
            <FaShoppingCart className="text-sm" />
            <span>ADD TO CART</span>
          </button>
          
          <div className="flex gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-purple-600 hover:text-white transition-colors">
              <FaHeart className="text-sm" />
            </button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-purple-600 hover:text-white transition-colors">
              <FaSync className="text-sm" />
            </button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-purple-600 hover:text-white transition-colors">
              <FaSearch className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGridCard; 