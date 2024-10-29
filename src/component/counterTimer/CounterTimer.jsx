import React, { useEffect, useRef, useState } from "react";

function CounterTimer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const intervalRef = useRef(null);
  const inputRef = useRef(null);

  const handleInput = (event) => {
    setTime(parseInt(event.target.value * 60));
  };
  const formatTime = () => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    return `${min} : ${sec}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPause(false);
  };

  const handlePause = () => {
    setIsPause(!isPause);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsPause(false);
    setTime(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (isActive && !isPause && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(intervalRef.current);
      setIsActive(false);
      alert("Time Is Up");
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, isPause, time]);

  return (
    <div>
      <h1 className="text-red-700">Countdown Timer</h1>
      <input
        type="number"
        placeholder="Enter time in minutes"
        onChange={handleInput}
        ref={inputRef}
        name=""
        id=""
        className="m-5 p-3 border border-red-800 text-center "
      />
      <div className="text-4xl">{formatTime()}</div>
      <div className="mt-5">
        <div className="flex gap-10 justify-center">
          <button
            onClick={handleStart}
            disabled={(isActive && !isPause) || time <= 0}
            className={`px-4 py-2 rounded ${
              (isActive && !isPause) || time <= 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Start
          </button>
          <button
            onClick={handlePause}
            disabled={!isActive || time <= 0}
            className={`px-4 py-2 rounded ${
              time <= 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            {isPause ? "Resume" : "Pause"}
          </button>
          <button
            onClick={handleReset}
            disabled={time < 0}
            className={`px-4 py-2 rounded ${
              time <= 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-red-500"
            }`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default CounterTimer;
