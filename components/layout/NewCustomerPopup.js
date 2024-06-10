import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const NewCustomerPopup = () => (
  <Popup
    open={true} // This should be controlled based on your application logic
    modal
    closeOnDocumentClick
    contentStyle={styles.popupContent}
  >
    {close => (
      <div style={styles.container}>
        <button style={styles.closeButton} onClick={close}>&times;</button>
        <div style={styles.content}>
          <div style={styles.message}>
            <h2 style={styles.title}>Find Your HomeTex and GET 20% OFF!</h2>
            <p style={styles.description}>
              Join the Bliss community and take your skincare to new levels.
            </p>
            <input type="email" placeholder="email address" style={styles.input} />
            <button style={styles.yesButton} onClick={close}>GET 20% OFF</button>
          </div>
          <p style={styles.footer}>
            Offer open to new customers only. Limit 1 per household. Coupon code expires 4 days from issue date. By signing up you acknowledge that you have read and agree to our terms and privacy policy.
          </p>
        </div>
      </div>
    )}
  </Popup>
);

const styles = {
    container: {
      borderRadius: '10px',
      padding: '20px',
      textAlign: 'center',
      animation: 'fade-in 0.5s ease',
      backgroundColor: '#FFEB3B', // Yellow background color
    },
    popupContent: {
      position: 'fixed', // Ensure the popup content is fixed
      bottom: '20px', // Position at the bottom of the viewport
      right: '20px', // Position at the left side of the viewport
      width: '30%',
      backgroundColor: '#FFEB3B',
      border: 'none',
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
    },
    closeButton: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#000000',
      zIndex: '1',
    },
    content: {
      position: 'relative',
    },
    message: {
      marginBottom: '1.5rem',
    },
    title: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '1.5rem',
      margin: '0',
      color: '#333333',
    },
    description: {
      fontSize: '1rem',
      color: '#666666',
      margin: '0 0 1rem 0',
    },
    input: {
      width: '80%',
      padding: '0.5rem',
      margin: '0.5rem 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '1rem',
    },
    yesButton: {
      backgroundColor: '#0000FF', // Blue color
      color: '#FFFFFF',
      padding: '1rem 2rem',
      borderRadius: '30px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      margin: '1rem 0',
      width: '80%',
      textDecoration: 'none',
    },
    footer: {
      fontSize: '0.75rem',
      color: '#666666',
    },
    '@keyframes fade-in': {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
  };
  

export default NewCustomerPopup;
