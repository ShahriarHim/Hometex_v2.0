"use client"

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper'
import ProductCard from './ProductCard'
import styles from "../../styles/RelatedProducts.module.css"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import Constants from '@/ults/Constant';
import { setCookie, getCookie } from 'cookies-next';
import Link from 'next/link';
import Loader from '@/components/common/Loader';

const RelatedProducts = () => {
    const [products, setProducts] = useState([]);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${Constants.BASE_URL}/api/product-hot/trending`);
                const data = await response.json();


                const transformedProducts = data.data.map(product => ({
                    id: product.id,
                    img: product.primary_photo,
                    primary_photo: product.primary_photo,
                    discount: product.sell_price.discount ? product.sell_price.discount : null,
                    name: product.name,
                    price: product.sell_price.price,
                    sell_price: product.sell_price,
                    displayPrice: product.sell_price.price + product.sell_price.symbol,
                    originalPrice: product.original_price + product.sell_price.symbol,
                    stock: product.stock || 0,
                    star: product.star || 0,
                }));

                setProducts(transformedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);



    const [timeLeft, setTimeLeft] = useState({
        days: 2,
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

    const handleProductClick = (product) => {
        // Get existing recently viewed products
        let recentlyViewed = getCookie('recentlyViewed');
        recentlyViewed = recentlyViewed ? JSON.parse(recentlyViewed) : [];

        // Add current product if not already in list
        const productInfo = {
            id: product.id,
            name: product.name,
            image: product.img // Note: using img instead of primary_photo based on your data structure
        };

        // Remove if product already exists (to move it to front)
        recentlyViewed = recentlyViewed.filter(item => item.id !== product.id);

        // Add to front of array
        recentlyViewed.unshift(productInfo);

        // Keep only last 10 items
        recentlyViewed = recentlyViewed.slice(0, 10);

        // Save back to cookie
        setCookie('recentlyViewed', JSON.stringify(recentlyViewed), {
            maxAge: 30 * 24 * 60 * 60 // 30 days
        });
    };

    const handleProductHover = (isHovering) => {
        if (swiperInstance && swiperInstance.autoplay) {
            if (isHovering) {
                swiperInstance.autoplay.stop();
            } else {
                swiperInstance.autoplay.start();
            }
        }
    };

    return (
        <div className={styles['hot-deals-container']}>

            <div className={styles['hot-deals-header']}>
                <div className={styles['hot-deals-title']}>
                    <h2>
                        <span>Products You May Also Like</span>
                    </h2>
                </div>
                <Link href="/Shop" className={styles['see-all-link']}>+ See All Products</Link>
            </div>

            <div className="max-w-screen-xl mx-auto px-3 mb-5">
        <div className="grid grid-cols-4 gap-6 items-stretch">

          {/* Our Top Category Section - 1 Column */}
          <div className="col-span-1 text-center transform transition duration-700 ease-in-out hover:scale-105 relative">
            <div className="flex items-center p-5 text-xl font-bold text-black rounded-lg shadow-md bg-gradient-to-br h-[200px] from-red-600 to-rose-400">
              <div className="absolute right-10 translate-x-[30%] bg-white/80 backdrop-blur-xl rounded-lg h-[120px] w-[95%] flex justify-center items-center shadow-lg">
                <p className='text-xl font-semibold'>Simmilar <br /> Products</p>
              </div>
            </div>
          </div>

          {/* Swiper Section - 4 Columns */}
          <div className="col-span-3">
            {isLoading ? (
              <div className="flex-1">
                <Loader />
              </div>
            ) : (
              <Swiper
                onSwiper={setSwiperInstance}
                slidesPerView={3}
                spaceBetween={20}
                navigation={false}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                speed={1000}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
              >
                {products.map((product, index) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => handleProductClick(product)}
                    onMouseEnter={() => handleProductHover(true)}
                    onMouseLeave={() => handleProductHover(false)}
                  >
                    <Link href={`/shop/product/${product.id}`}>
                      <ProductCard product={product} />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default RelatedProducts
