import React, { useState, useEffect, useRef, useContext } from "react";
import { DynamicText, textOptions } from "./DynamicText";
import {
    HiOutlineGift,
    HiOutlineMail,
    HiOutlineTicket,
    HiShoppingCart,
    HiOutlineUser,
    HiOutlineChevronDown,
} from "react-icons/hi";
import Link from "next/link";
import LoginPopup from "./LoginPopup";
import CartComponent from "@/components/layout/CartComponent/CartComponent";
import CartContext from "@/context/CartContext";
import { deleteCookie, getCookie } from "cookies-next";

const PreHeader = () => {
    const [visitUsText, setVisitUsText] = useState(
        textOptions ? textOptions[0].visitUs : ""
    );
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const handleTextChange = (newVisitUsText) => {
        setVisitUsText(newVisitUsText);
    };

    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartRef = useRef(null);
    const { cart, deleteItemFromCart } = useContext(CartContext);
    const cartItems = cart?.cartItems;
    const [totalPrice, setTotalPrice] = useState(0);
    const cartContainerRef = useRef(null);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    // Add timeout ref to handle delay
    const dropdownTimeoutRef = useRef(null);

    // Modify the dropdown open/close handlers with delay
    const handleDropdownEnter = () => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setIsAccountDropdownOpen(true);
    };

    const handleDropdownLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setIsAccountDropdownOpen(false);
        }, 300); // 300ms delay before closing
    };

    useEffect(() => {
        if (cartItems) {
            const finalAmount = cartItems.reduce((total, cartItem) => {
                let priceStr = cartItem.price;
                priceStr = typeof priceStr !== 'string' ? String(priceStr) : priceStr;
                priceStr = priceStr.replace(/[,]/g, ""); 
                const amount = parseInt(priceStr, 10) * cartItem.quantity;
                return total + amount;
            }, 0);
            setTotalPrice(finalAmount);
        }
    }, [cartItems]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartContainerRef.current && 
                !cartContainerRef.current.contains(event.target) && 
                isCartOpen) {
                setIsCartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCartOpen]);

    useEffect(() => {
        // Load saved currency from localStorage on component mount
        const savedCurrency = localStorage.getItem('selectedCurrency');
        if (savedCurrency) {
            setSelectedCurrency(savedCurrency);
        }
        let auth_name = getCookie("home_text_name");

        if (auth_name) {
            setIsLoggedIn(true);
            setUserName(auth_name);
        }
    }, []);

    const signOutSubmitHandler = async (e) => {
        e.preventDefault();
        deleteCookie("home_text_token");
        deleteCookie("home_text_name");
        deleteCookie("home_text_phone");
        deleteCookie("home_text_email");
        window.location.href = "/";
    };

    const toggleLoginPopup = () => {
        setShowLoginPopup(!showLoginPopup);
    };

    const handleCartClick = () => {
        setIsCartOpen(prevState => !prevState);
    };

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
        localStorage.setItem('selectedCurrency', currency);
        setIsCurrencyDropdownOpen(false);
        setIsAccountDropdownOpen(false);
    };

    return (
        <div className="pt-1 hidden md:block bg-[#d4ed30]">
            <div className="container pb-1 w-full mx-auto">
                <div className="flex justify-between items-center">
                    {/* Left Section - Account & Corporate */}
                    <div className="flex items-center space-x-8 ml-2 w-1/4">
                        {/* My Account Dropdown */}
                        <div 
                            className="relative"
                            onMouseEnter={handleDropdownEnter}
                            onMouseLeave={handleDropdownLeave}
                        >
                            <div 
                                className="flex items-center cursor-pointer hover:text-blue-500 pl-4"
                            >
                                <HiOutlineUser
                                    className="mr-1 text-pink-500"
                                    style={{ width: "16px", height: "16px" }}
                                />
                                <span className="text-xs whitespace-nowrap">My Account</span>
                                <HiOutlineChevronDown
                                    className="ml-1"
                                    style={{ width: "12px", height: "12px" }}
                                />
                            </div>
                            
                            {isAccountDropdownOpen && (
                                <div className="absolute top-full left-0 bg-white text-black rounded-lg shadow-2xl z-50 w-48 mt-1">
                                    <div className="absolute -top-2 left-4 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-100"></div>
                                    <ul className="py-1 relative bg-white rounded-lg text-sm">
                                        <li className="group">
                                            {isLoggedIn ? (
                                                <>
                                                    <Link href="/account/MyAccount" 
                                                        className="block px-4 py-1.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                                                        <div className="font-medium text-sm">{userName}</div>
                                                        <div className="text-xs text-gray-500">View account</div>
                                                    </Link>
                                                    <button
                                                        onClick={signOutSubmitHandler}
                                                        className="block w-full text-left px-4 py-1.5 text-gray-700 
                                                            hover:text-red-600 hover:bg-red-50"
                                                    >
                                                        Sign Out
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={toggleLoginPopup}
                                                    className="block w-full text-left px-4 py-1.5 text-gray-700 
                                                        hover:text-blue-600 hover:bg-blue-50"
                                                >
                                                    Sign Up / Login
                                                </button>
                                            )}
                                        </li>

                                        <div className="border-t border-gray-100"></div>

                                        {/* Currency Dropdown */}
                                        <li className="relative group"
                                            onMouseEnter={() => setIsCurrencyDropdownOpen(true)}
                                            onMouseLeave={() => setIsCurrencyDropdownOpen(false)} >
                                            <div className="px-4 py-1.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 
                                                cursor-pointer flex justify-between items-center">
                                                <span>Currency</span>
                                                <span className="font-medium">{selectedCurrency}</span>
                                                {isCurrencyDropdownOpen && (
                                                    <div className="absolute left-full top-0 bg-white shadow-xl rounded-lg w-28 -mr-1 
                                                        transform translate-x-2 border border-gray-100">
                                                        <div className="absolute -left-2 top-3 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-100"></div>
                                                        <ul className="py-1 relative bg-white rounded-lg">
                                                            {['USD', 'GBP', 'BDT'].map((currency) => (
                                                                <li key={currency}
                                                                    className="px-3 py-1.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 
                                                                        cursor-pointer"
                                                                    onClick={() => handleCurrencyChange(currency)}>
                                                                    {currency}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </li>

                                        <li className="group">
                                            <Link href="/my-rewards" 
                                                className="block px-4 py-1.5 text-gray-700 hover:text-blue-600">
                                                My Rewards
                                            </Link>
                                        </li>
                                        <li className="group">
                                            <Link href="/language" 
                                                className="block px-4 py-1.5 text-gray-700 hover:text-blue-600">
                                                Language
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Corporate Inquiries */}
                        <Link
                            href="/corporate-enquires"
                            className="flex items-center hover:text-blue-500"
                        >
                            <HiOutlineMail
                                className="mr-1 text-pink-500"
                                style={{ width: "16px", height: "16px" }}
                            />
                            <span className="text-xs whitespace-nowrap">Corporate Inquiries</span>
                        </Link>
                    </div>

                    {/* Center Section - Dynamic Text */}
                    <div className="flex items-center justify-center mx-auto w-auto">
                        <div className="flex items-center space-x-4">
                            <span className="px-3 py-1 text-xs text-white font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 rounded-lg shadow-md transition-all duration-300 ease-in-out">
                                {visitUsText}
                            </span>
                            <div className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 transition-all duration-300 ease-in-out">
                                <DynamicText onTextChange={handleTextChange} />
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Cart & Order Tracking */}
                    <div className="flex items-center justify-end gap-3 mr-2 w-1/4">
                        {/* Order Tracking */}
                        <Link href="/orderDash" className="flex items-center hover:text-blue-500 whitespace-nowrap mr-8">
                            <HiOutlineTicket className="mr-1 text-pink-500" style={{ width: "16px", height: "16px" }} />
                            <span className="text-xs">Order Tracking</span>
                        </Link>

                        {/* Cart Button and Popup */}
                        <div ref={cartContainerRef}>
                            <div className="relative bg-black text-white px-4 py-4 -mt-1 flex items-center cursor-pointer hover:text-yellow-500 transition-colors duration-200 z-[160] mr-2" onClick={handleCartClick}>
                                <HiShoppingCart className="mr-2 text-pink-500" style={{ width: "16px", height: "16px" }} />
                                <span className="text-xs whitespace-nowrap">My Cart</span>
                                {/* Triangle decorations */}
                                <div className="absolute bottom-[-12px] left-0 right-0 h-3 overflow-visible z-[155]">
                                    <div className="flex justify-center">
                                        {[...Array(12)].map((_, i) => (
                                            <div key={i} className="w-2.5 h-3 bg-black" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)', marginTop: '-1px', marginLeft: '0.5px', marginRight: '0.5px' }} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Cart Component */}
                            {isCartOpen && (
                                <CartComponent
                                    cartRef={cartRef}
                                    handleCartClick={handleCartClick}
                                    cartItems={cartItems}
                                    isOpen={isCartOpen}
                                    cart={{ cartItems }}
                                    deleteItemFromCart={deleteItemFromCart}
                                    totalPrice={totalPrice}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreHeader;
