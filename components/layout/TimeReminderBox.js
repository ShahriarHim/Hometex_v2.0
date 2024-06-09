import React, { useState, useEffect } from 'react';

const TimeReminderBox = () => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    // Set the initial time remaining (in seconds)
    const initialTimeRemaining = 86400; // 24 hours

    setTimeRemaining(initialTimeRemaining);

    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const days = Math.floor(time / 86400);
    const hours = Math.floor((time % 86400) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Time Remaining</h3>
      <div className="text-3xl font-bold">
        {timeRemaining !== null ? formatTime(timeRemaining) : '00d 00h 00m 00s'}
      </div>
    </div>
  );
};

export default TimeReminderBox;