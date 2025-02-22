import React, { useEffect, useState, useRef } from "react";
import styles from '../../styles/SearchPopup.module.css'; // Create a CSS module for styling
// Or "../../styles/SearchPopup.module.css"
import Constants from '@/ults/Constant';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SearchPopup = ({ onClose }) => {
  const [categories, setCategories] = useState([]); // New state for categories
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [visibleProducts, setVisibleProducts] = useState(8); // Number of products to show initially
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isLoadingMore, setIsLoadingMore] = useState(false); // New state for bottom loading
  const [searchTerm, setSearchTerm] = useState(''); // Add search term state
  const productsRef = useRef(null); // Reference for scroll container
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Show 12 categories per page
  const router = useRouter();

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Replace handleCategoryClick with this version
  const handleCategoryClick = async (categoryName) => {
    const popupElement = document.querySelector(`.${styles.popup}`);
    popupElement.classList.add(styles.slideUp);
    
    // Wait for animation to complete before navigation
    setTimeout(() => {
      onClose(); // Close the popup first
      router.push(`/products/${categoryName.toLowerCase()}`);
    }, 300);
  };

  // Replace initial fetchProducts with fetchCategories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories function
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${Constants.BASE_URL}/api/product-menu/horizontal`,
        {
          method: 'GET',
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Call fetchProducts when the component mounts
  useEffect(() => {
    fetchProducts(); // Call the function to fetch products
  }, []); // Empty dependency array means it runs once on mount

  // Add debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchProducts(searchTerm);
      } else {
        fetchProducts(); // If search is empty, show all products
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (!productsRef.current || isLoadingMore) return;

      const { scrollTop, scrollHeight, clientHeight } = productsRef.current;
      // If scrolled to bottom (with 50px threshold)
      if (scrollHeight - scrollTop - clientHeight < 50) {
        loadMoreProducts();
      }
    };

    const productsSection = productsRef.current;
    if (productsSection) {
      productsSection.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (productsSection) {
        productsSection.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoadingMore, products.length, visibleProducts]);

  
  // Function to handle clicks on the overlay
  const handleOverlayClick = (e) => {
    // Check if the click is outside the popup content
    if (e.target === e.currentTarget) {
      onClose(); // Close the popup
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await fetch(  
        Constants.BASE_URL+'/api/products-web',{
          method: 'GET',
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
       
          headers: {            
            "Content-Type": "application/json",
            },  
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
     
      setProducts(result.data); 
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false); // End loading regardless of outcome
    }
  };

  const loadMoreProducts = async () => {
    if (visibleProducts >= products.length) return;
    
    setIsLoadingMore(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setVisibleProducts(prev => prev + 8);
    setIsLoadingMore(false);
  };

  const searchProducts = async (query) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        Constants.BASE_URL+'/api/products-web-find', {
          method: 'POST',
          mode: "cors",
          cache: "no-cache",
          headers: {            
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            search: query
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setProducts(result.data);
      setVisibleProducts(8); // Reset visible products count
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.popup} onClick={handleOverlayClick}>
      <div className={styles.popupContent}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        {/* Search Section */}
        <div className={styles.searchSection}>
          {/* Title */}
          <h1 className={styles.title}>What Are You Looking For?</h1>

          {/* Search Area */}
          <div className={styles.searchRow}>
            <select className={styles.categorySelect}>
              <option>All categories</option>
              {categories.map(cat => (
                <option key={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search for products..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearch}
            />
            <button 
              className={styles.searchButton}
              onClick={() => searchProducts(searchTerm)}
            >
              SEARCH
            </button>
          </div>

          {/* Trending Searches */}
          <div className={styles.trendingSearches}>
            <h3>TRENDING SEARCHES:</h3>
            <div className={styles.tags}>
              <span>Bed Sheet</span>
              <span>Pillow Cover</span>
              <span>Bed Cover</span>
              <span>cushion</span>
            </div>
          </div>
        </div>

        {/* Products/Categories Section */}
        <div className={styles.productsSection} ref={productsRef}>
          {!searchTerm ? (
            // Show categories when not searching
            <>
              <h2 className={styles.popularTitle}>Browse Categories</h2>
              {isLoading ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.spinner}></div>
                  <p>Loading Categories...</p>
                </div>
              ) : (
                <>
                  <div className={styles.categoryGrid}>
                    {currentCategories.map((category) => (
                      <div 
                        key={category.id}
                        className={styles.categoryCard}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        <div className={styles.imageWrapper}>
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className={styles.categoryImage}
                          />
                        </div>
                        <p className={styles.categoryName}>{category.name}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className={styles.pagination}>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`${styles.pageButton} ${
                            currentPage === page ? styles.activePage : ''
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            // Show products when searching
            <>
              <h2 className={styles.popularTitle}>Search Results</h2>
              {isLoading ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.spinner}></div>
                  <p>Loading Products...</p>
                </div>
              ) : (
                <>
                  <div className={styles.categoryGrid}>
                    {products.slice(0, visibleProducts).map((product) => (
                      <div key={product.id} className={styles.categoryCard}>
                        <img 
                          src={product.primary_photo} 
                          alt={product.name}
                          className={styles.productImage}
                        />
                        <p className={styles.productName}>{product.name}</p>
                        <p className={styles.productPrice}>{product.price}</p>
                      </div>
                    ))}
                  </div>
                  {isLoadingMore && visibleProducts < products.length && (
                    <div className={styles.bottomLoader}>
                      <div className={styles.spinner}></div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
