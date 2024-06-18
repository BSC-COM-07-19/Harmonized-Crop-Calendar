import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faTint, faUmbrella, faExclamationCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';


const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleRecommendations, setVisibleRecommendations] = useState({});

  const processWeatherData = (forecastList) => {
    const groupedData = {};

    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!groupedData[date]) {
        groupedData[date] = item;
      }
    });

    const forecastData = Object.values(groupedData);

    // Add actionable insights
    const actionableInsights = forecastData.map((day) => {
      const { dt, weather, main, wind } = day;
      const date = new Date(dt * 1000).toLocaleDateString();
      const recommendations = [];

      // Example recommendation logic with icons
      if (weather[0].main.toLowerCase().includes("rain")) {
        recommendations.push({
          text: "Avoid planting due to rain.",
          icon: faUmbrella
        });
        recommendations.push({
          text: "No irrigation needed due to rain.",
          icon: faTint
        });
      } else if (weather[0].main.toLowerCase().includes("clear")) {
        recommendations.push({
          text: "Good day for planting.",
          icon: faSeedling
        });
        recommendations.push({
          text: "Irrigation needed.",
          icon: faTint
        });
      } else {
        recommendations.push({
          text: "Monitor weather conditions before making decisions.",
          icon: faExclamationCircle
        });
      }

      return {
        date,
        weather: weather[0].description,
        icon: weather[0].icon,
        temp: main.temp,
        humidity: main.humidity,
        windSpeed: wind.speed,
        recommendations,
      };
    });

    return actionableInsights;
  };

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        console.log(`Fetching weather for lat: ${lat}, lon: ${lon}`);
        const API_KEY = '034fa1f439d5c604451a9f3fa492ab36';
        const currentWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        const dailyForecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        console.log('Current Weather data:', currentWeatherResponse.data);
        console.log('Daily Forecast data:', dailyForecastResponse.data);

        setCurrentWeather(currentWeatherResponse.data);
        const insights = processWeatherData(dailyForecastResponse.data.list);
        setWeeklyForecast(insights);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Unable to fetch weather data');
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Geolocation success:', position);
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  }, []);

  const toggleRecommendations = (date) => {
    setVisibleRecommendations((prevState) => ({
      ...prevState,
      [date]: !prevState[date],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="weather-app">
      <div className="weather-contain">
        <h1>Weather at Your Location</h1>
        {currentWeather && (
          <div className="weather-details">
            <h2>{currentWeather.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
              alt={currentWeather.weather[0].description}
              className="weather-icon"
            />
            <p>{currentWeather.weather[0].description}</p>
            <p>Temperature: {currentWeather.main.temp}°C</p>
            <p>Humidity: {currentWeather.main.humidity}%</p>
            <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
          </div>
        )}
      </div>

      <div className="weekly-forecast">
        <h2>Weekly Forecast</h2>
        {weeklyForecast && weeklyForecast.map((day, index) => (
          <div key={index} className="day-forecast">
            <p>{day.date}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.weather}
              className="weather-icon"
            />
            <p>{day.weather}</p>
            <p>Temperature: {day.temp}°C</p>
            <p>Humidity: {day.humidity}%</p>
            <p>Wind Speed: {day.windSpeed} m/s</p>
            <button className="recommendation-button" onClick={() => toggleRecommendations(day.date)}>
              <FontAwesomeIcon icon={visibleRecommendations[day.date] ? faChevronUp : faChevronDown} /> 
              {visibleRecommendations[day.date] ? 'Hide Recommendations' : 'Show Recommendations'}
            </button>
            {visibleRecommendations[day.date] && (
              <div className="recommendations">
                <h3>Recommendations:</h3>
                <ul>
                  {day.recommendations.map((rec, recIndex) => (
                    <li key={recIndex}>
                      <FontAwesomeIcon icon={rec.icon} /> {rec.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
