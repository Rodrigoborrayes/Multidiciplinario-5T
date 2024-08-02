import React from 'react';

const Card = ({ dashboardTitle, title, value, unit, icon }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="dashboard-title">{dashboardTitle}</h2>
      </div>
      <div className="card-icon">{icon}</div>
      <div className="card-title">{title}</div>
      <div className="card-value">
        {value}
        <span className="card-unit">{unit}</span>
      </div>
    </div>
  );
};

export default Card;
