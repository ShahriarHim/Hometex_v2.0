import React, { useState } from 'react';
import Constants from "@/ults/Constant";

const FrequentlyBoughtTogether = ({ product }) => {
  const image_URL = `${Constants.BASE_URL}/images/uploads/product`;

  const [selectedImage, setSelectedImage] = useState(product.primary_photo?.photo);

  return (
    <div className="flex flex-col items-left border p-2 rounded-lg shadow-lg bg-white md:flex-row md:items-start md:max-w-4xl mx-auto">
      <div className="w-full md:w-1/4 mb-2 md:mb-0 md:mr-2 flex justify-center">
        {/* First Product Image */}
        <img
          alt="Primary Product Image"
          src={`${image_URL}/${selectedImage || product.primary_photo?.photo}`}
          className="w-24 h-24 md:w-full md:h-auto object-contain rounded-lg"
        />
      </div>
      {/* Plus Icon */}
      <div className="flex items-center justify-center h-48 md:mx-4">
  <span className="text-3xl font-bold text-gray-600">+</span>
</div>


      <div className="w-full md:w-1/4 mb-2 md:mb-0 md:mr-2 flex justify-center">
        {/* Second Product Image */}
        <img
          alt="Secondary Product Image"
          src="https://htbapi.hometexbd.ltd/images/uploads/product_thumb/unicorn-thu-nov-2-2023-821-pm-91981.jpeg"
          className="w-24 h-24 md:w-full md:h-auto object-contain rounded-lg"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-xl font-bold mb-2 text-center md:text-left">Frequently bought together</h1>
        {/* Product 1 */}
        <div className="flex flex-col items-center md:flex-row md:items-center mb-2">
          <input type="checkbox" checked readOnly className="mr-2" />
          <div className="flex flex-col md:flex-row">
            <span className="font-semibold text-center md:text-left">
              This Item: {product.name} ({product.volume})
            </span>
            <div className="flex justify-center md:justify-start">
              <span className="line-through ml-2">৳ {product.original_price}</span>
              <span className="text-red-500 ml-2">৳ {product.discounted_price}</span>
            </div>
          </div>
        </div>
        {/* Product 2 */}
        <div className="flex flex-col items-center md:flex-row md:items-center mb-2">
          <input type="checkbox" checked readOnly className="mr-2" />
          <div className="flex flex-col md:flex-row">
            <span className="font-semibold text-center md:text-left">
              Rajkonna Acne Fighting Facial Wash With Jojoba Beads (100 ml)
            </span>
            <div className="flex justify-center md:justify-start">
              <span className="line-through ml-2">৳ 185.00</span>
              <span className="text-red-500 ml-2">৳ 157.00</span>
            </div>
          </div>
        </div>
        {/* Total Price */}
        <div className="flex justify-center md:justify-start mb-2">
          <span className="text-lg font-bold">Total price: ৳ 256</span>
        </div>
        {/* Add to Cart Button */}
        <div className="flex justify-center md:justify-start">
          <button className="bg-pink-500 text-white px-3 py-1 rounded-lg shadow-md">ADD BOTH TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyBoughtTogether;
