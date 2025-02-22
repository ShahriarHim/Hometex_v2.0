import React, { useContext } from 'react';
import styles from "../../styles/DesignThree.module.css";
import CartContext from "@/context/CartContext";
import WishListContext from '@/context/WishListContext';
 
import Swal from 'sweetalert2';

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist } = useContext(WishListContext);

  const handleAddToCart = () => {
    const item = {
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.img,
      quantity: 1
    };

    addItemToCart(item);

    // Show custom popup
    // const popup = document.createElement('div');
    // popup.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-slide-in-right';
    // popup.innerHTML = `
    //   <div class="flex items-center gap-2">
    //     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    //     </svg>
    //     <span>Added to cart!</span>
    //   </div>
    // `;

    // document.body.appendChild(popup);

    // Remove popup after 2 seconds
    //   setTimeout(() => {
    //     popup.classList.add('animate-slide-out-right');
    //     setTimeout(() => {
    //       document.body.removeChild(popup);
    //     }, 300);
    //   }, 2000);
  };

  // const attToWishList = (productId) => {
  //   let user_token = getCookie("home_text_token");
  //   if (typeof user_token == "undefined") {
  //     alert("Please Login");
  //     return false;
  //   } else {
  //     addRemoveWishList({
  //       product_id: productId,
  //     });
  //   }
  // };
  const handleAddToWishlist = () => {
    const item = {
      product_id: product.id,
      name: product.name,
      price: product.sell_price?.price,
      image: product.primary_photo,
      quantity: 1,
      stock: product.stock || 0
    };

    const result = addToWishlist(item);

    // Show toast notification
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: result.success ? 'success' : 'error',
      title: result.message,
      customClass: {
        popup: 'colored-toast',
        title: 'text-sm font-medium'
      }
    });
  };

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
            <button
              title="Add to Cart"
              onClick={handleAddToCart}
            >
              <i className="fas fa-shopping-basket" style={{ fontSize: '16px' }}></i>
            </button>
            <button
              title="Add to Wish List"
              onClick={handleAddToWishlist}
            >
              <i className={`fas fa-heart ${isInWishlist(product.id) ? 'text-red-500' : ''}`} style={{ fontSize: '16px' }}></i>
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
          <h4 style={{ textAlign: 'center' }}><a href="#">{product.name}</a></h4>
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