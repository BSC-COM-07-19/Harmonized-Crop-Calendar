import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MarketPricing from './components/MarketPricing';
import ActivityCalendar from './ActivityCalendar';
import WeatherApp from './components/WeatherApp';

// function App() {
//   return (
//     <div className="App">
//       <Home />
//       <Graph />
//       <ActivityCalendar />
//       <WeatherApp/>
//     </div>
//   );
// }
const App = () => {
  return (
    <Router>
      <div>
        <Home />
      </div>
    </Router>
  );
};


export default App;
