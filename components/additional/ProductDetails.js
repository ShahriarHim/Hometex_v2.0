import { useContext, useEffect, useState } from "react";
import CartContext from "@/context/CartContext";
import Link from 'next/link'; // Import Link from Next.js
import { MdFavorite } from 'react-icons/md'; // Import MdFavorite from react-icons/md
import DisclaimerModal from '@/pages/DisclaimerModal'; // Import DisclaimerModal component
import DownloadAppPopup from '../layout/AppDownload/DownloadAppPopup'// DownloadAppPopup component
import TimeReminderBox from '../layout/TimeReminderBox'; // Import TimeReminderBox component
import { CiStar } from "react-icons/ci";
import {FaDownload} from "react-icons/fa";

const ProductDetails = ({ product, router }) => {
  const [product_qty, setProductQty] = useState(1);
  const [showBusinessOnly, setShowBusinessOnly] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelivaryModalOpen, setIsDelivaryModalOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const { addItemToCart } = useContext(CartContext);

  const getPrice = () => {
    if (selectedAttribute) {
      const { attribute_math_sign, attribute_number } = selectedAttribute;

      switch (attribute_math_sign) {
        case "+":
          return product.price + attribute_number;
        case "-":
          return product.price - attribute_number;
        case "*":
          return product.price * attribute_number;
        case "/":
          return product.price / attribute_number;
        default:
          return product.price;
      }
    }

    return product.price;
  };

  const toggleBusinessOnly = () => {
    setShowBusinessOnly(!showBusinessOnly);
  };
  const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };
  }
  const handleIncrement = () => {
    setProductQty((prevQty) => Math.min(prevQty + 1, 100));
  };

  const handleDecrement = () => {
    setProductQty((prevQty) => Math.max(prevQty - 1, 1));
  };

  // Shopping cart
  const addToCartHandler = () => {
 
    setShowDisclaimerModal(true); // Show the disclaimer modal when "Add to Cart" is clicked

    const cleanPrice = (priceInput) => {
      // Ensure priceInput is treated as a string if it's not null or undefined
      const priceString = priceInput !== null && priceInput !== undefined ? String(priceInput) : '0';
      // Remove any character that is not a digit or a decimal point, then convert to a number
      const numericValue = Number(priceString.replace(/[^\d.]/g, ''));
      return numericValue;
    };

    // Clean the individual price and calculate & clean the total price.
    const cleanedPrice = cleanPrice(product.price);
    const cleanedTotalPrice = cleanPrice(getPrice() * product_qty);

    addItemToCart({
      product_id: product.id,
      name: product.name,
      category: product.category.id,
      categoryName: product.category.name,
      sub_category: product.sub_category.id,
      sub_categoryName: product.sub_category.name,
      child_sub_category: product.child_sub_category.id,
      child_sub_categoryName: product.child_sub_category.name,
      price: cleanedPrice, // Use the cleaned price
      image: product.primary_photo,
      in_stock: product.stock,
      supplier_id: product.supplier_id,
      quantity: product_qty,
      sku: product.sku,
      total_price: cleanedTotalPrice, // Use the cleaned and calculated total price
    });
  };

  const attToWishList = (productId) => {
    let user_token = getCookie("home_text_token");
    if (typeof user_token == "undefined") {
      alert("Please Login");
      return false;
    } else {
      addRemoveWishList({
        product_id: productId,
      });
    }
  };

  
  const [showDownloadAppPopup, setShowDownloadAppPopup] = useState(false);

  const toggleDownloadAppPopup = () => {
    setShowDownloadAppPopup(!showDownloadAppPopup);
  };

  
  const handleAttributeChange = (selectedValue) => {
    const selectedAttribute = product.product_attributes.find(
      (attribute) => attribute.attribute_value.name === selectedValue
    );

    setSelectedAttribute(selectedAttribute);
  };

  return (
    <div className="col-span-4 mx-2">
            <h1 className="text-2xl pb-2">{product.name}</h1>
            <p className="text-sm pb-2">
              {"{"}
              {product?.sub_category?.name} :{" "}
              {product?.child_sub_category?.name}
              {"}"}
            </p>

            <div className="flex flex-auto justify-between items-center">
              <p className="text-lg font-semibold  text-red-500">
                <span className="text-xl font-extrabold">৳</span> {getPrice()}
              </p>
              <div className="flex flex-auto justify-end items-center">
                {[...Array(5)].map((_, i) => (
                  <CiStar
                    key={i}
                    style={{ color: "#fbbf24" }}
                    size={20}
                    fill="#fbbf24"
                  />
                ))}{" "}
                / 2 reviews
              </div>
            </div>

            <p className="text-purple-600 font-semibold">
              Save ৳ 131 {"{"}34% off{"}"}
            </p>
            <div className="flex flex-auto text-sm">
              {" "}
              <p className="bg-purple-200 py-2 px-4 rounded-xl mt-2 flex flex-row gap-2 items-center">
                <FaDownload />
                <button onClick={toggleDownloadAppPopup}>
                  Download App for <span className="font-bold">ios</span> or{' '}
                  <span className="font-bold">Android</span>
                </button>
              </p>
            </div>
            <div className="flex flex-auto mt-2 text-sm">
              {" "}
              <p className="bg-purple-200 py-2 px-4 rounded-xl mt-2 flex flex-row gap-2 items-center">
                <span className="font-bold bg-purple-400 p-2 rounded-md">
                  No#12 Best Seller{" "}
                </span>{" "}
                in all over Bangladesh
              </p>
            </div>

            <div className="my-2">
              <p className="font-semibold mb-2">Available Options</p>
              <div className="flex items-center">
                {/* <div className="bg-purple-600 text-white px-2 py-1 rounded-md mr-2"> */}
                <p className=" text-purple-600 font-semibold">Pro Price:     </p>
                {/* </div> */}
                <div
                  className={`cursor-pointer border border-purple-600 px-1 py-1 rounded-md relative ${showBusinessOnly ? 'bg-white text-purple-600' : 'bg-purple-500 text-white'
                    }`}
                  onClick={toggleBusinessOnly}
                >
                  <span className="font-semibold">
                    {showBusinessOnly ? 'Business Only' : '$2000.99'}
                  </span>
                  {showBusinessOnly && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-purple-600 rounded-full"></div>
                  )}
                </div>
              </div>
              <p>{product.sub_category?.name} Size</p>
              {/* {product.product_attributes.length > 0 && (
                <select
                  className="border w-full p-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline-gray"
                  onChange={(e) => handleAttributeChange(e.target.value)}
                >
                  <option value="default">Select an option</option>
                  {product.product_attributes.map((attribute) => (
                    <option
                      key={attribute.id}
                      value={attribute.attribute_value.name}
                    >
                      {attribute.attribute_value.name}
                    </option>
                  ))}
                </select>
              )} */}
            </div>
            <div className="flex flex-auto mt-2 text-sm">
              {product.stock < 5 && (
                <p className="bg-purple-200 py-2 px-4 rounded-xl mt-2 flex flex-row gap-2 items-center" >
                  <span
                    className="font-bold bg-purple-400 p-2 rounded-full"
                    disabled
                  >
                    Low Quantity : Only {product.stock} left
                  </span>
                </p>
              )}
            </div>
            <div className="flex pt-2 gap-2 font-bold">
              <div className="flex justify-between items-center">
                <button
                  className="px-3 py-0.5 bg-gray-100 text-2xl font-bold rounded-l-xl hover:bg-gray-300 focus:outline-none"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  type="number"
                  className="block w-full py-1.5 text-center rounded-none bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline-gray"
                  min="1"
                  max="100"
                  step="1"
                  value={product_qty}
                  onChange={(e) => {
                    const val = Math.max(
                      1,
                      Math.min(100, Number(e.target.value))
                    );
                    setProductQty(val);
                  }}
                />
                <button
                  className="pr-3 py-0.5 bg-gray-100 text-2xl font-bold rounded-r-xl hover:bg-gray-300 focus:outline-none"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  onClick={addToCartHandler}
                  className="flex items-center justify-center px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                >
                  Add to Cart
                </button>
                <DisclaimerModal
                  isOpen={showDisclaimerModal}
                  onClose={() => setShowDisclaimerModal(false)}
                  onAccept={() => setShowDisclaimerModal(false)}
                />

              </div>
              <div>
                <button
                  onClick={(e) => {
                    attToWishList(product.id);
                  }}
                  className="flex items-center justify-center px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                >
                  <MdFavorite className="mx-1 text-2xl" />
                </button>
              </div>
            </div>
            <div className="col-span-12 flex justify-between">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => router.push(`/Shop/product/${parseInt(router.query.id) - 1}`)}
              // disabled={parseInt(router.query.id) === 64} // Disable the "Previous" button for the first product
              >
                Previous
              </button>

              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => router.push(`/Shop/product/${parseInt(router.query.id) + 1}`)}
              // disabled={parseInt(router.query.id) === 65} // Disable the "Next" button for the last product
              >
                Next
              </button>
            </div>
            <div className="my-2 py-2 flex items-center border-b border-t">
              <button
                className="text-xl font-bold"
                onClick={() => setIsModalOpen(true)}
              >
                Product Description
              </button>

              {isModalOpen && (
                <div
                  className="fixed inset-0 z-50 overflow-hidden"
                  onClick={() => setIsModalOpen(false)}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                  <div
                    className="fixed inset-y-0 right-0 pl-10 max-w-full flex"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative w-screen max-w-md">
                      <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-900">Product Description</h2>
                            <div className="ml-3 h-7 flex items-center">
                              <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                              >
                                <span className="sr-only">Close panel</span>
                                {/* Icon for closing or a simple "X" can be used */}
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          {/* Product Description */}
                          <div className="absolute inset-0 px-4 sm:px-6">
                            <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true">
                              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                                <svg
                                  className="h-6 w-6 text-blue-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <div className="mt-2 px-7 py-3">
                                {/* Product description goes here */}
                                <p className="text-sm text-gray-500 text-justify" dangerouslySetInnerHTML={{ __html: product.description }}></p>
                              </div>
                              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                  onClick={() => setIsModalOpen(false)}
                                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>


            <div className="my-2 pb-2 flex items-center border-b">
              <button
                className="text-xl font-bold"
                onClick={() => setIsDelivaryModalOpen(true)}
              >
                Delivery & returns
              </button>
              {isDelivaryModalOpen && (
                <div
                  className="fixed inset-0 z-50 overflow-hidden"
                  onClick={() => setIsDelivaryModalOpen(false)}
                >
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                  ></div>
                  <div
                    className="fixed inset-y-0 right-0 pl-10 max-w-full flex"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="relative w-screen max-w-md"
                    >
                      <div
                        className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
                      >
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                              Delivery & Return
                            </h2>
                            <div className="ml-3 h-7 flex items-center">
                              <button
                                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                                onClick={() => setIsDelivaryModalOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                {/* Place your close icon here */}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 relative flex-1 px-4 sm:px-6">
                          {/* Replace this section with your modal content */}
                          <div className="absolute inset-0 px-4 sm:px-6">
                            <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true">
                              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                                <svg
                                  className="h-6 w-6 text-blue-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <div className="mt-2 px-7 py-3 text-justify">
                                <div className="flex flex-col gap-2">
                                  <p className="font-bold">Delivery & Return</p>
                                  <p className="text-gray-500">SKU : {product?.sku}</p>
                                  <p className="text-gray-500">
                                    Catagories: {product?.category?.name} top selling
                                    product in all over the Bangladesh. Can be your best
                                    choice
                                  </p>
                                  <p className="text-gray-500">
                                    Tag: {product?.child_sub_category?.name}
                                  </p>
                                  <p className="text-gray-500">
                                    Brand: {product?.brand?.name}
                                  </p>
                                </div>
                              </div>
                              <div className="items-center px-4 py-3">
                                <button
                                  id="ok-btn"
                                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                                  onClick={() => setIsDelivaryModalOpen(false)}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
            <DownloadAppPopup
              isOpen={showDownloadAppPopup}
              onClose={toggleDownloadAppPopup}
            />
            <div className="my-2 pb-2 flex items-center border-b">
              <button
                className="text-xl font-bold"
                onClick={() => setIsDelivaryModalOpen(true)}
              >
                Frequently Asked Question
              </button>
              {isDelivaryModalOpen && (
                <div
                  className="fixed inset-0 z-50 overflow-hidden"
                  onClick={() => setIsDelivaryModalOpen(false)}
                >
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                  ></div>
                  <div
                    className="fixed inset-y-0 right-0 pl-10 max-w-full flex"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="relative w-screen max-w-md"
                    >
                      <div
                        className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
                      >
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                              FAQ about this Product
                            </h2>
                            <div className="ml-3 h-7 flex items-center">
                              <button
                                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                                onClick={() => setIsDelivaryModalOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                {/* Place your close icon here */}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 relative flex-1 px-4 sm:px-6">
                          {/* Replace this section with your modal content */}
                          <div className="absolute inset-0 px-4 sm:px-6">
                            <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true">
                              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                                <svg
                                  className="h-6 w-6 text-blue-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <div className="mt-2 px-7 py-3 text-justify">
                                <CollapsibleSection title="How do I wash my bedding?">
                                  <p>For softer bedsheets, for the first wash, add 1 cup of baking soda to your wash cycle and 1/2 cup of white vinegar to the rinse cycle. We have tested this multiple times and it has a huge impact towards the softness of your sheets.</p>
                                </CollapsibleSection>
                                <CollapsibleSection title="What is your bedding and bed sheets made of?">
                                  <p>Our sheets are made from 400 thread count, 37mm extra-long staple cotton in order to guarantee long-lasting, soft and comfortable bed sheets.</p>
                                </CollapsibleSection>
                                <CollapsibleSection title="What is the thread count of your sheets?">
                                  <p>In the market, you will see thread counts ranging from 50 to 1500. After thorough research and endless testing, we found that thread count matters – up to a certain level. Anything more than 500 thread count is highly suspicious and is seemed to be purely marketing.</p>
                                </CollapsibleSection>
                                <CollapsibleSection title="What are the dimensions of your bedding?">
                                  <p>Fitted Super King – 202cm x 202cm x 35cm<br />Fitted King – 183cm x 193cm x 40cm</p>
                                </CollapsibleSection>
                              </div>
                              <div className="items-center px-4 py-3">
                                <button
                                  id="ok-btn"
                                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                                  onClick={() => setIsDelivaryModalOpen(false)}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
 
            </div>

            <div className="my-2 pb-2 flex items-center border-b"><button className="text-xl font-bold">Size Guides</button></div>

            <div className="my-2 pb-2 flex items-center ">
              <button className="text-xl font-bold">Find in Store</button>
            </div>

          </div>
  );
};

export default ProductDetails;
