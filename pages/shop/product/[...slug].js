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
import RelatedProducts from "@/components/newDesigns/RelatedProducts";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import ReviewSection from "@/components/ReviewSection";
import EasyAddToCart from "@/components/EasyAddToCart";

function decodeProductId(encodedId) {
  try {
    const decoded = Buffer.from(decodeURIComponent(encodedId), 'base64').toString();
    // Extract the ID from the decoded string (format: "prod-{id}-salt")
    const match = decoded.match(/^prod-(\d+)-salt$/);
    if (!match) {
      throw new Error('Invalid product ID format');
    }
    return match[1];
  } catch (error) {
    console.error('Error decoding product ID:', error);
    return null;
  }
}

export async function getServerSideProps(context) {
  try {
    const { slug } = context.params;

    // Get the encoded ID from the last segment of the URL
    const encodedId = slug[slug.length - 1];

    // Decode the product ID
    const productId = decodeProductId(encodedId);

    if (!productId) {
      return { notFound: true };
    }

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

    // Generate the correct URL slugs from the product data and ensure they're not empty
    const categorySlug = product.category?.name?.toLowerCase() || 'uncategorized';
    const subCategorySlug = product.sub_category?.name?.toLowerCase() || 'general';
    const childSubCategorySlug = product.child_sub_category?.name?.toLowerCase() || 'item';

    // If the current URL doesn't match the correct path, redirect
    const currentPath = slug.join('/');
    const correctPath = `${categorySlug}/${subCategorySlug}/${childSubCategorySlug}/${encodedId}`;

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
    return { notFound: true };
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
      <EasyAddToCart product={product} />
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-12 gap-1 lg:grid-rows-1 bg-gray-100 rounded-lg shadow-md">
          {/* Thumbnail Section */}
          <div className="col-span-2 lg:flex flex-col items-center hidden lg:block px-4 py-2">
            <button
              className="w-full h-8 bg-black text-white flex items-center justify-center mt-2"
              onClick={handlePrevious}
              disabled={product.photos?.length <= 3}
            >
              <FaCaretUp />
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
              className="w-full h-8 bg-black text-white flex items-center justify-center mt-2"
              onClick={handleNext}
              disabled={product.photos?.length <= 3}
            >
              <FaCaretDown />
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
            {/* Social Sharing Section */}
            <div className="flex items-center justify-center gap-3 mt-40 p-5">
              {/* Share Icon (Centered) */}
              <span className="text-gray-600 text-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v4m0 0h4m-4 0h16m-8-8V4m0 0h4m-4 0H4m16 8v4m0 0h-4m4 0h-8" />
                </svg>
              </span>

              {/* Social Icons */}
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" className="w-10 h-10 hover:opacity-80" />
              </a>

              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" className="w-10 h-10 hover:opacity-80" />
              </a>

              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" className="w-10 h-10 hover:opacity-80" />
              </a>

              <a href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/124/124061.png" alt="Pinterest" className="w-10 h-10 hover:opacity-80" />
              </a>
            </div>
            <div className="flex items-center justify-center mt-20">
              <CustomerSatisfactionBar />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="col-span-3 pt-4">
            <ProductDetails product={product} router={router} />
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Section (70%) */}
          <div className="col-span-8">
            <div className="container mx-auto py-4">
              <FrequentlyBoughtTogether product={product} />
            </div>
            <div className="container mx-auto py-12">
            <RelatedProducts />
            </div>
            <div className="container mx-auto py-4">
              <PriceDropNotificationButton product={product} />
            </div>
          </div>
          <div className="col-span-4 mt-4">
            <ReviewSection/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 