import { useRouter } from 'next/router';
import Link from 'next/link';

const sections = [
  {
      "id": 1,
      "imageUrl": "https://m.media-amazon.com/images/I/91FUcQAyUoL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
      "title": "Towels | Bathmats",
      "listItems": [
          {"name": "Basin Towel", "path": "/all-categories/bathSupport/BasinTowel"},
          {"name": "Basin Mat", "path": "/all-categories/bathSupport/BasinMat"},
          {"name": "Bath Sheet", "path": "/all-categories/bathSupport/BathSheet"},
          {"name": "Bath Towel", "path": "/all-categories/bathSupport/BathTowel"},
          {"name": "Hand Towel", "path": "/all-categories/bathSupport/HandTowel"},
      ],
  },
  {
      "id": 2,
      "imageUrl": "https://media.nisbets.com/asset/core/prodimage/large_new/hd222_ecobathrobe1.jpg",
      "title": "Bathrobes",
      "listItems": [
          {"name": "Adult Size", "path": "/all-categories/bathSupport/AdultSize"},
          {"name": "Kids Size", "path": "/all-categories/bathSupport/KidsSize"},
      ],
  },
  {
      "id": 3,
      "imageUrl": "https://hips.hearstapps.com/hmg-prod/images/bathroom-decor-ideas-65f16a228586f.jpeg?crop=1.00xw:0.334xh;0,0.324xh&resize=1200:*",
      "title": "Bath Decor",
      "listItems": [
          {"name": "Bathroom Rugs", "path": "/all-categories/bathSupport/BathroomRugs"},
      ],
  },
  {
      "id": 4,
      "imageUrl": "https://market99.com/cdn/shop/products/ceramic-cylindrical-bathroom-set-of-4-geometric-pattern-bath-accessories-soap-and-lotion-dispensers-1-29122143649962.jpg?v=1697016217&width=1080",
      "title": "Bath Accessories",
      "listItems": [
          {"name": "Bathroom Bin", "path": "/all-categories/bathSupport/BathroomBin"},
          {"name": "Shower Curtain", "path": "/all-categories/bathSupport/ShowerCurtain"},
      ],
  },
]
  
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
