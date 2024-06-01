import React from 'react'; // Ensure React is imported if you haven't done so elsewhere
 
import DealOfTheWeek from '../all-categories/DealOfTheWeek';

const kitchenpage = () => {
    const sections = [
        {
          id: 1,
          imageUrl: "https://theinkbucket.in/cdn/shop/products/4_5a8d2694-aa86-4f09-9beb-2957ddb06a52.jpg?v=1626291106", // Replace with your image URL
          title: "Kitchen Linen",
          listItems: [
            { name: "Oven Top Cover", path: "/all-categories/Kitchen-Dinning/Oven Top Cover" },
            { name: "Oven Gloves", path: "/all-categories/Kitchen-Dinning/Oven Gloves" },
            { name: "Aprons", path: "/all-categories/Kitchen-Dinning/Aprons" },
            { name: "Napkins", path: "/all-categories/Kitchen-Dinning/Napkins" },
          ],
        },
        {
          id: 2,
          imageUrl: "https://www.propertypro.ng/blog/wp-content/uploads/2017/07/071-6most-popular-types-of-diningroom-set.jpg", // Replace with your image URL
          title: "Dining",
          listItems: [
            { name: "Chair Cover", path: "/all-categories/Kitchen-Dinning/Chair Cover" },
            { name: "Fridge Top Cover", path: "/all-categories/Kitchen-Dinning/Fridge Top Cover" },
            { name: "Place Mat", path: "/all-categories/Kitchen-Dinning/Place Mat" },
            { name: "Table Cloth", path: "/all-categories/Kitchen-Dinning/Table Cloth" },
            { name: "Table Runner", path: "/all-categories/Kitchen-Dinning/Table Runner" },
          ],
        },
      ];
  return (
    <div>
  
      <DealOfTheWeek items={sections} />
    </div>
  );
};

export default kitchenpage;
