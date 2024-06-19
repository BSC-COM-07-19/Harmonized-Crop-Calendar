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

  const handleActivityClick = (activityName) => {
    setSelectedActivity(activityName);
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
              onClick={() => handleActivityClick(activity.activity)}
            >
              <div className="font-bold mb-2 text-xs">{activity.activity}</div>
              <div className="text-xs">Date: {activity.date}</div>
            </div>
          ))}
        </div>
      </div>
    );
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
          {cropActivities.find(activity => activity.activity === selectedActivity)?.details && (
            <div className="mt-2">
              <div><strong>Sub-Activity:</strong> {cropActivities.find(activity => activity.activity === selectedActivity).details.sub_activity}</div>
              <div><strong>Interval:</strong> {cropActivities.find(activity => activity.activity === selectedActivity).details.interval}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
