import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import io from 'socket.io-client';
import appData from "../config/appData.json";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const MeasurementCharts = () => {
  const chartRefs = useRef([]);
  const [data, setData] = useState({
    labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4'],
    datasets: [
      {
        label: 'Temperatura',
        data: [],
        fill: false,
        borderColor: '#FF6384'
      },
      {
        label: 'Gas LP',
        data: [],
        fill: false,
        borderColor: '#FFCE56'
      },
      {
        label: 'Humedad',
        data: [],
        fill: false,
        borderColor: '#4BC0C0'
      }
    ]
  });

  const options = {
    plugins: {
      legend: {
        labels: {
          color: '#333333',
          font: {
            size: 18
          }
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#333333',
          font: {
            size: 14
          }
        },
        grid: {
          color: '#e0e0e0'
        }
      },
      y: {
        ticks: {
          color: '#333333',
          font: {
            size: 14
          }
        },
        grid: {
          color: '#e0e0e0'
        }
      }
    },
    layout: {
      padding: 20
    },
    elements: {
      line: {
        borderColor: '#FFFFFF',
        borderWidth: 2
      },
      point: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF'
      }
    }
  };

  useEffect(() => {
    const socket = io(`${appData.ws.protocol}://${appData.ws.host}:${appData.ws.port}`);

    socket.on("connect", () => {
      console.log("Conectado a Socket.IO Sensor");
    });

    socket.on('new_product', (newData) => {
      console.log(newData);
      setData((prevData) => ({
        ...prevData,
        datasets: prevData.datasets.map((dataset) => ({
          ...dataset,
          data: newData[dataset.label.toLowerCase()] || dataset.data
        }))
      }));
    });

    return () => {
      socket.off('new_product');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="measurement-charts">
      {data.datasets.map((dataset, index) => (
        <div key={index} className={`measurement-chart-${index}`}>
          <Line
            ref={(el) => {
              if (el) {
                chartRefs.current[index] = el.chart;
              }
            }}
            data={{
              labels: data.labels,
              datasets: [dataset]
            }}
            options={options}
          />
        </div>
      ))}
    </div>
  );
};

export default MeasurementCharts;
