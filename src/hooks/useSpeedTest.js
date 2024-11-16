import { useState } from "react";
import { fetchPageSpeedData } from "../services/api";

const useSpeedTest = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!url) {
      alert("URL을 입력해주세요");
      return;
    }

    setLoading(true);
    setError(null);

    // 타임아웃 설정
    const timeout = new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new Error("요청 시간이 초과되었습니다. 나중에 다시 시도해주세요.")
        );
      }, 60000); // 60초 타임아웃
    });

    try {
      const result = await Promise.race([fetchPageSpeedData(url), timeout]);
      setResult(result);
    } catch (error) {
      console.error("성능 데이터 로드 실패", error);
      setError(error.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    url,
    setUrl,
    result,
    loading,
    error,
    handleSubmit,
  };
};

export default useSpeedTest;
