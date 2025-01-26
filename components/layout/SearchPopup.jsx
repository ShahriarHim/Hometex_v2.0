import React, { useEffect, useState } from "react";
import styles from '../../styles/SearchPopup.module.css'; // Create a CSS module for styling
// Or "../../styles/SearchPopup.module.css"
import Constants from '@/ults/Constant';
const SearchPopup = ({ onClose }) => {
  const [products, setProducts] = useState([]); // State to hold fetched products

  // Call fetchProducts when the component mounts
  useEffect(() => {
    fetchProducts(); // Call the function to fetch products
  }, []); // Empty dependency array means it runs once on mount

  // Example categories
  const categories = [
    {
      id: 1,
      label: "0 – 18 MONTHS",
      products: 11,
      imageUrl: "https://via.placeholder.com/80x80?text=Drum", 
    },
    {
      id: 2,
      label: "13 – 15 YEARS",
      products: 11,
      imageUrl: "https://via.placeholder.com/80x80?text=Ball", 
    },
    {
      id: 3,
      label: "18 – 36 MONTHS",
      products: 12,
      imageUrl: "https://via.placeholder.com/80x80?text=Train",
    },
    {
      id: 4,
      label: "3 – 5 YEARS",
      products: 11,
      imageUrl: "https://via.placeholder.com/80x80?text=Blocks",
    },
    {
      id: 5,
      label: "6 – 8 YEARS",
      products: 11,
      imageUrl: "https://via.placeholder.com/80x80?text=Snow+Globe",
    },
    {
      id: 6,
      label: "9 – 12 YEARS",
      products: 11,
      imageUrl: "https://via.placeholder.com/80x80?text=Robot",
    },
  ];

  // Function to handle clicks on the overlay
  const handleOverlayClick = (e) => {
    // Check if the click is outside the popup content
    if (e.target === e.currentTarget) {
      onClose(); // Close the popup
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${Constants.BASE_URL}/api/products-web/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setProducts(result.data); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className={styles.popup} onClick={handleOverlayClick}>
      <div className={styles.popupContent}>
        {/* Close Button (top-right “X”) */}
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        {/* Title */}
        <h1 className={styles.title}>What Are You Looking For?</h1>

        {/* Search Area */}
        <div className={styles.searchRow}>
          <select className={styles.categorySelect}>
            <option>All categories</option>
            <option>Category 1</option>
            <option>Category 2</option>
            <option>Category 3</option>
            {/* ... Add more categories as needed */}
          </select>
          <input
            type="text"
            placeholder="Search for products..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>SEARCH</button>
        </div>

        {/* Trending Searches - Moved under the search box */}
        <div className={styles.trendingSearches}>
          <h3>TRENDING SEARCHES:</h3>
          <div className={styles.tags}>
            <span>Shirt</span>
            <span>Shoes</span>
            <span>Cap</span>
            <span>Skirt</span>
          </div>
        </div>

        {/* Popular Categories */}
        <h2 className={styles.popularTitle}>Popular Categories</h2>
        <div className={styles.categoryGrid}>
          {categories.map((cat) => (
            <div key={cat.id} className={styles.categoryCard}>
              <img src={cat.imageUrl} alt={cat.label} />
              <p className={styles.categoryLabel}>{cat.label}</p>
              <p className={styles.productCount}>{cat.products} products</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
