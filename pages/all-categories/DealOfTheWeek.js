import React, { useState } from 'react';
import { FaRegWindowClose, FaRegCaretSquareLeft, FaRegCaretSquareRight, FaStar, FaShoppingCart } from 'react-icons/fa';

const DealOfTheWeek = ({ items }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupProduct, setPopupProduct] = useState(null);

  const handleItemClick = (item) => {
    setPopupProduct(item);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setPopupProduct(null);
  };

  return (
    <div className="bg-yellow-50 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-4 mb-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="text-center"
              onClick={() => handleItemClick(item)}
            >
              {item.imageUrl ? (
                <div className="w-36 h-36 rounded-full overflow-hidden mx-auto relative shadow-lg bg-white">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-cover object-center w-full h-full"
                    style={{ transform: 'scale(1.1)' }}
                  />
                </div>
              ) : null}
              <p className="mt-2">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {isPopupVisible && popupProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-8 rounded-lg max-w-6xl w-full mx-auto">
            <button
              onClick={closePopup}
              className="absolute top-0 right-1 text-lg p-2 rounded-full hover:bg-gray-200"
            >
              <FaRegWindowClose />
            </button>
            <div className="flex justify-between items-center border-b">
              <h2 className="text-2xl font-bold mb-4">DEAL OF THE WEEK</h2>
              <div className="flex justify-between items-center gap-2 text-2xl">
                <button className="hover:text-blue-500 transition-colors duration-200">
                  <FaRegCaretSquareLeft />
                </button>
                <button className="hover:text-blue-500 transition-colors duration-200">
                  <FaRegCaretSquareRight />
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center pt-3">
              <div className="flex flex-col md:flex-row justify-center items-center p-4 bg-white rounded-lg mx-auto">
                <div className="md:w-1/2 p-4">
                  <div className="flex gap-2">
                    <div>
                      <p className="px-2 py-1 bg-red-700 text-white rounded-tr-lg rounded-bl-lg">
                        {popupProduct.percent}%
                      </p>
                    </div>
                    <img
                      src={popupProduct.imageUrl}
                      alt={popupProduct.name}
                      className="object-cover object-center rounded-md"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold">{popupProduct.name}</h2>
                    <div className="flex my-2">
                      {[...Array(5)].map((star, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < popupProduct.rating
                              ? 'text-yellow-500'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <div className="my-2">
                      <span className="text-red-500 text-lg font-bold">
                        {popupProduct.discountPrice}
                      </span>
                      <span className="text-gray-500 line-through ml-2">
                        {popupProduct.originalPrice}
                      </span>
                    </div>
                  </div>
                  {popupProduct.countdown && (
                    <div className="grid grid-cols-4 gap-2 text-center mt-4">
                      {Object.entries(popupProduct.countdown).map(
                        ([unit, value], index) => (
                          <div key={index}>
                            <span className="text-lg font-semibold">
                              {value}
                            </span>
                            <p className="text-sm text-gray-600">
                              {unit.toUpperCase()}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}
                  <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center">
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealOfTheWeek;
