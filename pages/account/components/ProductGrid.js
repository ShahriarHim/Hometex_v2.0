import React from "react";
import Link from "next/link";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import ReactPaginate from "react-paginate";

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

const ProductGrid = ({ filteredProducts, pageCount, currentPage, handlePageClick }) => {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/Shop/product/${product.id}`}>
            <Product product={product} />
          </Link>
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
  );
};

export default ProductGrid; 