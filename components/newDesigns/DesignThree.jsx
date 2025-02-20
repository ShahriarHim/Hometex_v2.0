"use client"

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper'
import ProductCard from './ProductCard'
import styles from "../../styles/DesignThree.module.css"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import Constants from '@/ults/Constant';

const HotDealsCarousel = () => {
 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${Constants.BASE_URL}/api/product-hot/trending`);
        const data = await response.json();
        console.log("eg ae  ",data);
        
        const transformedProducts = data.data.map(product => ({
          img: product.primary_photo,
          discount: product.sell_price.discount ? product.sell_price.discount : null,
          name: product.name,
          price: product.sell_price.price + product.sell_price.symbol,
          originalPrice: product.original_price + product.sell_price.symbol,
          star: product.star || 0,
        }));

        setProducts(transformedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
 


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
                <ProductCard product={product} />
              </SwiperSlide>
            ))}

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
 