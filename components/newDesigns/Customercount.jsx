import React, { useEffect, useState } from "react";
import { HiOutlineHeart } from "react-icons/hi";

const CustomerCount = () => {
  const [count, setCount] = useState(1000); // Initial customer count
  const [animationClass, setAnimationClass] = useState("animate-none");

  // Function to increase customer count every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + Math.floor(Math.random() * 10)); // Increase count randomly by up to 10
      setAnimationClass("animate-bounce"); // Apply bounce animation
      setTimeout(() => {
        setAnimationClass(""); // Remove animation after 1 second
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-12">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-center text-5xl md:text-6xl font-bold mb-8">
          Welcome to <span className="text-yellow-300 font-serif">Hometex</span>
        </h1>
        <h2 className="text-center text-3xl md:text-4xl mb-8">
          Join <span className="text-yellow-300">{count}</span> satisfied customers!
        </h2>
        <div className="flex justify-center">
          <button
            onClick={() => setCount(prevCount => prevCount + 1)}
            className={`bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full shadow-md transition duration-300 ${animationClass}`}
          >
            <HiOutlineHeart className="inline-block mr-2 animate-pulse" />
            Become One
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCount;
