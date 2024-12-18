import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ProductCard from '../../../components/newDesigns/ProductCard';
import Constants from '@/ults/Constant';

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [products, setProducts] = useState([]);
    const [viewMode, setViewMode] = useState('card');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${Constants.BASE_URL}/api/product/horizontal/${id}`);
                const data = await response.json();

                if (!data.data || data.data.length === 0) {
                    setError('No products found.');
                    setProducts([]);
                    return;
                }

                const transformedProducts = data.data.map(product => ({
                    img: product.primary_photo,
                    discount: product.discount_percent ? product.discount_percent : null,
                    name: product.name,
                    price: product.sell_price.price + product.sell_price.symbol,
                    originalPrice: product.original_price + product.sell_price.symbol,
                }));
                console.log("transformedProducts", transformedProducts);

                setProducts(transformedProducts);
                setError(null); // Clear any previous errors
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products.');
            }
        };

        if (id) {
            fetchProducts();
        }
    }, [id]);

    const toggleView = (mode) => {
        setViewMode(mode);
    };

    return (
        <div style={{ padding: '10px', maxWidth: '200px', margin: '0 auto' }}>
            {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => toggleView('card')}>Card View</button>
                <button onClick={() => toggleView('photo')}>Photo View</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {viewMode === 'card' && products.map((product, index) => (
                    <div key={index} style={{ flex: '1 1 calc(25% - 20px)', boxSizing: 'border-box' }}>
                        <ProductCard product={product} />
                    </div>
                ))}
                {viewMode === 'photo' && products.map((product, index) => (
                    <div key={index} style={{ flex: '1 1 calc(25% - 20px)', boxSizing: 'border-box' }}>
                        <img src={product.img} alt={product.name} style={{ width: '100%' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;