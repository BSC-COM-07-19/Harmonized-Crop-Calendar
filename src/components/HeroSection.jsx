import React from "react"
import HeroImage from "../assets/crop calendar.jpg"
import CalendarImage from "../assets/download.png"
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar, FaLeaf } from "react-icons/fa" // replace with your small image path

const HeroSection = (props) => { // Add props here
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
        <FaMapLocationDot className="w-8 h-8 ml-6 text-white" /> {/* replace with your small image path */}
       
        <select className="rounded-md ml-7 w-48 h-7 pl-2"
          onChange={(e) => props.handleDistrictClick(e.target.value)}
        >
          <option value="Zomba">Zomba</option>
          <option value="Blantyre">Blantyre</option>
          <option value="Mulanje">Mulanje</option>
          <option value="Lilongwe">Lilongwe</option>
          <option value="Rumphi">Rumphi</option>
        </select>

     <div className="flex items-center mb-2 sm:mb-0"></div>
        <label className="font-bold text-white ml-48">EPA</label>
        <FaLocationDot className="w-8 h-7 ml-7 text-white" />
        <select className="rounded-md ml-7 w-48 h-7 pl-2"
          onChange={(e) => props.handleDistrictClick(e.target.value)}
        >
          <option value="Malosa">Malosa</option>
          <option value="Thondwe">Thondwe</option>
          <option value="Msondole">Msondole</option>
          <option value="Dzaona">Dzaona</option>
          <option value="Chingale">Chingale</option>
          <option value="Mpokwa">Mpokwa</option>
          <option value="Ngwelero">Ngwelero</option>
        </select>
      </div>

     <div className="flex items-center">
        <label className="font-bold text-white ml-64">CROP</label>
        <FaLeaf className="w-8 h-8 ml-7 text-white" /> {/* replace with your small image path */}
        <select className="rounded-md ml-7 w-48 h-7 pl-2">
          <option value="district1">Maize</option>
          <option value="district2">Soya Beans</option>
          <option value="district2">Rice</option>
          <option value="district2">Grounddnuts</option>
          <option value="district2">Tomatoes</option>
          {/* Add more options as needed */} 
        </select>
      </div> 
      
        <div className="flex items-center ml-64 cursor-pointer hover:text-red-300">
          <label className=" text-white">View</label>
          <FaCalendar className="text-white ml-2"/>
        </div>
      </div>
      </div>
   
  
  )
}

export default HeroSection
