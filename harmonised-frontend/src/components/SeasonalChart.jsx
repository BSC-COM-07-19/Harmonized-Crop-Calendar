import React, { useState } from 'react';
import logoImage from '../assets/crop calendar.jpg'; // Adjust the path accordingly
import MaizePestDisease from './Maize'; // Import the MaizePestDisease component

const SeasonalChart = () => {
  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL',
    'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [showPestDisease, setShowPestDisease] = useState(false);
  const [showType, setShowType] = useState('pest');

  const handleMouseEnter = (index) => {
    setHoveredColumn(index);
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
  };

  const togglePestDisease = () => {
    setShowPestDisease(!showPestDisease);
    setShowType('pest'); // Default to showing pests
  };

  const handleCellClick = (month) => {
    alert(`You clicked on ${month}`);
  };

  const handleToggleType = () => {
    setShowType((prevType) => (prevType === 'pest' ? 'disease' : 'pest'));
  };

  return (
    <div className="seasonal-chart-container">
      <div className="calendar-header">
        MAIZE CROP CALENDAR
      </div>
      
      <div className="image-container">
        <img src={logoImage} alt="Seasonal Image" className="seasonal-image" />
      </div>

      <div className="seasonal-chart">
        <div className="row top-row">
          <div className="cell top-cell"></div>
          {months.map((month, index) => (
            <div
              key={index}
              className={`cell top-cell ${hoveredColumn === index ? 'cell-hover' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {month}
            </div>
          ))}
        </div>
        <div className="row">
          <div className="cell">MAIZE</div>
          {months.map((month, index) => (
            <div
              key={index}
              className={`cell ${hoveredColumn === index ? 'cell-hover' : ''} ${['NOV', 'DEC'].includes(month) ? 'sowing-cell' : ''} ${['APR', 'MAY'].includes(month) ? 'sowing-cell-apr-may' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCellClick(month)}
            >
              {['NOV', 'DEC', 'APR', 'MAY'].includes(month) ? 'sowing' : ''}
            </div>
          ))}
        </div>
      </div>

      <div className="button-container">
        <button className="button" onClick={togglePestDisease}>
          PEST/DISEASE CONTROL {showPestDisease ? '▲' : '▼'}
        </button>
        <button className="button">ACTIVITIES</button>
      </div>

      {showPestDisease && (
        <div className="dropdown-container">
          <button className="button" onClick={handleToggleType}>
            {showType === 'pest' ? 'Show Diseases' : 'Show Pests'}
          </button>
          <MaizePestDisease type={showType} />
        </div>
      )}
    </div>
  );
};

export default SeasonalChart;
