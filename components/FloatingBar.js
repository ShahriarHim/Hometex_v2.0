import React, { useState, useEffect, useRef, useContext } from 'react';
import Popup from 'reactjs-popup';
import {
    FaShoppingCart,
    FaListUl,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaHeart,
    FaEye,
    FaArrowUp,
    FaWhatsapp,
} from 'react-icons/fa';
import useGeolocation from './UseGeolocation';
import ChatPopup from "@/components/ChatPopup";
import CartComponent from "@/components/layout/CartComponent/CartComponent";
import WishComponent from "@/components/layout/WishComponent/WishComponent";
import CartContext from "@/context/CartContext";
import Link from 'next/link';
import Constants from '@/ults/Constant';

const FloatingBar = () => {
    const { location, isGeolocationAvailable, isGeolocationEnabled } = useGeolocation();
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false); // State for cart visibility
    const [isWishOpen, setIsWishOpen] = useState(false); // State for wishlist visibility
    const [showBar, setShowBar] = useState(false); // Visibility based on scroll
    const [categories, setCategories] = useState([]);
    const [showCategoriesPopup, setShowCategoriesPopup] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const cartRef = useRef(null);
    const wishRef = useRef(null);
    const { cart, deleteItemFromCart } = useContext(CartContext);
    const cartItems = cart?.cartItems;
    const [totalPrice, setTotalPrice] = useState(0);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleChatToggle = () => {
        setIsChatVisible(prevState => !prevState);
    };

    const handleScroll = () => {
        if (window.scrollY > 250) {
            setShowBar(true);
        } else {
            setShowBar(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (cartItems) {
            const finalAmount = cartItems.reduce((total, cartItem) => {
                let priceStr = cartItem.price;
                priceStr = typeof priceStr !== 'string' ? String(priceStr) : priceStr;
                priceStr = priceStr.replace(/[,]/g, ""); 
                const amount = parseInt(priceStr, 10) * cartItem.quantity;
                return total + amount;
            }, 0);
            setTotalPrice(finalAmount);
        }
    }, [cartItems]);

    const handleCartClick = () => {
        setIsCartOpen(prevState => !prevState);
        setIsWishOpen(false); // Close wishlist if open
    };

    const handleWishClick = () => {
        setIsWishOpen(prevState => !prevState);
        setIsCartOpen(false); // Close cart if open
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${Constants.BASE_URL}/api/product-menu/horizontal`);
            const result = await response.json();
            setCategories(result.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (categories.length > 0 && !hoveredCategory) {
            setHoveredCategory(categories[0].id);
        }
    }, [categories]);

    const buttonData = [
        {
            icon: <FaListUl />,
            tooltip: 'All Categories',
            onClick: () => setShowCategoriesPopup(true),
            className: 'floating-btn-first',
        },
        {
            icon: <FaPhoneAlt />,
            tooltip: 'Customer Service',
            onClick: () => (window.location.href = '/Contact'),
            className: 'floating-btn-middle',
        },
        {
            icon: <FaMapMarkerAlt />,
            tooltip: (
                <div className="popup-content">
                    <span>{isGeolocationAvailable && isGeolocationEnabled ? location : 'Location'}</span>
                </div>
            ),
            onClick: null,
            className: 'floating-btn-middle',
        },
        {
            icon: <FaHeart />,
            tooltip: 'Wishlist',
            onClick: handleWishClick, // Open Wishlist
            className: 'floating-btn-middle',
        },
        {
            icon: <FaEye />,
            tooltip: 'Recently Viewed',
            onClick: null,
            className: 'floating-btn-middle',
        },
        {
            icon: <FaWhatsapp />,
            tooltip: 'Chat with us',
            onClick: handleChatToggle,
            className: 'floating-btn-last',
        },
        {
            icon: <FaArrowUp />,
            tooltip: 'Back to Top',
            onClick: scrollToTop,
            className: 'floating-btn-last',
        },
    ];

    return (
        <>
            <div className={`floating-bar ${showBar ? 'visible' : ''}`}>
                {/* Add to Cart Button */}
                <div className="cart-container">
                    <button className="floating-btn-cart green-btn" onClick={handleCartClick}>
                        <FaShoppingCart />
                        <span className="cart-text">Buy Now</span>
                    </button>
                </div>

                {/* Grouped Buttons */}
                <div className="grouped-buttons">
                    <div className="button-container">
                        {buttonData.map((button, index) => (
                            <button key={index} className={`floating-btn ${button.className}`} onClick={button.onClick}>
                                {button.icon}
                                <span className="tooltip">{button.tooltip}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cart Component */}
            {isCartOpen && (
                <CartComponent
                    cartRef={cartRef}
                    handleCartClick={handleCartClick}
                    cartItems={cartItems}
                    isOpen={isCartOpen}
                    cart={{ cartItems }}
                    deleteItemFromCart={deleteItemFromCart}
                    totalPrice={totalPrice}
                />
            )}

            {/* Wishlist Component */}
            {isWishOpen && (
                <WishComponent
                    wishItems={wishlist}
                    updateWishItems={setWishlist}
                    removeFromWishlist={() => {}}
                    isWishOpen={isWishOpen}
                    handleWishClick={handleWishClick}
                    wishRef={wishRef}
                />
            )}

            {/* Chat Popup */}
            {isChatVisible && <ChatPopup onClose={handleChatToggle} />}

            {/* Categories Popup */}
            {showCategoriesPopup && (
                <div className="categories-popup-overlay" onClick={() => setShowCategoriesPopup(false)}>
                    <div className="categories-popup" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowCategoriesPopup(false)}>×</button>
                        <div className="popup-header">
                            <h2>Browse Categories</h2>
                            <p>Discover our collection</p>
                        </div>
                        <div className="popup-content">
                            <div className="categories-list">
                                {categories.map((category) => (
                                    <div 
                                        key={category.id} 
                                        className={`category-item ${hoveredCategory === category.id ? 'hovered' : ''}`}
                                        onMouseEnter={() => setHoveredCategory(category.id)}
                                    >
                                        <Link 
                                            href={`/products/${category.name.toLowerCase()}`}
                                            className="category-main"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowCategoriesPopup(false);
                                            }}
                                        >
                                            <div className="category-header">
                                                <div className="category-icon">
                                                    {category.image && (
                                                        <img
                                                            src={category.image}
                                                            alt={category.name}
                                                            className="category-image"
                                                        />
                                                    )}
                                                </div>
                                                <div className="category-info">
                                                    <span className="category-name">{category.name}</span>
                                                    <span className="subcategory-count">
                                                        {category.sub?.length || 0} subcategories
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Subcategories Panel */}
                            <div className="subcategories-panel">
                                <div className="subcategories-content">
                                    {hoveredCategory && categories.find(cat => cat.id === hoveredCategory)?.sub && (
                                        <>
                                            <h3>{categories.find(cat => cat.id === hoveredCategory)?.name}</h3>
                                            <div className="subcategories-grid">
                                                {categories.find(cat => cat.id === hoveredCategory)?.sub.map((sub) => (
                                                    <div 
                                                        key={sub.id} 
                                                        className="subcategory-card"
                                                    >
                                                        <Link 
                                                            href={`/products/${categories.find(cat => cat.id === hoveredCategory)?.name.toLowerCase()}/${sub.name.toLowerCase()}`}
                                                            className="subcategory-card-link"
                                                            onClick={() => setShowCategoriesPopup(false)}
                                                        >
                                                            <span className="subcategory-name">{sub.name}</span>
                                                            {sub.child && sub.child.length > 0 && (
                                                                <div className="child-categories">
                                                                    {sub.child.slice(0, 3).map((child) => (
                                                                        <span key={child.id} className="child-category">
                                                                            {child.name}
                                                                        </span>
                                                                    ))}
                                                                    {sub.child.length > 3 && (
                                                                        <span className="more-indicator">
                                                                            +{sub.child.length - 3} more
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .floating-bar {
                    position: fixed;
                    right: 5px;
                    top: 55%;
                    transform: translateY(-50%);
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    z-index: 1000;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.5s, transform 0.5s ease-out;
                }

                .floating-bar.visible {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(-50%) translateX(0);
                }

                .cart-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .button-container {
                    background: rgba(51, 51, 51, 0.8);
                    border-radius: 40px;
                    padding: 3px;
                    gap: 3px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .floating-btn-cart {
                    width: 45px;
                    height: 45px;
                    background: rgba(51, 51, 51, 0.8);
                    color: white;
                    border: none;
                    border-radius: 10%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    position: relative;
                }

                .floating-btn {
                    width: 40px;
                    height: 40px;
                    background: transparent;
                    color: white;
                    border: none;
                    padding: 1px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.3s ease;
                }

                .floating-btn:hover {
                    background: rgba(40, 167, 69, 0.8);
                    border-radius: 50%;
                    color: white;
                }

                .tooltip {
                    position: absolute;
                    top: 50%;
                    left: -110%;
                    transform: translateY(-50%);
                    background: rgba(51, 51, 51, 0.9);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 5px;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .floating-btn:hover .tooltip {
                    opacity: 1;
                }

                .categories-popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(8px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1100;
                }

                .categories-popup {
                    background: white;
                    border-radius: 24px;
                    width: 85%;
                    max-width: 900px;
                    height: 70vh;
                    position: relative;
                    animation: scaleIn 0.3s ease-out;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .popup-header {
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                    padding: 1.5rem;
                    color: white;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }

                .popup-header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 40%, transparent 50%);
                    animation: shimmer 3s infinite;
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                .popup-header h2 {
                    font-size: 1.5rem;
                    margin: 0;
                    font-weight: 600;
                    letter-spacing: -0.5px;
                }

                .popup-header p {
                    margin: 0.5rem 0 0;
                    opacity: 0.9;
                    font-size: 0.9rem;
                }

                .popup-content {
                    display: flex;
                    height: calc(70vh - 90px);
                    background: #fff;
                }

                .categories-list {
                    width: 250px;
                    padding: 1rem;
                    border-right: 1px solid rgba(0, 0, 0, 0.08);
                    overflow-y: auto;
                    background: #f8f9fa;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }

                .categories-list::-webkit-scrollbar {
                    display: none;
                }

                .category-item {
                    margin-bottom: 0.5rem;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    background: white;
                    border: 1px solid transparent;
                }

                .category-item.hovered {
                    border-color: #28a745;
                    box-shadow: 0 4px 20px rgba(40, 167, 69, 0.15);
                    background: linear-gradient(to right, white, #f8f9fa);
                }

                .category-main {
                    text-decoration: none;
                    color: #333;
                    display: block;
                    padding: 0.8rem;
                }

                .category-header {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                }

                .category-icon {
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f8f9fa;
                    border-radius: 8px;
                    padding: 6px;
                    transition: all 0.3s ease;
                }

                .category-item.hovered .category-icon {
                    background: #28a745;
                    transform: scale(1.05);
                }

                .category-item.hovered .category-image {
                    filter: brightness(0) invert(1);
                }

                .category-info {
                    flex: 1;
                }

                .category-name {
                    font-weight: 600;
                    font-size: 0.95rem;
                    color: #2c3e50;
                    margin-bottom: 4px;
                    display: block;
                }

                .subcategory-count {
                    font-size: 0.75rem;
                    color: #28a745;
                    font-weight: 500;
                }

                .subcategories-panel {
                    flex: 1;
                    padding: 1.5rem;
                    background: white;
                    overflow-y: auto;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }

                .subcategories-panel::-webkit-scrollbar {
                    display: none;
                }

                .subcategories-content h3 {
                    color: #28a745;
                    margin-bottom: 1.5rem;
                    font-size: 1.2rem;
                    font-weight: 600;
                    padding-bottom: 1rem;
                    border-bottom: 2px solid #e9ecef;
                    position: relative;
                }

                .subcategories-content h3::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 100px;
                    height: 2px;
                    background: #28a745;
                }

                .subcategories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                    gap: 1rem;
                    padding-bottom: 1.5rem;
                }

                .subcategory-card {
                    background: white;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    border: 1px solid #eee;
                    position: relative;
                    overflow: hidden;
                    max-width: 180px;
                }

                .subcategory-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(to right, #28a745, #20c997);
                    opacity: 0;
                    transition: all 0.3s ease;
                }

                .subcategory-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.15);
                    border-color: transparent;
                }

                .subcategory-card:hover::before {
                    opacity: 1;
                }

                .subcategory-card-link {
                    padding: 1rem;
                    display: block;
                    text-decoration: none;
                    color: #333;
                    height: 100%;
                }

                .subcategory-name {
                    font-weight: 600;
                    font-size: 0.95rem;
                    color: #2c3e50;
                    display: block;
                    margin-bottom: 0.6rem;
                }

                .child-categories {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.4rem;
                }

                .child-category {
                    font-size: 0.75rem;
                    color: #666;
                    background: #f8f9fa;
                    padding: 0.25rem 0.6rem;
                    border-radius: 12px;
                }

                .subcategory-card:hover .child-category {
                    background: rgba(40, 167, 69, 0.1);
                    color: #28a745;
                }

                .more-indicator {
                    font-size: 0.8rem;
                    color: #28a745;
                    font-weight: 500;
                    margin-top: 0.5rem;
                    display: inline-block;
                }

                .close-btn {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    background: transparent;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    z-index: 2;
                }

                .close-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: rotate(90deg);
                    border-color: white;
                }
            `}</style>
        </>
    );
};

export default FloatingBar;

