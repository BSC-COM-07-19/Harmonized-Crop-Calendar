import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import MarketPricing from './components/MarketPricing';
import WeatherApp from './components/WeatherApp';
import PestDiseaseMgt from './components/PestDiseaseMgt';
import SeasonalChart from './components/SeasonalChart';
import GroundnutsPestDisease from './components/Groundnuts';
import SoybeansPestDisease from './components/Soy';
import MaizePestDisease from './components/Maize';
import RicePestDisease from './components/Rice';
import Weathervisual from './components/Weathervisual';

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
          <Route path="/season" element={<SeasonalChart />} />
          <Route path="/rice" element={<RicePestDisease />} />
        <Route path="/maize" element={<MaizePestDisease />} />
        <Route path="/groundnuts" element={<GroundnutsPestDisease />} />
        <Route path="/soybeans" element={<SoybeansPestDisease />} />
        <Route path="/Weathervisual" element={<Weathervisual />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
