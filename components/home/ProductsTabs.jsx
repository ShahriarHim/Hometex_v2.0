import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { MdFavorite } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { RiShoppingBasketFill, RiExchangeFill } from "react-icons/ri";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Autoplay } from "swiper";
import Link from "next/link";
import ProductModal from "../common/ProductModal";

const ProductsTabs = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Function to open modal with product details
  const openModal = (product) => {
    setSelectedProduct(product);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedProduct(null);
  };
  const params = {
    slidesPerView: 4,
    spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      400: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      639: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      865: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1000: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1500: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1700: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    freeMode: true,
    loop: true,
    centeredSlides: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, FreeMode],
    className: "mySwiper",
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-3 mb-10">
        <Tabs>
          <TabList className="flex flex-wrap justify-center lg:justify-start items-center gap-24 py-2">
            <Tab className="text-gray-500 bg-gray-100 py-6 px-4 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out rounded-lg shadow-sm hover:shadow-lg w-full lg:w-auto flex justify-center items-center">
              All Products
            </Tab>
            <Tab className="group py-2 px-4 focus:outline-none transition duration-150 ease-in-out rounded-lg shadow-sm hover:shadow-lg bg-white w-full lg:w-auto flex justify-center items-center">
              <img src="/images/icons/extra-king.png" className="rounded-full h-14 group-hover:scale-110 transition-transform" alt="Extra King" />
            </Tab>
            <Tab className="group py-2 px-4 focus:outline-none transition duration-150 ease-in-out rounded-lg shadow-sm hover:shadow-lg bg-white w-full lg:w-auto flex justify-center items-center">
              <img src="/images/icons/king.png" className="rounded-full h-14 group-hover:scale-110 transition-transform" alt="King" />
            </Tab>
            <Tab className="group py-2 px-4 focus:outline-none transition duration-150 ease-in-out rounded-lg shadow-sm hover:shadow-lg bg-white w-full lg:w-auto flex justify-center items-center">
              <img src="/images/icons/semi-double.png" className="rounded-full h-14 group-hover:scale-110 transition-transform" alt="Semi Double" />
            </Tab>
            <Tab className="group py-2 px-4 focus:outline-none transition duration-150 ease-in-out rounded-lg shadow-sm hover:shadow-lg bg-white w-full lg:w-auto flex justify-center items-center">
              <img src="/images/icons/single.png" className="rounded-full h-14 group-hover:scale-110 transition-transform" alt="Single" />
            </Tab>
          </TabList>
          <div className="lg:flex-grow">
            <TabPanel>
              <Swiper {...params}>
                {products.length > 0 &&
                  products.map((product, i) => (
                    <SwiperSlide key={i}>
                      <div className="relative w-60 max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 border mt-5 object-fit">
                        <img
                          className="p-4 rounded-t-lg object-fit"
                          src={product.primary_photo}
                          alt={product.name}
                          onClick={() => openModal(product)}
                        />
                        <div className="absolute top-0 right-0 p-2 opacity-0 hover:opacity-100 transition duration-300 ">
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
                        <div className="px-5 pb-5">
                          <ReactStars
                            count={5}
                            size={24}
                            value={5}
                            edit={false}
                            activeColor="#ffd700"
                          />

                          <Link href={`/Shop/product/${product.id}`}><h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                            {product.name}
                          </h5>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-red-900 dark:text-white">
                                Price: TK {product.price}
                              </span>
                            </div></Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </TabPanel>
            <TabPanel>
              <Swiper {...params}>
                {products
                  .filter((product) => product?.child_sub_category?.name?.toLowerCase() === "extra-king")
                  .map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="relative w-60 max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 border mt-5 object-fit">
                        <img
                          className="p-4 rounded-t-lg object-fit"
                          src={product.primary_photo}
                          alt={product.name}
                          onClick={() => openModal(product)}
                        />
                        <div className="absolute top-0 right-0 p-2 opacity-0 hover:opacity-100 transition duration-300 ">
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
                        <div className="px-5 pb-5">
                          <ReactStars
                            count={5}
                            size={24}
                            value={5}
                            edit={false}
                            activeColor="#ffd700"
                          />

                          <Link href={`/Shop/product/${product.id}`}><h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                            {product.name}
                          </h5>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-red-900 dark:text-white">
                                Price: TK {product.price}
                              </span>
                            </div></Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </TabPanel>
            <TabPanel>
              <Swiper {...params}>
                {products
                  .filter((product) => product?.child_sub_category?.name?.toLowerCase() === "king")
                  .map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="relative w-60 max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 border mt-5 object-fit">
                        <img
                          className="p-4 rounded-t-lg object-fit"
                          src={product.primary_photo}
                          alt={product.name}
                          onClick={() => openModal(product)}
                        />
                        <div className="absolute top-0 right-0 p-2 opacity-0 hover:opacity-100 transition duration-300 ">
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
                        <div className="px-5 pb-5">
                          <ReactStars
                            count={5}
                            size={24}
                            value={5}
                            edit={false}
                            activeColor="#ffd700"
                          />

                          <Link href={`/Shop/product/${product.id}`}><h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                            {product.name}
                          </h5>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-red-900 dark:text-white">
                                Price: TK {product.price}
                              </span>
                            </div></Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </TabPanel>
            <TabPanel>
              <Swiper {...params}>
                {products
                  .filter((product) =>product?.child_sub_category?.name?.toLowerCase() === "semi-double")
                  .map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="relative w-60 max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 border mt-5 object-fit">
                        <img
                          className="p-4 rounded-t-lg object-fit"
                          src={product.primary_photo}
                          alt={product.name}
                          onClick={() => openModal(product)}
                        />
                        <div className="absolute top-0 right-0 p-2 opacity-0 hover:opacity-100 transition duration-300 ">
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
                        <div className="px-5 pb-5">
                          <ReactStars
                            count={5}
                            size={24}
                            value={5}
                            edit={false}
                            activeColor="#ffd700"
                          />

                          <Link href={`/Shop/product/${product.id}`}><h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                            {product.name}
                          </h5>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-red-900 dark:text-white">
                                Price: TK {product.price}
                              </span>
                            </div></Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </TabPanel>
            <TabPanel>
              <Swiper {...params}>
                {products
                  .filter((product) => product?.child_sub_category?.name?.toLowerCase() === "single")
                  .map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="relative w-60 max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 border mt-5 object-fit">
                        <img
                          className="p-4 rounded-t-lg object-fit"
                          src={product.primary_photo}
                          alt={product.name}
                          onClick={() => openModal(product)}
                        />
                        <div className="absolute top-0 right-0 p-2 opacity-0 hover:opacity-100 transition duration-300 ">
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
                        <div className="px-5 pb-5">
                          <ReactStars
                            count={5}
                            size={24}
                            value={5}
                            edit={false}
                            activeColor="#ffd700"
                          />

                          <Link href={`/Shop/product/${product.id}`}><h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                            {product.name}
                          </h5>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-red-900 dark:text-white">
                                Price: TK {product.price}
                              </span>
                            </div></Link>
                        </div>
                      </div>

                    </SwiperSlide>
                  ))}
              </Swiper>
            </TabPanel>
          </div>
        </Tabs>
      </div>
      <ProductModal product={selectedProduct} onClose={closeModal} />
    </>
  );
};

export default ProductsTabs;
