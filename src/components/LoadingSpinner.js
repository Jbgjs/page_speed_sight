import React, { useState, useEffect } from "react";

const LoadingSpinner = () => {
  const [dots, setDots] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    const timerInterval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">분석 중{dots}</p>
      <p className="loading-subtext">
        {timeElapsed < 15
          ? "페이지를 분석하는 중입니다. 잠시만 기다려주세요."
          : "대상 페이지의 크기에 따라 최대 1분 정도 소요될 수 있습니다."}
      </p>
    </div>
  );
};

export default LoadingSpinner;
