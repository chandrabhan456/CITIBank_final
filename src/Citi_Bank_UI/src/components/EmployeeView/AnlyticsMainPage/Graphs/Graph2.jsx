import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels
);

const Graph2 = ({ data, mode }) => {
  if (!data || !Array.isArray(data.revenue_by_campaign)) return null;

  let items = data.revenue_by_campaign;

  // Sort items by revenue_generated descending, then take the top 10
  items = items
    .slice() // Make a copy to avoid mutating the original
    .slice(0, 10);

  const labels = items.map((item) => item.campaign_name);
  const values = items.map((item) => item.revenue_generated);

  if (labels.length === 0) {
    return <div>No data available for chart.</div>;
  }

  const maxValue = Math.max(...values, 0);
  const yAxisMax = Math.ceil(maxValue * 1.1);
  const minChartWidth = Math.max(labels.length * 100, 800);

  // Set colors based on mode
  const isDarkMode = mode === 'dark';
  const textColor = isDarkMode ? 'white' : 'black';
  const backgroundColor = isDarkMode ? 'rgba(0, 123, 255, 0.8)' : 'rgba(0, 123, 255, 0.8)';
  const borderColor = isDarkMode ? 'rgba(0, 123, 255, 1)' : 'rgba(0, 123, 255, 1)';
  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue ($)",
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
        align: "end",
        anchor: "end",
        formatter: (value) => {
          if (value >= 1e6) {
            const mValue = Math.floor(value / 100000) / 10;
            return `$${mValue}M`;
          }
          if (value >= 1e2) {
            const kValue = Math.floor(value / 100) / 10;
            return `$${kValue}k`;
          }
          return `$${value}`;
        },
        color: textColor,
      },
      title: {
        display: true,
        text: "Revenue Generated for Credit Card Campaign (August 2024-2025)",
        color: textColor,
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Credit Card Campaign",
          color: textColor,
          font: { size: 14, weight: "bold" },
        },
        ticks: { color: textColor, font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        max: yAxisMax,
        title: {
          display: true,
          text: "Revenue($)",
          color: textColor,
          font: { size: 14, weight: "bold" },
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

export default Graph2;
