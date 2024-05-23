import React from "react";

const DesignSix = () => {
  const images = [
    {
      url: "/images/designSix/Summer_Quilt_Banner.png",
      text: "Summer Quilt",
    },
    {
      url: "/images/designSix/bathrobes.png",
      text: "Bathrobes",
    },
    {
      url: "/images/designSix/Handmade_Rugs.png",
      text: "Handmade Rugs",
    },
    {
      url: "/images/designSix/feather_pillow.png",
      text: "Feather Pillow",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-3 mb-5 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden group hover:shadow-lg aspect-w-2 aspect-h-3"
          >
            <img
              src={image.url}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            />
            <div className="absolute bottom-16 left-0 bg-white text-gray-800 px-12 py-4 transform translate-y-0 transition-transform duration-300 hover:translate-y-[-8px]">
              <p>{image.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignSix;
