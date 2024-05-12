import React from 'react';
import './App.css';
import Home from './pages/Home';
import Graph from './pages/Graph';
import ActivityCalendar from './ActivityCalendar';
import WeatherApp from './components/WeatherApp';

function App() {
  return (
    <div className="App">
      <Home />
      <Graph />
      <ActivityCalendar />
      <WeatherApp/>
    </div>
  );
}

export default App;
