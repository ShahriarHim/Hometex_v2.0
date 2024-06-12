 
import { useRouter } from "next/router";
import Link from "next/link";

const sections = [
  {
    id: 1,
    imageUrl: "https://theinkbucket.in/cdn/shop/products/4_5a8d2694-aa86-4f09-9beb-2957ddb06a52.jpg?v=1626291106", // Replace with your image URL
    title: "Kitchen Linen",
    listItems: [
      { name: "Oven Top Cover", path: "/all-categories/Kitchen-Dinning/Oven Top Cover" },
      { name: "Oven Gloves", path: "/all-categories/Kitchen-Dinning/Oven Gloves" },
      { name: "Aprons", path: "/all-categories/Kitchen-Dinning/Aprons" },
      { name: "Napkins", path: "/all-categories/Kitchen-Dinning/Napkins" },
    ],
  },
  {
    id: 2,
    imageUrl: "https://www.propertypro.ng/blog/wp-content/uploads/2017/07/071-6most-popular-types-of-diningroom-set.jpg", // Replace with your image URL
    title: "Dining",
    listItems: [
      { name: "Chair Cover", path: "/all-categories/Kitchen-Dinning/Chair Cover" },
      { name: "Fridge Top Cover", path: "/all-categories/Kitchen-Dinning/Fridge Top Cover" },
      { name: "Place Mat", path: "/all-categories/Kitchen-Dinning/Place Mat" },
      { name: "Table Cloth", path: "/all-categories/Kitchen-Dinning/Table Cloth" },
      { name: "Table Runner", path: "/all-categories/Kitchen-Dinning/Table Runner" },
    ],
  },
];

const KitchenDiningPage = () => {
  const router = useRouter();
    
    const handleGoBack = () => {
      router.back();
    };
  
    return (
      <div className="max-w-screen-lg mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Living Decor</h1>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Go Back
          </button>
        </div>
        <hr className="mb-4 border-t-2 border-gray-300" />
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {sections.map((section) => (
    <div key={section.id} className="flex flex-col items-center">
<Link href={`/kitchen-Dining/${section.title.replace(/\s+/g, '-').toLowerCase()}`}>
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden">
            <img
              src={section.imageUrl}
              alt={section.title}
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="mt-2 text-center text-lg font-semibold">
            {section.title}
          </h2>
        </div>
      </Link>
    </div>
  ))}
</div>
    </div>
    );
  };

export default KitchenDiningPage;
