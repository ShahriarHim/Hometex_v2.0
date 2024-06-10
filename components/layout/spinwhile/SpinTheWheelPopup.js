import React, { useState } from "react";
import styles from "./SpinTheWheelPopup.module.css";

const SpinTheWheelPopup = ({ isOpen, onClose }) => {
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);

  const spinWheel = () => {
    setSpinning(true);
    const randomAngle = Math.floor(Math.random() * 360) + 1440; // Ensuring at least 4 full rotations
    setAngle(angle + randomAngle);

    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? "Win" : "Lose";
      setResult(outcome);
      setSpinning(false);
    }, 4000); // Duration matches the animation
  };

  const getDiscountLevel = () => {
    const levels = ["20% off", "30% off", "Full Discount", "No luck"];
    const randomIndex = Math.floor(Math.random() * levels.length);
    return levels[randomIndex];
  };

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.show : styles.hide}`} onClick={onClose}>
      <div className={styles.background}></div>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>Spin the Wheel</h2>
            <button onClick={onClose} className={styles.closeButton}>
              <span className="sr-only">Close panel</span>
              <svg
                className={styles.closeIcon}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className={styles.body}>
            <div className={styles.wheelContainer}>
              <div
                className={`${styles.wheel} ${spinning ? styles.spin : ""}`}
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div className={styles.segment} style={{ backgroundColor: '#ffeb3b' }}>20% off</div>
                <div className={styles.segment} style={{ backgroundColor: '#f44336' }}>30% off</div>
                <div className={styles.segment} style={{ backgroundColor: '#4caf50' }}>Full Discount</div>
                <div className={styles.segment} style={{ backgroundColor: '#2196f3' }}>No luck</div>
                <div className={styles.segment} style={{ backgroundColor: '#ffeb3b' }}>20% off</div>
                <div className={styles.segment} style={{ backgroundColor: '#f44336' }}>30% off</div>
                <div className={styles.segment} style={{ backgroundColor: '#4caf50' }}>Full Discount</div>
                <div className={styles.segment} style={{ backgroundColor: '#2196f3' }}>No luck</div>
                {!spinning && (
                  <button onClick={spinWheel} className={styles.spinButton}>
                    Spin the Wheel
                  </button>
                )}
              </div>
            </div>
            {result && (
              <div className={styles.result}>
                <p className={styles.resultText}>{result === "Win" ? "Congratulations!" : "Better luck next time!"}</p>
                <p className={styles.discountText}>You've won: {result === "Win" ? getDiscountLevel() : "No luck"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinTheWheelPopup;
