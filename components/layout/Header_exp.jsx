import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useGeolocated } from 'react-geolocated';
import styles from '../../styles/Header_exp.module.css';  // Import CSS Module
import AdPromotionSection from "../../components/layout/AdPromotionSection";
import PreHeader from './PreHeader';
import Constants from '@/ults/Constant';
import {
    FaUser, FaHeart, FaHome, FaMapMarkerAlt, FaSearch, FaShoppingCart,
    FaBriefcase, FaCommentDots, FaChevronRight
} from "react-icons/fa";
import { HiOutlineGift } from 'react-icons/hi';

const HeaderExp = () => {
    const [categories, setCategories] = useState([]);
    const [location, setLocation] = useState('Location');
    const [selectedId, setSelectedId] = useState(null);  
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [isDropdownHovered, setIsDropdownHovered] = useState(false);

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

    // Fetch categories from API
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${Constants.BASE_URL}/api/product-menu/horizontal`);
            const result = await response.json();
            console.log("Fetched Data:", result.data); // Verify the data structure
            setCategories(result.data); // Set the fetched categories
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Click handler for "All Categories"
    const handleCategoryClick = (id) => {
        console.log("Clicked Category ID:", id);
        setSelectedId(id); // Store the clicked category ID
    };

    const renderCategories = (categories) => {
        return (
            <ul className={styles.dropdownMenu}>
                {categories.map((category) => {
                    const hasSub = (category.sub && category.sub.length > 0) || (category.child && category.child.length > 0);

                    return (
                        <li key={category.id} className={`${styles.menuItem} ${hasSub ? styles.hasSub : ''}`}>
                       
                            <Link href={`/category/${category.id}`} className={styles.menuLink}>
                                {category.name} {hasSub && <FaChevronRight className={styles.subIcon} />}
                            </Link>
 
                            {hasSub && (
                                <div className={styles.subMenuContainer}>
                                    <ul className={styles.subMenu}>
                                        {category.sub && category.sub.map((sub) => (
                                            <li key={sub.id} className={styles.subMenuItem}>
                                                {sub.name}

                                                {/* Child Subcategories */}
                                                {sub.child && sub.child.length > 0 && (
                                                    <ul className={styles.childMenu}>
                                                        {sub.child.map((child) => (
                                                            <li key={child.id} className={styles.childItem}>
                                                                {child.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <>
            <PreHeader />
            <header className={styles.headerExp}>
                {/* Middle row with icons */}
                <div className={`container-fluid ${styles.middleRow}`}>
                    {/* Left section: Categories and Search */}
                    <div className={styles.leftSection}>
                        <div 
                            className={styles["all-categories"]}
                            onMouseEnter={() => setIsDropdownHovered(true)}
                            onMouseLeave={() => setIsDropdownHovered(false)}
                        >
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
                                <FaChevronRight 
                                    className={`${styles["dropdown-arrow"]} ${showAllCategories ? styles.rotated : ''}`}
                                />
                            </button>
                            {(showAllCategories || isDropdownHovered) && (
                                <div className={styles["all-categories-dropdown"]}>
                                    {renderCategories(categories)}
                                </div>
                            )}
                        </div>

                        <Link href="/search" className={styles.search}>
                            <FaSearch className="h-6 w-6 text-yellow-600"/>
                            <span>Search</span>
                        </Link>
                    </div>

                    {/* Center Logo */}
                    <div className={styles.centerLogo}>
                        <img src="/images/hometex-logo.png" alt="Hometex Bangladesh" />
                    </div>

                    {/* Right section: Icons */}
                    <div className={styles.rightSection}>
                        <Link href="/account" className={styles.iconLink}>
                            <FaMapMarkerAlt className="h-6 w-6 text-yellow-600"/>
                            <span>Find a Store</span>
                        </Link>
                        <Link href="/wishlist" className={styles.iconLink}>
                            <HiOutlineGift className="h-6 w-6 text-yellow-600"/>
                            <span>Gift Someone</span>
                        </Link>
                        <Link href="/daily-deals" className={styles.iconLink}>
                            <FaBriefcase className="h-6 w-6 text-yellow-600"/>
                            <span>Daily Deals</span>
                        </Link>
                        <Link href="/messages" className={styles.iconLink}>
                            <FaCommentDots className="h-6 w-6 text-yellow-600"/>
                            <span>Message</span>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
};

export default HeaderExp;
