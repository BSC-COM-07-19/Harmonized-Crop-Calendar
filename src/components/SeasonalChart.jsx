<<<<<<< HEAD
import React, { useState } from 'react';
import logoImage from '../assets/download.jpg'; // Adjust the path accordingly
 // Import the updated CSS file

const SeasonalChart = () => {
  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL',
    'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
=======
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import TransparentLogo from '../assets/download.png'; // Adjust the path based on your file structure

const SeasonalChart = () => {
  const navigate = useNavigate();

  const handleCropSelection = (event) => {
    const selectedCrop = event.target.value;
    if (selectedCrop) {
      navigate(`/${selectedCrop}`);
    }
  };

  const data = [
    {
      name: 'Corn, sweet (Low Altitude)',
      imageUrl: TransparentLogo,
      sowing: { APR: 1, MAY: 1, JUN: 1 },
      harvesting: { JUL: 1, AUG: 1, SEP: 1 }
    },
    {
      name: 'Corn, sweet (Medium Altitude)',
      imageUrl: TransparentLogo,
      sowing: { APR: 1, MAY: 1, JUN: 1 },
      harvesting: { NOV: 1, DEC: 1 }
    }
>>>>>>> b039f05fad7a4ea6d8037817fc79a81a757f67c3
  ];

  const [hoveredColumn, setHoveredColumn] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredColumn(index);
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
  };

  return (
<<<<<<< HEAD
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
=======
    <div>
      <h1>Seasonal Calendar</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="cropSelect">Pest and Disease Management:</label>
        <select id="cropSelect" onChange={handleCropSelection} defaultValue="">
          <option value="" disabled>Select a crop</option>
          <option value="maize">Maize</option>
          <option value="Rice">Rice</option>
          <option value="groundnuts">Groundnuts</option>
          <option value="soybeans">Soy Beans</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 70, bottom: 20 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="category" dataKey="month" orientation="top" />
          <YAxis type="number" tick={<CustomYAxisTick />} tickCount={data.length} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {data.map(activity => (
            <React.Fragment key={activity.name}>
              <Bar dataKey={activity.name + '_sowing'} stackId="a" fill="#8884d8" />
              <Bar dataKey={activity.name + '_harvesting'} stackId="a" fill="#82ca9d" />
            </React.Fragment>
>>>>>>> b039f05fad7a4ea6d8037817fc79a81a757f67c3
          ))}
        </div>
        <div className="row">
          <div className="cell">MAIZE</div>
          {months.map((_, index) => (
            <div
              key={index}
              className={`cell ${hoveredColumn === index ? 'cell-hover' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Replace this with your data */}
            </div>
          ))}
        </div>
      </div>

      {/* Add a section for the buttons */}
      <div className="button-container">
        <button className="button">PEST/DISEAE CONTROL</button>
        <button className="button">ACTIVITIES</button>
      </div>
    </div>
  );
};

export default SeasonalChart;
