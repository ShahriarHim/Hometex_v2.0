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

const PreHeader = () => {
    const [visitUsText, setVisitUsText] = useState(
        textOptions ? textOptions[0].visitUs : ""
    );

    const handleTextChange = (newVisitUsText) => {
        setVisitUsText(newVisitUsText);
    };

    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    return (
        <div className="pt-2 hidden md:block bg-[#d4ed30]">
            <div className="container mx-auto pb-2">
                <div className="flex justify-between items-center">
                    {/* Left Section (90% width) */}
                    <div className="flex items-center gap-3 px-2 w-[90%]">
                        {/* My Account Dropdown and Corporate Inquiries */}
                        <div className="flex items-center gap-3 px-2">
                            {/* My Account Dropdown */}
                            <div 
                                className="relative group cursor-pointer flex items-center hover:text-blue-500 text-sm"
                            >
                                <div 
                                    onMouseEnter={() => setIsAccountDropdownOpen(true)}
                                    className="flex items-center"
                                >
                                    <HiOutlineUser
                                        className="mr-1 text-pink-500"
                                        style={{ width: "18px", height: "18px" }}
                                    />
                                    <span className="text-sm">My Account</span>
                                    <HiOutlineChevronDown
                                        className="ml-1"
                                        style={{ width: "14px", height: "14px" }}
                                    />
                                </div>
                                
                                {isAccountDropdownOpen && (
                                    <div 
                                        className="absolute top-full left-0 bg-white text-black rounded-md shadow-lg z-50 w-40 mt-2"
                                        onMouseEnter={() => setIsAccountDropdownOpen(true)}
                                        onMouseLeave={() => setIsAccountDropdownOpen(false)}
                                    >
                                        <ul className="p-2">
                                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                                <Link 
                                                    href="/auth/signup"
                                                    className="block w-full h-full"
                                                >
                                                    Sign Up / Login
                                                </Link>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                                <Link 
                                                    href="/my-rewards"
                                                    className="block w-full h-full"
                                                >
                                                    My Rewards
                                                </Link>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                                <Link 
                                                    href="/language"
                                                    className="block w-full h-full"
                                                >
                                                    Language
                                                </Link>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                                <Link 
                                                    href="/currency"
                                                    className="block w-full h-full"
                                                >
                                                    Currency
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Corporate Inquiries - Standard Link */}
                            <Link
                                href="/corporate-enquires"
                                className="flex items-center hover:text-blue-500 text-sm"
                            >
                                <HiOutlineMail
                                    className="mr-1 text-pink-500"
                                    style={{ width: "18px", height: "18px" }}
                                />{" "}
                                <span className="text-sm">Corporate Inquiries</span>
                            </Link>

                            {/* Order Tracking - Standard Link */}
                            <Link 
                                href="/orderDash"
                                className="flex items-center hover:text-blue-500 text-sm"
                            >
                                <HiOutlineTicket
                                    className="mr-1 text-pink-500"
                                    style={{ width: "18px", height: "18px" }}
                                />{" "}
                                <span className="text-sm">Order Tracking</span>
                            </Link>
                        </div>

                        {/* Center Section: VisitUs Text and Dynamic Text */}
                        <div className="flex items-center px-2">
                            <span
                                className="mx-3 px-3 py-1 cursor-pointer text-white font-medium
                            bg-gradient-to-r from-purple-500 to-pink-500
                            hover:from-pink-500 hover:to-purple-500
                            border-0 rounded-lg shadow-md
                            transition-all duration-300 ease-in-out"
                            >
                                {visitUsText}
                            </span>
                            <div
                                className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500
                            hover:from-blue-500 hover:to-green-400
                            transition-all duration-300 ease-in-out"
                            >
                                <DynamicText onTextChange={handleTextChange} />
                            </div>
                        </div>



                    </div>

                    {/* Right Section (10% width) with Absolute positioning */}
                    <div className="flex items-center  px-2 w-[10%] ">
                        {/* Order Tracking */}


                        {/* My Cart */}
                        <div className="absolute bg-black text-white px-3 py-5 flex items-center cursor-pointer hover:text-yellow-500 z-[150]">
                            <HiShoppingCart
                                className="mr-2 text-pink-500"
                                style={{ width: "22px", height: "22px" }}
                            />
                            My Cart
                            <div className="absolute bottom-[-8px] left-0 right-0 h-2 overflow-hidden z-[140]">
                                <div className="flex justify-center">
                                    {[...Array(12)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-6 h-3 bg-black mx-[0.5px]"
                                            style={{
                                                clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
                                                marginTop: '-2px'
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