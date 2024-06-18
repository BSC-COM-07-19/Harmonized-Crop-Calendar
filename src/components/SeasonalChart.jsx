import React, { useState } from 'react';
import logoImage from '../assets/crop calendar.jpg'; // Adjust the path accordingly
import MaizePestDisease from './Maize'; // Import the MaizePestDisease component
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const SeasonalChart = () => {
  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL',
    'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const [selectedDate, setSelectedDate] = useState(null); // State to track the selected date
  const [showPestDisease, setShowPestDisease] = useState(false); // State to toggle pest/disease control dropdown

  const handleDateChange = (date) => {
    setSelectedDate(date); // Set the selected date
  };

  const togglePestDisease = () => {
    setShowPestDisease(!showPestDisease); // Toggle the state to show/hide pest/disease control dropdown
  };

  const isIrrigationRecommended = (monthIndex) => {
    // Check if the month index corresponds to May (4) to October (9)
    return monthIndex >= 4 && monthIndex <= 9;
  };

  return (
    <div className="seasonal-chart-container">
      <div className="calendar-header">
        MAIZE CROP CALENDAR
      </div>
      
      <div className="date-picker-container">
        <div className="date-picker-label">SELECT PLANTING DATE:</div>
        <div className="react-datepicker-wrapper">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select sowing date"
            className="react-datepicker__input-container"
          />
        </div>
      </div>

      <div className="chart-table-container">
        <div className="seasonal-chart">
          <div className="row top-row">
            <div className="cell top-cell"></div>
            {months.map((month, index) => (
              <div
                key={index}
                className="cell top-cell"
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
                className={`cell ${selectedDate && selectedDate.getMonth() === index ? 'selected-month' : ''}`}
              >
                {selectedDate && selectedDate.getMonth() === index ? 'sowing' : ''}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedDate && isIrrigationRecommended(selectedDate.getMonth()) && (
        <div className="irrigation-text">
          <p className="recommended-text">Irrigation recommended for this month.</p>
        </div>
      )}

      <div className="button-container">
        <button className="button" onClick={togglePestDisease}>
          PEST/DISEASE CONTROL {showPestDisease ? '▲' : '▼'}
        </button>
        <button className="button">ACTIVITIES</button>
      </div>

      {showPestDisease && (
        <div className="dropdown-container">
          <MaizePestDisease />
        </div>
      )}
    </div>
  );
};

export default SeasonalChart;
