import React from "react";

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
