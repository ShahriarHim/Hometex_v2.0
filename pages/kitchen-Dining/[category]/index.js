import { useRouter } from 'next/router';
import Link from 'next/link';

const sections = [
  {
      "id": 1,
      "imageUrl": "https://theinkbucket.in/cdn/shop/products/4_5a8d2694-aa86-4f09-9beb-2957ddb06a52.jpg?v=1626291106",
      "title": "Kitchen Linen",
      "listItems": [
          {"name": "Oven Top Cover", "path": "/all-categories/Kitchen-Dinning/OvenTopCover"},
          {"name": "Oven Gloves", "path": "/all-categories/Kitchen-Dinning/OvenGloves"},
          {"name": "Aprons", "path": "/all-categories/Kitchen-Dinning/Aprons"},
          {"name": "Napkins", "path": "/all-categories/Kitchen-Dinning/Napkins"},
      ],
  },
  {
      "id": 2,
      "imageUrl": "https://www.propertypro.ng/blog/wp-content/uploads/2017/07/071-6most-popular-types-of-diningroom-set.jpg",
      "title": "Dining",
      "listItems": [
          {"name": "Chair Cover", "path": "/all-categories/Kitchen-Dinning/ChairCover"},
          {"name": "Fridge Top Cover", "path": "/all-categories/Kitchen-Dinning/FridgeTopCover"},
          {"name": "Place Mat", "path": "/all-categories/Kitchen-Dinning/PlaceMat"},
          {"name": "Table Cloth", "path": "/all-categories/Kitchen-Dinning/TableCloth"},
          {"name": "Table Runner", "path": "/all-categories/Kitchen-Dinning/TableRunner"},
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
