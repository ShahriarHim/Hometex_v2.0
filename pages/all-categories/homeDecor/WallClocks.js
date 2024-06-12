

import Link from "next/link";
import React, { useRef, useState, useEffect, useMemo } from "react";
import Slider from "components/allCategory/Slider";

import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { Sticky } from "@/components/home/Sticky";
import Constants from "@/ults/Constant";
import ReactStars from "react-rating-stars-component";
// import PurchaseHistory from "../../PurchaseHistory";
import ProductModal from "@/components/common/ProductModal";
import DealOfTheWeek from "../DealOfTheWeek";
import ProductCard from "@/components/layout/ProductCard";

import LatestProducts from "@/components/LatestProducts";
import PurchaseHistory from "../PurchaseHistory";

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

const WallClocks = () => {
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item) => {
    if (item.id === 8) {
      setIsPopupVisible(true);
    }
  };
  const openModal = (product) => {
    console.log(product)
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setSelectedProduct(null);
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

      <DealOfTheWeek items={items} />

      {/*  */}

      <div className="max-w-screen-xl mx-auto px-3 mb-10 py-3">
        <Sticky />
        <PurchaseHistory />
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
                      className={`cursor-pointer ${selectedBrand === brand ? "text-blue-500 font-bold" : ""
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
                          className={`h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${selectedColors.includes(color)
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
                <h2 className="font-bold text-xl">Special Offer</h2>
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
            <LatestProducts />
          </div>
          <div className="md:col-span-3">
            <Slider />
            <h2 className="font-bold text-xl mb-3">Products</h2>

            {/* <WishComponent
        wishRef={wishRef}
        handleWishClick={handleWishClick}
        wishItems={wishItems}
        isWishOpen={isWishOpen}
        removeFromWishlist={removeFromWishlist}
      /> */}

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">

              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} openModal={openModal} />
              ))}
            </div>

            <div className="flex flex-col justify-center py-10">
              {filteredProducts.length > currentPage * itemsPerPage ? (
                <button onClick={readMoreHandler}>
                  <span className="px-3 py-2 bg-black text-white">
                    Load 12 More Products
                  </span>
                </button>
              ) : (
                <span className="px-3 py-2 bg-gray-400 text-white">End of Products</span>
              )}
              <div className="py-2 my-3 border-t border-b">{paginationBar}</div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <RequestStackModal
          product={requestProduct}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleRestockRequestSubmit}
        />
      )}
      <ProductModal product={selectedProduct} onClose={closeModal} />
    </>
  );
};

export default WallClocks;

