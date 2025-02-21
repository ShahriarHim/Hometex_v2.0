import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/newDesigns/ProductCard';
import ProductGridCard from '@/components/newDesigns/ProductGridCard';
import Constants from '@/ults/Constant';
import FilterProducts from './FilterProducts';
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

    // Filter states
    const [filters, setFilters] = useState({
        subcategory: [],
        color: [],
        priceRange: [0, 1000],
        size: [],
    });

    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState(['Red', 'Blue', 'Green']);
    const [sizes, setSizes] = useState(['Small', 'Medium', 'Large']);

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
                    const categorySlug = product.category?.name?.toLowerCase() || 'uncategorized';
                    const subCategorySlug = product.sub_category?.name?.toLowerCase() || 'general';
                    const productSlug = product.child_sub_category?.name?.toLowerCase() || 'item';
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

    const toggleFilter = (filterType, value) => {
        setFilters((prevFilters) => {
            const currentFilters = prevFilters[filterType];
            const newFilters = currentFilters.includes(value)
                ? currentFilters.filter((item) => item !== value)
                : [...currentFilters, value];

            return {
                ...prevFilters,
                [filterType]: newFilters,
            };
        });
    };

    const handlePriceChange = (newPriceRange) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            priceRange: newPriceRange,
        }));
    };

    const clearFilters = () => {
        setFilters({
            subcategory: [],
            color: [],
            priceRange: [0, 1000],
            size: [],
        });
    };

    const filteredProducts = products.filter((product) => {
        const matchesSubcategory = filters.subcategory.length === 0 || filters.subcategory.includes(product.subcategory_slug);
        const matchesColor = filters.color.length === 0 || filters.color.includes(product.color);
        const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        const matchesSize = filters.size.length === 0 || filters.size.includes(product.size);

        return matchesSubcategory && matchesColor && matchesPrice && matchesSize;
    });

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500 text-xl">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 flex gap-8">
            {/* Filter Card */}
            <div className="w-1/4">
                <FilterProducts
                    filters={filters}
                    toggleFilter={toggleFilter}
                    handlePriceChange={handlePriceChange}
                    clearFilters={clearFilters}
                    categories={categories}
                    colors={colors}
                    sizes={sizes}
                />
            </div>

            {/* Product List */}
            <div className="w-3/4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {currentProducts.map((product, index) => (
                        <div key={index} className="cursor-pointer transform transition-transform duration-300 hover:scale-105">
                            <Link href={`/shop/product/${product.category_slug}/${product.subcategory_slug}/${product.product_slug}/${product.encoded_id}`}>
                                {viewMode === 'card' ? <ProductCard product={product} /> : <ProductGridCard product={product} />}
                            </Link>
                        </div>
                    ))}
                </div>
                {/* Pagination Logic */}
                <div className="flex justify-center mt-8 space-x-2">
                    {/* Pagination buttons */}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
