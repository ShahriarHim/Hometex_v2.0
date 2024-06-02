import React from 'react'; // Ensure React is imported if you haven't done so elsewhere
import Bedding from '../../components/home/menus/Bedding';
import DealOfTheWeek from '../all-categories/DealOfTheWeek';

const HomeDecorPage = () => {
    const sections = [
        {
          id: 1,
          imageUrl: "https://m.media-amazon.com/images/I/810MbOBa92L._AC_UF1000,1000_QL80_.jpg", // Replace with your image URL
          title: "Wall Decor",
          listItems: [
            { name: "Wall Art", path: "/all-categories/Home-Decor/Wall Art" },
            { name: "Wall Clocks", path: "/all-categories/Home-Decor/Wall Clocks" },
            { name: "Wall Mirrors", path: "/all-categories/Home-Decor/Wall Mirrors" },
            { name: "Wall Shelves", path: "/all-categories/Home-Decor/Wall Shelves" },
          ],
        },
        {
          id: 2,
          imageUrl: "https://static.athome.com/image/upload/f_auto,q_auto,fl_progressive:steep/v1694533303/webcontent/FallForAll/2023/LP_TestAssets_StoreVsEnviro/FY24_WK32_LP_Test_HomeAccentsInsp-M.png", // Replace with your image URL
          title: "Home Accents",
          listItems: [
            { name: "Vases", path: "/all-categories/Home-Decor/Vases" },
            { name: "Candle Holders", path: "/all-categories/Home-Decor/Candle Holders" },
            { name: "Figurines", path: "/all-categories/Home-Decor/Figurines" },
            { name: "Bookends", path: "/all-categories/Home-Decor/Bookends" },
          ],
        },
        {
          id: 3,
          imageUrl: "https://images.herzindagi.info/image/2020/Sep/HOME-LIGHTS.jpg", // Replace with your image URL
          title: "Lighting",
          listItems: [
            { name: "Table Lamps", path: "/all-categories/Home-Decor/Table Lamps" },
            { name: "Floor Lamps", path: "/all-categories/Home-Decor/Floor Lamps" },
            { name: "Ceiling Lights", path: "/all-categories/Home-Decor/Ceiling Lights" },
            { name: "String Lights", path: "/all-categories/Home-Decor/String Lights" },
          ],
        },
      ];

  return (
    <div>
      
      {/* <Bedding sections={sections} /> */}
      <DealOfTheWeek items={sections} />
    </div>
  );
};

export default HomeDecorPage;
