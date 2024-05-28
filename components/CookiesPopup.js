// components/CookiesPopup.js

import React, { useState } from 'react';
import styles from '../styles/CookiesPopup.module.css';

const CookiesPopup = ({ onClose }) => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    preferences: false,
    statistics: false,
    marketing: false,
  });

  const handleToggle = (type) => {
    setPreferences((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className={styles.cookiesPopup}>
      <div className={styles.cookiesPopupContent}>
        <div className={styles.cookiesPopupHeader}>
          <img src="/cookie-logo.png" alt="Cookie Logo" className={styles.cookiesPopupLogo} />
          <p className={styles.cookiesPopupTitle}>This website uses cookies</p>
        </div>
        <div className={styles.cookiesPopupBody}>
          <p className={styles.cookiesPopupDescription}>
            We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you've provided to them or that they've collected from your use of their services.
          </p>
          <div className={styles.cookiesPopupPreferences}>
            <label className={styles.cookiesPopupLabel}>
              <input type="checkbox" checked={preferences.necessary} onChange={() => handleToggle('necessary')} disabled />
              Necessary
            </label>
            <label className={styles.cookiesPopupLabel}>
              <input type="checkbox" checked={preferences.preferences} onChange={() => handleToggle('preferences')} />
              Preferences
            </label>
            <label className={styles.cookiesPopupLabel}>
              <input type="checkbox" checked={preferences.statistics} onChange={() => handleToggle('statistics')} />
              Statistics
            </label>
            <label className={styles.cookiesPopupLabel}>
              <input type="checkbox" checked={preferences.marketing} onChange={() => handleToggle('marketing')} />
              Marketing
            </label>
          </div>
        </div>
        <div className={styles.cookiesPopupFooter}>
          <button className={`${styles.cookiesPopupButton} ${styles.acceptAll}`} onClick={onClose}>Allow all</button>
          <button className={`${styles.cookiesPopupButton} ${styles.allowSelection}`} onClick={onClose}>Allow selection</button>
          <button className={`${styles.cookiesPopupButton} ${styles.deny}`} onClick={onClose}>Deny</button>
        </div>
      </div>
    </div>
  );
};

export default CookiesPopup;
