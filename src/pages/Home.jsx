import React, { useState } from 'react';
// import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import MapComponent from '../components/MapComponet';
import AboutUs from '../components/AboutUs';
import Facts from "../components/Facts";
import { Link, Route, Routes } from 'react-router-dom';
import MarketPricing from '../components/MarketPricing';
import ActivityCalendar from '../components/ActivityCalendar';
import WeatherApp from '../components/WeatherApp';

const Home = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Function to handle click on district
  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
  };

  return (
    <div>
      <div className="relative">
        <HeroSection handleDistrictClick={handleDistrictClick} />
        <div className="mt-10">
          {selectedDistrict && <MapComponent showMap={true} />}
          {!selectedDistrict && <AboutUs />}
          {!selectedDistrict && <Facts />}
        </div>
      </div>
      <Routes>
        <Route path="/market" element={<MarketPricing />} />
        <Route path="/weather" element={<WeatherApp />} />
        <Route path="/calendar" element={<ActivityCalendar />} />
      </Routes>
    </div>
  );
};

export default Home;
