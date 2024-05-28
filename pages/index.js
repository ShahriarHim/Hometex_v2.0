import React, { useState, useEffect, useCallback, Suspense } from "react";
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'; // Importing Phone and WhatsApp icons

import MainSlider from "@/components/home/MainSlider";
import Constants from "@/ults/Constant";
import DesignSix from "@/components/newDesigns/DesignSix";
import DesignOne from "@/components/newDesigns/DesignOne";
import DesignFifteen from "@/components/newDesigns/DesignFifteen";
import DesignEight from "@/components/newDesigns/DesignEight";
import DesignThree from "@/components/newDesigns/DesignThree";
import DesignFive from "@/components/newDesigns/DesignFive";
import DesignSeven from "@/components/newDesigns/DesignSeven";
import DesignEleven from "@/components/newDesigns/DesignEleven";
import DesignFour from "@/components/newDesigns/DesignFour";
import DesignNine from "@/components/newDesigns/DesignNine";
import DesignTwelve from "@/components/newDesigns/DesignTwilve";
import Prefooter2 from "@/components/layout/Prefooter2";
import ProductsTabs from "@/components/home/ProductsTabs";
import ChatPopup from "@/components/ChatPopup"; // Import ChatPopup
import CashbackPopup from "@/components/CashbackPopup";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false); // State for chat visibility
  const [products, setProducts] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChatToggle = () => {
    setIsChatVisible(prevState => !prevState); // Toggle chat visibility
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${Constants.BASE_URL}/api/products-web`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const responseData = await response.json();
        setProducts(responseData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <MainSlider />
      
      {isVisible && (
        <>
          <button
            className="fixed bottom-5 right-4 px-4 py-4 bg-green-500 text-white rounded-full shadow-md transition duration-300 hover:bg-green-600"
            onClick={handleBackToTop}
          >
            <BsFillArrowUpCircleFill size={18} />
          </button>

      
          <button
            className="fixed bottom-16 right-4 px-4 py-4 bg-green-500 text-white rounded-full shadow-md transition duration-300 hover:bg-green-600"
            onClick={handleChatToggle} // Show chat on click
          >
            <FaWhatsapp size={18} />
          </button>
        </>
      )}
     {isVisible && (
        <>
 
          <button
            className="fixed bottom-28 right-4 px-4 py-4 bg-green-500 text-white rounded-full shadow-md transition duration-300 hover:bg-green-600"
          >
            <FaPhoneAlt size={18} onClick={() => { /* Add your phone functionality here */ }} />
          </button>

   
        </>
      )}
          {isPopupVisible && <CashbackPopup onClose={handleClosePopup} />}

      {isChatVisible && <ChatPopup onClose={handleChatToggle} />} {/* Render chat popup */}
  
      <DesignSix/>
      <DesignOne/>
      {/* <DesignTwo/> */}
      <Suspense fallback={<h1>loading</h1>}>
        <ProductsTabs products={products} />
        <DesignFifteen/>
        <DesignEight/>
        <DesignThree/>
        <DesignFive/>
        <DesignSeven/>
        <DesignEleven/>
        <DesignFour/>
        <DesignNine/>
        <DesignTwelve/>
        <Prefooter2/>
      </Suspense>
    </>
  );
};

export default Home;
