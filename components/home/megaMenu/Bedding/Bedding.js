import Link from "next/link";
import { FaCaretDown, FaBed } from "react-icons/fa";
import { useRouter } from "next/router";
import AdPromotionSection from "../../../layout/AdPromotionSection";

const sections = [
  {
    id: 1,
    imageUrl: "/images/menuCategories/Bed Sheet Category-100x100.webp",
    title: "Bed Sheet",
    listItems: [
      { name: "King", path: "/all-categories/bedding/bed-sheet/king" },
      { name: "Extra King", path: "/all-categories/bedding/bed-sheet/extra-king" },
      { name: "Semi Double", path: "/all-categories/bedding/bed-sheet/semi-double" },
      { name: "Single", path: "/all-categories/bedding/bed-sheet/single" },
    ],
  },
  {
    id: 2,
    imageUrl: "/images/menuCategories/Bed Cover Category-100x100.webp",
    title: "Bed Cover",
    listItems: [
      { name: "Extra King size", path: "/all-categories/bedding/bed-cover/extra-king-size" },
      { name: "King size", path: "/all-categories/bedding/bed-cover/king-size" },
    ],
  },
  {
    id: 3,
    imageUrl: "/images/menuCategories/Bed Runner Category-100x100.webp",
    title: "Bed Runner",
    listItems: [{}],
  },
  {
    id: 4,
    imageUrl: "/images/menuCategories/p01-500x500-100x100.webp",
    title: "Pillow||Pillow Protector",
    listItems: [
      { name: "Pillow Protector", path: "/all-categories/bedding/pillow/pillow-protector" },
      { name: "Sleeping Pillow", path: "/all-categories/bedding/pillow/sleeping-pillow" },
    ],
  },
  {
    id: 5,
    imageUrl: "/images/menuCategories/Fitted Sheet Category-100x100.webp",
    title: "FittedSheet | Sheet Set",
    listItems: [{}],
  },
  {
    id: 6,
    imageUrl: "/images/menuCategories/Mattress-100x100.webp",
    title: "Mattress | Mattress Protector",
    listItems: [
      { name: "Mattress Topper", path: "/all-categories/bedding/mattress/mattress-topper" },
      { name: "Premium Mattress", path: "/all-categories/bedding/mattress/premium-mattress" },
    ],
  },
];

const Bedding = () => {
  const router = useRouter();

  return (
    <div className="">
      <Link
        href="/bedding"
        className="inline-flex items-center text-black-300 hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium group"
      >
        <FaBed className="mr-1 text-xl" />
        Bedding <FaCaretDown />
        <div className="w-full absolute z-50 top-full left-0 transform rounded-md justify-center items-center p-2 group-hover:flex hidden flex-col">
          <div className="max-w-screen-2xl mx-auto bg-purple-200 p-2 shadow-lg">
            {/* Grid section for product items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="bg-white p-2 relative overflow-hidden rounded-lg transition-all duration-300 shadow-sm"
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
                </div>
              ))}
            </div>

            {/* AdPromotionSection full width at the bottom */}
            <div className="w-full mt-2">
              <AdPromotionSection />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Bedding;
