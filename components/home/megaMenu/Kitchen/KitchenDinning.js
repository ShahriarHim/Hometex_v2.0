import Link from "next/link";
import { useRouter } from "next/router";
import { FaCaretDown } from "react-icons/fa";
import { TbToolsKitchen2 } from "react-icons/tb";
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
const KitchenDinning = () => {


  const router = useRouter();

  const handleButtonClick = (event) => {
    // Prevent default link behavior
    event.preventDefault();
    // Navigate to the kitchen-dining page
    router.push("/kitchen_Dining");
  };

  return (
    <>
      <div className="">
        <Link
          href="/kitchen_Dining"
          className="inline-flex items-center text-black-300 hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium group"
        >
          <TbToolsKitchen2 className="mr-2" />
          Kitchen | Dining <FaCaretDown />
          <div className="w-full absolute pb-6 z-50 top-full left-0 transform rounded-md justify-center items-center p-2 group-hover:flex hidden">
            <div className="max-w-screen-2xl mx-auto px-3 mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 bg-white">
              {/* Map over sections array */}
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="bg-white p-2 relative overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <div className="flex">
                    <img
                      src={section.imageUrl}
                      alt={`Left Image ${section.id}`}
                      className="w-1/2 h-auto object-cover"
                    />
                    <div className="w-1/2 ml-4 text-black">
                      <h2 className="text-md font-bold mb-2 overflow-ellipsis">
                        {section.title}
                      </h2>
                      <ul>
                        {section.listItems.map((item, index) => (
                          <li
                            key={index}
                            className="overflow-ellipsis hover:scale-105"
                          >
                            {item.path ? (
                              <Link href={item.path}>
                                <span className="hover:underline">{item.name}</span>
                              </Link>
                            ) : (
                              <span>{item.name}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Popup Box */}
                  <div className="hidden absolute top-0 left-0 right-0 bottom-0 bg-white p-4 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h2 className="text-lg font-bold mb-2">{section.title}</h2>
                    <ul>
                      {section.listItems.map((item, index) => (
                        <li key={index}>{item.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default KitchenDinning;