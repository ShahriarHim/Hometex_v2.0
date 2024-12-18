import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/newDesigns/ProductCard';
import ProductGridCard from '@/components/newDesigns/ProductGridCard';
import Constants from '@/ults/Constant';
import styles from '../../styles/Gridbox.module.css';  

const ProductPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [products, setProducts] = useState([]);
    const [viewMode, setViewMode] = useState('card');
    const [error, setError] = useState(null);
    const [categoryPath, setCategoryPath] = useState('');

    // Detailed logging
    console.log('Full Router Query:', router.query);
    console.log('Slug Array:', slug);

    // Determine the correct ID and path
    const productName = slug && slug.length > 0 ? slug[slug.length - 1] : null;
    const fullPath = slug ? slug.join('/') : '';

    console.log('Extracted Product Name:', productName);
    console.log('Full Category Path:', fullPath);

    useEffect(() => {
        const fetchProductsAndValidatePath = async () => {
            if (!productName) {
                console.warn('No product name found to fetch products');
                return;
            }

            try {
                // Fetch category hierarchy
                const categoryResponse = await fetch(`${Constants.BASE_URL}/api/product-menu/horizontal`);
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

                console.log('Product Data:', productData);

                if (!productData.data || productData.data.length === 0) {
                    setError('No products found.');
                    setProducts([]);
                    return;
                }

                // Transform products
                const transformedProducts = productData.data.map(product => ({
                    img: product.primary_photo,
                    discount: product.discount_percent ? product.discount_percent : null,
                    name: product.name,
                    price: product.sell_price.price + product.sell_price.symbol,
                    originalPrice: product.original_price + product.sell_price.symbol,
                }));

                setProducts(transformedProducts);
                setError(null);
                setCategoryPath(productDetails.path || '');
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products.');
            }
        };

        if (productName) {
            fetchProductsAndValidatePath();
        }
    }, [productName, fullPath, router]);

    const toggleView = (mode) => {
        setViewMode(mode);
    };

    // If no products, show loading or error
    if (!productName) {
        return <div>Loading or No Product Name...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {error && (
                <div className="text-red-500 text-center mb-6">{error}</div>
            )}
            
            {/* View Toggle Buttons */}
            <div className="flex justify-end mb-6 gap-2">
                <button 
                    onClick={() => toggleView('card')}
                    className={`px-4 py-2 rounded-lg border ${
                        viewMode === 'card' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-white text-gray-700'
                    }`}
                >
                    Card View
                </button>
                <button 
                    onClick={() => toggleView('photo')}
                    className={`px-4 py-2 rounded-lg border ${
                        viewMode === 'photo' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-white text-gray-700'
                    }`}
                >
                    Grid View
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {viewMode === 'card' && products.map((product, index) => (
                    <div key={index}>
                        <ProductCard product={product} />
                    </div>
                ))}
                {viewMode === 'photo' && products.map((product, index) => (
                    <div key={index}>
                        <ProductGridCard 
                            product={{
                                ...product,
                                image: product.img,
                                id: index,
                                rating: 4,
                                price: product.price.replace(/[^\d.]/g, ''), // Remove currency symbol
                                originalPrice: product.originalPrice.replace(/[^\d.]/g, ''), // Remove currency symbol
                            }} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage; 