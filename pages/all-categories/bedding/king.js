import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import Slider from "components/allCategory/Slider";
import { MdFavorite } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { RiShoppingBasketFill, RiExchangeFill } from "react-icons/ri";
import {
  FaStar,
  FaShoppingCart,
  FaRegCaretSquareLeft,
  FaRegCaretSquareRight,
  FaRegWindowClose,
} from "react-icons/fa";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { Sticky } from "@/components/home/Sticky";
import Constants from "@/ults/Constant";
import ReactStars from "react-rating-stars-component";

const brands = ["Hometex Bangladesh M.", "Desiattire"];

const items = [
  {
    id: 1,
    name: "Bed Cover",
    imageUrl: "/images/all-categories/king/bedcover.jpg",
  },
  {
    id: 2,
    name: "Bedding",
    imageUrl: "/images/all-categories/king/bedding.png",
  },
  {
    id: 3,
    name: "Mattress",
    imageUrl: "/images/all-categories/king/mattress.jpg",
  },
  { id: 4, name: "Pillow", imageUrl: "/images/all-categories/king/pillow.jpg" },
  {
    id: 5,
    name: "Bed Runner",
    imageUrl: "/images/all-categories/king/bedrunner.jpg",
  },
  {
    id: 6,
    name: "sheet set",
    imageUrl: "/images/all-categories/king/shetset.jpg",
  },
  { id: 7, name: "Cover", imageUrl: "/images/all-categories/king/cover.jpg" },
  { id: 8, name: "", imageUrl: "/images/all-categories/king/saving.png" },
];

