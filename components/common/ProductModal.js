import React, { useState, useEffect, useRef, useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import CartContext from '@/context/CartContext';
import styles from '@/styles/ProductModal.module.css';
import Invoice from '../invoice/Invoice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductModal = ({ product, onClose }) => {
  const { addItemToCart } = useContext(CartContext);
  const [productQty, setProductQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('38');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [showInvoice, setShowInvoice] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
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

  const handleQuantityChange = (e) => {
    const newQty = Math.min(Math.max(parseInt(e.target.value, 10) || 1, 1), product.stock);
    setProductQty(newQty);
  };

  const toggleInvoice = () => {
    setShowInvoice(!showInvoice);
  };

  const handleShippingInfoChange = (e) => {
    setShowShippingInfo(e.target.checked);
  };

  if (!product) return null;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <RiCloseLine size="24" />
        </button>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.shoeBackground}>
              <img src={product.primary_photo} alt={product.name} className={`${styles.shoe} ${styles.show}`} />
              <div className={styles.gradients}>
                <div className={`${styles.gradient} ${styles.first}`} color="blue"></div>
                <div className={`${styles.gradient}`} color="red"></div>
                <div className={`${styles.gradient}`} color="green"></div>
                <div className={`${styles.gradient}`} color="orange"></div>
                <div className={`${styles.gradient}`} color="black"></div>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.shoeName}>
                <div>
                  <h1 className={styles.big}>{product.name}</h1>
                  <span className={styles.new}>new</span>
                </div>
                <h3 className={styles.small}>Running Collection</h3>
              </div>
              <div className={styles.description}>
                <h3 className={styles.title}>Product Info</h3>
                <Slider {...sliderSettings}>
                  <div>
                    <div className={styles.colorContainer}>
                      <h3 className={styles.title}>Color</h3>
                      <div className={styles.colors}>
                        {['blue', 'red', 'green', 'orange', 'black'].map((color) => (
                          <span
                            key={color}
                            className={`${styles.color} ${selectedColor === color ? styles.active : ''}`}
                            onClick={() => setSelectedColor(color)}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className={styles.sizeContainer}>
                      <h3 className={styles.title}>Size</h3>
                      <div className={styles.sizes}>
                        {['37', '38', '39', '40', '41', '42'].map((size) => (
                          <span
                            key={size}
                            className={`${styles.size} ${selectedSize === size ? styles.active : ''}`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="font-semibold mb-2">Quantity</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={decreaseQuantity}
                          className="px-2 py-1 bg-gray-200 rounded-md"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="block w-16 px-4 py-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline-gray"
                          min="1"
                          max={product.stock}
                          step="1"
                          value={productQty}
                          onChange={handleQuantityChange}
                        />
                        <button
                          onClick={increaseQuantity}
                          className="px-2 py-1 bg-gray-200 rounded-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className={styles.buyPrice}>
                      <div className={styles.price}>
                        <span>$</span>
                        <h1>{product.price}</h1>
                      </div>
                      <button className={styles.buy} onClick={addToCartHandler}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className={styles.text}>{product.description}</p>
                    <button className={styles.buy} onClick={toggleInvoice}>
                      Show Invoice
                    </button>
                    <div className={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        id="shippingInfo"
                        checked={showShippingInfo}
                        onChange={handleShippingInfoChange}
                      />
                      <label htmlFor="shippingInfo">Add Shipping and Pricing Info</label>
                    </div>
                    {showShippingInfo && (
                      <div className={styles.shippingInfo}>
                        <p className={styles.text}>Shipping: Free standard shipping.</p>
                        <p className={styles.text}>Price: ${product.price}</p>
                      </div>
                    )}
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
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
