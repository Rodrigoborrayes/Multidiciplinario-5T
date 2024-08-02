// import React, { useEffect, useRef, useState } from 'react';
// import Chart from 'chart.js/auto';
// import io from 'socket.io-client';
// import appData from "../config/appData.json";


// const PieChart = ((props)) => {
//   const chartRef = useRef(null);
//   const pieChart = useRef(null);
//   const [data, setData] = useState([19, 3, 5]);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext('2d');
    
    
//     const socket = io(
//       `${appData.ws.protocol}://${appData.ws.host}:${appData.ws.port}`
//     );

//     if (!pieChart.current) {
//       pieChart.current = new Chart(ctx, {
//         type: 'pie',
//         data: {
//           labels: ['Gas LP', 'Humedad', 'Temperatura'],
//           datasets: [{
//             label: '# of Votes',
//             data: data,
//             backgroundColor: [
//               'rgba(255, 99, 132, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(255, 206, 86, 0.2)',
//               'rgba(75, 192, 192, 0.2)'
//             ],
//             borderColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 1)',
//               'rgba(255, 206, 86, 1)',
//               'rgba(75, 192, 192, 1)'
//             ],
//             borderWidth: 1
//           }]
//         }
//       });
//     }

//     socket.on('pieChartData', (newData) => {
//       if (pieChart.current) {
//         pieChart.current.data.datasets[0].data = newData;
//         pieChart.current.update();
//         setData(newData);
//       }
//     });

//     socket.on("disconect", ()=>{
//       console.log("disconected from Socket.io")
//     })

//     return () => {
//       if (pieChart.current) {
//         pieChart.current.destroy();
//         pieChart.current = null;
//       }
//       socket.off('pieChartData');
//       socket.disconnect();
//     };
//   }, [data]);

//   console.log("Aqui estaaa -",data)

//   return (
//     <div className="chart-section">
//       <div className="canvas-container">
//         <canvas ref={chartRef}></canvas>
//       </div>
//     </div>
//   );
// };

// export default PieChart;

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ gasValue, temperatureValue, humidityValue }) => {
  const chartRef = useRef(null);
  const pieChart = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (!pieChart.current) {
      pieChart.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Gas LP', 'Humedad', 'Temperatura'],
          datasets: [{
            label: '# of Votes',
            data: [gasValue, humidityValue, temperatureValue],
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
        }
      });
    } else {
      pieChart.current.data.datasets[0].data = [gasValue, humidityValue, temperatureValue];
      pieChart.current.update();
    }

    return () => {
      if (pieChart.current) {
        pieChart.current.destroy();
        pieChart.current = null;
      }
    };
  }, [gasValue, temperatureValue, humidityValue]);

  return (
    <div className="chart-section">
      <div className="canvas-container">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default PieChart;

