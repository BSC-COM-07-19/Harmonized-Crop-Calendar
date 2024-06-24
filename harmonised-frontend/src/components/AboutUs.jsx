/**
 * AboutUs component displaying information about a sustainable farming initiative.
 *
 * This component provides an overview of the initiative's commitment to promoting sustainable farming practices and
 * environmental stewardship. It features a textual description and an accompanying image.
 *
 * Usage:
 * - This component can be used as a part of an informational page to provide users with insights into the goals and
 *   mission of the sustainable farming initiative.
 */

import React from "react";
import AboutUsImage from "../assets/istockphoto-1126541751-612x612.jpg";

// Component displaying information about a sustainable farming initiative
const AboutUs = () => {
    return (
        <div className="flex justify-between items-center p-4 mr-10">
            <div className="text-left">
                {/* Section containing textual content */}
                <div className=" ml-10 my-4">

                    <hr className="border-t border-gray-300 mb-10" />
                    <h2 className="text-2xl font-bold mb-4 text-center">ABOUT</h2>
                    {/* Paragraph describing the initiative */}
                    <p className="text-lg">
                        We are committed to promoting sustainable farming practices and environmental stewardship.
                        Through collaboration with experts in agronomy and agricultural sciences,
                        we curate comprehensive guides and resources to ensure farmers can make informed decisions and achieve sustainable yields.
                    </p>
                    <hr className="border-t border-gray-300 mt-16" />
                </div>
            </div>
            <div>
                {/* Image section */}
                <img src={AboutUsImage} alt="About Us" className="h-auto max-h-full w-full mr-9" />
            </div>
        </div>
    );
};

export default AboutUs;
