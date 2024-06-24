import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root element for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component inside the root element
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Function to measure the performance of the application
// You can pass a function to log results (e.g., reportWebVitals(console.log))
// or send the results to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
