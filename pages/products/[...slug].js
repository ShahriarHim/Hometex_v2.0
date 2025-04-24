import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/newDesigns/ProductCard";
import Constants from "@/ults/Constant";
import styles from "../../styles/Gridbox.module.css";
import Link from "next/link";
import FilterSection from "./FilterProducts";
import ProductModal from "@/components/common/ProductModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
        <img class="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon"></img>
  </div>
);

function encodeProductId(id) {
  return encodeURIComponent(Buffer.from(`prod-${id}-salt`).toString("base64"));
}

const ProductPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("card");
  const [error, setError] = useState(null);
  const [categoryPath, setCategoryPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productName = slug && slug.length > 0 ? slug[slug.length - 1] : null;
  const fullPath = slug ? slug.join("/") : "";

  useEffect(() => {
    const fetchProductsAndValidatePath = async () => {
      if (!productName) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const categoryResponse = await fetch(
          `${Constants.BASE_URL}/api/product-menu/horizontal`
        );

        const categoryData = await categoryResponse.json();

        const findProductIdByName = (categories) => {
          for (let category of categories) {
            if (category.name.toLowerCase() === productName.toLowerCase()) {
              return {
                id: category.id,
                path: `${category.name.toLowerCase()}`,
              };
            }
            if (category.sub) {
              for (let sub of category.sub) {
                if (sub.name.toLowerCase() === productName.toLowerCase()) {
                  return {
                    id: sub.id,
                    path: `${category.name.toLowerCase()}/${sub.name.toLowerCase()}`,
                  };
                }
                if (sub.child) {
                  for (let child of sub.child) {
                    if (
                      child.name.toLowerCase() === productName.toLowerCase()
                    ) {
                      return {
                        id: child.id,
                        path: `${category.name.toLowerCase()}/${sub.name.toLowerCase()}/${child.name.toLowerCase()}`,
                      };
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
          setError("Product not found");
          setIsLoading(false);
          return;
        }
        if (fullPath !== productDetails.path) {
          router.replace(`/products/${productDetails.path}`);
        }

        const productResponse = await fetch(
          `${Constants.BASE_URL}/api/product/horizontal/${productDetails.id}`
        );
        const productData = await productResponse.json();
        if (!productData.data || productData.data.length === 0) {
          setError("No products found.");
          setProducts([]);
          setIsLoading(false);
          return;
        }

        const transformedProducts = productData.data.map((product) => {
          const categorySlug = product.category?.name?.toLowerCase() || "";
          const subCategorySlug =
            product.sub_category?.name?.toLowerCase() || "";
          const productSlug =
            product.child_sub_category?.name?.toLowerCase() || "";
          const encodedId = encodeProductId(product.id);

          return {
            id: product.id,
            encoded_id: encodedId,
            img: product.primary_photo,
            primary_photo: product.primary_photo,
            discount: product.discount_percent
              ? product.discount_percent
              : null,
            name: product.name,
            price: product.sell_price.price,
            sell_price: product.sell_price,
            originalPrice: product.original_price,
            category_slug: categorySlug,
            subcategory_slug: subCategorySlug,
            product_slug: productSlug,
            stock: product.stock || 0,
            star: product.star || 0
          };
        });

        setProducts(transformedProducts);
        setError(null);
        setCategoryPath(productDetails.path || "");
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products.");
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        <div className="md:w-1/4 w-full md:min-w-[250px]">
          <FilterSection />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-end mb-6 gap-2">
            <button
              onClick={() => toggleView("card")}
              className={`px-4 py-2 rounded-lg border ${
                viewMode === "card"
                  ? "bg-[#d4ed30]/20 text-[#d4ed30]"
                  : "bg-white text-gray-700 hover:bg-purple-100"
              }`}
            >
              <i className="fas fa-th-large text-gray-600 text-3xl -mx-2"></i>
            </button>
            <button
              onClick={() => toggleView("photo")}
              className={`px-4 py-2 rounded-lg border ${
                viewMode === "photo"
                  ? "bg-[#d4ed30]/20 text-[#d4ed30]"
                  : "bg-white text-gray-700 hover:bg-purple-100"
              }`}
            >
              <i className="fas fa-th text-gray-600 text-3xl -mx-2"></i>
            </button>
            <button
              onClick={() => toggleView("list")}
              className={`px-4 py-2 rounded-lg border ${
                viewMode === "list"
                  ? "bg-[#d4ed30]/20 text-[#d4ed30]"
                  : "bg-white text-gray-700 hover:bg-purple-100"
              }`}
            >
              <i className="fas fa-list text-gray-600 text-3xl -mx-2"></i>
            </button>
          </div>
          {viewMode === "list" ? (
            <div className="space-y-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-[30%]">
                    <img
                      src={product.primary_photo}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-[70%] flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < product.star ? "text-yellow-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {product.description || "No description available"}
                      </p>
                      <div className="text-lg font-semibold mb-4">
                        ${product.price.toFixed(2)}
                        {product.discount && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleProductClick(product)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                        onClick={() => {
                          // Add wishlist functionality here
                          console.log('Wishlist clicked');
                        }}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === "card" 
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3" 
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            }`}>
              {products.map((product, index) => (
                <div
                  key={index}
                  className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
                >
                  <Link
                    href={`/shop/product/${product.category_slug}/${product.subcategory_slug}/${product.product_slug}/${product.encoded_id}`}
                  >
                    <ProductCard product={product} openModal={handleProductClick} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ProductModal product={selectedProduct} onClose={closeModal} />
    </div>
  );
};

export default ProductPage;
