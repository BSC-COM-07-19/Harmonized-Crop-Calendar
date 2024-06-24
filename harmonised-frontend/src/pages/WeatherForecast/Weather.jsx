import React from "react";


/**
 * Weather component displays weather information including temperature,
 * city, country, humidity, pressure, wind speed, sunrise, sunset, weather icon,
 * and error message if present.
 * @param {Object} props - Component props.
 * @param {number} props.temperature - Temperature value to display.
 * @param {string} props.city - Name of the city for which weather information is displayed.
 * @param {string} props.country - Name of the country where the city is located.
 * @param {number} props.humidity - Humidity value to display.
 * @param {number} props.pressure - Atmospheric pressure value to display.
 * @param {number} props.windSpeed - Wind speed value to display.
 * @param {string} props.sunrise - Time of sunrise to display.
 * @param {string} props.sunset - Time of sunset to display.
 * @param {string} props.icon - Weather icon code to display.
 * @param {string} props.error - Error message to display if weather data retrieval fails.
 * @returns {JSX.Element} Weather component JSX.
 */

const Weather = ({ temperature, city, country, humidity, pressure, windSpeed, sunrise, sunset, icon, error }) => {
  return (
      <div className="weather">
        {/* Display weather information only if city and country are provided */}
        {city && country && (
            <div>
              {/* Display city and country */}
              <p className="text-lg font-bold">{city}, {country}</p>
              {/* Display temperature */}
              <p>Temperature: {temperature}</p>
              {/* Display humidity */}
              <p>Humidity: {humidity}</p>
              {/* Display pressure */}
              <p>Pressure: {pressure}</p>
              {/* Display wind speed */}
              <p>Wind Speed: {windSpeed}</p>
              {/* Display sunrise time */}
              <p>Sunrise: {sunrise}</p>
              {/* Display sunset time */}
              <p>Sunset: {sunset}</p>
              {/* Display weather icon */}
              <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
            </div>
        )}
        {/* Display error message if error is present */}
        {error && <p className="text-red-500">{error}</p>}
      </div>
  );
};

export default Weather;
