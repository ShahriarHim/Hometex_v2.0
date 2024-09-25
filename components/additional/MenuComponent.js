import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaUserAlt } from 'react-icons/fa';
import Link from 'next/link';
import Menu from './NevBarSections';
import { deleteCookie, getCookie } from "cookies-next";
import LoginPopUp from '../layout/LoginPopup';

const MenuComponent = ({ toggleMenu, menuOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  let auth_token = getCookie("home_text_token");
  let auth_name = getCookie("home_text_name");

  const signOutSubmitHandler = async (e) => {
    e.preventDefault();
    deleteCookie("home_text_token");
    deleteCookie("home_text_name");
    deleteCookie("home_text_phone");
    deleteCookie("home_text_email");
    window.location.href = "/";
  };

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
    toggleMenu(); // Close the menu when login popup is toggled
  };

  const handleLogin = () => {
    toggleLoginPopup();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = () => {
    toggleMenu(); // Close the menu when a menu item is clicked
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="md:hidden fixed z-50 flex flex-col items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-lg shadow-lg cursor-pointer focus:outline-none top-5 right-5"
      >
        <div
          className={`block w-8 h-0.5 bg-black transform transition duration-500 ease-in-out ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}
        ></div>
        <div
          className={`block w-8 h-0.5 bg-black my-1 transition-opacity duration-500 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"}`}
        ></div>
        <div
          className={`block w-8 h-0.5 bg-black transform transition duration-500 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
        ></div>
      </button>
      <div
        className={`fixed top-0 left-0 w-1/2 h-full bg-white z-40 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-500 ease-in-out shadow-2xl overflow-hidden`}
      >
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <img
            src="/images/hometex-logo.png"
            alt="Hometex Bangladesh"
            className="w-24 h-auto"
          />
          <button onClick={toggleMenu} className="md:hidden text-black">
            ✕
          </button>
        </div>
        <nav className="flex-grow overflow-y-auto p-6">
          <ul className="text-left space-y-8">
            <li>
              <Link href="/" className="text-2xl text-black hover:text-gray-700 transition-colors duration-300" onClick={handleMenuItemClick}>
                Home
              </Link>
            </li>
            <li className="flex flex-col justify-between items-center">
              <div className="w-full flex justify-between items-center text-2xl">
                <Menu onClick={handleMenuItemClick} />
              </div>
            </li>
            <li>
              <Link href="/GetAQuote" className="text-2xl text-black hover:text-gray-700 transition-colors duration-300" onClick={handleMenuItemClick}>
                Get A Quote
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-2xl text-black hover:text-gray-700 transition-colors duration-300" onClick={handleMenuItemClick}>
                Cart
              </Link>
            </li>
            <li>
              <Link  href="/Contact" className="text-2xl text-black hover:text-gray-700 transition-colors duration-300" onClick={handleMenuItemClick}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/Faq" className="text-2xl text-black hover:text-gray-700 transition-colors duration-300" onClick={handleMenuItemClick}>
                Faq
              </Link>
            </li>
            <li>
              <Link href="/Giftsomeone" className="text-2xl text-black hover:text-gray-700 transition-colors duration-300" onClick={handleMenuItemClick}>
                Gift someone
              </Link>
            </li>
            <li>
              <Link href="/Contract" className="text-2xl text-black hover:text-gray-700 transition-colors duration-300" onClick={handleMenuItemClick}>
                Contract
              </Link>
            </li>
            <li>
              {auth_token ? (
                <div className="md:hidden">
                  <Link href="/account/MyAccount">
                    <div className="px-2 flex flex-col items-center text-center cursor-pointer">
                      <FaUser className="h-6 w-6 text-blue-600" aria-hidden="true" />
                      <span className="text-sm mt-2 font-semibold text-gray-800">
                        {auth_name}
                      </span>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="md:hidden">
                  <div
                    className="px-2 flex flex-col items-center text-center cursor-pointer"
                    onClick={toggleLoginPopup}
                  >
                    <FaUserAlt className="h-6 w-6 text-gray-600" aria-hidden="true" />
                    <span className="text-sm mt-2 font-semibold text-gray-800">
                      My Account
                    </span>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>
        {auth_token && (
          <button
            onClick={signOutSubmitHandler}
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-11/12 text-center text-xl text-red-600 hover:text-red-800 transition-colors duration-300"
          >
            Sign Out
          </button>
        )}
      </div>
      {showLoginPopup && (
        <LoginPopUp
          showPopup={showLoginPopup}
          togglePopup={toggleLoginPopup}
        />
      )}
    </div>
  );
};

export default MenuComponent;
