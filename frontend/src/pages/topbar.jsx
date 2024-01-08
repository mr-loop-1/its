import React, { useState, useEffect } from 'react';

const TopBar = () => {
  const [countdown, setCountdown] = useState({ minutes: 0, seconds: 0 });

  //   useEffect(() => {
  //     const calculateCountdown = () => {
  //       const now = new Date();
  //       const minutesRemaining =
  //         now.getMinutes() < 30 ? 30 - now.getMinutes() : 60 - now.getMinutes();
  //       const secondsRemaining = 60 - now.getSeconds();
  //       setCountdown({ minutes: minutesRemaining, seconds: secondsRemaining });
  //     };

  //     // Initial calculation
  //     calculateCountdown();

  //     // Update every second
  //     const intervalId = setInterval(calculateCountdown, 1000);

  //     // Clean up on component unmount
  //     return () => clearInterval(intervalId);
  //   }, []);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentMinutes = now.getMinutes();
      const nextTenMinuteMark = Math.ceil(currentMinutes / 5) * 5;
      const minutesRemaining =
        currentMinutes % 5 === 0 ? 4 : nextTenMinuteMark - currentMinutes - 1;
      // const minutesRemaining = nextTenMinuteMark - currentMinutes - 1;
      const secondsRemaining = 60 - now.getSeconds();
      setCountdown({ minutes: minutesRemaining, seconds: secondsRemaining });
    };

    // Initial calculation
    calculateCountdown();

    // Update every second
    const intervalId = setInterval(calculateCountdown, 1000);

    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div className="sticky top-0 left-0 w-full h-8 bg-gray-600 text-white p-1 text-center z-40">
      <span>full database reset in </span>
      <span className="text-lime-500 font-bold">
        {formatTime(countdown.minutes)}:{formatTime(countdown.seconds)}
      </span>
      <a
        href="https://github.com/mr-loop-1/its"
        target="_blank"
        className="text-blue-200"
      >
        {' '}
        see why?
      </a>
    </div>
  );
};

export default TopBar;
