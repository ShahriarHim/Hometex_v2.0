import React, { useState, useEffect } from 'react';
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

const FloatingBar = () => {
    const { location, isGeolocationAvailable, isGeolocationEnabled } = useGeolocation();
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [showBar, setShowBar] = useState(false); // State to manage visibility based on scroll

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleChatToggle = () => {
        setIsChatVisible(prevState => !prevState);
    };

    const handleScroll = () => {
        // If scrolled down by more than 200px, show the bar, otherwise hide it
        if (window.scrollY > 200) {
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
            onClick: handleChatToggle,
          
        },
        {
            icon: <FaMapMarkerAlt />,
            tooltip: (
                <div className="popup-content"><span>{isGeolocationAvailable && isGeolocationEnabled ? location : 'Location'}</span></div>
            ),
            onClick: null,
            className: 'floating-btn-middle',
        },

        {
            icon: <FaHeart />,
            tooltip: 'Wishlist',
            onClick: null,
            className: 'floating-btn-middle',
            popupContent: (
                <div className="popup-content">
                    <h3>Wishlist</h3>
                    {wishlist.length > 0 ? (
                        <ul>
                            {wishlist.map((item, index) => (
                                <li key={index}>
                                    <a href={`/product/${item.id}`}>{item.name} - ${item.price}</a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No items in wishlist.</p>
                    )}
                </div>
            ),
        },
        {
            icon: <FaEye />,
            tooltip: 'Recently Viewed',
            onClick: null,
            className: 'floating-btn-middle',
            popupContent: (
                <div className="popup-content">
                    <h3>Recently Viewed</h3>
                    {recentlyViewed.length > 0 ? (
                        <ul>
                            {recentlyViewed.map((item, index) => (
                                <li key={index}>
                                    <a href={`/product/${item.id}`}>{item.name} - ${item.price}</a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No recently viewed items.</p>
                    )}
                </div>
            ),
        },
        {
            icon: <FaWhatsapp />,
            tooltip: 'Chat with us',
            onClick: handleChatToggle, // Corrected this line
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
                {/* Add to Cart */}
                <div className="cart-container">
                    <button className="floating-btn-cart green-btn">
                        <FaShoppingCart />
                        <span className="cart-text">Buy Now</span>
                    </button>
                </div>

                {/* Grouped Buttons */}
                <div className="grouped-buttons">
                    <div className="button-container">
                        {buttonData.map((button, index) =>
                            button.popupContent ? (
                                <Popup
                                    key={index}
                                    trigger={
                                        <button className={`floating-btn ${button.className}`}>
                                            {button.icon}
                                            <span className="tooltip">{button.tooltip}</span>
                                        </button>
                                    }
                                    position="left center"
                                >
                                    {button.popupContent}
                                </Popup>
                            ) : (
                                <button
                                    key={index}
                                    className={`floating-btn ${button.className}`}
                                    onClick={button.onClick}
                                >
                                    {button.icon}
                                    <span className="tooltip">{button.tooltip}</span>
                                </button>
                            )
                        )}
                    </div>
                </div>

                <style jsx>{`
                    .floating-bar {
                        position: fixed;
                        right: 20px;
                        top: 50%;
                        transform: translateY(-50%);
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
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
                        background: #333;
                        border-radius: 50px;
                        padding: 5px;
                        gap: 5px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    .floating-btn-cart {
                        width: 60px;
                        height: 60px;
                        background: #333;
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

                    .cart-text {
                        color: white;
                        font-size: 12px;
                        margin-top: 5px;
                    }

                    .floating-btn {
                        width: 50px;
                        height: 50px;
                        background: transparent;
                        color: white;
                        border: none;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        position: relative;
                        transition: all 0.3s ease;
                    }

                    .floating-btn:hover {
                        background: #28a745;
                        border-radius: 50%;
                        color: white;
                    }

                    .floating-btn-first {
                        border-radius: 25px 25px 0 0;
                    }

                    .floating-btn-middle {
                        border-radius: 0;
                    }

                    .floating-btn-last {
                        border-radius: 0 0 25px 25px;
                    }

                    .green-btn {
                        background: #28a745;
                    }

                    .tooltip {
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: -110%;
                        transform: translateY(-50%);
                        background: #333;
                        color: white;
                        padding: 5px 10px;
                        border-radius: 5px;
                        white-space: nowrap;
                        opacity: 0;
                        transition: opacity 0.3s;
                    }

                    .floating-btn:hover .tooltip {
                        opacity: 1;
                    }

                    .popup-content {
                        padding: 15px;
                        background: white;
                        border-radius: 5px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }
                `}</style>
            </div>
 
            {isChatVisible && <ChatPopup onClose={handleChatToggle} />}
        </>
    );
};

export default FloatingBar;
