// components/CashbackPopup.js
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/CashbackPopup.module.css";
import LoginPopup from "./layout/LoginPopup";

const CashbackPopup = ({ onClose }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <button className={styles.popupClose} onClick={onClose}>
          <FaTimes />
        </button>
        <div className={styles.popupBody}>
          <div className={styles.imageContainer}>
            <img src="/images/hometex-logo.png" alt="Hometex Bangladesh" className={styles.popupImage} />
            <div className={styles.popupBadge}>Collect and Redeem</div>
          </div>
          <div className={styles.popupText}>
            <h2 className={styles.popupTitle}>HomeTex Cashback Offer</h2>
            <ul className={styles.popupList}>
              <li>Register now & get instant cashback points worth 500</li>
              <li>Redeem your cashback points on each purchase</li>
            </ul>
            <button className={styles.popupButton} onClick={toggleLoginPopup}>Register</button>
          </div>
        </div>
        <a href="#" className={styles.popupTerms}>T&amp;C</a>
      </div>
      {showLoginPopup && <LoginPopup showPopup={showLoginPopup} togglePopup={toggleLoginPopup} />}
    </div>
  );
};

export default CashbackPopup;
