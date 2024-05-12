import React, { useState, useEffect } from "react";
import HeroImage from "../assets/crop calendar.jpg";
import CalendarImage from "../assets/download.png";
import { FaMapLocationDot, FaLocationDot, FaCalendar, FaLeaf } from "react-icons/fa6";
import api from "../api";

const HeroSection = (props) => {
  const [epa, setEpas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [epasForSelectedDistrict, setEpasForSelectedDistrict] = useState([]);
  const [selectedEpa, setSelectedEpa] = useState("");
  const [crops, setCrops] = useState([]);

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
    setCrops([]);
  };

  const handleEpaChange = async (epaName) => {
    setSelectedEpa(epaName);
    try {
      const response = await api.get(`/epa/crops/${epaName}`);
      setCrops(response.data[epaName] || []);
    } catch (error) {
      console.error("Error fetching crops:", error);
      setCrops([]);
    }
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
          "Explore The Rythim Of Nature With Our Harmonised Calendar,
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
            <option value="">Select Distric</option>
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
          <select className="rounded-md ml-7 w-48 h-7 pl-2">
            <option value="">Select Crop</option>
            {crops.map((crop, index) => (
              <option key={index} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div> 
      
        <div className="flex items-center ml-64 cursor-pointer hover:text-red-300">
          <label className=" text-white">View</label>
          <FaCalendar className="text-white ml-2"/>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
