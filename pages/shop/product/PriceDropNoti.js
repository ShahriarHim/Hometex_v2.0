import React, { useState, useEffect } from 'react';
import styles from './PriceDropNotificationButton.module.css'; 
import { getCookie } from 'cookies-next';
import Constants from '@/ults/Constant';

const PriceDropNotificationButton = ({ product }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(null);

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000); // 10000 ms = 10 seconds
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleNotification = async () => {
    try {
      const token = getCookie('home_text_token');
      
      if (!token) {
        alert('Please login to set price drop notifications');
        return;
      }

      setIsSubmitting(true);

      const response = await fetch(`${Constants.BASE_URL}/api/product/price-drop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: product.id
        })
      });

      const data = await response.json();

      if (data.success) {
        setNotificationStatus('success');
        alert('Price drop notification set successfully!');
      } else {
        setNotificationStatus('error');
        alert(data.message || 'Failed to set notification');
      }
    } catch (error) {
      setNotificationStatus('error');
      alert('Failed to set price drop notification');
    } finally {
      setIsSubmitting(false);
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (!isSubmitting) {
      if (notificationStatus !== 'success') {
        handleNotification();
      } else {
        setIsVisible(prevIsVisible => !prevIsVisible);
      }
    }
  };

  return (
    <>
      <div className={styles.bellIcon} onClick={() => setIsVisible(prevIsVisible => !prevIsVisible)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405C18.792 14.63 19 13.855 19 13V9c0-3.19-2.463-5.805-5.525-5.98A3.5 3.5 0 0010.5 3c-1.042 0-2.02.397-2.776 1.045C5.84 4.495 5 5.867 5 7.25v5.75c0 .855.208 1.63.605 2.345L4 17h5m1-1v1a2 2 0 104 0v-1m1-6v4m-8-4v4"
          />
        </svg>
      </div>
      <div className={`${styles.container} ${isVisible ? styles.open : styles.closed}`}>
        <button
          className={`${styles.button} ${isSubmitting ? styles.loading : ''} ${
            notificationStatus === 'success' ? styles.success : 
            notificationStatus === 'error' ? styles.error : ''
          }`}
          aria-expanded={isVisible}
          onClick={handleClick}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Setting notification...' : 
           notificationStatus === 'success' ? 'Notification set!' :
           `Get a notification when price drops below ৳ ${product.price}`}
        </button>
      </div>
    </>
  );
};

export default PriceDropNotificationButton;
