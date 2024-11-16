import React from "react";
import "./styles/globalStyles.css";
import useSpeedTest from "./hooks/useSpeedTest";
import SpeedTestForm from "./components/SpeedTestForm";
import PerformanceBar from "./components/PerformanceBar";
import LoadingSpinner from "./components/LoadingSpinner";
import WebsiteScreenshot from "./components/WebsiteScreenshot";

// 성능 점수에 따른 피드백 함수
const getPerformanceFeedback = (score) => {
  if (score >= 90) {
    return {
      status: "excellent",
      message: "웹사이트가 매우 빠르게 최적화되어 있습니다!",
      color: "#4caf50",
    };
  } else if (score >= 70) {
    return {
      status: "good",
      message:
        "웹사이트가 대체로 잘 최적화되어 있지만, 일부 개선의 여지가 있습니다.",
      color: "#ff9800",
    };
  } else if (score >= 50) {
    return {
      status: "needsImprovement",
      message: "웹사이트 성능 개선이 필요합니다.",
      color: "#f44336",
    };
  } else {
    return {
      status: "poor",
      message: "웹사이트 성능이 매우 저조합니다. 즉각적인 개선이 필요합니다.",
      color: "#d32f2f",
    };
  }
};

// 구체적인 개선 제안사항 함수
const getImprovementSuggestions = (result) => {
  const suggestions = [];

  // FCP 개선 제안
  const fcp = parseFloat(result.audits["first-contentful-paint"].displayValue);
  if (fcp > 2) {
    suggestions.push({
      title: "첫 번째 콘텐츠 표시 시간(FCP) 개선",
      suggestions: [
        "서버 응답 시간 최적화",
        "중요한 리소스의 사전 로드",
        "렌더링 차단 리소스 제거",
      ],
    });
  }

  // Speed Index 개선 제안
  const speedIndex = parseFloat(result.audits["speed-index"].displayValue);
  if (speedIndex > 3) {
    suggestions.push({
      title: "속도 인덱스(Speed Index) 개선",
      suggestions: ["이미지 최적화", "리소스 압축", "브라우저 캐싱 활용"],
    });
  }

  // LCP 개선 제안
  const lcp = parseFloat(
    result.audits["largest-contentful-paint"].displayValue
  );
  if (lcp > 2.5) {
    suggestions.push({
      title: "최대 콘텐츠 표시 시간(LCP) 개선",
      suggestions: [
        "주요 이미지 최적화",
        "불필요한 자바스크립트 제거",
        "중요한 리소스의 우선순위 지정",
      ],
    });
  }

  return suggestions;
};

const App = () => {
  const { url, setUrl, result, loading, error, handleSubmit } = useSpeedTest();

  // result 데이터 확인을 위한 useEffect 추가
  React.useEffect(() => {
    if (result) {
      console.log("Full API Response:", result);
      // result의 모든 최상위 키 확인
      console.log("Result keys:", Object.keys(result));
      // audits 객체 확인
      console.log("Audits:", result.audits);
      // categories 객체 확인
      console.log("Categories:", result.categories);
    }
  }, [result]);

  return (
    <div className="container">
      <div className="header">
        <h1>웹사이트 속도 최적화 도구</h1>
        <p>웹사이트의 성능을 분석하고 개선 방안을 제시해드립니다</p>
      </div>

      <div className="card">
        <SpeedTestForm
          url={url}
          setUrl={setUrl}
          handleSubmit={handleSubmit}
          disabled={loading}
        />
      </div>

      {!result && !loading && !error && (
        <div className="welcome-section">
          <h2>웹사이트 성능 최적화의 첫 걸음</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">빠른 성능 분석</h3>
              <p className="feature-description">
                Google Lighthouse 기술을 활용한 정확한 성능 측정
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">상세한 분석 결과</h3>
              <p className="feature-description">
                주요 성능 지표에 대한 상세한 분석 제공
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3 className="feature-title">맞춤형 개선 방안</h3>
              <p className="feature-description">
                성능 향상을 위한 실질적인 개선 방안 제시
              </p>
            </div>
          </div>
        </div>
      )}
      {loading && <LoadingSpinner />}

      {error && <div className="error-message card">{error}</div>}

      {result && (
        <>
          <div className="card">
            <h2>성능 분석 결과</h2>
            <PerformanceBar
              performanceScore={result.categories.performance.score * 100}
              fcp={parseFloat(
                result.audits["first-contentful-paint"].displayValue
              )}
              speedIndex={parseFloat(result.audits["speed-index"].displayValue)}
              lcp={parseFloat(
                result.audits["largest-contentful-paint"].displayValue
              )}
            />
          </div>

          <WebsiteScreenshot
            screenshot={
              result.audits?.["final-screenshot"]?.details?.data ||
              result.audits?.["screenshot"]?.details?.data ||
              result.audits?.["full-page-screenshot"]?.details?.data
            }
          />

          <div className="card">
            <div className="performance-feedback">
              {(() => {
                const feedback = getPerformanceFeedback(
                  result.categories.performance.score * 100
                );
                return (
                  <div style={{ color: feedback.color }}>
                    <h3>
                      성능 점수:{" "}
                      {(result.categories.performance.score * 100).toFixed(1)}%
                    </h3>
                    <p style={{ fontSize: "1.1em" }}>{feedback.message}</p>
                  </div>
                );
              })()}
            </div>

            <div className="detailed-metrics">
              <div className="metric-card">
                <div className="metric-value">
                  {result.audits["first-contentful-paint"].displayValue}
                </div>
                <div className="metric-label">
                  첫 번째 콘텐츠 표시 시간(FCP)
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-value">
                  {result.audits["speed-index"].displayValue}
                </div>
                <div className="metric-label">속도 인덱스(Speed Index)</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">
                  {result.audits["largest-contentful-paint"].displayValue}
                </div>
                <div className="metric-label">최대 콘텐츠 표시 시간(LCP)</div>
              </div>
            </div>
          </div>

          <div className="card improvement-suggestions">
            <h3>개선 제안사항</h3>
            {getImprovementSuggestions(result).map((section, index) => (
              <div key={index} style={{ margin: "15px 0" }}>
                <h4>{section.title}</h4>
                <ul>
                  {section.suggestions.map((suggestion, i) => (
                    <li key={i}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
