import axios from "axios";

export const fetchPageSpeedData = async (url) => {
  try {
    // API 키를 환경변수로 관리하거나 유효한 Google PageSpeed API 키를 사용해야 합니다
    const API_KEY = "AIzaSyDc-0UChJo7UGB0NJl2ggKTlFfyCIWquYo";
    const response = await axios.get(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
      )}&key=${API_KEY}`
    );
    return response.data.lighthouseResult;
  } catch (error) {
    console.error("API 호출 중 오류 발생", error);
    throw error; // 에러를 그대로 전파하여 상위 컴포넌트에서 처리할 수 있도록 함
  }
};
