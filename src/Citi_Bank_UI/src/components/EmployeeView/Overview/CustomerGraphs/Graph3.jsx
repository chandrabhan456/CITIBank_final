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

// Register necessary components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels
);

const Graph3 = ({ data, mode }) => {
  if (!data || !data.revenue_by_card) return <div>No data available for chart.</div>;

  // Extract card names and revenue values from the data
  const cards = Object.keys(data.revenue_by_card);
  const revenues = Object.values(data.revenue_by_card);
  const maxValue = Math.max(...revenues);
  const yAxisMax = Math.ceil(maxValue * 1.2); // 20% headroom

  // Determine colors based on mode
  const isDarkMode = mode === 'dark';
  const textColor = isDarkMode ? 'white' : 'black';
  const backgroundColor = isDarkMode ? 'rgba(0, 123, 255, 0.8)' : 'rgba(0, 123, 255, 0.8)';
  const borderColor = isDarkMode ? 'rgba(0, 123, 255, 1)' : 'rgba(0, 123, 255, 1)';
  // Prepare data for the chart
  const chartData = {
    labels: cards,
    datasets: [
      {
        label: "Revenue by Card",
        data: revenues,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    indexAxis: "y", // Horizontal bars
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        align: "end",
        anchor: "end",
        formatter: (value) => `$${value}`,
        color: textColor,
      },
      title: {
        display: true,
        text: "Revenue Generated for Credit Card Campaign",
        color: textColor,
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: yAxisMax,
        title: {
          display: true,
          text: "Revenue",
          color: "grey",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          color: textColor,
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Card Type",
          color: "grey",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          color: textColor,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Graph3;
