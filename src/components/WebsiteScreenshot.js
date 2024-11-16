import React from "react";

const WebsiteScreenshot = ({ screenshot }) => {
  // 디버깅을 위한 콘솔 로그 추가
  console.log("Screenshot prop received:", screenshot);

  if (!screenshot) {
    return null;
  }

  return (
    <div className="screenshot-container">
      <h3>분석된 페이지 스크린샷</h3>
      <div className="screenshot-wrapper">
        <img
          src={screenshot} // 직접 URL을 사용
          alt="Website screenshot"
          className="website-screenshot"
          onError={(e) => {
            console.error("Error loading screenshot:", e);
            console.log("Failed screenshot URL:", screenshot);
          }}
        />
      </div>
    </div>
  );
};

export default WebsiteScreenshot;
