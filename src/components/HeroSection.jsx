import React, { useState, useEffect } from "react";
import HeroImage from "../assets/crop calendar.jpg";
import CalendarImage from "../assets/download.png";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar, FaLeaf } from "react-icons/fa"; // replace with your small image path
import "../App.css";

const HeroSection = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      setOpenMenu(false); // Close the menu when resizing
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative mt-0.5 ml-0.5 mr-0.5 h-64 md:h-96 lg:h-90">
      <img src={HeroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover brightness-75" />
      <div className="absolute inset-0 flex flex-col items-center justify-center -mt-20 pointer-events-none">
        <div className="flex items-center mb-5">
          <img src={CalendarImage} alt="Small" className="w-16 md:w-24 lg:w-32 h-16 md:h-24 lg:h-32" />
          <h1 className="font-bold text-xl md:text-2xl lg:text-4xl ml-4">Crop Calendar</h1>
        </div>
        <p className="text-center text-white font-bold text-sm md:text-base lg:text-lg">
          "Explore The Rhythm Of Nature With Our Harmonised Calendar,
          Simplifying Your Agricultural Planning And Optimizing Yields"
        </p>
      </div>

      <div className="absolute bottom-0 lg:-bottom-6 mx-6 lg:mx-0 lg:left-32 xl:left-50 w-full lg:w-auto h-10 shadow-lg lg:shadow-none bg-green-700 lg:py-6 lg:px-10 py-4 px-6 flex flex-col lg:flex-row items-center justify-between">
        {isSmallScreen ? (
          <div className="flex items-center cursor-pointer hover:text-red-300" onClick={() => setOpenMenu(!openMenu)}>
            <label className="font-bold text-white lg:mr-6"></label>
            <div className="h-6 w-6 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </div>
          </div>
        ) : (
          <>
            <Dropdown label="District" icon={<FaMapLocationDot />} options={["Zomba", "Blantyre", "Mulanje", "Lilongwe", "Rumphi"]} handleSelection={props.handleDistrictClick} isSmallScreen={isSmallScreen} />
            <Dropdown label="EPA" icon={<FaLocationDot />} options={["Malosa", "Thondwe", "Msondole", "Dzaona", "Chingale", "Mpokwa", "Ngwelero"]} handleSelection={props.handleEPAClick} isSmallScreen={isSmallScreen} />
            <Dropdown label="CROP" icon={<FaLeaf />} options={["Maize", "Soya Beans", "Rice", "Groundnuts", "Tomatoes"]} handleSelection={props.handleCropClick} isSmallScreen={isSmallScreen} />
            <div className="flex items-center cursor-pointer hover:text-red-300">
              <label className="font-bold text-white lg:mr-6">View</label>
              <FaCalendar className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Dropdown = ({ label, icon, options, handleSelection, isSmallScreen }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row items-center mb-2 sm:mb-0">
      <label className="font-bold text-white lg:mr-6">{label}</label>
      {icon}
      <div className="relative">
        <button onClick={() => setOpen(!open)} className="rounded-md lg:ml-7 lg:mr-6 w-full lg:w-48 h-7 pl-2 mb-2 lg:mb-0">
          Select {label}
        </button>
        {(open || !isSmallScreen) && (
          <div className="dropdown-container">
            <select className="absolute top-8 left-0 w-full bg-white rounded-md border border-gray-300" onChange={(e) => handleSelection(e.target.value)}>
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
