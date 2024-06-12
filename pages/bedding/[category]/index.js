import { useRouter } from 'next/router';
import Link from 'next/link';


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
