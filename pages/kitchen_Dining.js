import { useState } from "react";
import { useRouter } from "next/router";

const kitchenItems = [
  {
    id: 1,
    imageUrl: "/images/menuCategories/oven-top-cover.jpg",
    title: "Oven Top Cover",
  },
  {
    id: 2,
    imageUrl: "/images/menuCategories/oven-gloves.jpg",
    title: "Oven Gloves",
  },
  {
    id: 3,
    imageUrl: "/images/menuCategories/aprons.jpg",
    title: "Aprons",
  },
  {
    id: 4,
    imageUrl: "/images/menuCategories/napkins.jpg",
    title: "Napkins",
  },
];

const diningItems = [
  {
    id: 1,
    imageUrl: "/images/menuCategories/chair-cover.jpg",
    title: "Chair Cover",
  },
  {
    id: 2,
    imageUrl: "/images/menuCategories/fridge-top-cover.jpg",
    title: "Fridge Top Cover",
  },
  {
    id: 3,
    imageUrl: "/images/menuCategories/place-mat.jpg",
    title: "Place Mat",
  },
  {
    id: 4,
    imageUrl: "/images/menuCategories/table-cloth.jpg",
    title: "Table Cloth",
  },
  {
    id: 5,
    imageUrl: "/images/menuCategories/table-runner.jpg",
    title: "Table Runner",
  },
];

const KitchenDiningPage = () => {
  const [activeTab, setActiveTab] = useState("kitchen");
  const router = useRouter();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="max-w-screen-lg mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Kitchen & Dining</h1>
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            className={`px-4 py-2 mr-2 rounded-md ${
              activeTab === "kitchen" ? "bg-gray-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTabClick("kitchen")}
          >
            Kitchen
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "dining" ? "bg-gray-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTabClick("dining")}
          >
            Dining
          </button>
        </div>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-blue-300 rounded-md hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
      <hr className="mb-4 border-t-2 border-gray-300" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {activeTab === "kitchen" &&
          kitchenItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="object-cover w-full h-full" />
              </div>
              <h2 className="mt-2 text-center text-lg font-semibold">{item.title}</h2>
            </div>
          ))}
        {activeTab === "dining" &&
          diningItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="object-cover w-full h-full" />
              </div>
              <h2 className="mt-2 text-center text-lg font-semibold">{item.title}</h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default KitchenDiningPage;
