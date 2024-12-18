import React from 'react';
import styles from "../../styles/DesignThree.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles['product-item-container']}>
      <div className={styles['product-image-container']}>
        {product.discount && (
          <div className={styles['discount-badge']}>
            {product.discount}
          </div>
        )}
        
        <a href="#" title={product.name}>
          <img
            src={product.img}
            alt={product.name}
            className="img-fluid"
          />
        </a>
        
        <div className={styles.overlay}>
          <div className={styles['button-group']}>
            <button title="Add to Cart">
              <i className="fas fa-shopping-basket" style={{ fontSize: '16px' }}></i>
            </button>
            <button title="Add to Wish List">
              <i className="fas fa-heart" style={{ fontSize: '16px' }}></i>
            </button>
            <button title="Compare">
              <i className="fas fa-retweet" style={{ fontSize: '16px' }}></i>
            </button>
            <button title="Quick View">
              <i className="fas fa-eye" style={{ fontSize: '16px' }}></i>
            </button>
          </div>
        </div>
      </div>

      <div className="right-block">
        <div className="caption">
          <h4><a href="#">{product.name}</a></h4>
          <div className={styles.rating}>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <span key={index} className={styles.star}>
                <i className={`fas fa-star ${index < (product.star || 3) ? '' : styles['star-empty']}`}></i>
              </span>
            ))}
          </div>
          <div className={styles['price-container']}>
            <span className={styles['price-new']}>{product.price}</span>
            <span className={styles['price-old']}>{product.originalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 