import { useEffect, useState } from "react";
import Link from "next/link";
import Constants from "@/ults/Constant";
import RelatedProduct from "@/components/common/RelatedProduct";
import { useRouter } from "next/router";
import CustomerSatisfactionBar from "@/components/CustomerSatisfactionBar";
import PriceDropNotificationButton from "./PriceDropNoti";
import ProductDetails from "@/components/additional/ProductDetails";
import FrequentlyBoughtTogether from "@/components/additional/Frequentlybought";
import SpinTheWheelPopup from "@/components/layout/spinwhile/SpinTheWheelPopup";
import FloatingButtons from "@/components/floatingbottons/FloatingButtons";
import FloatingCart from "@/components/additional/FloatingCart";
import TimeReminderBox from "@/components/layout/TimeReminderBox";
import DesignFifteen from "@/components/newDesigns/DesignFifteen";

export async function getServerSideProps(context) {
  let id = context.query.id;
  const res = await fetch(
    `${Constants.BASE_URL}/api/products-details-web/` + id
  );
  const product_data = await res.json();

  const product = product_data?.data;
  return {
    props: {
      product,
    },
  };
}

const Product = ({ product }) => {
  const router = useRouter();
  const [iswhileModalOpen, setIswhileModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    product.primary_photo?.photo
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const image_URL = `${Constants.BASE_URL}/images/uploads/product`;

  const handlespinOpenPopup = () => {
    setIswhileModalOpen(true);
  };

  const handlespinClosePopup = () => {
    setIswhileModalOpen(false);
  };

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
        <div
          className="grid grid-cols-12 gap-1 lg:grid-rows-1 bg-gray-100 rounded-lg shadow-md"
          style={{ gridTemplateRows: "auto" }}
        >
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
          <div className="col-span-7 justify-start items-start bg-transparent rounded-lg shadow-lg m-2 p-4">
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

        {/* Responsive Layout for Small Screens */}
        <div className="lg:hidden">
          <img
            alt="Primary Product Image"
            src={`${image_URL}/${selectedImage || product.primary_photo?.photo}`}
            className="w-full h-auto object-contain mb-4"
          />
          <div className="flex overflow-x-auto mb-4">
            {renderedPhotos.map((photo, index) => (
              <img
                key={index}
                src={`${image_URL}_thumb/${photo}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 border cursor-pointer mr-2"
                onClick={() => setSelectedImage(photo)}
              />
            ))}
          </div>
          <ProductDetails product={product} router={router} />
        </div>


        <div className="container mx-auto py-4">
          {/* New Row Section with Equal Portions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Time Reminder Box */}
            <div className="bg-gray-100 rounded-lg shadow-md p-4 flex items-center justify-center">
              <TimeReminderBox />
            </div>

            {/* Have a Question in Mind Section */}
            <div className="bg-gray-100 rounded-lg shadow-md p-2">
              <div className="text-lg font-semibold mb-4 text-center">
                Have a Question in Mind?
              </div>
              <div className="flex gap-2 justify-center">
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded">
                  Call Now
                </button>
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded">
                  Chat Us
                </button>
              </div>
            </div>

            {/* Free In-Store Pickup Section */}
            <div className="bg-gray-100 rounded-lg shadow-md p-2">
              <h1 className="text-2xl font-bold mb-2 text-center">Free in-Store Pickup</h1>
              <div className="text-center mb-4">
                <span className="font-semibold text-gray-800">
                  Please enter a location to check store availability
                </span>
              </div>
              <div className="text-center">
                <Link href="/Stores" className="bg-black text-white rounded-3xl px-4 py-2 inline-block">
                  Check nearby stores
                </Link>
              </div>
            </div>
          </div>
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
        <DesignFifteen />
      </div>
      <div className="container mx-auto py-4">
        <PriceDropNotificationButton product={product} />
      </div>

      {/* <FloatingCart /> */}
      {/* <div
        id="so-groups"
        className="fixed left-0 top-80 flex flex-col z-50 hidden md:block"
      >
        <button
          className="sticky-review bg-red-600 hover:bg-red-700 text-white py-2 px-4 h-40 w-9 cursor-pointer flex justify-center items-center border border-white rounded"
          onClick={handlespinOpenPopup}
        >
          <span className="text-xl transform rotate-90">Clickme</span>
        </button>

        <SpinTheWheelPopup isOpen={iswhileModalOpen} onClose={handlespinClosePopup} />
      </div>
      <FloatingButtons /> */}
    </div >
  );
};

export default Product;
