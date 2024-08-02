

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ gasValue, temperatureValue, humidityValue }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (!chartInstance.current) {
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Gas LP', 'Temperatura', 'Humedad'],
          datasets: [{
            label: 'Mediciones',
            data: [gasValue, temperatureValue, humidityValue],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      chartInstance.current.data.datasets[0].data = [gasValue, temperatureValue, humidityValue];
      chartInstance.current.update();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [gasValue, temperatureValue, humidityValue]);

  return (
    <div className="chart bar-chart">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;
