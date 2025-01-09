import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade } from "swiper";
import Constants from "@/ults/Constant";

const MainSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${Constants.BASE_URL}/api/banner/slider`)
      .then(res => res.json())
      .then(data => {
        setSliders(data.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching sliders:', err);
        setIsLoading(false);
      });
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  if (isLoading) {
    return (
      <div className="relative overflow-hidden bg-gray-100">
        <div className="max-w-[1400px] mx-auto my-8 bg-white rounded-lg shadow-lg h-[500px] animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!sliders.length) {
    return null;
  }

  return (
    <div className="relative overflow-hidden bg-gray-100">
      <div className="max-w-[1400px] mx-auto my-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Swiper
          spaceBetween={0}
          effect={"fade"}
          speed={1000}
          loop={true}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-black',
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay, Pagination, EffectFade]}
          onSlideChange={handleSlideChange}
          className="mySwiper"
        >
          {sliders.map((slide, index) => (
            <SwiperSlide key={`${index}-${activeIndex}`}>
              <div className="relative h-[500px]">
                <div className="absolute inset-0 flex items-stretch">
                  {/* Left Section - Only render if left content exists */}
                  {slide.left && Object.keys(slide.left).length > 0 && (
                    <div className={`${!slide.right ? 'w-1/3' : 'w-1/4'} relative overflow-hidden ${!slide.right ? 'rounded-l-lg' : ''} group`}
                         style={{ backgroundColor: slide.left.background_color }}>
                      {slide.left.image && (
                        <div className="absolute inset-0 transform translate-x-full animate-slideInFromRight"
                             style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
                          <img 
                            src={slide.left.image} 
                            alt={slide.left.text || "Slide Image"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#5ADAEF]/20 to-transparent" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Middle Section - Adjust width based on presence of side sections */}
                  <div className={`flex items-center justify-center bg-white overflow-hidden
                    ${!slide.left && !slide.right ? 'w-full rounded-lg' : 
                      (!slide.left || !slide.right) ? 'flex-[2]' : 'flex-1'}`}>
                    <div className="text-center z-10 px-4 max-w-3xl mx-auto">
                      {slide.meddle.Header && (
                        <h3 className="text-red-600 text-6xl font-bold mb-6 transform translate-x-full animate-slideInFromRight tracking-wider drop-shadow-sm"
                            style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
                          {slide.meddle.Header}
                        </h3>
                      )}
                      <h2 className="text-gray-900 text-5xl font-bold mb-8 transform translate-x-full animate-slideInFromRight"
                          style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
                        {slide.meddle.title}
                      </h2>
                      {slide.meddle.description && (
                        <p className="text-gray-600 text-lg mb-10 transform translate-x-full animate-slideInFromRight"
                           style={{animationDelay: '0.7s', animationFillMode: 'forwards'}}>
                          {slide.meddle.description}
                        </p>
                      )}
                      <a 
                        href={slide.button_Link}
                        className="bg-black text-white px-8 py-3 text-lg font-medium inline-block 
                                 hover:bg-gray-800 transition-all duration-300 transform translate-x-full 
                                 animate-slideInFromRight rounded hover:scale-105 hover:shadow-lg"
                        style={{animationDelay: '0.8s', animationFillMode: 'forwards'}}
                      >
                        {slide.button_text}
                      </a>
                    </div>
                  </div>

                  {/* Right Section - Only render if right content exists */}
                  {slide.right && Object.keys(slide.right).length > 0 && (
                    <div className={`${!slide.left ? 'w-1/3' : 'w-1/4'} relative overflow-hidden ${!slide.left ? 'rounded-r-lg' : ''} group`}
                         style={{ backgroundColor: slide.right.background_color }}>
                      {slide.right.image && (
                        <div className="absolute inset-0 transform translate-x-full animate-slideInFromRight"
                             style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
                          <img 
                            src={slide.right.image} 
                            alt={slide.right.text || "Slide Image"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-l from-[#F3E616]/20 to-transparent" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MainSlider;