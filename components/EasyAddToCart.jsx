import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Constants from '@/ults/Constant';

const EasyAddToCart = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // Show the header after scrolling 300px
            setIsVisible(scrollPosition > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#d4ed30] to-[#a8c423] shadow-md z-50 py-3">
            <div className="container mx-auto flex items-center justify-between">
                {/* Left Section - Product Info */}
                <div className="flex items-center space-x-4">
                    <img 
                        src={`${Constants.BASE_URL}/images/uploads/product/${product.primary_photo?.photo}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                        <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
                        <p className="text-gray-600">
                            {product.price} BDT
                        </p>
                    </div>
                </div>

                {/* Right Section - Quantity and Buy Now */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-lg">
                        <button 
                            onClick={() => handleQuantityChange('decrease')}
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                            <FaMinus size={12} />
                        </button>
                        <span className="px-4 py-2">{quantity}</span>
                        <button 
                            onClick={() => handleQuantityChange('increase')}
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                            <FaPlus size={12} />
                        </button>
                    </div>
                    <button className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EasyAddToCart; 