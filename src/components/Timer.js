
import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onTimeUp }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div>
      <p>Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
    </div>
  );
};

export default Timer;

