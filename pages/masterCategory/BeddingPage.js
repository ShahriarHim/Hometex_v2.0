import React from 'react'; // Ensure React is imported if you haven't done so elsewhere
import Bedding from '../../components/home/menus/Bedding';
import DealOfTheWeek from '../all-categories/DealOfTheWeek';

const BeddingPage = () => {
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
    <div>
      <Bedding sections={sections} />
      <DealOfTheWeek items={sections} />
    </div>
  );
};

export default BeddingPage;
