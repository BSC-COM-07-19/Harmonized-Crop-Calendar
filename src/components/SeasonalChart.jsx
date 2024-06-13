import React from 'react';
//import './SeasonalChart.css';

const SeasonalChart = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="seasonal-chart-container">
      <div className="seasonal-chart">
        <div className="row">
          <div className="cell"></div>
          {months.map((month, index) => (
            <div key={index} className="cell">
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
