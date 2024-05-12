import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import MapComponent from '../components/MapComponet';
import AboutUs from '../components/AboutUs';
import Facts from "../components/Facts";
import { Link, Route, Routes } from 'react-router-dom';
import MarketPricing from '../components/MarketPricing';
//import WeatherForecast from '../components/WeatherForecast';

const Home = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Function to handle click on district
  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
  };

  return (
    <div>
      <NavBar />
      <div className="relative">
        <HeroSection handleDistrictClick={handleDistrictClick} />
        <div className="mt-10">
          {selectedDistrict && <MapComponent showMap={true} />}
          {!selectedDistrict && <AboutUs />}
          {!selectedDistrict && <Facts />}
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/market">Market Pricing</Link>
          </li>
          {/* <li>
            <Link to="/weather">Weather Forecast</Link>
          </li> */}
        </ul>
      </nav>
      <Routes>
        <Route path="/market" element={<MarketPricing />} />
        {/* <Route path="/weather" element={<WeatherForecast />} /> */}
      </Routes>
    </div>
  );
};

export default Home;
