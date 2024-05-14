import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
const ActivityCalendar = ({ onClose, selectedCrop }) => {
    const [month, setMonth] = useState("");
    const [crop, setCrop] = useState("");
    const [activities, setActivities] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        const fetchActivities = async () => {
            if (month && selectedCrop) {
                try {
                    const response = await axios.get(`http://localhost:8000/activities/${month}/${selectedCrop}`);
                    setActivities(response.data.activities);
                    setShowCalendar(true);
                } catch (error) {
                    console.error('Error fetching activities:', error);
                }
            }
        };

        fetchActivities(); // Fetch activities when month or crop changes

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month, selectedCrop]); // Include month and crop in dependency array

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleViewCalendarClick = () => {
        setShowCalendar(true); // Show the calendar when "View Calendar" button is clicked
      };
    

    const handleCropChange = (e) => {
        setCrop(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 from-gray-800 to-gray-700">
            <div className="w-full md:w-1/2 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
                <h1 className="text-3xl mb-4 text-center text-gray-800">Crop Calendar</h1>

                {/* Title animation */}
                <div className="overflow-hidden relative mb-4">
                    <h2 className="absolute top-0 left-0 animate-marquee text-xl text-gray-700">
                        Select Crop And The Month
                    </h2>
                </div>

                {/* Month and Crop selection */}
                <div className="flex flex-col space-y-4">
                    <label htmlFor="month" className="text-lg text-gray-800">Select Month:</label>
                    <select
                        id="month"
                        value={month}
                        onChange={handleMonthChange}
                        className="w-full rounded-lg border border-gray-400 p-2"
                    >
                        <option value="">Select Month</option>
                        {Object.keys(months).map((m) => (
                            <option key={m} value={m}>{months[m]}</option>
                        ))}
                    </select>

                    <label htmlFor="crop" className="text-lg text-gray-800">Select Crop:</label>
                    <select
                        id="crop"
                        value={crop}
                        onChange={handleCropChange}
                        className="w-full rounded-lg border border-gray-400 p-2"
                    >
                        <option value="">Select Crop</option>
                        {Object.keys(crops).map((c) => (
                            <option key={c} value={c}>{crops[c]}</option>
                        ))}
                    </select>
                </div>

                {/* Selected Month Display */}
                {month && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Selected Month: {month}</h2>
                        {/* Calendar here */}
                        {/* {showCalendar && <Calendar month={month} />} */}
                        <button className="text-blue-500 underline" onClick={() => setShowCalendar(true)}>View Calendar</button>
                    </div>
                )}

                {/* Activities */}
                {activities.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Activities for {crop} in {month}</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {activities.map((activity, index) => (
                                <div key={index} className="border border-gray-300 rounded-md p-2">{activity}</div>
                            ))}
                        </div>
                    </div>
                )}
                 {/* Selected Month Display */}
      {month && showCalendar && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Selected Month: {month}</h2>
          {/* Calendar here */}
          <Calendar month={month} />
        </div>
      )}
      
      {/* Close the modal when needed */}
      <button onClick={onClose}>Close</button> {/* Call onClose function from props */}
            </div>
        </div>
    );
};

// Calendar component
const Calendar = ({ month }) => {
    // Number of days in each month
    const daysInMonth = {
        "January": 31,
        "February": 28, // Leap years not considered for simplicity
        "March": 31,
        "April": 30,
        "May": 31,
        "June": 30,
        "July": 31,
        "August": 31,
        "September": 30,
        "October": 31,
        "November": 30,
        "December": 31,
    };

    // Create an array with the corresponding number of days
    const days = Array.from({ length: daysInMonth[month] }, (_, i) => i + 1);

    return (
        <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
                <div key={day} className="border border-gray-300 rounded-md p-2 text-center">
                    {day}
                </div>
            ))}
        </div>
    );
};

const months = {
    "January": "January",
    "February": "February",
    "March": "March",
    "April": "April",
    "May": "May",
    "June": "June",
    "July": "July",
    "August": "August",
    "September": "September",
    "October": "October",
    "November": "November",
    "December": "December",
};

const crops = {
    "Maize": "Maize",
    "Beans": "Beans",
    "Rice": "Rice",
    "Soybeans": "Soybeans",
    "Tobacco": "Tobacco",
};

export default ActivityCalendar;
