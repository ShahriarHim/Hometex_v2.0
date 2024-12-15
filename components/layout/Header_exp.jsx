import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useGeolocated } from 'react-geolocated';
import styles from '../../styles/Header_exp.module.css';  // Import CSS Module
import AdPromotionSection from "../.././components/layout/AdPromotionSection";
import PreHeader from './PreHeader';
import Constants from '@/ults/Constant';
import {
    FaUser, FaHeart, FaHome, FaMapMarkerAlt, FaSearch, FaShoppingCart,
    FaBriefcase,
    FaCommentDots,
} from "react-icons/fa";
import { HiOutlineGift } from 'react-icons/hi';

const HeaderExp = () => {
    const [categories, setCategories] = useState([]);
    const [location, setLocation] = useState('Location');
    const [showAllCategories, setShowAllCategories] = useState(false);
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
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
                .then((data) => setLocation(data.address.city || 'Unknown Location'));
        }
    }, [coords]);

    // Fetch categories, subcategories, and child categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${Constants.BASE_URL}/api/product/menu`);
                const data = await response.json();
                setCategories(data); // Assuming the API returns an array of categories
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <PreHeader />
            <header className={styles.headerExp}>
                {/* Top-right corner links */}
                {/* <div className="container-fluid">
                    <div className="row justify-content-end">
                        <div className={`col-auto ${styles.topLinks}`}>
                            <a href="/find-store" className={`text-decoration-none ${styles.topLinkItem}`}>Find A Store</a>
                            <a href="/customer-service" className={`text-decoration-none ${styles.topLinkItem}`}>Customer Service</a>
                            <a href="/gift" className={`text-decoration-none ${styles.topLinkItem}`}>Gift Someone</a>
                            <a href="/deals" className={`text-decoration-none ${styles.topLinkItem}`}>Daily Deals</a>
                            <a href="/faq" className={`text-decoration-none ${styles.topLinkItem}`}>FAQ</a>
                        </div>
                    </div>
                </div> */}

                {/* Middle row with icons */}
                <div className={`container-fluid ${styles.middleRow}`}>
                    {/* Left section: Categories and Search */}
                    <div className={styles.leftSection}>
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
                                <span className={styles["categories-text"]}>All Categories</span>
                                <img
                                    src="/images/icons/caret-down.png"
                                    alt="Arrow Icon"
                                    className={styles["dropdown-arrow"]}
                                />
                            </button>
                            {showAllCategories && (
                                <div className={styles["all-categories-dropdown"]}>
                                    <ul>
                                        <li>Electronics</li>
                                        <li>Fashion</li>
                                        <li>Home Appliances</li>
                                        <li>Books</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <a href="/search" className={styles.search}>
                            <FaSearch className="h-6 w-6 text-yellow-600"/>
                            <span>Search</span>
                        </a>
                    </div>

                    {/* Center Logo */}
                    <div className={styles.centerLogo}>
                        <img src="/images/hometex-logo.png" alt="Hometex Bangladesh" />
                    </div>

                    {/* Right section: Icons */}
                    <div className={styles.rightSection}>
                        <a href="/account">
                            <FaMapMarkerAlt className="h-6 w-6 text-yellow-600"/>
                            <span>Find a Store</span>
                        </a>
                        <a href="/wishlist">
                            <HiOutlineGift className="h-6 w-6 text-yellow-600"/>
                            <span>Gift Someone</span>
                        </a>
                        <a href="/wishlist">
                            <FaBriefcase className="h-6 w-6 text-yellow-600"/>
                            <span>Daily Deals</span>
                        </a>
                        <a href="/cart">
                            <FaCommentDots className="h-6 w-6 text-yellow-600"/>
                            <span>Message</span>
                        </a>
                    </div>



                    {/* Underlines */}
                    {/* <div className={styles.leftUnderline}></div>
                    <div className={styles.rightUnderline}></div> */}
                </div>

                {/* Mega menu with new dropdown design */}

            </header >
        </>
    );
};

export default HeaderExp;