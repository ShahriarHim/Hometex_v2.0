import { useRouter } from 'next/router';
import Link from 'next/link';

const sections = [
  {
    id: 1,
    imageUrl: "https://m.media-amazon.com/images/I/810MbOBa92L._AC_UF1000,1000_QL80_.jpg", // Replace with your image URL
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
    imageUrl: "https://static.athome.com/image/upload/f_auto,q_auto,fl_progressive:steep/v1694533303/webcontent/FallForAll/2023/LP_TestAssets_StoreVsEnviro/FY24_WK32_LP_Test_HomeAccentsInsp-M.png", // Replace with your image URL
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
    imageUrl: "https://images.herzindagi.info/image/2020/Sep/HOME-LIGHTS.jpg", // Replace with your image URL
    title: "Lighting",
    listItems: [
      { name: "Table Lamps", path: "/all-categories/homeDecor/TableLamps" },
      { name: "Floor Lamps", path: "/all-categories/homeDecor/FloorLamps" },
      { name: "Ceiling Lights", path: "/all-categories/homeDecor/CeilingLights" },
      { name: "String Lights", path: "/all-categories/homeDecor/StringLights" },
    ],
  },
];

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  const section = sections.find(
    (sec) => sec.title.replace(/\s+/g, '-').toLowerCase() === category
  );

  if (!section) {
    return <p>Category not found</p>;
  }

  return (
    <div className="max-w-screen-lg mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">{section.title}</h1>
      <ul>
        {section.listItems.map((item, index) => (
          <li key={index}>
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
