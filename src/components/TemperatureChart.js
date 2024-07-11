import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TemperatureChart = ({ forecast }) => {
  // Prepare the data for the chart
  const chartData = {
    labels: forecast[0].hour.map((hour) => hour.time.split(' ')[1]), // Extract the time part
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecast[0].hour.map((hour) => hour.temp_c),
        borderColor: 'rgba(54, 162, 235, 1)', // Line color
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Fill under the line
        fill: true,
        tension: 0.4, // Smooth the line
        pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Point color
        pointBorderColor: '#fff', // Point border color
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
      },
    ],
  };

  // Configure the chart options
  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
        },
        grid: {
          display: false, // Disable grid lines
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.3)', // Grid line color
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="relative h-64">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TemperatureChart;
