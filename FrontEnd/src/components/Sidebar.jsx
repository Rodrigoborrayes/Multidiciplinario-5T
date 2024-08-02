import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTable, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "../Style/Estilo.css";

const Sidebar = ({ setActiveView }) => {
  const [isAccessOpen, setAccessOpen] = useState(false);
  const [isTablesOpen, setTablesOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/ ');
  };

  return (
    <div className="sidebar">
      <div className="dashboard-title">DASHBOARD</div>

      <div className="menu-item" onClick={() => setAccessOpen(!isAccessOpen)}>
        <FontAwesomeIcon icon={faUser} /> Usuario
      </div>
      {isAccessOpen && (
        <div className="submenu">
          <div className="submenu-item">Usuario: Rodrigo</div>
          <div className="submenu-item">Correo: rodrighobf437@gmail.com</div>
        </div>
      )}

      <div className="menu-item" onClick={() => setTablesOpen(!isTablesOpen)}>
        <FontAwesomeIcon icon={faTable} /> Menú 
      </div>
      {isTablesOpen && (
        <div className="submenu">
          <button className="submenu-item" onClick={() => setActiveView('humedad')}> Gráfica de Barra</button>
          <button className="submenu-item" onClick={() => setActiveView('gas')}>Cards</button>
          <button className="submenu-item" onClick={() => setActiveView('temperatura')}> Gráfica de Puntos</button>
          <button className="submenu-item" onClick={() => setActiveView('humo')}>Gráfica de Pastel</button>
        </div>
      )}

      <div className="menu-item" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
      </div>
    </div>
  );
};

export default Sidebar;
