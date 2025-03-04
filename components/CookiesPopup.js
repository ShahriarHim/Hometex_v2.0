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
      // "Necessary" is always true, so skip toggling it
      if (type === 'necessary') return prev;
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
      necessary: true, // remains true
      preferences: false,
      statistics: false,
      marketing: false,
    };
    setPreferences(allDenied);
    localStorage.setItem('cookiePreferences', JSON.stringify(allDenied));
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        {/* Left section: Logo & short text */}
        <div className={styles.leftSection}>
          <img
            src="/images/hometex-logo.png"
            alt="Cookie Logo"
            className={styles.logo}
          />
          <p className={styles.description}>
            We use cookies to enhance your shopping experience.{' '}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.learnMoreLink}
            >
              Learn more
            </a>
          </p>
        </div>

        {/* Middle section: Toggles in a row */}
        <div className={styles.middleSection}>
          <div className={styles.toggleGroup}>
            <label className={styles.toggleLabel}>
              Necessary
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  readOnly
                />
                <span className={`${styles.slider} ${styles.disabled}`}></span>
              </div>
            </label>

            <label className={styles.toggleLabel}>
              Preferences
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={preferences.preferences}
                  onChange={() => handleToggle('preferences')}
                />
                <span className={styles.slider}></span>
              </div>
            </label>

            <label className={styles.toggleLabel}>
              Statistics
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={preferences.statistics}
                  onChange={() => handleToggle('statistics')}
                />
                <span className={styles.slider}></span>
              </div>
            </label>

            <label className={styles.toggleLabel}>
              Marketing
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => handleToggle('marketing')}
                />
                <span className={styles.slider}></span>
              </div>
            </label>
          </div>
        </div>

        {/* Right section: Buttons */}
        <div className={styles.rightSection}>
          <button
            className={`${styles.popupButton} ${styles.acceptAll}`}
            onClick={handleAcceptAll}
          >
            Allow all
          </button>
          <button
            className={`${styles.popupButton} ${styles.allowSelection}`}
            onClick={handleAllowSelection}
          >
            Allow selection
          </button>
          <button
            className={`${styles.popupButton} ${styles.deny}`}
            onClick={handleDeny}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiesPopup;
