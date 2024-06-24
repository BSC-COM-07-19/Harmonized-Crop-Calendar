import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import WeatherApp from './components/WeatherApp';
import Weathervisual from './components/Weathervisual';
import CalendarPage from "./components/CalendarPage";
import PestDiseasePage from "./components/PestDiseaseMgt";



/**
 * App component serves as the main entry point for the application.
 * It sets up the router, navigation, and routes for different pages of the application.
 *
 * Features:
 * - Displays a navigation bar at the top of the page using NavBar component.
 * - Provides route definitions for different pages including Home, Weather App, Weather Visual, Calendar, and Pest and Disease Management pages.
 * - Utilizes React Router for client-side routing.
 *
 * Routes:
 * - "/" renders the Home component.
 * - "/pests-diseases/:crop" renders the PestDiseasePage component with a dynamic crop parameter.
 * - "/weather" renders the WeatherApp component.
 * - "/WeatherVisual" renders the Weathervisual component.
 * - "/calendar" renders the CalendarPage component.
 */
const App = () => {
  return (
      <Router>
        <div className="relative">
          {/* NavBar component is displayed at the top of the page */}
          <NavBar />

          {/* Main content is wrapped with padding to avoid overlap with NavBar */}
          <div className="pt-16">
            <Routes>
              {/* Define the route for the Home page */}
              <Route path="/" element={<Home />} />

              {/* Define the route for the Pest and Disease Management page, with a dynamic crop parameter */}
              <Route path="/pests-diseases/:crop" element={<PestDiseasePage />} />

              {/* Define the route for the Weather App page */}
              <Route path="/weather" element={<WeatherApp />} />

              {/* Define the route for the Weather Visual page */}
              <Route path="/WeatherVisual" element={<Weathervisual />} />

              {/* Define the route for the Calendar page */}
              <Route path="/calendar" element={<CalendarPage />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
};

export default App;
