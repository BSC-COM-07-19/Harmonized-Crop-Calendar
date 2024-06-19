import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarPage = () => {
  const location = useLocation();
  const { selectedCrop } = location.state || {};
  const [cropActivities, setCropActivities] = useState([]);
  const [plantingDate, setPlantingDate] = useState(new Date());
  const [cropDuration, setCropDuration] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedActivityColor, setSelectedActivityColor] = useState("#FFFFFF");

  const calculateActivityDates = (activities, duration, plantingDate) => {
    const durationRange = duration.split("-").map((d) => parseInt(d));
    const minDuration = durationRange[0];
    const maxDuration = durationRange[1];
    const midpointDuration = (minDuration + maxDuration) / 2;

    return activities.map((activity, index) => {
      let activityDate = new Date(plantingDate);
      if (activity.activity !== "Land Preparation") {
        const daysToAdd = Math.round(midpointDuration / (activities.length - 1) * (index - 1));
        activityDate.setDate(plantingDate.getDate() + daysToAdd);
      }
      return {
        ...activity,
        date: activity.activity === "Land Preparation" ? `Before ${plantingDate.toLocaleDateString()}` : activityDate.toLocaleDateString(),
      };
    });
  };

  useEffect(() => {
    if (selectedCrop) {
      axios
        .get(`http://localhost:8000/activities/${selectedCrop}`)
        .then((response) => {
          const activities = response.data.activities;
          const duration = response.data.duration;
          setCropDuration(duration);

          // Calculate activity dates with planting date starting from the second activity
          const activityDates = calculateActivityDates(activities, duration, plantingDate);
          setCropActivities(activityDates);

          // Initialize recommendations for the first activity initially
          if (activities.length > 0 && activities[0].details && activities[0].details.sub_activity) {
            setRecommendations(splitSubActivities(activities[0].details.sub_activity));
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the crop activities!", error);
        });
    }
  }, [selectedCrop, plantingDate]); // Include plantingDate in dependencies

  useEffect(() => {
    if (selectedCrop && cropDuration && cropActivities.length > 0) {
      const updatedActivities = calculateActivityDates(cropActivities, cropDuration, plantingDate);
      setCropActivities(updatedActivities);
    }
  }, [plantingDate, cropDuration, selectedCrop, cropActivities]); // Include cropActivities in dependencies

  const handleActivityClick = (activityName, color) => {
    setSelectedActivity(activityName);
    setSelectedActivityColor(color);

    // Find the selected activity and set recommendations
    const selected = cropActivities.find(activity => activity.activity === activityName);
    if (selected && selected.details && selected.details.sub_activity) {
      setRecommendations(splitSubActivities(selected.details.sub_activity));
    } else {
      setRecommendations([]);
    }
  };

  const renderCalendar = () => {
    if (!selectedCrop || cropActivities.length === 0) {
      return (
        <div className="text-center text-red-500">
          No crop selected or data available for this crop.
        </div>
      );
    }

    return (
      <div className="flex justify-center overflow-x-auto">
        <div className="flex gap-4">
          {cropActivities.map((activity, index) => (
            <div
              key={index}
              className="p-4 border rounded shadow-md bg-white text-center flex-1 cursor-pointer"
              onClick={() => handleActivityClick(activity.activity, getActivityColor(activity.activity))}
              style={{ backgroundColor: getActivityColor(activity.activity) }}
            >
              <div className="font-bold mb-2 text-sm" style={{ fontSize: "1.1rem" }}>{activity.activity}</div>
              <div className="text-xs">Date: {activity.date}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const splitSubActivities = (subActivity) => {
    // Split the sub_activity string by commas and return an array of tasks
    return subActivity.split(",").map(task => task.trim());
  };

  const getActivityColor = (activityName) => {
    // Define colors for each activity based on activityName
    switch (activityName) {
      case "Land Preparation":
        return "#FFCC00"; // Yellow
      case "Transplanting or Direct Seeding":
        return "#FF5733"; // Orange
      case "Weeding":
        return "#33FF57"; // Green
      case "Top-Dressing Fertilizer Application":
        return "#3366FF"; // Blue
      case "Water Management":
        return "#FF33FF"; // Pink
      case "Pest and Disease Management":
        return "#FF3366"; // Red
      case "Harvesting":
        return "#6633FF"; // Purple
      default:
        return "#CCCCCC"; // Gray for unknown or undefined activities
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-center mt-4">{selectedCrop} Farming Calendar</h2>
      <div className="flex justify-center mb-4">
        <label className="mr-2">Select Planting Date:</label>
        <DatePicker
          selected={plantingDate}
          onChange={(date) => setPlantingDate(date)}
          dateFormat="MMMM d, yyyy"
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="flex justify-center mb-4">
        <label className="mr-2">Crop Duration:</label>
        <span>{cropDuration}</span>
      </div>
      <div className="flex justify-center">
        {renderCalendar()}
      </div>
      {selectedActivity && (
        <div className="text-center mt-4 text-lg">
          <div>Selected Activity: {selectedActivity}</div>
          {recommendations.length > 0 && (
            <div className="mt-4 mx-auto w-3/4 max-w-screen-lg border rounded-lg p-4" style={{ backgroundColor: selectedActivityColor }}>
              <div className="text-lg font-bold mb-2">Sub-Activity:</div>
              <ul className="list-disc pl-4">
                {recommendations.map((recommendation, index) => (
                  <li key={index} className="mb-1">{recommendation}</li>
                ))}
              </ul>
              <div className="text-lg font-bold mt-2">Interval: {cropActivities.find(activity => activity.activity === selectedActivity)?.details.interval}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
