// components/RewardSection.jsx
import React from 'react';
import useToggle from '../Hooks/useToggle';
import { HiOutlineGift } from 'react-icons/hi'; // Assuming you're using react-icons

const RewardSection = () => {
  const [showAmount, toggleShowAmount] = useToggle();

  return (
    <div
      className="relative bg-black text-white px-2 pt-2 pb-3 flex items-center cursor-pointer"
      onClick={toggleShowAmount}
    >
      <HiOutlineGift
        className="mr-2 text-pink-500"
        style={{ width: "22px", height: "22px" }}
      />
      {showAmount? (
        <span>Your Reward Amount: $100</span> // Replace $100 with your actual reward amount
      ) : (
        <span>My Rewards</span>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 h-2 bg-repeat-x"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cpolygon points='0,10 5,0 10,10' style='fill:%23ffffff;'/%3E%3C/svg%3E\")",
          backgroundSize: "auto 100%",
        }}
      ></div>
    </div>
  );
};

export default RewardSection;
