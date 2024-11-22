import React, { useState } from "react";
import styles from "../../styles/HeaderV2.module.css";

const Header = () => {
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    return (
        <header className={styles.header}>
            {/* Top Bar */}
            <div className={styles["top-bar"]}>
                <div className={styles["top-left"]}>
                    <span>ENG</span>
                    <span>$ USD</span>
                </div>
                <div className={styles["top-center"]}>
                    Get 20% off today with code <strong>XTORE</strong>. Limited stock!
                </div>
                <div className={styles["top-right"]}>
                    <a href="#">Track Order</a>
                    <a href="#">Help Center</a>
                </div>
            </div>

            {/* Main Section with Logo, Search Bar, and Icons */}
            <div className={styles["main-nav"]}>
                <div className={styles["logo-section"]}>
                    <div className={styles.logo}>XTORE</div>
                </div>

                <div className={styles["search-bar"]}>
                    <select className={styles["category-select"]}>
                        <option>All Categories</option>
                        <option>Category 1</option>
                        <option>Category 2</option>
                    </select>
                    <input type="text" placeholder="Search" />
                    <button>SEARCH</button>
                </div>

                <div className={styles.icons}>
                    <div className={styles.icon}>
                        <img
                            src="/images/icons/icon-account.png"
                            alt="User Icon"
                            className={styles["icon-image"]}
                        />
                    </div>
                    <div className={styles.icon}>
                        <img
                            src="/images/icons/icon-wislist.png"
                            alt="Wishlist Icon"
                            className={styles["icon-image"]}
                        />
                    </div>
                    <div className={`${styles.icon} ${styles.cart}`}>
                        <img
                            src="/images/icons/icon-cart.png"
                            alt="Cart Icon"
                            className={styles["icon-image"]}
                        />
                        <span className={styles["cart-badge"]}>0</span>
                    </div>
                </div>

            </div>

            {/* All Categories Button and Horizontal Menu */}
            <div className={styles["nav-container"]}>
                {/* All Categories */}
                <div className={styles["all-categories"]}>
                    <button className={styles["all-categories-btn"]}>
                        <img
                            src="/images/icons/icon-menu.png" // Ensure this is the correct path
                            alt="Menu Icon"
                            className={styles["categories-icon"]}
                        />
                        <span className={styles["categories-text"]}>All Categories</span>
                        <img
                            src="/images/icons/caret-down.png" // Replace with your arrow icon path
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


                {/* Horizontal Menu */}
                <nav className={styles["menu-nav"]}>
                    {["Home", "Feature", "Shop", "Blog", "Pages", "About", "Contact"].map(
                        (menu, index) => (
                            <div
                                key={index}
                                className={styles["menu-item"]}
                                onMouseEnter={() => setActiveMenu(index)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <a href="#" className={styles["menu-link"]}>
                                    {menu}
                                    <img
                                        src="/images/icons/caret-down.png" // Replace with your arrow image path
                                        alt="Arrow Icon"
                                        className={styles["dropdown-arrow"]}
                                    />
                                </a>

                                {activeMenu === index && (
                                    <div className={styles["menu-dropdown"]}>
                                        <ul>
                                            <li>{menu} Option 1</li>
                                            <li>{menu} Option 2</li>
                                            <li>{menu} Option 3</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )
                    )}
                </nav>
                <div className={styles['right-nav']}>
                    <a href="#" >
                        Today's Deals
                    </a>
                </div>

            </div>
        </header>
    );
};

export default Header;
