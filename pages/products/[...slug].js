import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/newDesigns/ProductCard';
import ProductGridCard from '@/components/newDesigns/ProductGridCard';
import Constants from '@/ults/Constant';
import styles from '../../styles/Gridbox.module.css';
import Link from 'next/link';

// Add a loading spinner component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-purple-500"></div>
    </div>
);

// Add this function at the top of your file
function encodeProductId(id) {
  // Convert to string, add a salt and encode
  return encodeURIComponent(Buffer.from(`prod-${id}-salt`).toString('base64'));
}

const ProductPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [products, setProducts] = useState([]);
    const [viewMode, setViewMode] = useState('card');
    const [error, setError] = useState(null);
    const [categoryPath, setCategoryPath] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [loadingTimeout, setLoadingTimeout] = useState(false);

    // Detailed logging
    console.log('Full Router Query:', router.query);
    console.log('Slug Array:', slug);

    // Determine the correct ID and path
    const productName = slug && slug.length > 0 ? slug[slug.length - 1] : null;
    const fullPath = slug ? slug.join('/') : '';

    console.log('Extracted Product Name:', productName);
    console.log('Full Category Path:', fullPath);

    useEffect(() => {
        // Set a timeout to show error if loading takes too long
        const timeoutId = setTimeout(() => {
            if (isLoading) {
                setLoadingTimeout(true);
                setIsLoading(false);
            }
        }, 3000);

        const fetchProductsAndValidatePath = async () => {
            if (!productName) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                
                // Fetch category hierarchy
                const categoryResponse = await fetch(`${Constants.BASE_URL}/api/product-menu/horizontal`);
                console.log('Category Response:', categoryResponse);
                const categoryData = await categoryResponse.json();

                // Find the product ID based on the name
                const findProductIdByName = (categories) => {
                    for (let category of categories) {
                        // Check main category
                        if (category.name.toLowerCase() === productName.toLowerCase()) {
                            return { 
                                id: category.id, 
                                path: `${category.name.toLowerCase()}` 
                            };
                        }

                        // Check subcategories
                        if (category.sub) {
                            for (let sub of category.sub) {
                                if (sub.name.toLowerCase() === productName.toLowerCase()) {
                                    return { 
                                        id: sub.id, 
                                        path: `${category.name.toLowerCase()}/${sub.name.toLowerCase()}` 
                                    };
                                }

                                // Check child categories
                                if (sub.child) {
                                    for (let child of sub.child) {
                                        if (child.name.toLowerCase() === productName.toLowerCase()) {
                                            return { 
                                                id: child.id, 
                                                path: `${category.name.toLowerCase()}/${sub.name.toLowerCase()}/${child.name.toLowerCase()}` 
                                            };
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return null;
                };

                // Get the correct product details
                const productDetails = findProductIdByName(categoryData.data);
                
                if (!productDetails) {
                    setError('Product not found');
                    setIsLoading(false);
                    return;
                }

                console.log('Product Details:', productDetails);

                // Redirect if the current path is incorrect
                if (fullPath !== productDetails.path) {
                    console.log(`Redirecting to: /products/${productDetails.path}`);
                    router.replace(`/products/${productDetails.path}`);
                }

                // Fetch product details
                console.log(`Fetching products for ID: ${productDetails.id}`);
                const productResponse = await fetch(`${Constants.BASE_URL}/api/product/horizontal/${productDetails.id}`);
                const productData = await productResponse.json();
                console.log('Product Details:', productDetails);

                console.log('Product Data:', productData);

                if (!productData.data || productData.data.length === 0) {
                    setError('No products found.');
                    setProducts([]);
                    setIsLoading(false);
                    return;
                }

                // Transform products
                const transformedProducts = productData.data.map(product => {
                    const categorySlug = product.category?.name?.toLowerCase() || '';
                    const subCategorySlug = product.sub_category?.name?.toLowerCase() || '';
                    const productSlug = product.child_sub_category?.name?.toLowerCase() || '';
                    const encodedId = encodeProductId(product.id);

                    return {
                        id: product.id,
                        encoded_id: encodedId,
                        img: product.primary_photo,
                        discount: product.discount_percent ? product.discount_percent : null,
                        name: product.name,
                        price: product.sell_price.price + product.sell_price.symbol,
                        originalPrice: product.original_price + product.sell_price.symbol,
                        category_slug: categorySlug,
                        subcategory_slug: subCategorySlug,
                        product_slug: productSlug,
                    };
                });

                setProducts(transformedProducts);
                setError(null);
                setCategoryPath(productDetails.path || '');
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products.');
                setIsLoading(false);
            }
        };

        if (productName) {
            fetchProductsAndValidatePath();
        }

        // Clean up timeout
        return () => clearTimeout(timeoutId);
    }, [productName, fullPath, router]);

    const toggleView = (mode) => {
        setViewMode(mode);
    };

    // If loading, show loading spinner
    if (isLoading) {
        return <LoadingSpinner />;
    }

    // If no products or error, show error message
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500 text-xl">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
            {/* View Toggle Buttons */}
            <div className="flex justify-end mb-6 gap-2">
                <button 
                    onClick={() => toggleView('card')}
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                        viewMode === 'card' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-purple-100'
                    }`}
                >
                    Card View
                </button>
                <button 
                    onClick={() => toggleView('photo')}
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                        viewMode === 'photo' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-purple-100'
                    }`}
                >
                    Grid View
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {viewMode === 'card' && products.map((product, index) => (
                    <div 
                        key={index} 
                        className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
                    >
                        <Link 
                            href={`/shop/product/${product.category_slug}/${product.subcategory_slug}/${product.product_slug}/${product.encoded_id}`}
                            as={`/shop/product/${product.category_slug}/${product.subcategory_slug}/${product.product_slug}/${product.encoded_id}`}
                        >
                            <ProductCard product={product} />
                        </Link>
                    </div>
                ))}
                {viewMode === 'photo' && products.map((product, index) => (
                    <div 
                        key={index} 
                        className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
                    >
                        <ProductGridCard 
                            product={{
                                ...product,
                                image: product.img,
                                id: index,
                                rating: 4,
                                price: product.price.replace(/[^\d.]/g, ''),
                                originalPrice: product.originalPrice.replace(/[^\d.]/g, ''),
                            }} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage; 