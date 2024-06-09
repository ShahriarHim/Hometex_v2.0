import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const FirstOrderPopup = () => (
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
            <h2 style={styles.title}>Want $100 off your first order?</h2>
            <p style={styles.description}>Subscribe now and get a discount on your first purchase!</p>
          </div>
          <div style={styles.actions}>
            <button style={styles.yesButton} onClick={close}>YES, I DO!</button>
            <button style={styles.noButton} onClick={close}>NO THANKS</button>
          </div>
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
    animation: 'fade-in 0.5s ease', // Animation for fade-in effect
  },
  popupContent: {
    width: '25%',
    backgroundColor: '#FFFFFF',
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
    fontFamily: 'Pacifico, cursive', // Playful font
    fontSize: '2rem',
    margin: '0',
    color: '#333333',
  },
  description: {
    fontSize: '1rem',
    color: '#666666',
    margin: '0',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1rem',
  },
  yesButton: {
    backgroundColor: '#FF6B6B', // Red color
    color: '#FFFFFF',
    padding: '1rem 2rem',
    borderRadius: '30px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    width: '80%',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  noButton: {
    backgroundColor: '#FFD166', // Yellow color
    color: '#333333',
    padding: '1rem 2rem',
    borderRadius: '30px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    width: '80%',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  '@keyframes fade-in': { // Keyframes for fade-in animation
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
};

export default FirstOrderPopup;
