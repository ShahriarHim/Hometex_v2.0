"use client"

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper'
import ProductCard from "../home/ProductsTabs"
import styles from "../../styles/DesignThree.module.css"
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

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
    hours: 7,
    minutes: 11,
    seconds: 51
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
    <div className={styles['hot-deals-container']}>
      <div className={styles['hot-deals-box']}>
        <div className={styles['hot-deals-header']}>
          <div className={styles['hot-deals-title']}>
            <h2>
              <span>Hot Deals!</span> Get Our Best Price
            </h2>
          </div>
          <a href="#" className={styles['see-all-link']}>+ See All Products</a>
        </div>

        <div className="flex">
          <div className="bg-purple-600 p-4 rounded-lg text-center text-white mr-5 flex-shrink-0">
            <div className="mb-3">
              <div className="w-12 h-12 bg-purple-700/50 rounded-full flex items-center justify-center mx-auto">
                <i className="fas fa-clock text-2xl"></i>
              </div>
            </div>
            
            <div className="text-4xl font-bold">{timeLeft.days}</div>
            <div className="text-sm">DAYS</div>
            <div className="text-4xl font-bold mt-2">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="text-sm">HOURS</div>
            <div className="text-4xl font-bold mt-2">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="text-sm">MINUTES</div>
            <div className="text-4xl font-bold mt-2">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="text-sm">SECONDS</div>
          </div>

          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            navigation={false}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            speed={1000}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={index} className="owl2-item active">
<div className={styles['product-item-container']}>
  <div className={styles['product-image-container']}>
    {product.discount && (
      <div className={styles['discount-badge']}>
        {product.discount}
      </div>
    )}
    
    <a href="#" title={product.name}>
      <img
        src={product.img}
        alt={product.name}
        className="img-fluid"
      />
    </a>
    
    <div className={styles.overlay}>
      <div className={styles['button-group']}>
        <button title="Add to Cart">
          <i className="fas fa-shopping-basket" style={{ fontSize: '16px' }}></i>
        </button>
        <button title="Add to Wish List">
          <i className="fas fa-heart" style={{ fontSize: '16px' }}></i>
        </button>
        <button title="Compare">
          <i className="fas fa-retweet" style={{ fontSize: '16px' }}></i>
        </button>
        <button title="Quick View">
          <i className="fas fa-eye" style={{ fontSize: '16px' }}></i>
        </button>
      </div>
    </div>
  </div>

  <div className="right-block">
    <div className="caption">
      <h4><a href="#">{product.name}</a></h4>
      <div className={styles.rating}>
        {[1, 2, 3, 4, 5].map((star, index) => (
          <span key={index} className={styles.star}>
            <i className={`fas fa-star ${index < (product.rating || 3) ? '' : styles['star-empty']}`}></i>
          </span>
        ))}
      </div>
      <div className={styles['price-container']}>
        <span className={styles['price-new']}>{product.price}</span>
        <span className={styles['price-old']}>{product.originalPrice}</span>
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
    </div>
  )
}

export default HotDealsCarousel
