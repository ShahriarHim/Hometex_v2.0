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
          <img src="/images/hometex-logo.png" alt="Cookie Logo" className={styles.cookiesPopupLogo} />
          <p className={styles.cookiesPopupTitle}>This website uses cookies</p>
        </div>
        <div className={styles.cookiesPopupBody}>
        <div className={styles.textAndButtonsWrapper}>
    <p className={styles.cookiesPopupDescription}>
      We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you've provided to them or that they've collected from your use of their services.
    </p>
  </div>
  <div className={styles.buttonsWrapper}>
    <button className={`${styles.cookiesPopupButton} ${styles.acceptAll}`} onClick={onClose}>Allow all</button>
    <button className={`${styles.cookiesPopupButton} ${styles.allowSelection}`} onClick={onClose}>Allow selection</button>
    <button className={`${styles.cookiesPopupButton} ${styles.deny}`} onClick={onClose}>Deny</button>
  </div>
          <div className={styles.cookiesPopupPreferences}>
            <label className={styles.cookiesPopupLabel}>
              Necessary
              <div className={styles.toggleSwitch}>
                <input type="checkbox" checked={preferences.necessary} onChange={() => handleToggle('necessary')} disabled />
                <span className={`${styles.slider} ${styles.disabled}`}></span>
              </div>
            </label>
            <label className={styles.cookiesPopupLabel}>
              Preferences
              <div className={styles.toggleSwitch}>
                <input type="checkbox" checked={preferences.preferences} onChange={() => handleToggle('preferences')} />
                <span className={styles.slider}></span>
              </div>
            </label>
            <label className={styles.cookiesPopupLabel}>
              Statistics
              <div className={styles.toggleSwitch}>
                <input type="checkbox" checked={preferences.statistics} onChange={() => handleToggle('statistics')} />
                <span className={styles.slider}></span>
              </div>
            </label>
            <label className={styles.cookiesPopupLabel}>
              Marketing
              <div className={styles.toggleSwitch}>
                <input type="checkbox" checked={preferences.marketing} onChange={() => handleToggle('marketing')} />
                <span className={styles.slider}></span>
              </div>
            </label>
          </div>
        </div>
        {/* <div className={styles.cookiesPopupFooter}> */}
       
        {/* </div> */}
      </div>
    </div>
  );
};

export default CookiesPopup;
