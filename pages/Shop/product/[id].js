import { useEffect, useState } from "react"; 
import Constants from "@/ults/Constant";
import RelatedProduct from "@/components/common/RelatedProduct";
import { useRouter } from 'next/router';
import CustomerSatisfactionBar from "@/components/CustomerSatisfactionBar";
import PriceDropNotificationButton from "./PriceDropNoti";
import ProductDetails from "@/components/additional/ProductDetails";
import FrequentlyBoughtTogether from "@/components/additional/Frequentlybought";
import SpinTheWheelPopup from "@/components/layout/spinwhile/SpinTheWheelPopup";
import FloatingButtons from "@/components/floatingbottons/FloatingButtons";
import FloatingCart from "@/components/additional/FloatingCart"; // Update import path if necessary

export async function getServerSideProps(context) {
  let id = context.query.id;
  const res = await fetch(
    `${Constants.BASE_URL}/api/products-details-web/` + id
  );
  const product_data = await res.json();

  const product = product_data?.data;
  // console.log(product_data);
  return {
    props: {
      product,
    },
  };
}

const Product = ({ product }) => {
  console.log(product);
  const router = useRouter();
  const [iswhileModalOpen, setIswhileModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    product.primary_photo?.photo
  );
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

    let is_exist = false;
    let obj_key = [];
    for (let x in recentitems) {
      let txt = recentitems[x];
      if (txt?.id == product?.id) {
        is_exist = true;
        obj_key.push(x);
      }
    }

    if (is_exist) {
      // console.log(obj_length, 'have_rmove', obj_key)
    } else {
      recentitems.push(product);
    }
    localStorage.setItem("recentview", JSON.stringify(recentitems));
  }, [product?.id]);



  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 py-10">
          <div className="flex flex-row col-span-5 gap-2">
            <div className="space-y-4">
              {product?.photos?.length > 0 ? (
                product.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`${image_URL}_thumb/${photo}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 md:w-24 lg:w-36 border cursor-pointer"
                    onClick={() => setSelectedImage(photo)}
                  />
                ))
              ) : (
                <img
                  src={`${image_URL}_thumb/${product.primary_photo?.photo}`}
                  alt="Primary Image"
                  className="w-20 md:w-24 lg:w-48 border cursor-pointer"
                  onClick={() => setSelectedImage(product.primary_photo?.photo)}
                />
              )}
            </div>
            
            <div>
              <img
                alt="Primary Product Image"
                src={`${image_URL}/${selectedImage || product.primary_photo?.photo}`}
                style={{ width: "80%" }}
              />
            </div>
          </div>
          <ProductDetails product={product} router={router} />
          <div className="col-span-3">
            <div className="flex flex-col">
              <RelatedProduct />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-4">
        <FrequentlyBoughtTogether product={product} />
        
      </div>
      <div className="container mx-auto py-6 ">
        <CustomerSatisfactionBar />
      </div>
      <div className="container mx-auto py-4">
        <PriceDropNotificationButton product={product} />
      </div>

      <FloatingCart />
      <div id="so-groups" className="fixed left-0 top-80 flex flex-col z-50 hidden md:block">
        <button
          className="sticky-review bg-red-600 hover:bg-red-700 text-white py-2 px-4 h-40 w-9 cursor-pointer flex justify-center items-center border border-white rounded"
          onClick={handlespinOpenPopup}
        >
          <span className="text-xl transform rotate-90">Clickme</span>
        </button>

        <SpinTheWheelPopup isOpen={iswhileModalOpen} onClose={handlespinClosePopup} />
      </div>
      <FloatingButtons />
    </>
  );
};

export default Product;
