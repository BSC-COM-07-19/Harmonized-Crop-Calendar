import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import WeatherApp from './components/WeatherApp';
import Weathervisual from "./components/Weathervisual"; 
import PestDiseasePage from "./components/PestDiseaseMgt";

const App = () => {
  return (
    <Router>
      <div className="relative">
        <NavBar />
        <div className="pt-16"> {/* Add padding top to accommodate fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pests-diseases/:crop" element={<PestDiseasePage />} /> 
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="/budget" element={<Weathervisual />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
