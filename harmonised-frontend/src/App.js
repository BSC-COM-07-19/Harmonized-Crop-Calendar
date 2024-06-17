import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import MarketPricing from './components/MarketPricing';
import WeatherApp from './components/WeatherApp';
import PestDiseaseMgt from './components/PestDiseaseMgt';
import CalendarPage from "./components/CalendarPage"; // Import the new calendar page component

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<MarketPricing />} />
          <Route path="/weather" element={<WeatherApp />} />
          <Route path="/pests" element={<PestDiseaseMgt />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
