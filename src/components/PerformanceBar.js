import React from 'react';
import { Bar } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const PerformanceBar = ({ performanceScore, fcp, speedIndex, lcp }) => {
  const chartData = {
    labels: ['성능 점수', 'FCP', 'Speed Index', 'LCP'],
    datasets: [
      {
        label: '성능 지표',
        data: [performanceScore, fcp * 10, speedIndex * 10, lcp * 10],  
        backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#2196f3'],
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '성능 분석 결과',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw.toFixed(2)}%`;
          },
        },
      },
    },
  };
  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};
export default PerformanceBar;