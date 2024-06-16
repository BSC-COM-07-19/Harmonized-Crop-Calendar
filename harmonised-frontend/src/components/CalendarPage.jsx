import React from "react";
import { useLocation } from "react-router-dom";

const CalendarPage = () => {
  const location = useLocation();
  const { selectedCrop } = location.state;

  // Function to get farming activities based on selected crop
  const getFarmingActivities = (crop) => {
    switch (crop) {
      case "Maize":
        return [
          { month: 10, activities: ["Land Preparation"] }, // November
          { month: 11, activities: ["Planting"] }, // December
          { month: 12, activities: ["Weeding"] }, // January
          { month: 1, activities: ["Top-Dressing Fertilizer Application"] }, // February
          { month: 2, activities: ["Weeding (Second Round)"] }, // March
          { month: 3, activities: ["Pest and Disease Management"] }, // April
          { month: 4, activities: ["Pest and Disease Management"] }, // May
          { month: 5, activities: ["Harvesting"] }, // June
        ];
      default:
        return [];
    }
  };

  const cropActivities = getFarmingActivities(selectedCrop);

  // Function to generate calendar representation
  const generateCalendar = () => {
    const months = [
      "November",
      "December",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
    ];

    const calendar = months.map((month, index) => {
      const monthActivities = cropActivities.find((activity) => activity.month === index);
      let colorClass = "";
      if (monthActivities) {
        if (monthActivities.activities.includes("Land Preparation")) {
          colorClass = "bg-gray-200";
        } else if (monthActivities.activities.includes("Planting")) {
          colorClass = "bg-green-200";
        } else if (monthActivities.activities.includes("Weeding")) {
          colorClass = "bg-yellow-200";
        } else if (monthActivities.activities.includes("Top-Dressing Fertilizer Application")) {
          colorClass = "bg-blue-200";
        } else if (monthActivities.activities.includes("Weeding (Second Round)")) {
          colorClass = "bg-yellow-300";
        } else if (monthActivities.activities.includes("Pest and Disease Management")) {
          colorClass = "bg-red-200";
        } else if (monthActivities.activities.includes("Harvesting")) {
          colorClass = "bg-purple-200";
        }
      }

      return (
        <div
          key={index}
          className={`w-12 h-12 flex items-center justify-center border border-gray-300 ${colorClass}`}
        >
          {month.slice(0, 3)}
        </div>
      );
    });

    return calendar;
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">{`${selectedCrop} Crop Calendar`}</h1>
      <div className="flex flex-wrap">
        {generateCalendar()}
      </div>
      <div className="mt-4">
        <h2 className="text-sm font-bold mb-2">Color Key:</h2>
        <ul className="flex">
          <li className="flex items-center mr-4">
            <div className="w-4 h-4 bg-gray-200 mr-2"></div>
            Land Preparation
          </li>
          <li className="flex items-center mr-4">
            <div className="w-4 h-4 bg-green-200 mr-2"></div>
            Planting
          </li>
          <li className="flex items-center mr-4">
            <div className="w-4 h-4 bg-yellow-200 mr-2"></div>
            Weeding
          </li>
          <li className="flex items-center mr-4">
            <div className="w-4 h-4 bg-blue-200 mr-2"></div>
            Fertilizer Application
          </li>
          <li className="flex items-center mr-4">
            <div className="w-4 h-4 bg-yellow-300 mr-2"></div>
            Second Round Weeding
          </li>
          <li className="flex items-center mr-4">
            <div className="w-4 h-4 bg-red-200 mr-2"></div>
            Pest Control
          </li>
          <li className="flex items-center">
            <div className="w-4 h-4 bg-purple-200 mr-2"></div>
            Harvesting
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CalendarPage;
