import Link from "next/link";
import { useState } from "react";
import { FaCaretDown, FaBed } from "react-icons/fa";

const Bedding = () => {
  const sections = [
    {
      id: 1,
      imageUrl: "/images/menuCategories/Bed Sheet Category-100x100.webp",
      title: "Bed Sheet",
      listItems: [
        { name: "King", path: "/all-categories/bedding/king" },
        { name: "Extra King", path: "/all-categories/bedding/extra-king" },
        { name: "Semi Double", path: "/all-categories/bedding/semi-double" },
        { name: "Single", path: "/all-categories/bedding/single" },
      ],
    },
    {
      id: 2,
      imageUrl: "/images/menuCategories/Bed Cover Category-100x100.webp",
      title: "Bed Cover",
      listItems: [
        { name: "Extra King size", path: "/all-categories/bedding/extra-king-size" },
        { name: "King size", path: "/all-categories/bedding/king-size" },
      ],
    },
    {
      id: 3,
      imageUrl: "/images/menuCategories/Bed Runner Category-100x100.webp",
      title: "Bed Runner",
      listItems: [{ name: "Bed Runner", path: "/all-categories/bedding/bed-runner" }],
    },
    {
      id: 4,
      imageUrl: "/images/menuCategories/p01-500x500-100x100.webp",
      title: "Pillow||Pillow Protector",
      listItems: [
        { name: "Pillow Protector", path: "/all-categories/bedding/pillow-protector" },
        { name: "Sleeping Pillow", path: "/all-categories/bedding/sleeping-pillow" },
      ],
    },
    {
      id: 5,
      imageUrl: "/images/menuCategories/Fitted Sheet Category-100x100.webp",
      title: "FittedSheet | Sheet Set",
      listItems: [{ name: "Sheet Set", path: "/all-categories/bedding/sheet-set" }],
    },
    {
      id: 6,
      imageUrl: "/images/menuCategories/Mattress-100x100.webp",
      title: "Mattress | Mattress Protector",
      listItems: [
        { name: "Mattress Topper", path: "/all-categories/bedding/mattress-topper" },
        { name: "Premium Mattress", path: "/all-categories/bedding/premium-mattress" },
        { name: "Mattress Protector", path: "/all-categories/bedding/mattress-protector" },
      ],
    },
  ];
  return (
    <>
      <div className="">
        <div className="inline-flex items-center text-black-300 hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium group">
          <FaBed className="mr-1 text-xl" />
          Bedding <FaCaretDown />
          <div className="w-full absolute pb-6  z-50 top-full left-0 transform rounded-md justify-center items-center p-2 group-hover:flex hidden">
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

export default Bedding;
