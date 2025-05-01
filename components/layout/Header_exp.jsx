import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useGeolocated } from "react-geolocated";
import { useRouter } from "next/router";
import styles from "../../styles/Header_exp.module.css"; // Import CSS Module
import AdPromotionSection from "../../components/layout/AdPromotionSection";
import PreHeader from "./PreHeader";
import Constants from "@/ults/Constant";
import {
  FaUser,
  FaHeart,
  FaHome,
  FaMapMarkerAlt,
  FaSearch,
  FaShoppingCart,
  FaBriefcase,
  FaCommentDots,
  FaCaretRight,
  FaGift,
} from "react-icons/fa";
import { HiOutlineGift } from "react-icons/hi";
// import { Sticky } from '../home/Sticky';
import FloatingBar from "../FloatingBar";
import SearchPopup from "./SearchPopup"; // Import the new popup component
import Modal from "./Modal"; // Add this import at the top
import ChatPopup from "@/components/ChatPopup";

const HeaderExp = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState("Location");
  const [selectedId, setSelectedId] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (coords) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`
      )
        .then((response) => response.json())
        .then((data) => setLocation(data.address.city || "Unknown Location"));
    }
  }, [coords]);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      mode: "no-cors";
      const response = await fetch(
        `${Constants.BASE_URL}/api/product-menu/horizontal`
      );
      const result = await response.json();
      // console.log("Fetched Data:", result.data); // Verify the data structure
      setCategories(result.data); // Set the fetched categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
 
  const renderCategories = (categories) => {
    return (
      <ul className={styles.dropdownMenu}>
        {categories.map((category) => {
          const hasSub =
            (category.sub && category.sub.length > 0) ||
            (category.child && category.child.length > 0);

          return (
            <li
              key={category.id}
              className={`${styles.menuItem} ${hasSub ? styles.hasSub : ""}`}
            >
              <Link
                href={`/products/${category.name.toLowerCase()}`}
                className={styles.menuLink}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className={styles.categoryImage}
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                        marginRight: "5px",
                      }}
                    />
                  )}
                  {category.name}
                  {hasSub && <FaCaretRight className={styles.subIcon} />}
                </span>
              </Link>

              {hasSub && (
                <div className={styles.subMenuContainer}>
                  <div className={styles["banner-top"]}>
                    <div className={styles["banner-content"]}>
                      🎉 Special Offer: Get 20% off on all products! Use code:
                      SPECIAL20 🎉
                    </div>
                  </div>
                  <ul className={styles.subMenu}>
                    {category.sub?.map((sub) => (
                      <li key={sub.id} className={styles.subMenuItem}>
                        <Link
                          href={`/products/${category.name.toLowerCase()}/${sub.name.toLowerCase()}`}
                        >
                          <div className={styles.subMenuName}>
                            <strong>{sub.name}</strong>
                          </div>
                        </Link>

                        {sub.child && sub.child.length > 0 && (
                          <ul className={styles.childMenu}>
                            {sub.child.map((child) => (
                              <li key={child.id} className={styles.childItem}>
                                <Link
                                  href={`/products/${category.name.toLowerCase()}/${sub.name.toLowerCase()}/${child.name.toLowerCase()}`}
                                >
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className={styles["banner-bottom"]}>
                    <div className={styles["banner-content"]}>
                      🚚 Free Shipping on orders above $50! Limited time offer
                      🚚
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  // Add hover and delay methods
  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }

    // Delay showing dropdown to prevent accidental triggers
    const timeout = setTimeout(() => {
      setIsDropdownOpen(true);
    }, 100); // 100ms delay

    setDropdownTimeout(timeout);
  };

  const handleMouseLeave = () => {
    // Clear any existing timeout
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }

    // Delay hiding dropdown
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // 200ms delay for smoother interaction

    setDropdownTimeout(timeout);
  };

  const handleSearchClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Add this handler for daily deals click
  const handleDailyDealsClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChatToggle = () => {
    setIsChatVisible((prevState) => !prevState);
  };

  // Check if current page is product slug page
  const isProductSlugPage = router.pathname.startsWith("/shop/product/");

  return (
    <>
      {showPopup && <SearchPopup onClose={closePopup} />}
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
      <PreHeader />
      <FloatingBar />
      <header
        className={`${styles.headerExp} bg-white`}
        style={{
          margin: 0,
          padding: 0,
          position: isProductSlugPage ? "relative" : "sticky",
          top: isProductSlugPage ? "auto" : "0",
          zIndex: 50,
        }}
      >
        <div
          className={`container mx-auto ${styles.middleRow}`}
          style={{
            zIndex: "150",
            marginBottom: 0,
            paddingBottom: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0",
          }}
        >
          {/* Left section: Categories and Search */}
          <div
            className={styles.leftSection}
            style={{
              flex: "0 0 25%",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              paddingLeft: "0", // Remove left padding to move items more left
            }}
          >
            <div
              className={styles["all-categories-container"]}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles["all-categories"]}>
                <button
                  className={styles["all-categories-btn"]}
                  onClick={() => setShowAllCategories(!showAllCategories)}
                >
                  <img
                    src="/images/icons/icon-menu.png"
                    alt="Menu Icon"
                    className={styles["categories-icon"]}
                  />
                  <span className={styles["categories-text"]}>
                    All Categories
                    <FaCaretRight
                      className={`${styles["dropdown-arrow"]} ${
                        showAllCategories || isDropdownOpen
                          ? styles.rotated
                          : ""
                      }`}
                    />
                  </span>
                </button>
                {(showAllCategories || isDropdownOpen) && (
                  <div
                    className={styles["all-categories-dropdown"]}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {renderCategories(categories)}
                  </div>
                )}
              </div>
            </div>

            <Link
              href="#"
              className={`${styles.iconLink} hover:text-black`}
              onClick={handleSearchClick}
            >
              <FaSearch className="h-5 w-5 text-yellow-600" />
              <span>Search</span>
            </Link>
          </div>

          {/* Center Logo */}
          <div
            className={styles.centerLogo}
            style={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href="/">
              <img
                src="/images/hometex-logo.png"
                alt="Hometex Bangladesh"
                style={{ height: "65px", width: "auto" }}
              />
            </Link>
          </div>

          {/* Right section: Icons */}
          <div
            className={styles.rightSection}
            style={{
              flex: "0 0 25%", // Increase flex basis to give more space
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "1.5rem",
              paddingRight: "0", // Remove right padding to allow items to move more right
            }}
          >
            <Link
              href="/Stores"
              className={`${styles.iconLink} hover:text-black`}
            >
              <FaMapMarkerAlt className="h-5 w-5 text-yellow-600" />
              <span>Find a Store</span>
            </Link>
            <Link
              href="/Giftsomeone"
              className={`${styles.iconLink} hover:text-black`}
            >
              <FaGift
                icon="fa-solid fa-gift"
                className="h-5 w-5 text-yellow-600 font-bold"
              />
              <span>Gift Someone</span>
            </Link>
            <Link
              href="/daily-deals"
              className={`${styles.iconLink} hover:text-black`}
              onClick={handleDailyDealsClick}
            >
              <FaBriefcase className="h-5 w-5 text-yellow-600" />
              <span>Daily Deals</span>
            </Link>
            <button
              className={`${styles.iconLink} hover:text-black`}
              onClick={handleChatToggle}
            >
              <FaCommentDots className="h-5 w-5 text-yellow-600" />
              <span>Message</span>
            </button>
          </div>
        </div>
      </header>
      {isChatVisible && <ChatPopup onClose={handleChatToggle} />}
    </>
  );
};

export default HeaderExp;
