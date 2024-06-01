import CartContext from "@/context/CartContext";
import React, { useState, useEffect, useRef, useContext } from "react";
import { RiCloseLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

const ProductModal = ({ product, onClose }) => {
  const { addItemToCart } = useContext(CartContext);
  const [productQty, setProductQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("blue");
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addToCartHandler = () => {
    addItemToCart({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.primary_photo,
      quantity: productQty,
      in_stock: product.stock,
      supplier_id: product.supplier_id,
      sku: product.sku,
      total_price: parseFloat(product.price) * productQty,
      size: selectedSize,
      color: selectedColor,
    });
    onClose(); // Optionally close the modal on adding to cart
  };

  const increaseQuantity = () => {
    setProductQty((prevQty) => Math.min(prevQty + 1, product.stock));
  };

  const decreaseQuantity = () => {
    setProductQty((prevQty) => Math.max(prevQty - 1, 1));
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 py-6 sm:px-0 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full"
      >
        <div className="px-4 py-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img
              src={product.primary_photo}
              alt={product.name}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Price: {product.price}
              </p>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={product.stock > 0}
                  readOnly
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2 text-gray-700">
                  In Stock {product.stock}
                </span>
              </div>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((star, index) => (
                  <FaStar
                    key={index}
                    color={index < product.rating ? "#ffc107" : "#e4e5e9"}
                    className="mr-1"
                  />
                ))}
              </div>
            </div>
            <div className="mb-2">
              <p className="font-semibold mb-2">Overview</p>
              <p className="text-gray-700">
                Premium Quality {product.category?.name} Product
              </p>
            </div>
            <div className="mb-2">
              <p className="font-semibold mb-2">Size</p>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md ${selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-100"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <p className="font-semibold mb-2">Color</p>
              <div className="flex gap-2">
                {["blue", "red", "orange", "green"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full ${selectedColor === color ? "ring-2 ring-blue-500" : ""
                      }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="mb-2">
              <p className="font-semibold mb-2">Quantity</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseQuantity}
                  className="px-2 py-1 bg-gray-200 rounded-md"
                >
                  -
                </button>
                <input
                  type="number"
                  className="block w-16 px-4 py-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline-gray"
                  min="1"
                  max={product.stock}
                  step="1"
                  value={productQty}
                  onChange={(e) => {
                    const newQty = Math.min(Math.max(e.target.value, 1), product.stock);
                    setProductQty(newQty);
                  }}
                />
                <button
                  onClick={increaseQuantity}
                  className="px-2 py-1 bg-gray-200 rounded-md"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col pt-2 gap-2 items-center">
              <button
                onClick={addToCartHandler}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <button
            onClick={onClose}
            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <RiCloseLine size="24" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
