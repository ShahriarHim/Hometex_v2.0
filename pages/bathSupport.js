import { useRouter } from "next/router";
import Link from "next/link";

const sections = [
  {
    id: 1,
    imageUrl: "https://m.media-amazon.com/images/I/91FUcQAyUoL.__AC_SY300_SX300_QL70_FMwebp_.jpg", // Replace with your image URL
    title: "Towels | Bathmats",
    listItems: [
      { name: "Basin Towel", path: "/all-categories/Bath-Support/Basin Towel" },
      { name: "Basin Mat", path: "/all-categories/Bath-Support/Basin Mat" },
      { name: "Bath Sheet", path: "/all-categories/Bath-Support/Bath Sheet" },
      { name: "Bath Towel", path: "/all-categories/Bath-Support/Bath Towel" },
      { name: "Hand Towel", path: "/all-categories/Bath-Support/Hand Towel" },
    ],
  },
  {
    id: 2,
    imageUrl: "https://media.nisbets.com/asset/core/prodimage/large_new/hd222_ecobathrobe1.jpg", // Replace with your image URL
    title: "Bathrobes",
    listItems: [
      { name: "Adult Size", path: "/all-categories/Bath-Support/Adult Size" },
      { name: "Kids Size", path: "/all-categories/Bath-Support/Kids Size" },
    ],
  },
  {
    id: 3,
    imageUrl: "https://hips.hearstapps.com/hmg-prod/images/bathroom-decor-ideas-65f16a228586f.jpeg?crop=1.00xw:0.334xh;0,0.324xh&resize=1200:*", // Replace with your image URL
    title: "Bath Decor",
    listItems: [
      { name: "Bathroom Rugs", path: "/all-categories/Bath-Support/Bathroom Rugs" },
    ],
  },
  {
    id: 4,
    imageUrl: "https://market99.com/cdn/shop/products/ceramic-cylindrical-bathroom-set-of-4-geometric-pattern-bath-accessories-soap-and-lotion-dispensers-1-29122143649962.jpg?v=1697016217&width=1080", // Replace with your image URL
    title: "Bath Accessories",
    listItems: [
      { name: "Bathroom Bin", path: "/all-categories/Bath-Support/Bathroom Bin" },
      { name: "Shower Curtain", path: "/all-categories/Bath-Support/Shower Curtain" },
    ],
  },
];


const BathSupportPage = () => {
  const router = useRouter();
    
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="max-w-screen-lg mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bath Support</h1>
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
      <Link href={`/BathSupport/${section.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden">
            <img
              src={section.imageUrl}
              alt={section.title}
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="mt-2 text-center text-lg font-semibold">
            {section.title}
          </h2>
        </div>
      </Link>
    </div>
  ))}
</div>
    </div>
  );
};

export default BathSupportPage;
