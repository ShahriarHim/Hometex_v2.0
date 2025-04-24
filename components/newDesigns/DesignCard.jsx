import Link from 'next/link';

const DesignCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-info">
        <Link href={`/shop/product/${product.category_slug}/${product.subcategory_slug}/${product.product_slug}/${product.encoded_id}`} className="product-name">
          {product.name}
        </Link>
        <div className="product-price">
          <span className="current-price">{product.displayPrice}</span>
          {product.originalPrice && (
            <span className="original-price">{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignCard; 