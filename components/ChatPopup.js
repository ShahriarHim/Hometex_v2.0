// components/ChatPopup.js
import React from "react";
import { FaTimes } from 'react-icons/fa';
import styles from "@/styles/ChatPopup.module.css"; // Import the CSS module

const ChatPopup = ({ onClose }) => {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupHeader}>
        <h2 className={styles.popupTitle}>Hi there 👋 How can we help?</h2>
        <button onClick={onClose} className={styles.popupClose}>
          <FaTimes />
        </button>
      </div>
      <div className={styles.popupBody}>
        <input
          type="text"
          placeholder="Search for help"
          className={styles.popupInput}
        />
        <ul className={styles.popupList}>
          <li className={styles.popupListItem}>All About Sizes</li>
          <li className={styles.popupListItem}>Discounts and Promotional Codes</li>
          <li className={styles.popupListItem}>Refresher Kits</li>
          <li className={styles.popupListItem}>Frame Styles and Materials</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatPopup;
