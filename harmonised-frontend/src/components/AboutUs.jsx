import React from "react"
import AboutUsImage from "../assets/istockphoto-1126541751-612x612.jpg"

const AboutUs = () => {
  return (
    <div className="flex justify-between items-center p-4 mr-10">
      <div className="text-left">
        {/* Inside your component */}
        <div className=" ml-10 my-4">
          <hr className="border-t border-gray-300 mb-10" />
          <h2 className="text-2xl font-bold mb-4 text-center">ABOUT US</h2>
          <p className="text-lg">Crop Calendar, passionate about empowering farmers and
            gardeners with the knowledge they need to optimize their crop
            production. Our team of experts has curated accurate and timely information 
            on planting, harvesting, and management practices to help you succeed
          </p>
          <hr className="border-t border-gray-300 mt-16" />
        </div>
      </div>
      <div>
        {/* Image goes here */}
        <img src={AboutUsImage} alt="About Us" 
        className="h-auto max-h-full w-full mr-9" />
      </div>
    </div>
  )
}

export default AboutUs;
