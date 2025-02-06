import React, { useState, useEffect, useContext } from "react";
import ReactStars from "react-rating-stars-component";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { MdFavorite } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { RiShoppingBasketFill, RiExchangeFill } from "react-icons/ri";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Autoplay } from "swiper";
import Link from "next/link";
import ProductModal from "../common/ProductModal";
import CartContext from "@/context/CartContext";

const RequestStackModal = ({ product, onClose, onSubmit }) => {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(mobileNumber);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-4 rounded shadow-lg z-10">
        <h2 className="text-xl font-semibold mb-4">Product Restock Request</h2>
        <div className="flex items-center mb-4">
          <img src={product.primary_photo} alt={product.name} className="w-16 h-16 mr-4" />
          <p>{product.name}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            We will send you a text when it's available
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="ex: 01700000000"
              className="mt-1 p-2 border rounded w-full"
              required
              pattern="\d{11}"
            />
          </label>
          <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded">
            Send Request
          </button>
        </form>
        <button onClick={onClose} className="mt-2 text-gray-600">Close</button>
      </div>
    </div>
  );
};

const ProductsTabs = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestProduct, setRequestProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState({
    'all': products,
    'extra-king': [],
    'king': [],
    'semi-double': [],
    'single': []
  });

  useEffect(() => {
    setFilteredProducts({
      'all': products,
      'extra-king': products?.filter(p => p?.child_sub_category?.name?.toLowerCase() === 'extra-king') || [],
      'king': products?.filter(p => p?.child_sub_category?.name?.toLowerCase() === 'king') || [],
      'semi-double': products?.filter(p => p?.child_sub_category?.name?.toLowerCase() === 'semi-double') || [],
      'single': products?.filter(p => p?.child_sub_category?.name?.toLowerCase() === 'single') || []
    });
  }, [products]);

  // Function to open modal with product details
  const openModal = (product) => {
    setSelectedProduct(product);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Function to handle request stack
  const handleRequestStack = (product) => {
    setRequestProduct(product);
    setIsModalOpen(true);
  };

  // Function to handle restock request form submission
  const handleRestockRequestSubmit = (mobileNumber) => {
    // Implement your request stack logic here
    alert(`Request for ${requestProduct.name} with mobile number ${mobileNumber} has been sent!`);
    setIsModalOpen(false);
    setRequestProduct(null);
  };

  const params = {
    slidesPerView: 4,
    spaceBetween: 16,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 12,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      868: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
    },
    freeMode: true,
    loop: true,
    centeredSlides: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, FreeMode],
    className: "mySwiper",
  };

  if (!products) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-3 mb-10">
        <Tabs>
          <TabList className="flex flex-wrap justify-center lg:justify-start items-center gap-4 py-2">
            <Tab className="text-gray-500 bg-gray-100 py-2 px-4 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out rounded-lg shadow-sm lg:w-auto">
              All Products
            </Tab>
            <Tab className="group py-2 px-4 focus:outline-none transition duration-150 ease-in-out rounded-lg shadow-sm bg-white lg:w-auto">
              <img src="/images/icons/extra-king.png" className="rounded-full h-12 group-hover:scale-110 transition-transform" alt="Extra King" />
            </Tab>
            <Tab className="group py-2 px-4 focus:outline-none transition duration-150 ease-in-out rounded-lg shadow-sm bg-white lg:w-auto">
              <img src="/images/icons/king.png" className="rounded-full h-12 group-hover:scale-110 transition-transform" alt="King" />
            </Tab>
            <Tab className="group py-2 px-4 focus:outline-none transition duration-150 ease-in-out rounded-lg shadow-sm bg-white lg:w-auto">
              <img src="/images/icons/semi-double.png" className="rounded-full h-12 group-hover:scale-110 transition-transform" alt="Semi Double" />
            </Tab>
            <Tab className="group py-2 px-4 focus:outline-none transition duration-150 ease-in-out rounded-lg shadow-sm bg-white lg:w-auto">
              <img src="/images/icons/single.png" className="rounded-full h-12 group-hover:scale-110 transition-transform" alt="Single" />
            </Tab>
          </TabList>
          <div className="lg:flex-grow">
            {Object.entries(filteredProducts).map(([category, items]) => (
              <TabPanel key={category}>
                <Swiper {...params}>
                  {items?.length > 0 ? (
                    items.map((product) => (
                      <SwiperSlide key={product.id}>
                        <ProductCard
                          product={product}
                          openModal={openModal}
                          handleRequestStack={handleRequestStack}
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      No products available in this category
                    </div>
                  )}
                </Swiper>
              </TabPanel>
            ))}
          </div>
        </Tabs>
      </div>
      {isModalOpen && (
        <RequestStackModal
          product={requestProduct}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleRestockRequestSubmit}
        />
      )}
      <ProductModal product={selectedProduct} onClose={closeModal} />
    </>
  );
};

const ProductCard = ({ product, openModal, handleRequestStack }) => {
  const { addItemToCart } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  
  const originalPrice = parseFloat(product.original_price);
  const sellPrice = parseFloat(product.sell_price?.price);
  const discount = originalPrice && sellPrice ? 
    Math.round(((originalPrice - sellPrice) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
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

  return (
    <div 
      className="relative w-full max-w-sm bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] transition-all duration-300 border border-gray-100 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges Container */}
      <div className="absolute top-2 left-2 z-20 flex flex-col gap-0.5">
        {discount > 0 && (
          <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-md transform transition-transform duration-300 hover:scale-105">
            -{discount}%
          </span>
        )}
        {product.isNew === 1 && (
          <span className="bg-green-500 text-white text-xs font-medium px-2 py-0.5 rounded-md transform transition-transform duration-300 hover:scale-105">
            New
          </span>
        )}
        {product.isTrending === 1 && (
          <span className="bg-blue-500 text-white text-xs font-medium px-2 py-0.5 rounded-md transform transition-transform duration-300 hover:scale-105">
            Trending
          </span>
        )}
      </div>

      {/* Product Image Container */}
      <div 
        className="relative aspect-square overflow-hidden rounded-t-lg cursor-pointer group"
        onClick={() => openModal(product)}
      >
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={product.primary_photo}
          alt={product.name}
        />
        
        {/* Hover Overlay - Updated for right to left animation */}
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
          <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200 hover:scale-110 hover:shadow-md">
            <MdFavorite size={16} className="text-gray-600 hover:text-red-500 transition-colors" />
          </button>
          {product.stock > 0 && (
            <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200 hover:scale-110 hover:shadow-md">
              <RiShoppingBasketFill size={16} className="text-gray-600 hover:text-blue-500 transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3">
        {/* Product Name and Stock Status */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <Link href={`/Shop/product/${product.id}`} className="flex-1">
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

        {/* Rating */}
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

        {/* Price and Action */}
          <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-gray-900">
              {product.sell_price?.symbol} {product.sell_price?.price.toLocaleString()}
            </span>
            {discount > 0 && (
              <span className="text-xs text-gray-500 line-through">
                {product.sell_price?.symbol} {product.original_price.toLocaleString()}
              </span>
            )}
          </div>
          
        <button
            className={`py-1.5 px-3 rounded-full text-xs font-medium transition-all duration-200 transform hover:scale-105 ${
              product.stock > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25'
                : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/25'
            }`}
            onClick={() => product.stock > 0 ? handleAddToCart() : handleRequestStack(product)}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Request Stock'}
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsTabs;
