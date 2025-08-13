import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register necessary components and plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ChartDataLabels);

const Graph1 = ({ data, mode }) => {
  if (!data || !data.total_spending_by_category) return <div>No data available for chart.</div>;

  // Extract category names and values from the data
  const categories = Object.keys(data.total_spending_by_category);
  const values = Object.values(data.total_spending_by_category);
  const maxValue = Math.max(...values);
  const yAxisMax = Math.ceil(maxValue * 1.2); // 20% headroom

  // Determine colors based on mode
  const isDarkMode = mode === 'dark';
  const textColor = isDarkMode ? 'white' : 'black';
  const backgroundColor = isDarkMode ? 'rgba(0, 123, 255, 0.8)' : 'rgba(0, 123, 255, 0.8)';
  const borderColor = isDarkMode ? 'rgba(0, 123, 255, 1)' : 'rgba(0, 123, 255, 1)';
  // Prepare data for the chart
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Total Spending by Category',
        data: values,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    indexAxis: 'y', // This makes the bars horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        align: 'end',
        anchor: 'end',
        formatter: (value) => `$${value}`,
        color: textColor,
      },
      title: {
        display: true,
        text: 'Total Spendings by Category',
        color: textColor,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: yAxisMax,
        title: {
          display: true,
          text: 'Spending Amount($)',
          color: 'grey',
        },
        ticks: {
          color: textColor,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Category',
          color: 'grey',
        },
        ticks: {
          color: textColor,
        },
      },
    },
  };

  return (
    <div style={{ height: '260px', width: '100%' }}> {/* Set a fixed height */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Graph1;