const King = () => {
  const popupProduct = {
    name: "Comfy Mattress",
    imageUrl:
      "https://htbapi.hometexbd.ltd/images/uploads/product_thumb/burbot-thu-nov-2-2023-744-pm-57895.jpeg",
    rating: 4,
    discountPrice: "TK 299",
    originalPrice: "Tk 499",
    percent: 45,
    countdown: {
      days: "02",
      hours: "15",
      min: "30",
      sec: "45",
    },
  };

  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [isBrandsOpen, setIsBrandsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [isColorsOpen, setIsColorsOpen] = useState(true);
  const [metarialsOpen, setIsMetarialsOpen] = useState(false);
  const [spexialOfferOpen, setIsSpecialOfferOpen] = useState(false);
  const [giftingOpen, setIsGiftingOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleItemClick = (item) => {
    if (item.id === 8) {
      setIsPopupVisible(true);
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    fetch(`${Constants.BASE_URL}/api/products-web`)
      .then((response) => response.json())
      .then((responseData) => {
        const kingProducts = responseData.data.filter(
          (product) => product.child_sub_category?.name === "King"
        );
        setProducts(kingProducts);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };
  const handlePriceChange = (event, type) => {
    const value = parseInt(event.target.value, 10);
    setPriceRange((prevRange) =>
      type === "min"
        ? [Math.min(value, prevRange[1]), prevRange[1]]
        : [prevRange[0], Math.max(value, prevRange[0])]
    );
  };

  const parsePrice = (priceString) => {
    const numericPart = priceString.replace(/[^0-9.-]+/g, "");
    return parseFloat(numericPart);
  };

  const handleColorClick = (color) => {
    if (color === "Not Color") {
      setSelectedColors(["Not Color"]);
    } else {
      setSelectedColors((prevColors) =>
        prevColors.includes(color)
          ? prevColors.filter((c) => c !== color)
          : [...prevColors.filter((c) => c !== "Not Color"), color]
      );
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const brandMatch =
        selectedBrand === "All" || product?.brand?.name === selectedBrand;
      const priceMatch =
        parsePrice(product?.price) >= priceRange[0] &&
        parsePrice(product?.price) <= priceRange[1];
      const colorMatch =
        selectedColors.length === 0 || selectedColors.includes(product.color);

      return brandMatch && priceMatch && colorMatch;
    });
  }, [products, selectedBrand, priceRange, selectedColors]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const readMoreHandler = () => {
    const newItemsPerPage = itemsPerPage + 12;
    setItemsPerPage(newItemsPerPage);
  };
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <img src="/images/hometex-logo.png" alt="Logo" className="w-32 h-32" />
      </div>
    );
  }

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleBrands = () => {
    setIsBrandsOpen(!isBrandsOpen);
  };

  const togglePriceFilter = () => {
    setIsPriceOpen(!isPriceOpen);
  };
  const toggleColorFilter = () => {
    setIsColorsOpen(!isColorsOpen);
  };
  const toggleMatarialsFilter = () => {
    setIsMetarialsOpen(!isColorsOpen);
  };
  const toggleSpecialOfferFilter = () => {
    setIsSpecialOfferOpen(!isColorsOpen);
  };
  const toggleGiftingFilter = () => {
    setIsGiftingOpen(!isColorsOpen);
  };

  const paginationBar = (
    <div className="flex justify-center items-center space-x-1 my-4">
      <button
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        First
      </button>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &laquo; Prev
      </button>

      {/* Dynamic Pagination Buttons - Only showing current page and the next one if it exists */}
      {currentPage > 1 && (
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="hidden md:inline px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-100"
        >
          {currentPage - 1}
        </button>
      )}

      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md border border-blue-500 hover:bg-blue-600">
        {currentPage}
      </button>

      {currentPage < totalPages && (
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="hidden md:inline px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-100"
        >
          {currentPage + 1}
        </button>
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next &raquo;
      </button>
      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Last
      </button>
    </div>
  );
  return (
    <>
      <div className="bg-yellow-50 py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="text-center"
                onClick={() => handleItemClick(item)}
              >
                {item.imageUrl ? (
                  <div className="w-36 h-36 rounded-full overflow-hidden mx-auto relative shadow-lg bg-white">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="object-cover object-center w-full h-full"
                      style={{ transform: "scale(1.1)" }}
                    />
                  </div>
                ) : null}
                <p className="mt-2">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {isPopupVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-8 rounded-lg max-w-6xl w-full mx-auto">
              <button
                onClick={closePopup}
                className="absolute top-0 right-1 text-lg p-2 rounded-full hover:bg-gray-200"
              >
                <FaRegWindowClose />
              </button>
              <div className="flex justify-between items-center border-b">
                <h2 className="text-2xl font-bold mb-4">DEAL OF THE WEEK</h2>
                <div className="flex justify-between items-center gap-2 text-2xl">
                  <button className="hover:text-blue-500 transition-colors duration-200">
                    <FaRegCaretSquareLeft />
                  </button>
                  <button className="hover:text-blue-500 transition-colors duration-200">
                    <FaRegCaretSquareRight />
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center pt-3">
                <div className="flex flex-col md:flex-row justify-center items-center p-4 bg-white rounded-lg mx-auto">
                  <div className="md:w-1/2 p-4">
                    <div className="flex gap-2">
                      <div>
                        <p className="px-2 py-1 bg-red-700 text-white rounded-tr-lg rounded-bl-lg">
                        {popupProduct.percent}%
                        </p>
                      </div>
                      <img
                        src={popupProduct.imageUrl}
                        alt={popupProduct.name}
                        className="object-cover object-center rounded-md"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 p-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{popupProduct.name}</h2>
                      <div className="flex my-2">
                        {[...Array(5)].map((star, index) => (
                          <FaStar
                            key={index}
                            className={
                              index < popupProduct.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <div className="my-2">
                        <span className="text-red-500 text-lg font-bold">
                          {popupProduct.discountPrice}
                        </span>
                        <span className="text-gray-500 line-through ml-2">
                          {popupProduct.originalPrice}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center mt-4">
                      {Object.entries(popupProduct.countdown).map(
                        ([unit, value], index) => (
                          <div key={index}>
                            <span className="text-lg font-semibold">
                              {value}
                            </span>
                            <p className="text-sm text-gray-600">
                              {unit.toUpperCase()}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                    <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center">
                      <FaShoppingCart className="mr-2" /> Add to Cart
                    </button>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center p-4 bg-white rounded-lg mx-auto border-l">
                  <div className="md:w-1/2 p-4">
                    <div className="flex gap-2">
                      <div>
                        <p className="px-2 py-1 bg-red-700 text-white rounded-tr-lg rounded-bl-lg">
                        {popupProduct.percent}%
                        </p>
                      </div>
                      <img
                        src={popupProduct.imageUrl}
                        alt={popupProduct.name}
                        className="object-cover object-center rounded-md"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 p-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{popupProduct.name}</h2>
                      <div className="flex my-2">
                        {[...Array(5)].map((star, index) => (
                          <FaStar
                            key={index}
                            className={
                              index < popupProduct.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <div className="my-2">
                        <span className="text-red-500 text-lg font-bold">
                          {popupProduct.discountPrice}
                        </span>
                        <span className="text-gray-500 line-through ml-2">
                          {popupProduct.originalPrice}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center mt-4">
                      {Object.entries(popupProduct.countdown).map(
                        ([unit, value], index) => (
                          <div key={index}>
                            <span className="text-lg font-semibold">
                              {value}
                            </span>
                            <p className="text-sm text-gray-600">
                              {unit.toUpperCase()}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                    <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center">
                      <FaShoppingCart className="mr-2" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/*  */}

      <div className="max-w-screen-xl mx-auto px-3 mb-10 py-3">
        <Sticky />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="border-b-2">
              {/* Brands Accordion Header */}
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl mb-3">Brands</h2>
                <button onClick={toggleBrands}>
                  {isBrandsOpen ? (
                    <AiOutlineUp size={18} />
                  ) : (
                    <AiOutlineDown size={18} />
                  )}
                </button>
              </div>
              {/* Brands Accordion Content */}
              {isBrandsOpen && (
                <ul>
                  <li onClick={() => handleBrandChange("All")}>All</li>
                  {brands.map((brand) => (
                    <li
                      key={brand}
                      className={`cursor-pointer ${
                        selectedBrand === brand ? "text-blue-500 font-bold" : ""
                      }`}
                      onClick={() => handleBrandChange(brand)}
                    >
                      {brand}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-b-2">
              {/* <!-- Price Filter Accordion Header --> */}
              <div className="flex justify-between items-center my-3">
                <h2 className="font-bold text-xl">Price</h2>
                <button onClick={togglePriceFilter}>
                  {isPriceOpen ? (
                    <AiOutlineUp size={18} />
                  ) : (
                    <AiOutlineDown size={18} />
                  )}
                </button>
              </div>
              {isPriceOpen && (
                <div className="py-4 px-2 bg-white rounded-lg shadow">
                  <label
                    htmlFor="price-range"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select price range:
                  </label>
                  <div className="mt-2 flex justify-between items-center">
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, "min")}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, "max")}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="mt-4 flex justify-between text-xs font-medium text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-gray-200 pt-4">
              {/* Accordion Header */}
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl">Colors</h2>
                <button onClick={toggleColorFilter}>
                  {isColorsOpen ? (
                    <AiOutlineUp size={18} />
                  ) : (
                    <AiOutlineDown size={18} />
                  )}
                </button>
              </div>

              {/* Accordion Content */}
              {isColorsOpen && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {["Red", "Blue", "Green", "Yellow", "Black", "White"].map(
                      (color) => (
                        <button
                          key={color}
                          className={`h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            selectedColors.includes(color)
                              ? "ring-2 ring-offset-2 ring-blue-500"
                              : ""
                          }`}
                          style={{ backgroundColor: color.toLowerCase() }} // Ensure your colors are in a valid CSS format
                          onClick={() => handleColorClick(color)}
                        ></button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="border-b-2 py-3">
              <div className="flex justify-between items-center mt-2">
                <h2 className="font-bold text-xl">Metarials</h2>
                <button onClick={toggleMatarialsFilter}>
                  {isColorsOpen ? (
                    <AiOutlineUp size={18} />
                  ) : (
                    <AiOutlineDown size={18} />
                  )}
                </button>
              </div>
            </div>
            <div className="border-b-2 py-3">
              <div className="flex justify-between items-center mt-2">
                <h2 className="font-bold text-xl">Spexial Offer</h2>
                <button onClick={toggleSpecialOfferFilter}>
                  {isColorsOpen ? (
                    <AiOutlineUp size={18} />
                  ) : (
                    <AiOutlineDown size={18} />
                  )}
                </button>
              </div>
            </div>
            <div className="border-b-2 py-2">
              <div className="flex justify-between items-center mt-2">
                <h2 className="font-bold text-xl">Gifting</h2>
                <button onClick={toggleGiftingFilter}>
                  {isColorsOpen ? (
                    <AiOutlineUp size={18} />
                  ) : (
                    <AiOutlineDown size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <Slider />
            <h2 className="font-bold text-xl mb-3">Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {displayedProducts.map((product) => (
  <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 relative">
    <Link href={`/Shop/product/${product.id}`}>
      <img
        src={product.primary_photo}
        alt={product.name}
        className="w-full object-fit rounded-t-lg"
      />
    </Link>
    <div className="absolute top-10 right-0 p-2 opacity-0 hover:opacity-100 transition duration-300 bg-[#999]">
      <RiShoppingBasketFill
        size={34}
        color="#fff"
        className="bg-[#999] hover:bg-[#009688] m-2 p-2"
      />
      <MdFavorite
        size={34}
        color="#fff"
        className="bg-[#999] hover:bg-[#009688] m-2 p-2"
      />
      <RiExchangeFill
        size={34}
        color="#fff"
        className="bg-[#999] hover:bg-[#009688] m-2 p-2"
      />
    </div>
    <div className="p-4">
      <ReactStars
        count={5}
        size={24}
        value={5}
        edit={false}
        activeColor="#ffd700"
      />
      <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
      <div className="flex justify-between mt-2">
        <p className="text-gray-700">${product.price}</p>
        <p className="text-gray-700">{product.color}</p>
      </div>
    </div>
    <div className="p-4 border-t border-gray-200">
      <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
        Add to Cart
      </button>
    </div>
  </div>
))}
            </div>
            <div className="flex flex-col justify-center py-10">
              <button onClick={readMoreHandler}>
                <span className="px-3 py-2 bg-black text-white">
                  Load 12 More products
                </span>
              </button>
              <div className="py-2 my-3 border-t border-b">{paginationBar}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default King;
