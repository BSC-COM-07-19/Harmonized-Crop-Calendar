import React from 'react';
import logoImage from '../assets/download.jpg'; // Adjust the path accordingly

const SeasonalChart = () => {
  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL',
    'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];
  

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
            <div key={index} className="cell top-cell">
              {month}
            </div>
          ))}
        </div>
        <div className="row">
          <div className="cell">MAIZE</div>
          {months.map((_, index) => (
            <div key={index} className="cell">
              {/* Replace this with your data */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonalChart;
