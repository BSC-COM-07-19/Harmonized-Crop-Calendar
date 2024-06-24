import React, { useState } from 'react';

/**
 * Form component to get weather information based on district and crop inputs.
 * @param {Object} props - The props object containing the getWeather function.
 * @param {Function} props.getWeather - Function to fetch weather information based on district and crop.
 * @returns {JSX.Element} JSX element representing the form.
 */
const Form = ({ getWeather }) => {
  // State to hold the value of the district input
  const [district, setDistrict] = useState('');

  // State to hold the value of the crop input
  const [crop, setCrop] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    getWeather(district, crop); // Call the getWeather function with the input values
  }

  return (
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center justify-center">
          {/* Input for the district name */}
          <input
              type="text"
              name="district"
              placeholder="District..."
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="border border-gray-300 rounded py-2 px-4 mr-2"
          />

          {/* Input for the crop name */}
          <input
              type="text"
              name="crop"
              placeholder="Crop..."
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="border border-gray-300 rounded py-2 px-4 mr-2"
          />

          {/* Submit button */}
          <button
              type="submit"
              className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Calendar
          </button>
        </div>
      </form>
  );
};

export default Form;
