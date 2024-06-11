import { useContext, useEffect, useState } from "react";
import WishListContext from "@/context/WishListContext";
import CartContext from "@/context/CartContext";
import { getCookie } from "cookies-next";
import RecentView from "@/components/home/sticky/RecentView";
import Constants from "@/ults/Constant";
import { CiStar } from "react-icons/ci";
import DisclaimerModal from "@/pages/DisclaimerModal";
import styles from './faq.module.css';
import DownloadAppPopup from "@/components/layout/AppDownload/DownloadAppPopup";

import {
  FaShoppingBasket,
  FaDownload,
  FaGooglePlusG,
  FaPinterest,
  FaPhoneAlt, FaCommentAlt
} from "react-icons/fa";
import { FaXTwitter, FaSquareInstagram } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import RelatedProduct from "@/components/common/RelatedProduct";
import Link from "next/link";
import { useRouter } from 'next/router'; // Import useRouter
import { Router, useRouter as useRouterClient } from 'next/router'; // Import Router and useRouterClient
import CustomerSatisfactionBar from "@/components/CustomerSatisfactionBar";
import PriceDropNotificationButton from "./PriceDropNoti";
import TimeReminderBox from "@/components/layout/TimeReminderBox";
import SpinTheWheelPopup from "@/components/layout/spinwhile/SpinTheWheelPopup";

export async function getServerSideProps(context) {
  let id = context.query.id;
  const res = await fetch(
    `${Constants.BASE_URL}/api/products-details-web/` + id
  );
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}


