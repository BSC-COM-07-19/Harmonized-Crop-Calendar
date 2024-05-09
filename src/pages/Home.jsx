
import NavBar from '../components/NavBar';
import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import MapComponet from '../components/MapComponet';
import AboutUs from '../components/AboutUs';
import Facts from "../components/Facts";

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
        {selectedDistrict && <MapComponet showMap={true} />}
          {!selectedDistrict && <AboutUs />}
          {!selectedDistrict && <Facts />}
        </div>
      </div>
    </div>
  );
}

export default Home;
