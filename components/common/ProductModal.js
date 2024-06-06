import React, { useState, useEffect, useRef, useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { FaStar, FaPrint } from 'react-icons/fa';
import CartContext from '@/context/CartContext';
import styles from '@/styles/ProductModal.module.css';
import Invoice from '../invoice/Invoice';
import ProductsTabs from '../home/ProductsTabs';


const ProductModal = ({ product, onClose }) => {
  const { addItemToCart } = useContext(CartContext);
  const [productQty, setProductQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('38');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [showInvoice, setShowInvoice] = useState(false); // Add showInvoice state
  const modalRef = useRef();
 
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const addToCartHandler = () => {
    addItemToCart({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.primary_photo,
      quantity: productQty,
      in_stock: product.stock,
      supplier_id: product.supplier_id,
      sku: product.sku,
      total_price: parseFloat(product.price) * productQty,
      size: selectedSize,
      color: selectedColor,
    });
    onClose();
  };

  const increaseQuantity = () => {
    setProductQty((prevQty) => Math.min(prevQty + 1, product.stock));
  };

  const decreaseQuantity = () => {
    setProductQty((prevQty) => Math.max(prevQty - 1, 1));
  };

 
  const toggleInvoice = () => {
    setShowInvoice(!showInvoice);
  };

  if (!product) return null;

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <RiCloseLine size="24" />
        </button>
  
        <div className={styles.modalContent}>
          <div className={styles.imageSection}>
            <img
              src={product.primary_photo}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.thumbnailList}>
              {/* Thumbnails can be mapped here */}
              <img
                src={product.primary_photo}
                alt={product.name}
                className={styles.thumbnail}
              />
              <img
                src={product.primary_photo}
                alt={product.name}
                className={styles.thumbnail}
              />
              <img
                src={product.primary_photo}
                alt={product.name}
                className={styles.thumbnail}
              />
            </div>
          </div>
          <div className={styles.detailsSection}>
            <h1 className={styles.productDetailsTitle}>Product Details</h1>
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productDescription}>
              {/* Static description */}
              The product is a classic and stylish sneaker that combines comfort and durability. With its iconic design and high-quality materials, it's a must-have for any sneaker enthusiast. Whether you're hitting the streets or just hanging out, these sneakers will keep you looking fresh and feeling great.
            </p>
            <div className={styles.rating}>
              {[...Array(5)].map((star, index) => (
                <FaStar
                  key={index}
                  color={index < product.rating ? '#ffc107' : '#e4e5e9'}
                />
              ))}
              <span className={styles.ratingValue}>4.5 (60)</span>
            </div>
            <div className={styles.colorOptions}>
              {['blue', 'red', 'orange', 'green'].map((color) => (
                <span
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`${styles.colorOption} ${
                    selectedColor === color ? styles.selectedColor : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className={styles.sizeOptions}>
              {['37', '38', '39', '40', '41', '42'].map((size) => (
                <span
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`${styles.sizeOption} ${
                    selectedSize === size ? styles.selectedSize : ''
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
            <div className={styles.price}>
              ${parseFloat(product.price).toFixed(2)}
            </div>
            <div className={styles.quantitySelector}>
              <button
                onClick={decreaseQuantity}
                className={styles.quantityButton}
              >
                -
              </button>
              <input
                type="number"
                className={styles.quantityInput}
                min="1"
                max={product.stock}
                step="1"
                value={productQty}
                onChange={(e) =>
                  setProductQty(Math.min(Math.max(e.target.value, 1), product.stock))
                }
              />
              <button
                onClick={increaseQuantity}
                className={styles.quantityButton}
              >
                +
              </button>
            </div>
            <div className={styles.buttonGroup}>
              <button
                onClick={addToCartHandler}
                className={`${styles.showInvoiceButton} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                >
                Add to cart
              </button>
           
              <button
    
  onClick={toggleInvoice}
  className={`${styles.showInvoiceButton} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
>
  Show Invoice
</button>
            </div>
          </div>
        </div>
        <button className={`${styles.showInvoiceButton} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>Next Product</button>
        {showInvoice && (
          <Invoice
            order={{
              id: 123456,
              date: 'May 16, 2023',
              customer: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                address: '1234 Street, City, Country',
              },
            }}
            lineItems={[
              {
                id: 1,
                name: product.name,
                quantity: productQty,
                price: product.price,
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default ProductModal;