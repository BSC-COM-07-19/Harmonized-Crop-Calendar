import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import WeatherApp from './components/WeatherApp';
<<<<<<< HEAD
import PestDiseaseMgt from './components/PestDiseaseMgt';
import CalendarPage from "./components/CalendarPage"; // Import the new calendar page component
=======
//import PestDiseaseMgt from './components/PestDiseaseMgt';
// import SeasonalChart from './components/SeasonalChart';
// import GroundnutsPestDisease from './components/Groundnuts';
// import SoybeansPestDisease from './components/Soy';
// import MaizePestDisease from './components/Maize';
// import RicePestDisease from './components/Rice';
// import MarketPricing from './components/MarketPricing';
import CalendarPage from "./components/CalendarPage"; 
import PestDiseasePage from "./components/PestDiseaseMgt";
>>>>>>> 7d4e433a109c37027bffe50403aa139c117ce357

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pests-diseases/:crop" element={<PestDiseasePage  />} /> 
          <Route path="/weather" element={<WeatherApp />} />
<<<<<<< HEAD
          <Route path="/pests" element={<PestDiseaseMgt />} />
=======
>>>>>>> 7d4e433a109c37027bffe50403aa139c117ce357
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
