import React from "react";

const CategoryCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="flex flex-col md:flex-row justify-between bg-purple-500 text-gray-300 rounded-xl px-5 py-5">
        <h2 className="text-xl pt-2">All Products</h2>
        <img src="/images/icons/archary.png" alt="" className="h-24 md:h-36" />
      </div>
      <div className="flex flex-col md:flex-row justify-between bg-purple-500 text-gray-300 rounded-xl px-5 py-5">
        <h2 className="text-xl pt-2">Lifestyle</h2>
        <img src="/images/icons/doumble.png" alt="" className="h-24 md:h-36" />
      </div>
      <div className="flex flex-col md:flex-row justify-between bg-purple-500 text-gray-300 rounded-xl px-5 py-5">
        <h2 className="text-xl pt-2">Fashion</h2>
        <img src="/images/icons/shoe.png" alt="" className="h-24 md:h-36" />
      </div>
    </div>
  );
};

export default CategoryCards; 