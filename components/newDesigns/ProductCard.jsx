import React, { useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { RiShoppingBasketFill, RiExchangeFill } from 'react-icons/ri';
import ReactStars from 'react-rating-stars-component';
import Link from 'next/link';
import { setCookie, getCookie } from 'cookies-next';
import CartContext from '@/context/CartContext';
import WishListContext from '@/context/WishListContext';
import { useContext } from 'react';
import Swal from 'sweetalert2';

const ProductCard = ({ product, openModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItemToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist } = useContext(WishListContext);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const item = {
      product_id: product.id,
      name: product.name,
      price: product.sell_price?.price,
      image: product.primary_photo,
      quantity: 1
    };
    
    addItemToCart(item);
    
    // Show custom popup
    const popup = document.createElement('div');
    popup.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-slide-in-right';
    popup.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Added to cart!</span>
      </div>
    `;
    
    document.body.appendChild(popup);

    // Remove popup after 2 seconds
    setTimeout(() => {
      popup.classList.add('animate-slide-out-right');
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 300);
    }, 2000);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    const item = {
      product_id: product.id,
      name: product.name,
      price: product.sell_price?.price,
      image: product.primary_photo,
      quantity: 1,
      stock: product.stock || 0
    };
    
    const result = addToWishlist(item);
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: result.success ? 'success' : 'error',
      title: result.message,
      customClass: {
        popup: 'colored-toast',
        title: 'text-sm font-medium'
      }
    });
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    openModal(product);
  };

  return (
    <div
      className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-lg cursor-pointer" onClick={handleImageClick}>
        <img
          src={product.primary_photo}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div 
          className="absolute inset-0 bg-black/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
          style={{
            background: 'linear-gradient(to left, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0))'
          }}
        />
        
        {/* Quick Action Buttons */}
        <div className={`absolute right-2 top-2 flex flex-col gap-1 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <button 
            onClick={handleWishlistClick}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200 hover:scale-110 hover:shadow-md"
          >
            <MdFavorite 
              size={16} 
              className={`transition-colors ${
                isInWishlist(product.id) 
                  ? 'text-red-500' 
                  : 'text-gray-600 hover:text-red-500'
              }`} 
            />
          </button>
          {product.stock > 0 && (
            <button 
              onClick={handleAddToCart}
              className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200 hover:scale-110 hover:shadow-md"
            >
              <RiShoppingBasketFill size={16} className="text-gray-600 hover:text-blue-500 transition-colors" />
            </button>
          )}
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <Link href={`/shop/product/${product.category_slug}/${product.subcategory_slug}/${product.product_slug}/${product.encoded_id}`} className="flex-1">
            <h5 className="text-sm font-medium text-gray-900 hover:text-gray-700 line-clamp-2 leading-tight">
              {product.name}
            </h5>
          </Link>
          <span className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap ${
            product.stock > 0
              ? 'bg-green-50 text-green-600'
              : 'bg-red-50 text-red-600'
          }`}>
            {product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <ReactStars
            count={5}
            size={16}
            value={Number(product.star) || 0}
            isHalf={true}
            edit={false}
            activeColor="#FBBF24"
            color="#E5E7EB"
          />
          <span className="text-xs text-gray-500">({product.star || 0})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-gray-900">
              {product.sell_price?.symbol} {product.sell_price?.price.toLocaleString()}
            </span>
            {product.discount > 0 && (
              <span className="text-xs text-gray-500 line-through">
                {product.sell_price?.symbol} {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <button
            className={`py-1.5 px-3 rounded-full text-xs font-medium transition-all duration-200 transform hover:scale-105 ${
              product.stock > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25'
                : 'bg-gray-500 text-white cursor-not-allowed'
            }`}
            onClick={product.stock > 0 ? handleAddToCart : null}
            disabled={!product.stock}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 