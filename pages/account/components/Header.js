import React from "react";
import {
  FaWallet,
  FaComments,
  FaBell,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { getCookie } from "cookies-next";

const Header = ({ searchTerm, setSearchTerm }) => {
  const auth_name = getCookie("home_text_name");

  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-5 bg-white">
      <div className="flex items-center relative w-full md:w-auto">
        <input
          type="text"
          placeholder="Search Products"
          className="py-2 pl-4 pr-20 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition duration-300 w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <FaSearch className="absolute right-3 text-gray-400" />
      </div>

      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <FaWallet className="text-gray-600 hover:text-gray-800 cursor-pointer transition duration-300" />
        <FaComments className="text-gray-600 hover:text-gray-800 cursor-pointer transition duration-300" />
        <FaBell className="text-gray-600 hover:text-gray-800 cursor-pointer transition duration-300" />
        
        <div className="flex items-center space-x-2 cursor-pointer">
          <MdAccountCircle className="text-xl text-gray-600" />
          <span className="text-gray-800">{auth_name ? `${auth_name}` : "Guest User"}</span>
          <FaChevronDown className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default Header; 