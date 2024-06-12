import Link from "next/link";
import { useRouter } from "next/router";

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

const HomeDecorPage = () => {
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
              <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src={section.imageUrl}
                  alt={section.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="mt-2 text-center text-lg font-semibold">
                <Link href={`/home-decor/${section.title.replace(/\s+/g, '-').toLowerCase()}`}>
                  {section.title}
                </Link>
              </h2>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default HomeDecorPage;