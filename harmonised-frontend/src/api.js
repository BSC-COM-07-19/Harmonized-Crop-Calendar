import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
});

export default api
export const getCropRecommendations = async () => {
    // Mock data - replace with actual API call
    return [
      'Corn',
      'Wheat',
      'Soybeans'
    ];
  };
  
  export const getMarketPrices = async () => {
    // Mock data - replace with actual API call
    return [
      { crop: 'Corn', price: 3.50 },
      { crop: 'Wheat', price: 5.20 },
      { crop: 'Soybeans', price: 9.80 }
    ];
  };
  
  export const getWeatherForecast = async () => {
    // Mock data - replace with actual API call
    return [
      { date: '2024-06-20', forecast: 'Sunny' },
      { date: '2024-06-21', forecast: 'Partly Cloudy' },
      { date: '2024-06-22', forecast: 'Rain' }
    ];
  };
  