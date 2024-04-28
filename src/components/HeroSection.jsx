import React from "react"
import HeroImage from "../assets/crop calendar.jpg"
import CalendarImage from "../assets/download.png"
import {FaLocationArrow, FaCalendar} from "react-icons/fa" // replace with your small image path

const HeroSection = () => {
  return (
    <div className="relative mt-0.5 ml-0.5 mr-0.5 h-64 md:h-96 lg:h-90">
      <img src={HeroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
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
      <div className="absolute -bottom-6 mx-6 w-auto h-10 shadow-lg bg-green-700 py-6 px-10 flex items-center justify-between">
        <label className="font-bold text-white">District</label>
        <img src={FaLocationArrow} alt="Small" className="w-10 h-10 ml-10" /> {/* replace with your small image path */}
        <select className="rounded-md ml-10 w-48 h-7 pl-2">
          <option value="district1">Zomba</option>
          <option value="district2">Blantyre</option>
          <option value="district2">Mulanje</option>
          <option value="district2">Lilongwe</option>
          <option value="district2">Rumphi</option>
          {/* Add more options as needed */}
        </select>
        <label className="font-bold text-white ml-48">CROP</label>
        <img src={FaLocationArrow} alt="Small" className="w-10 h-10 ml-10" /> {/* replace with your small image path */}
        <select className="rounded-md ml-10 w-48 h-7 pl-2">
          <option value="district1">Maize</option>
          <option value="district2">Soya Beans</option>
          <option value="district2">Rice</option>
          <option value="district2">Grounddnuts</option>
          <option value="district2">Tomatoes</option>
          {/* Add more options as needed */}
        </select>
        <div className="flex items-center ml-64 cursor-pointer hover:text-red-300">
          <label className=" text-white">View</label>
          <FaCalendar className="text-white ml-2"/>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
