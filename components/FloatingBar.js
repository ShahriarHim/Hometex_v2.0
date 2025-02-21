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
import WishListContext from "@/context/WishListContext";

const FloatingBar = () => {
    const { location, isGeolocationAvailable, isGeolocationEnabled } = useGeolocation();
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false); // State for cart visibility
    const [isWishOpen, setIsWishOpen] = useState(false); // State for wishlist visibility
    const [showBar, setShowBar] = useState(false); // Visibility based on scroll

    const cartRef = useRef(null);
    const wishRef = useRef(null);
    const { cart, deleteItemFromCart } = useContext(CartContext);
    const { wlist, deleteItemFromWishlist } = useContext(WishListContext);

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

    const buttonData = [
        {
            icon: <FaListUl />,
            tooltip: 'All Categories',
            onClick: null,
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
                        <FaShoppingCart style={{ fontSize: '20px' }} />
                        {/* <span className="cart-text">Buy Now</span> */}
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

                {/* WhatsApp Button - Moved below grouped buttons */}
                <div className="whatsapp-container">
                    <button className="floating-btn whatsapp-btn" onClick={handleChatToggle}>
                        <FaWhatsapp style={{ fontSize: '20px' }} />
                        <span className="tooltip">Chat with us</span>
                    </button>
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
                    wishRef={wishRef}
                    handleWishClick={handleWishClick}
                    wlistItems={wlist}   // ✅ Corrected: Pass wlist directly
                    isOpen={isWishOpen}
                    wlist={wlist}   // ✅ Corrected: wlist is an array, not an object
                    deleteItemFromWishlist={deleteItemFromWishlist}
                />
            )}

            {/* Chat Popup */}
            {isChatVisible && <ChatPopup onClose={handleChatToggle} />}

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

                .whatsapp-container {
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
                    color: yellow;
                    border: none;
                    border-radius: 10%;
                    display: flex;
                    flex-direction: column; /* Stack the icon and text vertically */
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    position: relative;
                    text-align: center; /* Ensure text is centered */
                    padding: 5px; /* Padding for spacing between icon and text */
                }
                .floating-btn-cart .cart-text {
                    margin-top: 5px; /* Space between icon and text */
                    font-size: 12px; /* Optional: Adjust text size if needed */
                    color: white;
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

                .whatsapp-btn {
                    background-color: #25d366;
                    color: white;
                    border-radius: 50%;
                    width: 45px;
                    height: 45px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    position: relative;
                }

                .whatsapp-btn:hover {
                    background-color: #128c7e;
                }
            `}</style>
        </>
    );
};

export default FloatingBar;
