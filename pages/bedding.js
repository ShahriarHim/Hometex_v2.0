import Link from "next/link";
import { useRouter } from "next/router";

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

const BeddingPage = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="max-w-screen-lg mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bedding</h1>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-blue-300"
        >
          Go Back
        </button>
      </div>
      <hr className="mb-4 border-t-2 border-gray-300" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div key={section.id} className="flex flex-col items-center">
            <Link href={`/bedding/${section.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
              <div className="flex flex-col items-center cursor-pointer">
                <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden">
                  <img src={section.imageUrl} alt={section.title} className="object-cover w-full h-full" />
                </div>
                <h2 className="mt-2 text-center text-lg font-semibold">{section.title}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeddingPage;
