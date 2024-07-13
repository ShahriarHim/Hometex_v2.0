// pages/index.js

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

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
import ChatPopup from "@/components/ChatPopup";
import CashbackPopup from "@/components/CashbackPopup";
import CookiesPopup from "@/components/CookiesPopup";
import { getCookie } from "@/ults/cookies";
import AdPromotionSection from "@/components/layout/AdPromotionSection";
import FirstOrderPopup from "@/components/layout/FirstOrderPopup";
import CostomerCount from "@/components/newDesigns/Customercount";
import NewCustomerPopup from "@/components/layout/NewCustomerPopup";
import SuccessfulPaymentPopup from "@/components/invoice/Invoice";
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(true);

  const [isVisible, setIsVisible] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [showCookiesPopup, setShowCookiesPopup] = useState(false);
  const [showPaymentSuccessPopup, setShowPaymentSuccessPopup] = useState(false);
  const [showCashbackPopup, setShowCashbackPopup] = useState(false);

  useEffect(() => {
    const invoiceData = localStorage.getItem('invoiceData');
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId');

    if (invoiceData && paymentId) {
      setShowPaymentSuccessPopup(true);
    }
  }, [router.query]);

  useEffect(() => {
    const authToken = getCookie("home_text_token");
    if (!authToken) {
      setShowCashbackPopup(true);
    }
  }, []);

  const handleCashbackClosePopup = () => {
    setShowCashbackPopup(false);
  };

  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (!savedPreferences) {
      setShowCookiesPopup(true);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const handleClosePopup = () => {
    setShowCookiesPopup(false);
  };

  const handleClosePopup1 = () => {
    setShowPopup(false);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChatToggle = () => {
    setIsChatVisible(prevState => !prevState);
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
      <FirstOrderPopup />
      {showPaymentSuccessPopup && <SuccessfulPaymentPopup onClose={handleClosePopup1} />}
      <MainSlider />
      <NewCustomerPopup />

      {isVisible && (
        <>
          <button
            className="fixed bottom-5 right-4 px-4 py-4 bg-green-500 text-white rounded-full shadow-md transition duration-300 hover:bg-green-600"
            onClick={handleBackToTop}
            style={{ zIndex: 51 }}
          >
            <BsFillArrowUpCircleFill size={18} />
          </button>

          <button
            className="fixed bottom-16 right-4 px-4 py-4 bg-green-500 text-white rounded-full shadow-md transition duration-300 hover:bg-green-600"
            onClick={handleChatToggle}
            style={{ zIndex: 51 }}
          >
            <FaWhatsapp size={18} />
          </button>
        </>
      )}
      {isVisible && (
        <button
          className="fixed bottom-28 right-4 px-4 py-4 bg-green-500 text-white rounded-full shadow-md transition duration-300 hover:bg-green-600"
          style={{ zIndex: 51 }}
          onClick={() => { /* Add your phone functionality here */ }}
        >
          <FaPhoneAlt size={18} />
        </button>
      )}
      {showCashbackPopup && <CashbackPopup onClose={handleCashbackClosePopup} />}
      {showCookiesPopup && <CookiesPopup onClose={handleClosePopup} />}
      {isChatVisible && <ChatPopup onClose={handleChatToggle} />}

      <DesignSix />
      <DesignOne />
      <Suspense fallback={<h1>Loading...</h1>}>
        <ProductsTabs products={products} />
        <DesignFifteen />
        <DesignEight />
        <DesignThree />
        <DesignFive />
        <DesignSeven />
        <DesignEleven />
        <DesignFour />
        <DesignNine />
        <DesignTwelve />
        <CostomerCount />
        <Prefooter2 />
      </Suspense>
    </>
  );
};

export default Home;
