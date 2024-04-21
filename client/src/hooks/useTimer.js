import { useState, useEffect } from "react";

const useTimer = (initialSeconds) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;

    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(timer);
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  return {
    seconds,
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};

export default useTimer;
