import React, { useState } from "react";
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

const PreHeader = () => {
    const [visitUsText, setVisitUsText] = useState(
        textOptions ? textOptions[0].visitUs : ""
    );
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const handleTextChange = (newVisitUsText) => {
        setVisitUsText(newVisitUsText);
    };

    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const toggleLoginPopup = () => {
        setShowLoginPopup(!showLoginPopup);
    };
    return (
        <div className="pt-1 hidden md:block bg-[#d4ed30]">
            <div className="container mx-auto pb-1">
                <div className="flex justify-between items-center px-2">
                    {/* Left Section - Account & Corporate */}
                    <div className="flex items-center space-x-8 w-1/4 -ml-4">
                        {/* My Account Dropdown */}
                        <div className="relative">
                            <div 
                                className="flex items-center cursor-pointer hover:text-blue-500 pl-4"
                                onMouseEnter={() => setIsAccountDropdownOpen(true)}
                                onMouseLeave={() => setIsAccountDropdownOpen(false)}
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
                                
                                {isAccountDropdownOpen && (
                                    <div className="absolute top-full left-0 bg-white text-black rounded-md shadow-lg z-50 w-48 mt-2">
                                        <ul className="py-2">
                                            <li className="hover:bg-gray-100">
                                                <Link href="/auth/signup" className="block px-4 py-2 text-sm">
                                                    Sign Up / Login
                                                </Link> */}
                                                <button
                                                    onClick={toggleLoginPopup}
                                                    className="block w-full h-full text-center"
                                               >signup</button>     
                                                
                                            </li>
                                            <li className="hover:bg-gray-100">
                                                <Link href="/my-rewards" className="block px-4 py-2 text-sm">
                                                    My Rewards
                                                </Link>
                                            </li>
                                            <li className="hover:bg-gray-100">
                                                <Link href="/language" className="block px-4 py-2 text-sm">
                                                    Language
                                                </Link>
                                            </li>
                                            <li className="hover:bg-gray-100">
                                                <Link href="/currency" className="block px-4 py-2 text-sm">
                                                    Currency
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
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
                    <div className="flex items-center justify-center flex-1">
                        <div className="flex items-center space-x-4">
                            <span className="px-3 py-1 text-xs text-white font-medium
                                bg-gradient-to-r from-purple-500 to-pink-500
                                hover:from-pink-500 hover:to-purple-500
                                rounded-lg shadow-md transition-all duration-300 ease-in-out"
                            >
                                {visitUsText}
                            </span>
                            <div className="text-base font-semibold text-transparent bg-clip-text 
                                bg-gradient-to-r from-green-400 to-blue-500
                                hover:from-blue-500 hover:to-green-400
                                transition-all duration-300 ease-in-out"
                            >
                                <DynamicText onTextChange={handleTextChange} />
                            </div>
                        </div>
                    </div>
                    <div>
                        {showLoginPopup && <LoginPopup showPopup={showLoginPopup} togglePopup={toggleLoginPopup} />}
                    </div>
                    {/* Right Section (10% width) with Absolute positioning */}
                    <div className="flex items-center justify-end gap-3 px-2 w-[10%]">
                        {/* Order Tracking */}
                        <Link
                            href="/orderDash"
                            className="flex items-center hover:text-blue-500 whitespace-nowrap mr-8"
                        >
                            <HiOutlineTicket
                                className="mr-1 text-pink-500"
                                style={{ width: "16px", height: "16px" }}
                            />
                            <span className="text-xs">Order Tracking</span>
                        </Link>

                        {/* My Cart */}
                        <div className="relative bg-black text-white px-4 py-4 -mt-1 flex items-center 
                            cursor-pointer hover:text-yellow-500 transition-colors duration-200 z-[160] mr-2"
                        >
                            <HiShoppingCart
                                className="mr-2 text-pink-500"
                                style={{ width: "16px", height: "16px" }}
                            />
                            <span className="text-xs whitespace-nowrap">My Cart</span>
                            {/* Triangle decorations */}
                            <div className="absolute bottom-[-12px] left-0 right-0 h-3 overflow-visible z-[155]">
                                <div className="flex justify-center">
                                    {[...Array(12)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-2.5 h-3 bg-black"
                                            style={{
                                                clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
                                                marginTop: '-1px',
                                                marginLeft: '0.5px',
                                                marginRight: '0.5px'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreHeader;

{/* Shipping (Commented Out) */ }
{/* 
                        <div className="flex items-center hover:text-blue-500 cursor-pointer">
                            <FaShippingFast
                                className="mr-2 text-pink-500"
                                style={{ width: "22px", height: "22px" }}
                            />{" "}
                            Shipping
                        </div> 
                        */}