// components/CashbackPopup.js
import React from "react";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/CashbackPopup.module.css";

const CashbackPopup = ({ onClose }) => {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <button className={styles.popupClose} onClick={onClose}>
          <FaTimes />
        </button>
        <div className={styles.popupHeader}>
          <div className={styles.popupIcon}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2V7zm0 4h2v6h-2v-6z"
                fill="#ff007a"
              />
            </svg>
          </div>
          <div className={styles.popupBadge}>Collect and Redeem</div>
        </div>
        <div className={styles.popupBody}>
          <h2 className={styles.popupTitle}>myISHO Cashback Offer</h2>
          <ul className={styles.popupList}>
            <li>Register now & get instant cashback points worth 500</li>
            <li>Redeem your cashback points on each purchase</li>
          </ul>
          <button className={styles.popupButton}>Register</button>
        </div>
        <a href="#" className={styles.popupTerms}>T&amp;C</a>
      </div>
    </div>
  );
};

export default CashbackPopup;
