import React from "react";

const SpeedTestForm = ({ url, setUrl, handleSubmit, disabled }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="웹사이트 URL을 입력하세요 (예: https://www.example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={disabled}
      />
      <button onClick={handleSubmit} disabled={disabled}>
        {disabled ? "분석 중..." : "분석하기"}
      </button>
    </div>
  );
};

export default SpeedTestForm;
