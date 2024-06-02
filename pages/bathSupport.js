import { useRouter } from "next/router";

const sections = [
  {
    id: 1,
    imageUrl: "/images/menuCategories/basin-towel.jpg",
    title: "Basin Towel",
  },
  {
    id: 2,
    imageUrl: "/images/menuCategories/basin-mat.jpg",
    title: "Basin Mat",
  },
  {
    id: 3,
    imageUrl: "/images/menuCategories/bath-sheet.jpg",
    title: "Bath Sheet",
  },
  {
    id: 4,
    imageUrl: "/images/menuCategories/bath-towel.jpg",
    title: "Bath Towel",
  },
  {
    id: 5,
    imageUrl: "/images/menuCategories/hand-towel.jpg",
    title: "Hand Towel",
  },
  {
    id: 6,
    imageUrl: "/images/menuCategories/adult-bathrobe.jpg",
    title: "Adult Size Bathrobe",
  },
  {
    id: 7,
    imageUrl: "/images/menuCategories/kids-bathrobe.jpg",
    title: "Kids Size Bathrobe",
  },
  {
    id: 8,
    imageUrl: "/images/menuCategories/bathroom-rug.jpg",
    title: "Bathroom Rugs",
  },
  {
    id: 9,
    imageUrl: "/images/menuCategories/bathroom-bin.jpg",
    title: "Bathroom Bin",
  },
  {
    id: 10,
    imageUrl: "/images/menuCategories/shower-curtain.jpg",
    title: "Shower Curtain",
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
          className="px-4 py-2 bg-blue-200 rounded-md hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
      <hr className="mb-4 border-t-2 border-gray-300" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div key={section.id} className="flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden">
              <img src={section.imageUrl} alt={section.title} className="object-cover w-full h-full" />
            </div>
            <h2 className="mt-2 text-center text-lg font-semibold">{section.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BathSupportPage;
