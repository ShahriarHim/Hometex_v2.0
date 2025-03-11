import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { deleteCookie } from "cookies-next";

const Sidebar = () => {
  const signOutSubmitHandler = async (e) => {
    e.preventDefault();
    deleteCookie("home_text_token");
    deleteCookie("home_text_name");
    deleteCookie("home_text_phone");
    deleteCookie("home_text_email");
    window.location.href = "/";
  };

  return (
    <div className="w-full md:w-64 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-5 rounded-3xl">
      <div className="flex flex-col gap-3">
        <div className="mb-10 px-10">
          <img
            src="/images/hometex-logo.png"
            alt="Hometex Bangladesh"
            className="mx-auto"
          />
        </div>
        <Link href="/">
          <div className="flex flex-row items-center gap-3 px-4 py-3 text-white hover:text-black text-md hover:scale-110 font-semibold rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <FaHome /> <span>Home</span>
          </div>
        </Link>
        <Link href="/account/orderDash">
          <div className="flex flex-row items-center gap-3 px-4 py-3 text-white hover:text-black text-md hover:scale-110 font-semibold rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <FaClipboardList /> <span>Order tracking</span>
          </div>
        </Link>
        <Link href="/account/profile">
          <div className="flex flex-row items-center gap-3 px-4 py-3 text-white hover:text-black text-md hover:scale-110 font-semibold rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <FaUser /> <span>My Profile</span>
          </div>
        </Link>
        <div onClick={signOutSubmitHandler} className="mt-32 flex flex-row items-center gap-3 px-4 py-3 text-white hover:text-black text-md hover:scale-110 font-semibold rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <RiLogoutBoxRLine /> <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 