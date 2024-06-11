import Link from "next/link";
import { FaCaretDown, FaHome } from "react-icons/fa";

const sections = [
  {
    id: 1,
    imageUrl: "/images/menuCategories/Rugs Category-100x100.webp",
    title: "Carpet | Rugs",
    listItems: [
      { name: "Carpets", path: "/all-categories/LivingDecor/Carpets" },
      { name: "Handmade Rugs", path: "/all-categories/LivingDecor/HandmadeRugs" },
      { name: "Shataranji", path: "/all-categories/LivingDecor/Shataranji" },
    ],
  },
  {
    id: 2,
    imageUrl: "https://www.thespruce.com/thmb/Wb8gJqlCR66Ild5c3ySyEkhD7W0=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc()/living-room-decor-ideas-5442837-hero-8b6e540e13f9457a84fe9f9e26ea2e5c.jpg",
    title: "Cushion | Cushion Cover",
    listItems: [
      { name: "Cushion Cover", path: "/all-categories/LivingDecor/CushionCover" },
      { name: "Cushion", path: "/all-categories/LivingDecor/Cushion" },
    ],
  },
  {
    id: 3,
    imageUrl: null,
    title: "Curtain | Blind",
    listItems: [
      { name: "Printed Curtain", path: "/all-categories/LivingDecor/PrintedCurtain" },
      { name: "Solid Curtain", path: "/all-categories/LivingDecor/SolidCurtain" },
      { name: "Vertical Blind", path: "/all-categories/LivingDecor/VerticalBlind" },
    ],
  },
  {
    id: 4,
    imageUrl: "https://www.realsimple.com/thmb/9DiU-GXicTQnnSU1_7SN1ZLlE_o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/dabito-living-room-7297f95db79240d095734d010681d23e.png",
    title: "Quilts | Comforters | Covers",
    listItems: [
      { name: "Comfort In a Bag", path: "/all-categories/LivingDecor/ComfortInaBag" },
      { name: "Comforter Cover", path: "/all-categories/LivingDecor/ComforterCover" },
      { name: "Quilts|Comforters", path: "/all-categories/LivingDecor/QuiltsComforters" },
    ],
  },
  {
    id: 5,
    imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thespruce.com%2Fliving-room-decor-ideas-5442837&psig=AOvVaw0sPxa_UyU15Vb5PK3csaef&ust=1718185076804000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCID9_Kyg04YDFQAAAAAdAAAAABAQ",
    title: "Mosquito Net",
    listItems: [
      { name: "Classic Style", path: "/all-categories/LivingDecor/ClassicStyle" },
      { name: "Fancy Style", path: "/all-categories/LivingDecor/FancyStyle" },
    ],
  },
];

const LivingDecor = () => {
  return (
    <>
      <div className="">
        <Link
          href="/livingDecor"
          className="inline-flex items-center text-black-300 hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium group"
        >
          <FaHome className=" mr-1 text-lg" />
          Living Decor <FaCaretDown />
          <div
            className="w-full absolute z-50 top-full left-0 transform rounded-md justify-center items-center p-2 group-hover:flex hidden border-teal-500"
            style={{ margin: "auto" }}
          >
            <div className="max-w-screen-xl mx-auto px-3 mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white">
              {/* Map over sections array */}
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="bg-white p-2 relative overflow-hidden transition-all duration-300"
                >
                  <div className="flex">
                    <img
                      src={section.imageUrl}
                      alt={`Left Image ${section.id}`}
                      className="w-1/2 h-auto object-cover"
                    />
                    <div className="w-1/2 ml-4 text-black">
                      <h2 className="text-md font-bold mb-2 overflow-ellipsis">{section.title}</h2>
                      <ul>
                        {section.listItems.map((item, index) => (
                          <li key={index} className="overflow-ellipsis hover:shadow-md hover:scale-105">
                            <Link href={item.path}>{item.name}</Link>
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
                        <li key={index}><Link href={item.path}>{item.name}</Link></li>
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
}

export default LivingDecor;
