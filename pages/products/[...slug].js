import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/newDesigns/ProductCard';
import ProductGridCard from '@/components/newDesigns/ProductGridCard';
import Constants from '@/ults/Constant';
import styles from '../../styles/Gridbox.module.css';
import Link from 'next/link';

// Loading Spinner Component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-purple-500"></div>
    </div>
);

function encodeProductId(id) {
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

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    const productName = slug && slug.length > 0 ? slug[slug.length - 1] : null;
    const fullPath = slug ? slug.join('/') : '';

    useEffect(() => {
        const fetchProductsAndValidatePath = async () => {
            if (!productName) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const categoryResponse = await fetch(`${Constants.BASE_URL}/api/product-menu/horizontal`);
                const categoryData = await categoryResponse.json();

                const findProductIdByName = (categories) => {
                    for (let category of categories) {
                        if (category.name.toLowerCase() === productName.toLowerCase()) {
                            return { id: category.id, path: `${category.name.toLowerCase()}` };
                        }
                        if (category.sub) {
                            for (let sub of category.sub) {
                                if (sub.name.toLowerCase() === productName.toLowerCase()) {
                                    return { id: sub.id, path: `${category.name.toLowerCase()}/${sub.name.toLowerCase()}` };
                                }
                                if (sub.child) {
                                    for (let child of sub.child) {
                                        if (child.name.toLowerCase() === productName.toLowerCase()) {
                                            return { id: child.id, path: `${category.name.toLowerCase()}/${sub.name.toLowerCase()}/${child.name.toLowerCase()}` };
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return null;
                };

                const productDetails = findProductIdByName(categoryData.data);
                if (!productDetails) {
                    setError('Product not found');
                    setIsLoading(false);
                    return;
                }

                if (fullPath !== productDetails.path) {
                    router.replace(`/products/${productDetails.path}`);
                }

                const productResponse = await fetch(`${Constants.BASE_URL}/api/product/horizontal/${productDetails.id}`);
                const productData = await productResponse.json();

                if (!productData.data || productData.data.length === 0) {
                    setError('No products found.');
                    setProducts([]);
                    setIsLoading(false);
                    return;
                }

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
    }, [productName, fullPath, router]);

    const toggleView = (mode) => {
        setViewMode(mode);
    };

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500 text-xl">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-end mb-6 gap-2">
                <button
                    onClick={() => toggleView('card')}
                    className={`px-4 py-2 rounded-lg border ${viewMode === 'card' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-purple-100'}`}
                >
                    Card View
                </button>
                <button
                    onClick={() => toggleView('photo')}
                    className={`px-4 py-2 rounded-lg border ${viewMode === 'photo' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-purple-100'}`}
                >
                    Grid View
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {currentProducts.map((product, index) => (
                    <div key={index} className="cursor-pointer transform transition-transform duration-300 hover:scale-105">
                        <Link href={`/shop/product/${product.category_slug}/${product.subcategory_slug}/${product.product_slug}/${product.encoded_id}`}>
                            {viewMode === 'card' ? <ProductCard product={product} /> : <ProductGridCard product={product} />}
                        </Link>
                    </div>
                ))}
            </div>

            {/* DataTables Style Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
                {/* Previous Button */}
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded border bg-gray-200"
                >
                    Prev
                </button>

                {/* Dynamic Page Numbers - Show Only 3 Pages */}
                {(() => {
                    let startPage = Math.max(1, currentPage - 1);
                    let endPage = Math.min(totalPages, startPage + 2);

                    if (endPage - startPage < 2) {
                        startPage = Math.max(1, endPage - 2);
                    }

                    return [...Array(endPage - startPage + 1).keys()].map((_, index) => {
                        const pageNumber = startPage + index;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                className={`px-4 py-2 rounded border ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300'
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    });
                })()}

                {/* Next Button */}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded border bg-gray-200"
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default ProductPage;
