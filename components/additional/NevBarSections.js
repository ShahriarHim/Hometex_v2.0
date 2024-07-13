import React, { useState } from 'react';

const sections = {
  bathsupport: [
    {
      id: 1,
      imageUrl: "https://m.media-amazon.com/images/I/91FUcQAyUoL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
      title: "Towels | Bathmats",
      listItems: [
        { name: "Basin Towel", path: "/all-categories/bathSupport/BasinTowel" },
        { name: "Basin Mat", path: "/all-categories/bathSupport/BasinMat" },
        { name: "Bath Sheet", path: "/all-categories/bathSupport/BathSheet" },
        { name: "Bath Towel", path: "/all-categories/bathSupport/BathTowel" },
        { name: "Hand Towel", path: "/all-categories/bathSupport/HandTowel" },
      ],
    },
    {
      id: 2,
      imageUrl: "https://media.nisbets.com/asset/core/prodimage/large_new/hd222_ecobathrobe1.jpg",
      title: "Bathrobes",
      listItems: [
        { name: "Adult Size", path: "/all-categories/bathSupport/AdultSize" },
        { name: "Kids Size", path: "/all-categories/bathSupport/KidsSize" },
      ],
    },
    {
      id: 3,
      imageUrl: "https://hips.hearstapps.com/hmg-prod/images/bathroom-decor-ideas-65f16a228586f.jpeg?crop=1.00xw:0.334xh;0,0.324xh&resize=1200:*",
      title: "Bath Decor",
      listItems: [
        { name: "Bathroom Rugs", path: "/all-categories/bathSupport/BathroomRugs" },
      ],
    },
    {
      id: 4,
      imageUrl: "https://market99.com/cdn/shop/products/ceramic-cylindrical-bathroom-set-of-4-geometric-pattern-bath-accessories-soap-and-lotion-dispensers-1-29122143649962.jpg?v=1697016217&width=1080",
      title: "Bath Accessories",
      listItems: [
        { name: "Bathroom Bin", path: "/all-categories/bathSupport/BathroomBin" },
        { name: "Shower Curtain", path: "/all-categories/bathSupport/ShowerCurtain" },
      ],
    },
  ],
  bedding: [
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
  ],
  homeDecor: [
    {
      id: 1,
      imageUrl: "https://m.media-amazon.com/images/I/810MbOBa92L._AC_UF1000,1000_QL80_.jpg",
      title: "Wall Decor",
      listItems: [
        { name: "Wall Art", path: "/all-categories/homeDecor/WallArt" },
        { name: "Wall Clocks", path: "/all-categories/homeDecor/WallClocks" },
        { name: "Wall Mirrors", path: "/all-categories/homeDecor/WallMirrors" },
        { name: "Wall Shelves", path: "/all-categories/homeDecor/WallShelves" },
      ],
    },
    {
      id: 2,
      imageUrl: "https://static.athome.com/image/upload/f_auto,q_auto,fl_progressive:steep/v1694533303/webcontent/FallForAll/2023/LP_TestAssets_StoreVsEnviro/FY24_WK32_LP_Test_HomeAccentsInsp-M.png",
      title: "Home Accents",
      listItems: [
        { name: "Vases", path: "/all-categories/homeDecor/Vases" },
        { name: "Candle Holders", path: "/all-categories/homeDecor/CandleHolders" },
        { name: "Figurines", path: "/all-categories/homeDecor/Figurines" },
        { name: "Bookends", path: "/all-categories/homeDecor/Bookends" },
      ],
    },
    {
      id: 3,
      imageUrl: "https://images.herzindagi.info/image/2020/Sep/HOME-LIGHTS.jpg",
      title: "Lighting",
      listItems: [
        { name: "Table Lamps", path: "/all-categories/homeDecor/TableLamps" },
        { name: "Floor Lamps", path: "/all-categories/homeDecor/FloorLamps" },
        { name: "Ceiling Lights", path: "/all-categories/homeDecor/CeilingLights" },
        { name: "String Lights", path: "/all-categories/homeDecor/StringLights" },
      ],
    },
  ],
  kitchen: [
    {
      id: 1,
      imageUrl: "https://theinkbucket.in/cdn/shop/products/4_5a8d2694-aa86-4f09-9beb-2957ddb06a52.jpg?v=1626291106",
      title: "Kitchen Linen",
      listItems: [
        { name: "Oven Top Cover", path: "/all-categories/Kitchen-Dinning/OvenTopCover" },
        { name: "Oven Gloves", path: "/all-categories/Kitchen-Dinning/OvenGloves" },
        { name: "Aprons", path: "/all-categories/Kitchen-Dinning/Aprons" },
        { name: "Napkins", path: "/all-categories/Kitchen-Dinning/Napkins" },
      ],
    },
    {
      id: 2,
      imageUrl: "https://www.propertypro.ng/blog/wp-content/uploads/2017/07/071-6most-popular-types-of-diningroom-set.jpg",
      title: "Dining",
      listItems: [
        { name: "Chair Cover", path: "/all-categories/Kitchen-Dinning/ChairCover" },
        { name: "Fridge Top Cover", path: "/all-categories/Kitchen-Dinning/FridgeTopCover" },
        { name: "Place Mat", path: "/all-categories/Kitchen-Dinning/PlaceMat" },
        { name: "Table Cloth", path: "/all-categories/Kitchen-Dinning/TableCloth" },
        { name: "Table Runner", path: "/all-categories/Kitchen-Dinning/TableRunner" },
      ],
    },
  ],
};

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState({});

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubMenu = (section) => {
    setSubMenuOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="text-xl text-left hover:underline"
      >
        Categories
      </button>
      {menuOpen && (
        <div className="pl-4">
          {Object.keys(sections).map((section) => (
            <div key={section}>
              <button
                onClick={() => toggleSubMenu(section)}
                className="text-lg font-semibold text-left hover:underline"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
              {subMenuOpen[section] && (
                <div className="pl-4">
                  {sections[section].map((subSection) => (
                    <div key={subSection.id}>
                      <h3 className="text-md font-medium">
                        {subSection.title}
                      </h3>
                      <ul>
                        {subSection.listItems.map((item, index) => (
                          <li key={index}>
                            <a
                              href={item.path}
                              className="text-sm text-gray-600 hover:underline"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
