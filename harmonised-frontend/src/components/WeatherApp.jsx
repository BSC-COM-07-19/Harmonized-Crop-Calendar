import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

const API_KEY = '034fa1f439d5c604451a9f3fa492ab36'; // Your actual API key from OpenWeatherMap


/**
 * 
 * WeatherApp component for displaying weather forecast and activity recommendations.
 * It fetches and displays a weather forecast for a specified city and country.
 * It provides recommendations for various farming activities based on the weather conditions.
 * Users can input a city and country to get a 7-day forecast and view the suitability of selected farming activities.
 * @returns {JSX.Element} WeatherApp component.
 */
const WeatherApp = () => {
  const location = useLocation();
  const { selectedActivity } = location.state || {};
  const [country, setCountry] = useState('Malawi'); // Default country set to Malawi
  const [city, setCity] = useState('Zomba'); // Default city set to Zomba
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [validActivity, setValidActivity] = useState(false);
  const [reasons, setReasons] = useState([]);
  const [bestDays, setBestDays] = useState({
    LandPreparation: [],
    Planting: [],
    Weeding: [],
    SecondWeeding: [],
    Harvesting: []
  });
  const [topDressingRecommendation, setTopDressingRecommendation] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  
  const handleBack = () =>{
    navigate(-1);
  }
  useEffect(() => {
    // Fetch weather data on initial page load with default country (Malawi) and city (Zomba)
    handleFetchWeather();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFetchWeather = () => {
    if (country && city) {
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${API_KEY}`;

      axios.get(weatherApiUrl)
        .then(response => {
          const forecastData = response.data.list.reduce((acc, item, index) => {
            const date = index === 0 ? 'Today\'s Weather' : new Date(item.dt * 1000).toLocaleDateString();
            // Check if the date is not already added to avoid duplicates
            if (!acc.find(day => day.date === date)) {
              acc.push({
                date,
                temperature: item.main.temp,
                humidity: item.main.humidity,
                windSpeed: item.wind.speed,
                description: item.weather[0].description,
                main: item.weather[0].main,
                rain: item.rain ? item.rain['3h'] : 0,
                snow: item.snow ? item.snow['3h'] : 0
              });
            }
            return acc;
          }, []).slice(0, 7); // Limit to next 7 days including today

          setWeatherForecast(forecastData);

          // Check validity and reasons
          const reasonsList = forecastData.map(day => {
            const conditions = {
              description: day.description.toLowerCase(),
              temperature: day.temperature,
              rain: day.rain,
              snow: day.snow
            };

            const dayReasons = [];

            switch (selectedActivity) {
              case 'Land Preparation':
                if (conditions.description.includes('clear sky')) {
                  dayReasons.push('Clear sky is suitable for land preparation.');
                } else {
                  dayReasons.push('Land preparation is not suitable.');
                }
                break;
              case 'Planting':
                if (conditions.rain > 0.0) {
                  dayReasons.push('Heavy or Normal rainfall is suitable for planting.');
                } else {
                  dayReasons.push('No rainfall for planting. NOT suitable for planting');
                }
                break;
              case 'Weeding':
                if (conditions.description.includes('clear sky')) {
                  dayReasons.push('Clear sky is suitable for weeding.');
                } else {
                  dayReasons.push('Rainfall is not suitable for weeding.');
                }
                break;
              case 'Weeding (Second Round)':
                if (conditions.description.includes('clear sky')) {
                  dayReasons.push('Clear sky is suitable for second weeding.');
                } else {
                  dayReasons.push('Rainfall is not suitable for second weeding.');
                }
                break;
              case 'Harvesting':
                if (!conditions.description.includes('rain') && !conditions.description.includes('snow')) {
                  dayReasons.push('Clear sky is suitable for harvesting.');
                } else {
                  dayReasons.push('Rainfall is not suitable for harvesting.');
                }
                break;
              case 'Top Dressing':
                // Determine top dressing recommendation
                if (!conditions.description.includes('cool')) {
                  dayReasons.push('Top dressing is recommended for this day.');
                } else {
                  dayReasons.push('Top dressing is not recommended due to cool weather.');
                }
                break;
              default:
                dayReasons.push('No specific recommendation for this activity.');
                break;
            }

            return {
              date: day.date,
              isValid: dayReasons.length > 0,
              reasons: dayReasons
            };
          });

          const isValid = reasonsList.some(day => day.isValid);
          setValidActivity(isValid);
          setReasons(reasonsList);
          setError(null); // Clear any previous errors

          // Find the best days for each activity
          const bestDays = findBestDays(reasonsList);
          setBestDays(bestDays);

          // Find top dressing recommendations
          const topDressingRecommendation = reasonsList.filter(day => day.isValid && day.reasons.includes('Top dressing is recommended for this day.'));
          setTopDressingRecommendation(topDressingRecommendation);
        })
        .catch(error => {
          console.error("Error fetching weather data", error);
          setError("Error fetching weather data. Please try again.");
          setWeatherForecast([]);
          setValidActivity(false);
          setReasons([]);
          setBestDays({
            LandPreparation: [],
            Planting: [],
            Weeding: [],
            SecondWeeding: [],
            Harvesting: []
          });
          setTopDressingRecommendation([]);
        });
    } else {
      setError("Please enter both country and city.");
    }
  };

  // Function to find the best days for each activity based on reasons
  const findBestDays = (reasonsList) => {
    const bestDays = {
      LandPreparation: [],
      Planting: [],
      Weeding: [],
      SecondWeeding: [],
      Harvesting: []
    };

    reasonsList.forEach(day => {
      switch (day.date) {
        case 'Land Preparation':
          if (day.isValid && day.reasons.includes('Clear sky is suitable for land preparation.')) {
            bestDays.LandPreparation.push(day);
          }
          break;
        case 'Planting':
          if (day.isValid && day.reasons.includes('Heavy, Normal rainfall is suitable for planting.')) {
            bestDays.Planting.push(day);
          }
          break;
        case 'Weeding':
          if (day.isValid && day.reasons.includes('Clear sky is suitable for weeding.')) {
            bestDays.Weeding.push(day);
          }
          break;
        case 'Weeding (Second Round)':
          if (day.isValid && day.reasons.includes('Clear sky is suitable for second weeding.')) {
            bestDays.SecondWeeding.push(day);
          }
          break;
        case 'Harvesting':
          if (day.isValid && day.reasons.includes('Clear sky is suitable for harvesting.')) {
            bestDays.Harvesting.push(day);
          }
          break;
        default:
          break;
      }
    });

    return bestDays;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">
        Weather Forecast for "{selectedActivity}" Recommendation based on the selected activity
      </h2>
      <button className="back-button bg-green-500 text-white px-2 py-0 box-full absolute top-12 left-0 mt-6 ml-4" onClick={handleBack}>
        <IoMdArrowBack className="mr-1" />
        Back
      </button>
      <div className="flex flex-col md:flex-row items-start md:items-center w-full max-w-screen-lg">
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full md:w-auto mb-2 md:mb-0 md:mr-2"
          placeholder="Enter country"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full md:w-auto mb-2 md:mb-0 md:mr-2"
          placeholder="Enter city"
        />
        <button
          onClick={handleFetchWeather}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
        >
          Fetch Weather
        </button>
      </div>
      {error && (
        <div className="text-red-500 mt-4">
          {error}
        </div>
      )}
      {weatherForecast.length > 0 && (
        <div className="mt-4 w-full max-w-screen-lg overflow-x-auto">
          <div className="flex flex-nowrap overflow-x-auto">
            {weatherForecast.map((day, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 mx-2 mb-4 max-w-xs">
                <h4 className="text-lg font-bold mb-2">{day.date}</h4>
                <p className="mb-2">{day.description}</p>
                <p className="font-semibold">Temperature: {day.temperature}°C</p>
                <p className="font-semibold">Humidity: {day.humidity}%</p>
                <p className="font-semibold">Wind Speed: {day.windSpeed} m/s</p>
              </div>
            ))}
          </div>
          {reasons.map((day, index) => (
            <div key={index} className={`mt-4 p-4 rounded ${day.isValid ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              <p>{day.isValid
                ? day.reasons.map((reason, idx) => (
                    <p key={idx}>{reason}</p>
                  ))
                : `The selected activity is not suitable for ${day.date} based on the weather forecast.`}</p>
            </div>
          ))}
          {Object.keys(bestDays).map(activity => (
            bestDays[activity].length > 0 && (
              <div key={activity} className="mt-4 p-4 rounded bg-blue-500 text-white">
                <p>{`The best day(s) for ${activity} based on the weather forecast:`}</p>
                <ul className="list-disc ml-6">
                  {bestDays[activity].map((day, idx) => (
                    <li key={idx}>{day.date}</li>
                  ))}
                </ul>
              </div>
            )
          ))}
          {selectedActivity === 'Top Dressing' && (
            <div className="mt-4 p-4 rounded bg-yellow-500 text-white">
              <p>Top dressing recommendations:</p>
              <ul className="list-disc ml-6">
                {topDressingRecommendation.map((day, idx) => (
                  <li key={idx}>{day.date}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
