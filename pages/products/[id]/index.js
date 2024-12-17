import { useRouter } from 'next/router';

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Product Page</h1>
            <p>Product ID: {id}</p>
        </div>
    );
};

export default ProductPage;