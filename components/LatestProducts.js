import React, { useState } from "react";

const LatestProducts = () => {
  const [products, setProducts] = useState([
    {
      id: "1",
      image: "https://htbapi.hometexbd.ltd/images/uploads/product_thumb/unicorn-thu-nov-2-2023-821-pm-91981.jpeg",
      name: "Product 1",
      ProductDiscountedPrice: "TK 20.00",
      ProductMaindPrice: "TK 40.00",
      offer: "50%",
      quantity: 1, // Starting with 1 for better UX
    },
    {
      id: "2",
      image: "https://htbapi.hometexbd.ltd/images/uploads/product_thumb/beboon-thu-nov-2-2023-758-pm-30205.jpeg",
      name: "Product 2",
      ProductDiscountedPrice: "TK 30.00",
      ProductMaindPrice: "TK 60.00",
      offer: "50%",
      quantity: 1, // Starting with 1 for better UX
    },
    {
      id: "3",
      image: "https://htbapi.hometexbd.ltd/images/uploads/product_thumb/burbot-thu-nov-2-2023-744-pm-57895.jpeg",
      name: "Product 3",
      ProductDiscountedPrice: "TK 20.00",
      ProductMaindPrice: "TK 40.00",
      offer: "50%",
      quantity: 1, // Starting with 1 for better UX
    },
    {
      id: "4",
      image: "https://htbapi.hometexbd.ltd/images/uploads/product_thumb/mogra-thu-nov-2-2023-835-pm-92146.jpeg",
      name: "Product 4",
      ProductDiscountedPrice: "TK 70.00",
      ProductMaindPrice: "TK 100.00",
      offer: "30%",
      quantity: 1, // Starting with 1 for better UX
    },
  ]);

  const updateQuantity = (id, delta) => {
    const newProducts = products.map((product) => {
      if (product.id === id) {
        const updatedQuantity = product.quantity + delta;
        return { ...product, quantity: updatedQuantity < 1 ? 1 : updatedQuantity }; // Ensure quantity doesn't go below 1
      }
      return product;
    });
    setProducts(newProducts);
  };

  return (
    <div className="flex flex-wrap justify-center items-center">
      {products.map((product) => (
        <div key={product.id} className="m-2 flex border rounded-lg max-w-xl overflow-hidden shadow-sm hover:shadow-md">
          {/* Image and Quantity Control */}
          <div className="flex flex-col justify-between p-4">
            <img className="mb-4 rounded-lg" src={product.image} alt={product.name} style={{ width: "auto", maxHeight: "200px" }} />
            <div className="flex items-center gap-2 bg-gray-200 rounded-full">
              <button className=" px-3 py-1 rounded" onClick={() => updateQuantity(product.id, -1)}>-</button>
              <span className="px-3 py-1">{product.quantity}</span>
              <button className=" px-2 py-1 rounded" onClick={() => updateQuantity(product.id, 1)}>+</button>
            </div>
          </div>
          {/* Product Details */}
          <div className="flex flex-col justify-between p-4 bg-white w-full">
            <div>
              <h5 className="text-lg font-bold mb-2">{product.name}</h5>
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 mt-4 self-start">NEW</button>
              <p>
                <span className="text-lg font-bold text-red-600">{product.ProductDiscountedPrice}</span>
                <span className="text-sm text-gray-500 line-through ml-2">{product.ProductMaindPrice}</span>
              <p className="text-sm text-gray-600 mb-4">{product.offer} off</p>
              </p>
            </div>
            <button className="bg-green-500 text-white font-bold py-2 px-3 rounded-full hover:bg-green-600 mt-4 self-start">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestProducts;
