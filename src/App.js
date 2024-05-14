import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import MarketPricing from './components/MarketPricing';
import ActivityCalendar from './components/ActivityCalendar';
import WeatherApp from './components/WeatherApp';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<MarketPricing />} />
          <Route path="/weather" element={<WeatherApp />} />
          {/* <Route path="/calendar" element={<ActivityCalendar />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
