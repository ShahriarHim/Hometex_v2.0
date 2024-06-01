import Link from "next/link";
import { FaCaretDown, FaHome } from "react-icons/fa";

const HomeDecor = () => {
  const sections = [
    {
      id: 1,
      imageUrl: "https://m.media-amazon.com/images/I/810MbOBa92L._AC_UF1000,1000_QL80_.jpg", // Replace with your image URL
      title: "Wall Decor",
      listItems: [
        { name: "Wall Art", path: "/all-categories/Home-Decor/Wall Art" },
        { name: "Wall Clocks", path: "/all-categories/Home-Decor/Wall Clocks" },
        { name: "Wall Mirrors", path: "/all-categories/Home-Decor/Wall Mirrors" },
        { name: "Wall Shelves", path: "/all-categories/Home-Decor/Wall Shelves" },
      ],
    },
    {
      id: 2,
      imageUrl: "https://static.athome.com/image/upload/f_auto,q_auto,fl_progressive:steep/v1694533303/webcontent/FallForAll/2023/LP_TestAssets_StoreVsEnviro/FY24_WK32_LP_Test_HomeAccentsInsp-M.png", // Replace with your image URL
      title: "Home Accents",
      listItems: [
        { name: "Vases", path: "/all-categories/Home-Decor/Vases" },
        { name: "Candle Holders", path: "/all-categories/Home-Decor/Candle Holders" },
        { name: "Figurines", path: "/all-categories/Home-Decor/Figurines" },
        { name: "Bookends", path: "/all-categories/Home-Decor/Bookends" },
      ],
    },
    {
      id: 3,
      imageUrl: "https://images.herzindagi.info/image/2020/Sep/HOME-LIGHTS.jpg", // Replace with your image URL
      title: "Lighting",
      listItems: [
        { name: "Table Lamps", path: "/all-categories/Home-Decor/Table Lamps" },
        { name: "Floor Lamps", path: "/all-categories/Home-Decor/Floor Lamps" },
        { name: "Ceiling Lights", path: "/all-categories/Home-Decor/Ceiling Lights" },
        { name: "String Lights", path: "/all-categories/Home-Decor/String Lights" },
      ],
    },
  ];

  return (
    <>
      <div className="">
        <div className="inline-flex items-center text-black-300 hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium group">
          <FaHome className="mr-1 text-xl" />
          Home Decor <FaCaretDown />
          <div className="w-full absolute pb-6 z-50 top-full left-0 transform rounded-md justify-center items-center p-2 group-hover:flex hidden">
            <div className="max-w-screen-2xl mx-auto px-3 mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white">
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
        </div>
      </div>
    </>
  );
};

export default HomeDecor;