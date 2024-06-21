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

const seedlingProcurementData = [
  {
    crop: 'Maize',
    type: 'SC529-Mbidzi',
    durationDays: 115,
    harvestPerBag: 80,
    seedPerAcre: 10,
    price: 800
  },
  {
    crop: 'Maize',
    type: 'SC301-Kalulu',
    durationDays: 80,
    harvestPerBag: 50,
    seedPerAcre: 10,
    price: 750
  },
  {
    crop: 'Soya',
    type: 'Serenade',
    durationDays: 120,
    harvestPerBag: 24,
    seedPerAcre: 40,
    price: 600
  },
  {
    crop: 'Rice',
    type: 'Kilombero',
    durationDays: 100,
    harvestPerBag: 36,
    seedPerAcre: 12,
    price: 800
  },
  {
    crop: 'Rice',
    type: 'Nerica',
    durationDays: 100,
    harvestPerBag: 32,
    seedPerAcre: 12,
    price: 700
  }
];

const fertilizationData = [
  { name: 'Urea', quantity: '50kg', price: 65000 },
  { name: 'NPK', quantity: '50kg', price: 64000 },
  { name: 'CAN', quantity: '50kg', price: 70000 },
  { name: 'MOP', quantity: '1 litre', price: 35000 },
  { name: 'Booster', quantity: '50kg', price: 63000 },
  { name: 'D-Compound', quantity: '50kg', price: 59000 }
];

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

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
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

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

  const openModal = (mainActivity) => {
    if (mainActivity === 'seedAndSeedlingProcurement') {
      setModalContent(
        <>
          <table>
            <thead>
              <tr>
                <th>Crop</th>
                <th>Type</th>
                <th>Duration (days)</th>
                <th>Harvest per Bag</th>
                <th>Seed per Acre</th>
                <th>Price (MK)</th>
              </tr>
            </thead>
            <tbody>
              {seedlingProcurementData.map((item, index) => (
                <tr key={index}>
                  <td>{item.crop}</td>
                  <td>{item.type}</td>
                  <td>{item.durationDays}</td>
                  <td>{item.harvestPerBag}</td>
                  <td>{item.seedPerAcre}</td>
                  <td className="clickable-price" onClick={() => addToBudget(item)}>
                    {item.price}
                    {budget.seedAndSeedlingProcurement[item.type] && <span className="remove-icon" onClick={(e) => removeFromBudget(item, e)}> - </span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
      setModalTitle('Seed and Seedling Procurement Details');
    } else if (mainActivity === 'fertilization') {
      setModalContent(
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price (MK)</th>
              </tr>
            </thead>
            <tbody>
              {fertilizationData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td className="clickable-price" onClick={() => addToBudget(item)}>
                    {item.price}
                    {budget.fertilization[item.name] && <span className="remove-icon" onClick={(e) => removeFromBudget(item, e)}> - </span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
      setModalTitle('Fertilization Details');
    } else if (mainActivity === 'pestAndDiseaseManagement') {
      setModalContent(activities[mainActivity].map((item, index) => <li key={index}>{item}</li>));
      setModalTitle(mainActivity.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
    }
    setShowModal(true);
  };

  const addToBudget = (selectedItem) => {
    if (selectedItem.price === 0) return; // Ignore if price is zero

    const mainActivity = selectedItem.type in budget.seedAndSeedlingProcurement ? 'seedAndSeedlingProcurement' : 'fertilization';
    const cost = selectedItem.price;

    setBudget(prevBudget => ({
      ...prevBudget,
      [mainActivity]: {
        ...prevBudget[mainActivity],
        [selectedItem.type]: (prevBudget[mainActivity][selectedItem.type] || 0) + cost
      }
    }));
  };

  const removeFromBudget = (selectedItem, e) => {
    e.stopPropagation();

    const mainActivity = selectedItem.type in budget.seedAndSeedlingProcurement ? 'seedAndSeedlingProcurement' : 'fertilization';

    setBudget(prevBudget => {
      const newBudget = { ...prevBudget };
      delete newBudget[mainActivity][selectedItem.type];
      return newBudget;
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const totalBudget = Object.values(budget).reduce((mainTotal, subActivities) => {
    return mainTotal + Object.values(subActivities).reduce((subTotal, cost) => subTotal + cost, 0);
  }, 0);

  return (
    <div className="CropCalendarBudget">
      <h1>Crop Calendar and Budget Evaluation</h1>

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
                {['seedAndSeedlingProcurement', 'fertilization', 'pestAndDiseaseManagement'].includes(mainActivity) && (
                  <i className="fas fa-plus add-icon" onClick={() => openModal(mainActivity)}></i>
                )}
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
        <h3 className="total-budget">Total Budget: MKW{totalBudget}</h3>
      </section>

      {showModal && (
        <Modal title={modalTitle} onClose={closeModal}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
}

export default Weathervisual;
