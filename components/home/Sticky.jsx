import CartContext from '@/context/CartContext';
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import { FaFacebook, FaTwitter,  FaArrowUp } from 'react-icons/fa';

import Image from 'next/image';
import Cart from './sticky/Cart';
import User from './sticky/User';
import Search from './sticky/Search';
import RecentView from './sticky/RecentView';
import Categories from './sticky/Categories';

export const Sticky = () => {

    const handleClick = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };
  return (
    <div>
        {/* Sticky */}
        <div id="so-groups" className="fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col z-50 hidden md:block">
                <div className="group relative" title="Categories">
                    <div className="tooltip">Categories</div>
                    <Categories />
                </div>
                <div className="group relative" title="Account">
                    <div className="tooltip">Account</div>
                    <User />
                </div>
                <div className="group relative" title="Search">
                    <div className="tooltip">Search</div>
                    <Search />
                </div>
                <div className="group relative" title="Recently Viewed">
                    <div className="tooltip">Recently Viewed</div>
                    <RecentView />
                </div>
                <div className="group relative" title="Back to Top">
                    <div className="tooltip">Back to Top</div>
                    <a onClick={handleClick} className="sticky-recent bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 h-12 cursor-pointer flex justify-center items-center border border-white transition-all duration-300">
                        <span className="text-xl"><FaArrowUp /></span>
                    </a>
                </div>
                <div className="group relative" title="Shopping Cart">
                    <div className="tooltip">Shopping Cart</div>
                    <Cart />
                </div>
            </div>
         

    </div>
  )
}
