import { useEffect, useState } from "react";
import Link from "next/link";
import Constants from "@/ults/Constant";
import RelatedProduct from "@/components/common/RelatedProduct";
import { useRouter } from "next/router";
import CustomerSatisfactionBar from "@/components/CustomerSatisfactionBar";
import PriceDropNotificationButton from "./PriceDropNoti";
import ProductDetails from "@/components/additional/ProductDetails";
import FrequentlyBoughtTogether from "@/components/additional/Frequentlybought";
import DesignFifteen from "@/components/newDesigns/DesignFifteen";

export async function getServerSideProps(context) {
  try {
    const { slug } = context.params;
    
    // Get the product ID from the last segment of the URL
    const productId = slug[slug.length - 1];

    // Fetch product details
    const res = await fetch(
      `${Constants.BASE_URL}/api/products-details-web/${productId}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }

    const product_data = await res.json();
    const product = product_data?.data;

    if (!product) {
      return { notFound: true };
    }

    // Generate the correct URL slugs from the product data
    const categorySlug = product.category?.name?.toLowerCase() || '';
    const subCategorySlug = product.sub_category?.name?.toLowerCase() || '';
    const childSubCategorySlug = product.child_sub_category?.name?.toLowerCase() || '';

    // If the current URL doesn't match the correct path, redirect
    const currentPath = slug.join('/');
    const correctPath = `${categorySlug}/${subCategorySlug}/${childSubCategorySlug}/${productId}`;

    if (currentPath !== correctPath) {
      return {
        redirect: {
          destination: `/shop/product/${correctPath}`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        product: product,
        categoryInfo: {
          category: categorySlug,
          subcategory: subCategorySlug,
          productName: childSubCategorySlug,
          productId
        }
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        product: {
          id: 'dummy-id',
          name: 'Sample Product',
          price: 999.99,
          previous_price: null,
          description: 'Sample description',
          primary_photo: { photo: '/placeholder-product.jpg' },
          photos: Array(5).fill('/placeholder-product.jpg'),
        },
        categoryInfo: null
      }
    };
  }
}

const ProductPage = ({ product, categoryInfo }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(
    product.primary_photo?.photo
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const image_URL = `${Constants.BASE_URL}/images/uploads/product`;

  useEffect(() => {
    let recentitems = localStorage.getItem("recentview")
      ? JSON.parse(localStorage.getItem("recentview"))
      : [];

    let is_exist = recentitems.some((item) => item.id === product.id);

    if (!is_exist) {
      recentitems.push(product);
    }

    localStorage.setItem("recentview", JSON.stringify(recentitems));
  }, [product.id]);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      Math.max(prev - 1, product.photos?.length > 3 ? 0 : prev)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, product.photos?.length - 3 || 0)
    );
  };

  const renderedPhotos =
    product.photos?.length > 0
      ? [...product.photos, product.primary_photo?.photo].slice(
        currentIndex,
        currentIndex + 3
      )
      : [product.primary_photo?.photo];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-12 gap-1 lg:grid-rows-1 bg-gray-100 rounded-lg shadow-md">
          {/* Thumbnail Section */}
          <div className="col-span-2 lg:flex flex-col items-center hidden lg:block px-4 py-2">
            <button
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mb-2"
              onClick={handlePrevious}
              disabled={product.photos?.length <= 3}
            >
              ↑
            </button>
            <div className="space-y-2 overflow-hidden">
              {renderedPhotos.map((photo, index) => (
                <img
                  key={index}
                  src={`${image_URL}_thumb/${photo}`}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-25 h-25 border cursor-pointer"
                  onClick={() => setSelectedImage(photo)}
                />
              ))}
            </div>
            <button
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mt-2"
              onClick={handleNext}
              disabled={product.photos?.length <= 3}
            >
              ↓
            </button>
          </div>

          {/* Main Product Image Section */}
          <div className="col-span-7 justify-start items-start bg-transparent rounded-lg m-2 p-4">
            <img
              alt="Primary Product Image"
              src={`${image_URL}/${selectedImage || product.primary_photo?.photo}`}
              className="w-full h-auto object-contain"
              style={{
                maxHeight: "100%",
                padding: "20px",
                margin: "0",
              }}
            />
          </div>

          {/* Product Details Section */}
          <div className="col-span-3 pt-4">
            <ProductDetails product={product} router={router} />
          </div>
        </div>

        {/* Additional Sections */}
        <div className="container mx-auto py-4">
          <FrequentlyBoughtTogether product={product} />
        </div>
        <div className="container mx-auto py-6">
          <CustomerSatisfactionBar />
        </div>
        <div className="container mx-auto py-12">
          <DesignFifteen />
        </div>
        <div className="container mx-auto py-4">
          <PriceDropNotificationButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 