import React from "react";

const Forecast = ({ forecast, recommendations }) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay(); // Get the index of the current day
  
  return (
    <div className="forecast mt-4 flex flex-col items-center">
      <h3 className="text-xl font-bold mb-4">7-Day Weather Forecast</h3>
      <div className="flex flex-row flex-wrap justify-center">
        {forecast.length > 0 && recommendations.length > 0 ? (
          forecast.map((day, index) => {
            const nextDay = (today + index) % 7; // Calculate the index of the next day
            const dayLabel = index === 0 ? "Today's weather" : daysOfWeek[nextDay]; // Label "Today's weather" for the current day, otherwise use the day of the week
            
            return (
              <div key={index} className="m-2 p-4 bg-white rounded shadow">
                <p className="text-lg font-semibold">{dayLabel}</p>
                <p>Temperature: {day.main.temp}&deg;C</p>
                <p>Humidity: {day.main.humidity}%</p>
                <p>Pressure: {day.main.pressure} hPa</p>
                <p>Wind Speed: {day.wind.speed} m/s</p>
                <p>Condition: {day.weather[0].description}</p>
                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="weather icon" />
                <div className="mt-2">
                  <h4 className="font-bold">Suitable Activities:</h4>
                  <ul>
                    {recommendations[index].suitable.map((rec, recIndex) => (
                      <li key={recIndex}>{rec}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2">
                  <h4 className="font-bold">Unsuitable Activities:</h4>
                  <ul>
                    {recommendations[index].unsuitable.map((rec, recIndex) => (
                      <li key={recIndex}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading forecast...</p>
        )}
      </div>
    </div>
  );
};

export default Forecast;
