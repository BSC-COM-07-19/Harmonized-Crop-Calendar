import React from "react";

/**
 * Forecast component displays a 7-day weather forecast with recommendations.
 * @param {Object} props - Component props.
 * @param {Array} props.forecast - Array of forecast data for each day.
 * @param {Array} props.recommendations - Array of recommendations for activities.
 * @returns {JSX.Element} Forecast component JSX.
 */

const Forecast = ({ forecast, recommendations }) => {
    // Array to store the names of days of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the index of the current day (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const today = new Date().getDay();

    return (
        /**
     * Render function for generating weather forecast cards.
     * @returns {JSX.Element[]} Array of weather forecast card components.
     */
        <div className="forecast mt-4 flex flex-col items-center">
            {/* Title of the component */}
            <h3 className="text-xl font-bold mb-4">7-Day Weather Forecast</h3>

            {/* Container for displaying weather forecast cards */}
            <div className="flex flex-row flex-wrap justify-center">
                {/* Conditionally render based on data availability */}
                {forecast.length > 0 && recommendations.length > 0 ? (
                    // Map through each day's forecast data
                    forecast.map((day, index) => {
                        // Calculate the index of the next day in the daysOfWeek array
                        const nextDay = (today + index) % 7;
                        // Label "Today's weather" for the current day, otherwise use the day of the week
                        const dayLabel = index === 0 ? "Today's weather" : daysOfWeek[nextDay];

                        return (
                            // Weather card for each day
                            <div key={index} className="m-2 p-4 bg-white rounded shadow">
                                {/* Display day label (either "Today's weather" or the day of the week) */}
                                <p className="text-lg font-semibold">{dayLabel}</p>
                                {/* Display weather information */}
                                <p>Temperature: {day.main.temp}&deg;C</p>
                                <p>Humidity: {day.main.humidity}%</p>
                                <p>Pressure: {day.main.pressure} hPa</p>
                                <p>Wind Speed: {day.wind.speed} m/s</p>
                                <p>Condition: {day.weather[0].description}</p>
                                {/* Display weather icon */}
                                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="weather icon" />

                                {/* Display suitable activities recommended for the day */}
                                <div className="mt-2">
                                    <h4 className="font-bold">Suitable Activities:</h4>
                                    <ul>
                                        {/* Map through and list each suitable activity */}
                                        {recommendations[index].suitable.map((rec, recIndex) => (
                                            <li key={recIndex}>{rec}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Display unsuitable activities recommended for the day */}
                                <div className="mt-2">
                                    <h4 className="font-bold">Unsuitable Activities:</h4>
                                    <ul>
                                        {/* Map through and list each unsuitable activity */}
                                        {recommendations[index].unsuitable.map((rec, recIndex) => (
                                            <li key={recIndex}>{rec}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    // Display loading message if forecast or recommendations data is not available
                    <p>Loading forecast...</p>
                )}
            </div>
        </div>
    );
};

// Export the Forecast component as the default export
export default Forecast;
