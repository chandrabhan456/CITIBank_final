import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ChartDataLabels);

const Graph1 = ({ data, mode }) => {
  console.log("databbbbbbbbbbbbb", data);
  if (!data) return null;

  // Filter out non-category keys
  const categoryEntries = Object.entries(data)
    .filter(([k]) => !["avg spend", "total spend"].includes(k));
  const labels = categoryEntries.map(([k]) => k);
  const values = categoryEntries.map(([_, v]) => v);
  const maxValue = Math.max(...values);
  const yAxisMax = Math.ceil(maxValue * 1.1); // 10% headroom

  // Set colors based on mode
  const isDarkMode = mode === 'dark';
  const textColor = isDarkMode ? 'white' : 'black';
  const backgroundColor = isDarkMode ? 'rgba(0, 123, 255, 0.8)' : 'rgba(0, 123, 255, 0.8)';
  const borderColor = isDarkMode ? 'rgba(0, 123, 255, 1)' : 'rgba(0, 123, 255, 1)';

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Amount ($)',
        data: values,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      datalabels: {
        align: 'end',
        anchor: 'end',
        formatter: (value) => {
          if (value >= 1e5) return `$${(value / 1e6).toFixed(1).replace(/\.0$/, '')}M`;
          if (value >= 1e2) return `$${Math.floor(value / 100) / 10}k`;
          return `$${value}`;
        },
        color: textColor,
      },
      title: {
        display: true,
        text: 'Total Spendings by Category (August 2024-2025)',
        color: textColor,
        font: { size: 16, weight: 'bold' },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Category',
          color: textColor,
          font: { size: 14, weight: 'bold' },
        },
        ticks: { color: textColor, font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        max: yAxisMax,
        title: {
          display: true,
          text: 'Total Spendings($)',
          color: textColor,
          font: { size: 14, weight: 'bold' },
        },
        ticks: { color: textColor, font: { size: 12 } },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '300px', maxWidth: '800px', margin: '0 auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Graph1;
