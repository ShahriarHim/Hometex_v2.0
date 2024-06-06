import React, { useState, useEffect } from 'react';
import styles from '../styles/CookiesPopup.module.css';

const CookiesPopup = ({ onClose }) => {
  const defaultPreferences = {
    necessary: true,
    preferences: false,
    statistics: false,
    marketing: false,
  };

  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleToggle = (type) => {
    setPreferences((prev) => {
      const newPreferences = { ...prev, [type]: !prev[type] };
      localStorage.setItem('cookiePreferences', JSON.stringify(newPreferences));
      return newPreferences;
    });
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      preferences: true,
      statistics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    onClose();
  };

  const handleAllowSelection = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    onClose();
  };

  const handleDeny = () => {
    const allDenied = {
      necessary: true,
      preferences: false,
      statistics: false,
      marketing: false,
    };
    setPreferences(allDenied);
    localStorage.setItem('cookiePreferences', JSON.stringify(allDenied));
    onClose();
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
            <button className={`${styles.cookiesPopupButton} ${styles.acceptAll}`} onClick={handleAcceptAll}>Allow all</button>
            <button className={`${styles.cookiesPopupButton} ${styles.allowSelection}`} onClick={handleAllowSelection}>Allow selection</button>
            <button className={`${styles.cookiesPopupButton} ${styles.deny}`} onClick={handleDeny}>Deny</button>
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
      </div>
    </div>
  );
};

export default CookiesPopup;
