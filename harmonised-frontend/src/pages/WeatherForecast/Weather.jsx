import React from "react";

const Weather = ({ temperature, city, country, humidity, pressure, windSpeed, sunrise, sunset, icon, error }) => {
  return (
    <div className="weather">
      {city && country && (
        <div>
          <p className="text-lg font-bold">{city}, {country}</p>
          <p>Temperature: {temperature}</p>
          <p>Humidity: {humidity}</p>
          <p>Pressure: {pressure}</p>
          <p>Wind Speed: {windSpeed}</p>
          <p>Sunrise: {sunrise}</p>
          <p>Sunset: {sunset}</p>
          <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Weather;
