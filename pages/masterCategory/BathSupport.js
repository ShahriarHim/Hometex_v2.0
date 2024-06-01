import React from 'react'; // Ensure React is imported if you haven't done so elsewhere
import Bedding from '../../components/home/menus/Bedding';
import DealOfTheWeek from '../all-categories/DealOfTheWeek';

const BathSupportgPage = () => {
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

  return (
    <div>
      <Bedding sections={sections} />
      <DealOfTheWeek items={sections} />
    </div>
  );
};

export default BathSupportgPage;
