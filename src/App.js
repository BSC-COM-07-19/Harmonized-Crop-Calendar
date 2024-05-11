import React from 'react';
import './App.css';
import Home from './pages/Home';
import Graph from './pages/Graph';
import WeatherApp from './components/WeatherApp';

function App() {
  return (
    <div className="App">
      <Home />
      <Graph />
      <WeatherApp/>
    </div>
  );
}

export default App;
