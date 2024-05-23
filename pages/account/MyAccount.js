import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaShoppingBag,
  FaWallet,
  FaShoppingCart,
  FaUser,
  FaComments,
  FaBell,
  FaChevronDown,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Constants from "@/ults/Constant";
import ReactPaginate from "react-paginate";
import { deleteCookie } from "cookies-next";

const Product = ({ product }) => (
  <div className="relative border rounded-lg p-4 flex flex-col items-center bg-white shadow-sm hover:shadow-md">
    <div className="absolute top-2 right-2">
      <FaShoppingCart className="text-blue-500" />
    </div>
    <img
      src={product.primary_photo}
      alt={product.name}
      className="h-48 w-48 object-cover mt-2"
    />
    <div className="flex items-center justify-between w-full mt-2">
      <div className="flex flex-col">
        {product.name}
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400" />
          ))}
        </div>
      </div>
      <span>{product.price}</span>
    </div>
  </div>
);

const MyAccount = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    fetch(`${Constants.BASE_URL}/api/products-web`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data?.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const PER_PAGE = 6;
  const offset = currentPage * PER_PAGE;
  const currentPageData = products.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(products.length / PER_PAGE);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = searchTerm
    ? currentPageData.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentPageData;

    // signout handeler
    const signOutSubmitHandler = async (e) => {
        e.preventDefault();
        // setIsSubmit(true)
        deleteCookie("home_text_token");
        window.location.href = "/";
    };

  return (
    <div className="flex flex-col md:flex-row h-auto">
      <div className="w-full md:w-64 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-5 rounded-3xl">
        <div className="flex flex-col gap-3">
          <div className="mb-10 px-10">
            <img
              src="/images/hometex-logo.png"
              alt="Hometex Bangladesh"
              className="mx-auto"
            />
          </div>
          <div className="flex flex-row items-center gap-3 px-4 py-3 text-white hover:text-black text-md hover:scale-110 font-semibold rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <FaHome /> <span>Home</span>
          </div>
          <div className="flex flex-row items-center gap-3 px-4 py-3 text-white hover:text-black text-md hover:scale-110 font-semibold rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <FaShoppingBag /> <span>Categories</span>
          </div>
          <div className="flex flex-row items-center gap-3 px-4 py-3 text-white hover:text-black text-md hover:scale-110 font-semibold rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <FaWallet /> <span>Wallet</span>
          </div>
          <Link href="/cart">
          <div className="flex flex-row items-center gap-3 px-4 py-3 text-white hover:text-black text-md hover:scale-110 font-semibold rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <FaShoppingCart /> <span>Cart</span>
          </div>
          </Link>
          <div className="flex flex-row items-center gap-3 px-4 py-3 text-white hover:text-black text-md hover:scale-110 font-semibold rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <FaUser /> <span>User Profile</span>
          </div>
          <div className="flex flex-row items-center gap-3 px-4 py-3 text-white hover:text-black text-md hover:scale-110 font-semibold rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <AiFillSetting /> <span>Setting</span>
          </div>
          <div onClick={signOutSubmitHandler} className=" mt-32 flex flex-row items-center gap-3 px-4 py-3 text-white hover:text-black text-md hover:scale-110 font-semibold rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <RiLogoutBoxRLine /> <span>Logout</span>
          </div>
        </div>
      </div>
      <div className="flex-grow p-5 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center px-5 bg-white">
          {/* Search Box */}
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

          {/* Icons and Profile */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Wallet Icon */}
            <FaWallet className="text-gray-600 hover:text-gray-800 cursor-pointer transition duration-300" />

            {/* Chat Icon */}
            <FaComments className="text-gray-600 hover:text-gray-800 cursor-pointer transition duration-300" />

            {/* Bell Icon */}
            <FaBell className="text-gray-600 hover:text-gray-800 cursor-pointer transition duration-300" />

            {/* Profile Section */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <MdAccountCircle className="text-xl text-gray-600" />
              <span className="text-gray-800">John Doe</span>
              <FaChevronDown className="text-gray-600" />
            </div>
          </div>
        </div>

        <h1 className="px-5 py-5 text-3xl font-semibold">Categories</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="flex flex-col md:flex-row justify-between bg-purple-500 text-gray-300 rounded-xl px-5 py-5">
            <h2 className="text-xl pt-2">All Products</h2>
            <img
              src="/images/icons/archary.png"
              alt=""
              className="h-24 md:h-36"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between bg-purple-500 text-gray-300 rounded-xl px-5 py-5">
            <h2 className="text-xl pt-2">Lifestyle</h2>
            <img
              src="/images/icons/doumble.png"
              alt=""
              className="h-24 md:h-36"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between bg-purple-500 text-gray-300 rounded-xl px-5 py-5">
            <h2 className="text-xl pt-2">Fashion</h2>
            <img src="/images/icons/shoe.png" alt="" className="h-24 md:h-36" />
          </div>
        </div>

        <div>
          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/Shop/product/${product.id}`}><Product  product={product} /></Link>
              ))}
            </div>

            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"flex justify-center list-none mt-5"}
              previousLinkClassName={
                "px-4 py-2 mx-1 rounded-md text-sm font-medium border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-600 bg-indigo-500 text-white"
              }
              nextLinkClassName={
                "px-4 py-2 mx-1 rounded-md text-sm font-medium border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-600 bg-indigo-500 text-white"
              }
              pageLinkClassName={
                "px-3 py-2 mx-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-100"
              }
              disabledClassName={"opacity-50 cursor-not-allowed"}
              activeClassName={"bg-indigo-500 text-black"}
              activeLinkClassName={"bg-indigo-100 text-bank"}
              breakLabel={""}
              breakClassName={
                "break-me px-3 py-2 mx-1 rounded-md bg-white border border-gray-300 text-gray-500"
              }
              marginPagesDisplayed={0}
              pageRangeDisplayed={3}
              initialPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
