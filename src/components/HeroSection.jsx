import React, { useState, useEffect } from "react";
import HeroImage from "../assets/crop calendar.jpg";
import CalendarImage from "../assets/download.png";
import { FaMapLocationDot, FaLocationDot, FaCalendar, FaLeaf } from "react-icons/fa6";
import api from "../api";
//import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [epa, setEpas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [epasForSelectedDistrict, setEpasForSelectedDistrict] = useState([]);
  const [selectedEpa, setSelectedEpa] = useState("");
  const [selectedCrop, setSelectedCrop] = useState(""); // State to keep track of selected crop
  const [crops, setCrops] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar popup visibility
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/epa");
        setEpas(response.data);
      } catch (error) {
        console.error("Error fetching EPAs:", error);
      }
    };
    fetchData();
  }, []);

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    const epas = epa.filter((currentEpa) => currentEpa.district_name === district);
    setEpasForSelectedDistrict(epas);
    setSelectedEpa("");
    setSelectedCrop(""); // Reset selected crop when district changes
    setCrops([]);
  };

  const handleEpaChange = async (epaName) => {
    setSelectedEpa(epaName);
    try {
      const response = await api.get(`/epa/crops/${epaName}`);
      setCrops(response.data[epaName] || []);
      setSelectedCrop(""); // Reset selected crop when EPA changes
    } catch (error) {
      console.error("Error fetching crops:", error);
      setCrops([]);
    }
  };

  const handleCropChange = (crop) => {
    setSelectedCrop(crop);
  };

  const handleViewCalendar = () => {
    setShowCalendar(true);
  };

  const handleChangeMonth = (e) => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), parseInt(e.target.value)));
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date) => {
    const options = { month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getFarmingActivities = () => {
    // Example: Check for activities based on selected crop and month
    // For simplicity, assuming the activities are always the same for every crop
    const activities = {
      January: ["Planting", "Weeding"],
      February: ["Planting", "Weeding"],
      March: ["Planting", "Weeding", "Harvesting"],
      April: ["Weeding", "Harvesting"],
      May: ["Weeding", "Harvesting"],
      June: ["Weeding"],
      July: ["Weeding"],
      August: ["Weeding"],
      September: ["Weeding"],
      October: ["Weeding"],
      November: ["Weeding"],
      December: ["Weeding"]
    };
    return activities[getMonthName(selectedMonth)] || [];
  };

  return (
    <div className="relative mt-0.5 ml-0.5 mr-0.5 h-64 md:h-96 lg:h-90">
      <img src={HeroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover brightness-75" />
      <div className="absolute inset-0 flex flex-col items-center justify-center -mt-20 pointer-events-none">
        <div className="flex items-center mb-5">
          <img src={CalendarImage} alt="Small" className="w-16 md:w-24 lg:w-32 h-16 md:h-24 lg:h-32" />
          <h1 className="font-bold text-xl md:text-2xl lg:text-4xl ml-4">Crop Calendar</h1>
        </div>
        <p className="text-center text-white font-bold text-sm md:text-base lg:text-lg">
          "Explore The Rhythm Of Nature With Our Harmonized Calendar,
          Simplifying Your Agricultural Planning And Optimizing Yields" 
        </p>
      </div>
      
      <div className="absolute bottom-0 lg:-bottom-6 mx-6 lg:mx-0 lg:left-6 xl:left-12 w-full lg:w-auto h-10 shadow-lg bg-green-700 lg:py-6 lg:px-10 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center mb-2 sm:mb-0">
          <label className="font-bold text-white">District</label>
          <FaMapLocationDot className="w-8 h-8 ml-6 text-white" />
          <select
            className="rounded-md ml-7 w-48 h-7 pl-2"
            onChange={(e) => handleDistrictClick(e.target.value)}
          >
            <option value="">Select District</option>
            <option value="Zomba">Zomba</option>
            <option value="Blantyre">Blantyre</option>
            <option value="Mulanje">Mulanje</option>
            <option value="Lilongwe">Lilongwe</option>
            <option value="Rumphi">Rumphi</option>
          </select>
        </div>

        <div className="flex items-center mb-2 sm:mb-0">
          <label className="font-bold text-white ml-48">EPA</label>
          <FaLocationDot className="w-8 h-7 ml-7 text-white" />
          {epasForSelectedDistrict.length > 0 ? (
            <select
              className="rounded-md ml-7 w-48 h-7 pl-2"
              onChange={(e) => handleEpaChange(e.target.value)}
              value={selectedEpa}
            >
              <option value="">Select EPA</option>
              {epasForSelectedDistrict.map((currentEpa) => (
                <option key={currentEpa.epa_id} value={currentEpa.epa_name}>
                  {currentEpa.epa_name}
                </option>
              ))}
            </select>
          ) : (
            <p className="ml-7 text-white">EPAs for {selectedDistrict} are yet to be added.</p>
          )}
        </div>

        <div className="flex items-center">
          <label className="font-bold text-white ml-64">CROP</label>
          <FaLeaf className="w-8 h-8 ml-7 text-white" />
          <select
            className="rounded-md ml-7 w-48 h-7 pl-2"
            value={selectedCrop}
            onChange={(e) => handleCropChange(e.target.value)}
          >
            <option value="">Select Crop</option>
            {crops.map((crop, index) => (
              <option key={index} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div> 
      
        {selectedCrop && (
          <button onClick={handleViewCalendar} className="flex items-center ml-8 cursor-pointer hover:text-red-300">
            <label className="text-white">View Calendar</label>
            <FaCalendar className="text-white ml-2"/>
          </button>
        )}
      </div>

      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 w-full md:w-3/4 lg:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Selected Crop: {selectedCrop}</h2>
              <select
                className="rounded-md w-1/2 p-2"
                value={selectedMonth.getMonth()}
                onChange={handleChangeMonth}
              >
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
              <h2 className="font-bold text-lg">{getMonthName(selectedMonth)}</h2>
            </div>
            <div className="grid grid-cols-7 gap-1">
              <div className="text-center text-gray-600 font-semibold">Sun</div>
              <div className="text-center text-gray-600 font-semibold">Mon</div>
              <div className="text-center text-gray-600 font-semibold">Tue</div>
              <div className="text-center text-gray-600 font-semibold">Wed</div>
              <div className="text-center text-gray-600 font-semibold">Thu</div>
              <div className="text-center text-gray-600 font-semibold">Fri</div>
              <div className="text-center text-gray-600 font-semibold">Sat</div>
              {[...Array(getFirstDayOfMonth(selectedMonth)).keys()].map((_, index) => (
                <div key={index}></div>
              ))}
              {[...Array(getDaysInMonth(selectedMonth)).keys()].map((day, index) => (
                <div key={index} className="text-center py-2 border border-gray-200">{day + 1}</div>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">Farming Activities</h3>
              <ul className="list-disc list-inside">
                {getFarmingActivities().map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => setShowCalendar(false)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroSection;