const Product = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);


  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };



  const router = useRouter(); // Get the router instance
  const [showBusinessOnly, setShowBusinessOnly] = useState(true);

  const toggleBusinessOnly = () => {
    setShowBusinessOnly(!showBusinessOnly);
  };
  const [selectedImage, setSelectedImage] = useState(
    product.primary_photo?.photo
  );
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const image_URL = `${Constants.BASE_URL}/images/uploads/product`;

  const { addItemToCart } = useContext(CartContext);

  const [product_qty, setProductQty] = useState(1);

  const handleDecrement = () => {
    setProductQty((prevQty) => Math.max(prevQty - 1, 1));
  };
  const [showDownloadAppPopup, setShowDownloadAppPopup] = useState(false);

  const toggleDownloadAppPopup = () => {
    setShowDownloadAppPopup(!showDownloadAppPopup);
  };
  const handleIncrement = () => {
    setProductQty((prevQty) => Math.min(prevQty + 1, 100));
  };

  const handleAttributeChange = (selectedValue) => {
    const selectedAttribute = product.product_attributes.find(
      (attribute) => attribute.attribute_value.name === selectedValue
    );

    setSelectedAttribute(selectedAttribute);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen,] = useState(false);
  const [isDelivaryModalOpen, setIsDelivaryModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [iswhileModalOpen, setwhileModalOpen] = useState(false);

  const handlespinOpenPopup = () => {
    setwhileModalOpen(true);
  };

  const handlespinClosePopup = () => {
    setwhileModalOpen(false);
  };

  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);

  // Function to handle submission of feedback
  const submitFeedback = () => {
    // Here you can handle the submission logic, such as sending the feedback to your server
    console.log("Feedback:", feedbackText);
    console.log("Rating:", rating);
    // Reset input fields and close modal
    setFeedbackText('');
    setRating(0);
    setIsFeedbackModalOpen(false);
  };

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

  // Recent view items
  useEffect(() => {
    let recentitems = localStorage.getItem("recentview")
      ? JSON.parse(localStorage.getItem("recentview"))
      : [];

    let is_exist = false;
    let obj_key = [];
    for (let x in recentitems) {
      let txt = recentitems[x];
      if (txt?.id == product?.id) {
        is_exist = true;
        obj_key.push(x);
      }
    }

    // let obj_length = Object.keys(product).length;
    if (is_exist) {
      // console.log(obj_length, 'have_rmove', obj_key)
    } else {
      recentitems.push(product);
    }
    localStorage.setItem("recentview", JSON.stringify(recentitems));
  }, [product?.id]);

  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const handleAcceptDisclaimer = () => {
    setShowDisclaimerModal(false);
    // Proceed with add to cart logic
    addToCartHandler();
  };
  // Shopping cart
  const addToCartHandler = () => {
    // This utility function ensures that the input price is treated as a string,
    // removes any non-digit characters (except for the decimal point),
    // and then converts it back to a number.
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


  const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className={`${styles.collapsible}`}>
        <div className={`${styles.header}`} onClick={toggleOpen}>
          {title}
          <button className="toggle-button">
            {isOpen ? '▲' : '▼'}
          </button>
        </div>
        {isOpen && <div className={`${styles.content}`}>{children}</div>}
      </div>
    );
  };




  // add to wish list
  const { addRemoveWishList } = useContext(WishListContext);
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
  return (
    <>

      <div className="container mx-auto">
        <div className="grid grid-cols-12 py-10 gap-3">
          <div className="flex flex-row col-span-5 gap-2">
            <div className="space-y-4">
              {/* Dynamically generate thumbnail images */}
              {product?.photos?.length > 0 ? (
                product.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`${image_URL}_thumb/${photo}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 md:w-24 lg:w-36 border cursor-pointer"
                    onClick={() => setSelectedImage(photo)}
                  />
                ))
              ) : (
                <img
                  src={`${image_URL}_thumb/${product.primary_photo?.photo}`}
                  alt="Primary Image"
                  className="w-20 md:w-24 lg:w-48 border cursor-pointer"
                  onClick={() => setSelectedImage(product.primary_photo?.photo)}
                />
              )}
            </div>

            <div>


              {/* Main image without magnify effect */}
              <img
                alt="Primary Product Image"
                src={`${image_URL}/${selectedImage || product.primary_photo?.photo
                  }`}
                style={{ width: "80%" }} // This ensures the image is responsive and fits the container
              />
            </div>

          </div>

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
                <span className="font-bold bg-purple-400 p-2 rounded-full">
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
              {product.product_attributes.length > 0 && (
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
              )}
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
{/* {} */}
            </div>

            <div className="my-2 pb-2 flex items-center border-b"><button className="text-xl font-bold">Size Guides</button></div>

            <div className="my-2 pb-2 flex items-center ">
              <button className="text-xl font-bold">Find in Store</button>
            </div>
            <div className="relative">
              <div className="text-lg font-semibold mb-4">
                Have a Question in Mind?
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded"
                >
                  Call Now
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded"
                >
                  Chat Us
                </button>
              </div>
            </div>
            <TimeReminderBox />
            <div id="so-groups" className="fixed left-0 top-80 flex flex-col z-50 hidden md:block">
              <button
                className="sticky-review bg-red-600 hover:bg-red-700 text-white  py-2 px-4 h-40 w-9 cursor-pointer flex justify-center items-center border border-white rounded"
                onClick={handlespinOpenPopup}
              >
                <span className="text-xl transform rotate-90">Clickme</span>
              </button>

              <SpinTheWheelPopup isOpen={iswhileModalOpen} onClose={handlespinClosePopup} />



            </div>



            <div id="so-groups" className="fixed right-0 top-80 flex flex-col z-50 hidden md:block">
              <button
                className="sticky-review bg-red-600 hover:bg-red-700 text-white py-2 px-4 h-20 w-6 cursor-pointer flex justify-center items-center border border-white rounded"
                onClick={() => setIsReviewModalOpen(true)}
              >
                <span className="text-xl transform rotate-90">Review</span>
              </button>

              <button
                className="sticky-review bg-red-600 hover:bg-red-700 text-white   py-2 px-4 h-20 w-6 cursor-pointer flex justify-center items-center border border-white rounded"
                onClick={() => setIsOptionsModalOpen(true)}
              >
                <span className="text-xl transform rotate-90"> Options</span>
              </button>
              <button
                className="sticky-review bg-red-600 hover:bg-red-700 text-white  py-2 px-4 h-40 w-9 cursor-pointer flex justify-center items-center border border-white rounded"
                onClick={() => setIsFeedbackModalOpen(true)}
              >
                <span className="text-xl transform rotate-90">Feedback</span>
              </button>

              {/* Feedback Modal */}
              {isFeedbackModalOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden" onClick={() => setIsFeedbackModalOpen(false)}>
                  <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                  <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex" onClick={(e) => e.stopPropagation()}>
                    <div className="relative w-screen max-w-md">
                      <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-900">Feedback</h2>
                            <div className="ml-3 h-7 flex items-center">
                              <button onClick={() => setIsFeedbackModalOpen(false)} className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                                <span className="sr-only">Close panel</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <div className="absolute inset-0 px-4 sm:px-6">
                            <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true">
                              {/* Feedback content */}
                              <p className="text-sm text-gray-500 text-justify mb-4">Your feedback helps us improve! Please share your thoughts below.</p>
                              <textarea
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                placeholder="Your feedback here..."
                                className="w-full h-24 border-gray-300 rounded-md resize-none focus:ring-indigo-500 focus:border-indigo-500 mt-2 p-2"
                              ></textarea>
                              <div className="mt-4">
                                {/* Star rating */}
                                <p className="text-sm text-gray-500 text-justify mb-2">Rate your experience:</p>
                                {[...Array(5)].map((_, index) => (
                                  <button
                                    key={index}
                                    className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'} focus:outline-none focus:text-yellow-400`}
                                    onClick={() => setRating(index + 1)}
                                  >
                                    ★
                                  </button>
                                ))}
                              </div>
                              {/* Submit button */}
                              <button
                                onClick={submitFeedback}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* Review Modal */}
              {isReviewModalOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden" onClick={() => setIsReviewModalOpen(false)}>
                  <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                  <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex" onClick={(e) => e.stopPropagation()}>
                    <div className="relative w-screen max-w-md">
                      <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-900">Review Modal</h2>
                            <div className="ml-3 h-7 flex items-center">
                              <button onClick={() => setIsReviewModalOpen(false)} className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                                <span className="sr-only">Close panel</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <div className="absolute inset-0 px-4 sm:px-6">
                            <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true">
                              {/* Demo review data */}
                              <p className="text-sm text-gray-500 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus nisi. Integer eleifend eros non nulla convallis volutpat. Nam sagittis risus vel augue faucibus, a aliquam dui viverra. Donec euismod elit at purus tincidunt condimentum. Donec gravida, magna ut dictum consequat, libero est consectetur velit, nec mollis neque justo id nunc. Nam et eleifend felis, ut aliquet elit. Curabitur volutpat eros vitae tincidunt congue. Integer tincidunt libero at arcu ultrices, vel tincidunt ex faucibus. Ut bibendum, nisi vitae fringilla suscipit, ipsum magna iaculis purus, ut dapibus dui arcu ac ligula.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Options Modal */}
              {isOptionsModalOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden" onClick={() => setIsOptionsModalOpen(false)}>
                  <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>
                  <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex" onClick={(e) => e.stopPropagation()}>
                    <div className="relative w-screen max-w-md">
                      <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-900">Options Modal</h2>
                            <div className="ml-3 h-7 flex items-center">
                              <button onClick={() => setIsOptionsModalOpen(false)} className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                                <span className="sr-only">Close panel</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <div className="absolute inset-0 px-4 sm:px-6">
                            <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true">
                              {/* Demo options data */}
                              <p className="text-sm text-gray-500 text-justify">Option 1</p>
                              <p className="text-sm text-gray-500 text-justify">Option 2</p>
                              <p className="text-sm text-gray-500 text-justify">Option 3</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}



            </div>



            <div className="flex flex-col items-center border p-4 rounded-lg md:flex-row md:items-start">


              <div className="md:w-2/3">
                <h1 className="text-2xl font-bold mb-2">Free in-Store Pickup</h1>

                <div className="flex items-center mb-2">

                  <span className="font-semibold text-gray-800">Please enter a location to check store availability</span>


                </div>
                <div className="border-b pb-2 ">
                  <Link href="/Stores" className="bg-black text-white rounded-3xl px-2 py-1">
                    Check nearby stores
                  </Link>
                </div>

              </div>
            </div>
            <div className="border-b pb-2 text-center">
              <Link href="/Stores" className="bg-black text-white rounded-3xl px-10 py-2">
                Store Locations
              </Link>
            </div>

            <div className="fixed bottom-0 left-0 m-4">
              {/* <a
          href="tel:+1234567890"
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md flex justify-center items-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaPhoneAlt className="h-6 w-6 mr-2" />
          Have a question? Call now
        </a> */}

            </div>




            {/* <div className="flex justify-center items-center my-5 gap-3">
              <FaXTwitter className="text-2xl text-blue-400 hover:text-blue-600 transition-transform transform hover:scale-110" />
              <FaGooglePlusG className="text-3xl text-red-400 hover:text-red-600 transition-transform transform hover:scale-110" />
              <FaPinterest className="text-2xl text-red-700 hover:text-red-900 transition-transform transform hover:scale-110" />
              <FaSquareInstagram className="text-3xl text-pink-600 hover:text-pink-800 transition-transform transform hover:scale-110" />
            </div> */}
          </div>
          <div className="col-span-3">
            <div className="flex flex-col">
              <RelatedProduct />
            </div>
          </div>
        </div>
        <div className="alert-me-button fixed bottom-0 left-0 m-4">


        </div>
      </div>
    
      <PriceDropNotificationButton product={product} />
      {/* <PurchaseHistory/> */}
      <div className="flex flex-col items-center border p-2 rounded-lg md:flex-row md:items-start md:max-w-4xl mx-auto">
        <div className="md:w-1/4 mb-2 md:mb-0 md:mr-2">
          <img
            alt="Primary Product Image"
            src={`${image_URL}/${selectedImage || product.primary_photo?.photo}`}
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-1/4 mb-2 md:mb-0 md:mr-2">
          <img
            alt="Secondary Product Image"
            src="https://htbapi.hometexbd.ltd/images/uploads/product_thumb/unicorn-thu-nov-2-2023-821-pm-91981.jpeg"
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-xl font-bold mb-2">Frequently bought together</h1>
          <div className="flex items-center mb-2">
            <input type="checkbox" checked readOnly className="mr-2" />
            <span className="font-semibold">
              This Item: {product.name} ({product.volume})
            </span>
            <span className="line-through ml-2">৳ {product.original_price}</span>
            <span className="text-red-500 ml-2">৳ {product.discounted_price}</span>
          </div>
          <div className="flex items-center mb-2">
            <input type="checkbox" checked readOnly className="mr-2" />
            <span className="font-semibold">
              Rajkonna Acne Fighting Facial Wash With Jojoba Beads (100 ml)
            </span>
            <span className="line-through ml-2">৳ 185.00</span>
            <span className="text-red-500 ml-2">৳ 157.00</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-lg font-bold">Total price: ৳ 256</span>
          </div>
          <button className="bg-pink-500 text-white px-3 py-1 rounded">ADD BOTH TO CART</button>
        </div>
      </div>
      <CustomerSatisfactionBar />
    </>
  );
};

export default Product;
