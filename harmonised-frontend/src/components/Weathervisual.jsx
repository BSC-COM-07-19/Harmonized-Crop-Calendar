import React, { useState, useEffect } from 'react';
import { getCropRecommendations, getMarketPrices, getWeatherForecast } from '../api'; // Mock API calls

const activities = {
  landPreparation: ['Soil testing', 'Plowing/tilling', 'Levelling', 'Irrigation setup'],
  seedAndSeedlingProcurement: ['Purchasing seeds or seedlings', 'Seed treatment'],
  planting: ['Labor for planting', 'Machinery rental/purchase', 'Fuel and maintenance for machinery'],
  fertilization: ['Purchase of fertilizers', 'Labor for fertilizer application', 'Equipment for fertilizer application'],
  irrigation: ['Installation of irrigation systems', 'Water costs', 'Maintenance of irrigation systems'],
  weedManagement: ['Herbicides', 'Manual weeding labor', 'Weeding equipment'],
  pestAndDiseaseManagement: ['Insecticides and fungicides', 'Pest control equipment', 'Labor for pest and disease control'],
  cropMonitoring: ['Labor for crop monitoring', 'Equipment for monitoring', 'Software for data analysis'],
  supportAndTraining: ['Extension services or consultancy fees', 'Training programs for laborers'],
  miscellaneousOperatingCosts: ['Transportation costs for inputs and labor', 'Protective gear and equipment', 'Insurance for crops and equipment'],
  harvesting: ['Labor for harvesting', 'Harvesting equipment', 'Fuel and maintenance for machinery'],
  postHarvestHandling: ['Storage facilities', 'Transportation to storage or market', 'Packaging materials', 'Processing equipment'],
  marketingAndSales: ['Market fees', 'Transportation to markets', 'Advertising and promotion costs'],
  recordKeepingAndAdministration: ['Accounting and bookkeeping services', 'Administrative labor costs', 'Office supplies and software'],
  contingencyFund: ['Allocated funds for unexpected expenses']
};

function Weathervisual() {
  const [calendar, setCalendar] = useState([
    // Add more months and activities as needed
  ]);

  const initialBudgetState = Object.keys(activities).reduce((acc, key) => {
    acc[key] = activities[key].reduce((subAcc, subKey) => {
      subAcc[subKey] = 0;
      return subAcc;
    }, {});
    return acc;
  }, {});

  const [budget, setBudget] = useState(initialBudgetState);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [marketPrices, setMarketPrices] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    getCropRecommendations().then(setRecommendations);
    getMarketPrices().then(setMarketPrices);
    getWeatherForecast().then(setWeather);
  }, []);

  const handleBudgetChange = (mainActivity, subActivity) => (e) => {
    const value = Math.max(0, Number(e.target.value)); // Restrict to non-negative values
    setBudget(prevBudget => ({
      ...prevBudget,
      [mainActivity]: {
        ...prevBudget[mainActivity],
        [subActivity]: value
      }
    }));
  };

  const toggleDropdown = (mainActivity) => {
    setOpenDropdown(prev => (prev === mainActivity ? null : mainActivity));
  };

  const totalBudget = Object.values(budget).reduce((mainTotal, subActivities) => {
    return mainTotal + Object.values(subActivities).reduce((subTotal, cost) => subTotal + cost, 0);
  }, 0);

  return (
    <div className="CropCalendarBudget">
      <h1>Budget Evaluation</h1>
      
      <section>
        <h2>Crop Calendar</h2>
        <ul className="calendar-list">
          {calendar.map((item, index) => (
            <li key={index} className="calendar-item">
              <span className="calendar-month">{item.month}</span>: <span className="calendar-activity">{item.activity}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Budget Evaluation</h2>
        <div className="activity-grid">
          {Object.keys(activities).map(mainActivity => (
            <div key={mainActivity} className="activity-item">
              <h3 className={`main-activity ${openDropdown === mainActivity ? 'open' : ''}`} onClick={() => toggleDropdown(mainActivity)}>
                {mainActivity.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                <i className={`fas fa-chevron-${openDropdown === mainActivity ? 'up' : 'down'} indicator`}></i>
              </h3>
              {openDropdown === mainActivity && (
                <div className="sub-activities">
                  {activities[mainActivity].map(subActivity => (
                    <div key={subActivity} className="sub-activity">
                      <label>
                        {subActivity} Cost:
                        <input 
                          type="number" 
                          value={budget[mainActivity][subActivity]} 
                          onChange={handleBudgetChange(mainActivity, subActivity)} 
                          placeholder="MK"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <h3>Total Budget: MKW{totalBudget}</h3>
      </section>

      <section>
        <h2></h2>
       
      </section>

    
    </div>
  );
}

export default Weathervisual;
