"use client"

import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper'
import ProductCard from "../home/ProductsTabs"
import styles from "../../styles/DesignThree.module.css"
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import { useState, useEffect } from "react"

const HotDealsCarousel = () => {
  const products = [
    {
      img: "https://static-01.daraz.com.bd/p/7128ff73c173be97bc8a1a727d2dcc58.jpg?height=200&width=200",
      discount: "-8%",
      name: "Security Camera with Night Vision Full HD",
      price: "$45.00",
      originalPrice: "$49.00",
    },
    {
      img: "https://static-01.daraz.com.bd/p/7128ff73c173be97bc8a1a727d2dcc58.jpg?height=200&width=200",
      discount: "-27%",
      name: "iPhone 15 Pro Max Natural Titan",
      price: "$72.00",
      originalPrice: "$98.00",
    },
    {
      img: "https://static-01.daraz.com.bd/p/7128ff73c173be97bc8a1a727d2dcc58.jpg?height=200&width=200",
      discount: "-20%",
      name: "Hydrating Mineral Sunscreen",
      price: "$60.00",
      originalPrice: "$75.00",
    },
    {
      img: "https://static-01.daraz.com.bd/p/7128ff73c173be97bc8a1a727d2dcc58.jpg?height=200&width=200",
      discount: "-9%",
      name: "Hydrating Camo Concealer",
      price: "$48.00",
      originalPrice: "$53.00",
    },
    {
      img: "https://static-01.daraz.com.bd/p/7128ff73c173be97bc8a1a727d2dcc58.jpg?height=200&width=200",
      discount: "-21%",
      name: "Under Armour Basketball Shoe",
      price: "$68.00",
      originalPrice: "$86.00",
    },
  ]

  const [timeLeft, setTimeLeft] = useState({
    days: 939,
    hours: 21,
    minutes: 8,
    seconds: 25
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-3 mb-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          <span className="text-pink-600">Hot Deals!</span> Get Our Best Price
        </h1>
        <a href="#" className="text-blue-500 hover:underline">
          + See All Products
        </a>
      </div>
      <div className="flex">
      <div className="bg-purple-600 p-4 rounded-lg text-center text-white mr-5 flex-shrink-0">
      <div className="text-4xl font-bold">
    <i className="fa fa-clock"></i> {/* This is the clock icon */}
  </div>
  <div className="text-sm">DAYS</div>
  <div className="text-4xl font-bold mt-2">{timeLeft.days}</div>
  <div className="text-sm">HOURS</div>
  <div className="text-4xl font-bold mt-2">{timeLeft.hours.toString().padStart(2, '0')}</div>
  <div className="text-sm">MINUTES</div>
  <div className="text-4xl font-bold mt-2">{timeLeft.minutes.toString().padStart(2, '0')}</div>
  <div className="text-sm">SECONDS</div>
</div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={5}
          loop={true}
          loopedSlides={5}
          navigation
          autoplay={{ delay: 3000 }}
          className="owl2-stage flex-grow"
        >
          {/* Add cloned slides for infinite loop */}
          {products.map((product, index) => (
            <SwiperSlide key={`cloned-before-${index}`} className="owl2-item cloned">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
          
          {/* Main slides */}
          {products.map((product, index) => (
            <SwiperSlide key={index} className="owl2-item active">
<div className={styles['product-item-container']}>
  <div className={styles['product-image-container']}>
    <a href="#" title={product.name}>
      <img
        src={product.img}
        alt={product.name}
        className="img-fluid"
      />
    </a>
    
    {/* Move the overlay inside the image container */}
    <div className={styles.overlay}>
      <div className={styles['button-group']}>
        <button className="addToCart" title="Add to Cart">
          <i className="fa fa-shopping-basket"></i>
        </button>
        <button className="wishlist" title="Add to Wish List">
          <i className="fa fa-heart"></i>
        </button>
        <button className="compare" title="Compare">
          <i className="fa fa-refresh"></i>
        </button>
        <button className="quickview" title="Quick View">
          <i className="fa fa-eye"></i>
        </button>
      </div>
    </div>
  </div>

  {/* Product details outside the overlay */}
  <div className="right-block">
    <div className="caption">
      <h4><a href="#">{product.name}</a></h4>
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="fa fa-stack">
            <i className="fa fa-star-o fa-stack-2x"></i>
          </span>
        ))}
      </div>
      <div className="price">
        <span className="price-new">{product.price}</span>
        <span className="price-old">{product.originalPrice}</span>
      </div>
    </div>
  </div>
</div>

            </SwiperSlide>
          ))}

          {/* Add cloned slides for infinite loop */}
          {products.map((product, index) => (
            <SwiperSlide key={`cloned-after-${index}`} className="owl2-item cloned">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default HotDealsCarousel
