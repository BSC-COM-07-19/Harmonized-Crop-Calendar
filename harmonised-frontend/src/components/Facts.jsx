
/**
 * AboutUs component for displaying information about the Crop Calendar initiative.
 *
 * This component provides a section with animated text and an image that describes the goals and mission
 * of the Crop Calendar. It uses animations from the 'react-awesome-reveal' library for a more engaging presentation.
 *
 * Usage:
 * - This component is part of a larger application focused on agricultural management and education.
 */

import React from "react";
import AboutUsImage from "../assets/istockphoto-1126541751-612x612.jpg";
import { Fade } from "react-awesome-reveal"; // Importing animation component

const AboutUs = () => {
  return (
      <div className="flex justify-between items-center p-4 mr-10">
        <div className="text-left">
          {/* Section containing text content */}
          <div className="ml-10 my-4">
            <hr className="border-t border-gray-300 mb-10" />
            {/* Animated heading */}
            <Fade bottom>
              <h2 className="text-2xl font-bold mb-4 text-center">FACTS</h2>
            </Fade>
            {/* Animated paragraph */}
            <Fade bottom>
              <p className="text-lg">
                Crop Calendar provides comprehensive guidance and detailed
                insights into optimal planting, harvesting, and efficient
                management practices. Our mission is to empower farmers and
                gardeners by equipping them with essential knowledge to achieve
                greater success in crop production and agricultural endeavors.
              </p>
            </Fade>
            <hr className="border-t border-gray-300 mt-16" />
          </div>
        </div>
        <div>
          {/* Section containing the image */}
          <Fade right>
            <img
                src={AboutUsImage}
                alt="About Us"
                className="h-auto w-full mr-9" // Styling for the image
            />
          </Fade>
        </div>
      </div>
  );
};

export default AboutUs;
