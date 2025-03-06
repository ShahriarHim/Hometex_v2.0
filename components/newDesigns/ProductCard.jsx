import React, { useContext } from 'react';
import styles from "../../styles/DesignThree.module.css";
import CartContext from "@/context/CartContext";
import WishListContext from '@/context/WishListContext';
 
import Swal from 'sweetalert2';

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist } = useContext(WishListContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const item = {
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.img,
      quantity: 1
    };

    addItemToCart(item);
    
    // Remove any lingering overlay effects
    const productContainer = e.target.closest(`.${styles['product-item-container']}`);
    if (productContainer) {
      const overlay = productContainer.querySelector(`.${styles.overlay}`);
      if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.style.opacity = '1';
        }, 100);
      }
    }

    // Show enhanced toast notification
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeInRight'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutRight'
      },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      html: `
        <div class="flex items-center gap-3 p-1">
          <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover"/>
          </div>
          <div class="flex-1">
            <p class="font-medium text-white text-sm">${item.name}</p>
            <p class="text-white/80 text-xs">Added to cart • ${item.price}</p>
          </div>
          <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <i class="fas fa-shopping-cart text-white text-sm"></i>
          </div>
        </div>
      `,
      customClass: {
        popup: 'colored-toast',
        title: 'text-sm font-medium'
      }
    });
  };

  const handleQuickView = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    
    // Add your quick view logic here
  };

  const handleCompare = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    
    // Add your compare logic here
  };

  const handleWishlistClick = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    
    const item = {
      product_id: product.id,
      name: product.name,
      price: product.sell_price?.price,
      image: product.img,
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
            className="img-fluid w-full h-full object-cover"
            loading="lazy"
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
              onClick={handleWishlistClick}
            >
              <i className={`fas fa-heart ${isInWishlist(product.id) ? 'text-red-500' : ''}`} style={{ fontSize: '16px' }}></i>
            </button>
            <button 
              title="Compare"
              onClick={handleCompare}
            >
              <i className="fas fa-retweet" style={{ fontSize: '16px' }}></i>
            </button>
            <button 
              title="Quick View"
              onClick={handleQuickView}
            >
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