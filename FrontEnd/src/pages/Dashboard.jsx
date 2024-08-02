import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import MeasurementCharts from '../components/MeasurementCharts';
import '../Style/Estilo.css';
import appData from "../config/appData.json";

const Dashboard = () => {
  const [activeView, setActiveView] = useState('default');
  const [gasValue, setGasValue] = useState(100);
  const [temperatureValue, setTemperatureValue] = useState(100);
  const [humidityValue, setHumidityValue] = useState(100);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(`${appData.ws.protocol}://${appData.ws.host}:${appData.ws.port}`);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('new_product', (data) => {
      console.log(data);
      setGasValue(data.GasLP);
      setHumidityValue(data.Humedad);
      setTemperatureValue(data.Temperatura);
    });
    
    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'gas':
        return (
          <div className="card-container">
            <Card title="Gas LP" value={gasValue} unit="ppm" icon="🌫️" />
            <Card title="Temperatura" value={temperatureValue} unit="°C" icon="🌡️" />
            <Card title="Humedad" value={humidityValue} unit="%" icon="💧" />
          </div>
        );
      case 'humo':
        return (
          <div className="chart-section">
            <PieChart gasValue={gasValue} temperatureValue={temperatureValue} humidityValue={humidityValue} />
          </div>
        );
      case 'humedad':
        return (
          <div className="chart-section">
            <BarChart gasValue={gasValue} temperatureValue={temperatureValue} humidityValue={humidityValue} />
          </div>
        );
      case 'temperatura':
        return (
          <div className="chart-section">
            <MeasurementCharts />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar setActiveView={setActiveView} />
      <div className="main-content">
        <div className="dashboard-main">
          {activeView !== 'default' && (
            <h1 className="page-title">Estadísticas Generales</h1>
          )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
