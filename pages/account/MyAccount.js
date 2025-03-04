 
import React, { useState, useEffect } from "react";
import {
  
  FaShoppingCart,
 
  FaStar,
} from "react-icons/fa";
 
import Constants from "@/ults/Constant";
 
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CategoryCards from "./components/CategoryCards";
import ProductGrid from "./components/ProductGrid";
import Footer from "@/components/layout/Footer";

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
  const [searchTerm, setSearchTerm] = useState("");
  
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

  const filteredProducts = searchTerm
    ? currentPageData.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentPageData;

  return (
    <div className="flex flex-col md:flex-row h-auto">
      <Sidebar />
      <div className="flex-grow p-5 bg-white">
        <Header 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        <h1 className="px-5 py-5 text-3xl font-semibold">Categories</h1>
        <CategoryCards />
        <ProductGrid 
          filteredProducts={filteredProducts}
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
        />
      </div>
     
    </div>
  );
};

export default MyAccount;
