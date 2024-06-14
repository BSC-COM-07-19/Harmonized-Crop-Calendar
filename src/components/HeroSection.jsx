import React, { useState, useEffect } from "react";
import HeroImage from "../assets/crop calendar.jpg";
import CalendarImage from "../assets/download.png";
import { FaMapLocationDot, FaCalendar, FaLeaf } from "react-icons/fa6";
import api from "../api";

const HeroSection = () => {
  const [epas, setEpas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [recommendedCrop, setRecommendedCrop] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
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

  const handleDistrictClick = async (district) => {
    setSelectedDistrict(district);
    try {
      const response = await api.get(`/epa/crops/${district}`);
      setRecommendedCrop(response.data.recommendedCrop || "No crop recommended");
    } catch (error) {
      console.error("Error fetching recommended crop:", error);
      setRecommendedCrop("No crop recommended");
    }
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
          <h1 className="font-bold text-xl md:text-2xl lg:text-4xl ml-4 text-center md:text-left">Crop Calendar</h1>
        </div>
        <p className="text-center text-white font-bold text-sm md:text-base lg:text-lg">
          "Explore The Rhythm Of Nature With Our Harmonized Calendar,
          Simplifying Your Agricultural Planning And Optimizing Yields"
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 mx-6 lg:mx-0 lg:left-6 xl:left-12 w-full lg:w-auto h-auto shadow-lg bg-green-700 lg:py-6 lg:px-10 py-4 px-6 flex flex-wrap lg:flex-nowrap items-center justify-between">
        <div className="flex flex-wrap lg:flex-nowrap items-center mb-2 lg:mb-0">
          <label className="font-bold text-white lg:mr-4 mb-2 lg:mb-0">District</label>
          <FaMapLocationDot className="w-8 h-8 text-white mb-2 lg:mb-0" />
          <select
            className="rounded-md lg:ml-2 w-full lg:w-auto h-7 pl-2"
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

        <div className="flex flex-wrap lg:flex-nowrap items-center mt-2 lg:mt-0 lg:ml-4">
          <label className="font-bold text-white mb-2 lg:mb-0">CROP</label>
          <FaLeaf className="w-8 h-8 text-white ml-2 lg:ml-0 mb-2 lg:mb-0" />
          <div className="text-white font-bold ml-2 lg:ml-2">
            {recommendedCrop}
          </div>
        </div>

        {recommendedCrop && recommendedCrop !== "No crop recommended" && (
          <button onClick={handleViewCalendar} className="flex items-center mt-2 lg:mt-0 ml-2 lg:ml-4 cursor-pointer hover:text-red-300">
            <label className="text-white">View Calendar</label>
            <FaCalendar className="text-white ml-2" />
          </button>
        )}
      </div>

      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 w-full md:w-3/4 lg:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Selected Crop: {recommendedCrop}</h2>
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
