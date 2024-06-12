import Link from "next/link";
import { useRouter } from "next/router";
import { FaCaretDown, FaBath } from "react-icons/fa";

const BathSupport = () => {
  const sections = [
    {
        "id": 1,
        "imageUrl": "https://m.media-amazon.com/images/I/91FUcQAyUoL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
        "title": "Towels | Bathmats",
        "listItems": [
            {"name": "Basin Towel", "path": "/all-categories/bathSupport/BasinTowel"},
            {"name": "Basin Mat", "path": "/all-categories/bathSupport/BasinMat"},
            {"name": "Bath Sheet", "path": "/all-categories/bathSupport/BathSheet"},
            {"name": "Bath Towel", "path": "/all-categories/bathSupport/BathTowel"},
            {"name": "Hand Towel", "path": "/all-categories/bathSupport/HandTowel"},
        ],
    },
    {
        "id": 2,
        "imageUrl": "https://media.nisbets.com/asset/core/prodimage/large_new/hd222_ecobathrobe1.jpg",
        "title": "Bathrobes",
        "listItems": [
            {"name": "Adult Size", "path": "/all-categories/bathSupport/AdultSize"},
            {"name": "Kids Size", "path": "/all-categories/bathSupport/KidsSize"},
        ],
    },
    {
        "id": 3,
        "imageUrl": "https://hips.hearstapps.com/hmg-prod/images/bathroom-decor-ideas-65f16a228586f.jpeg?crop=1.00xw:0.334xh;0,0.324xh&resize=1200:*",
        "title": "Bath Decor",
        "listItems": [
            {"name": "Bathroom Rugs", "path": "/all-categories/bathSupport/BathroomRugs"},
        ],
    },
    {
        "id": 4,
        "imageUrl": "https://market99.com/cdn/shop/products/ceramic-cylindrical-bathroom-set-of-4-geometric-pattern-bath-accessories-soap-and-lotion-dispensers-1-29122143649962.jpg?v=1697016217&width=1080",
        "title": "Bath Accessories",
        "listItems": [
            {"name": "Bathroom Bin", "path": "/all-categories/bathSupport/BathroomBin"},
            {"name": "Shower Curtain", "path": "/all-categories/bathSupport/ShowerCurtain"},
        ],
    },
]

  ;

  const router = useRouter();

  const handleButtonClick = (event) => {
    // Prevent default link behavior
    event.preventDefault();
    // Navigate to the bathSupport page
    router.push("/bathSupport");
  };

  return (
    <>
      <div className="">
      <Link
          href="/bathSupport"
          className="inline-flex items-center text-black-300 hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium group"
        >
          <FaBath className="mr-2" />
          Bath Support <FaCaretDown />
          <div className="w-full absolute pb-6 z-50 top-full left-0 transform rounded-md justify-center items-center p-2 group-hover:flex hidden">
            <div className="max-w-screen-2xl mx-auto px-3 mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white">
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

export default BathSupport;
