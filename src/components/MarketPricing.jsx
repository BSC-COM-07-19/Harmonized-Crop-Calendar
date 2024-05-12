import Chart from 'chart.js/auto'; 
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';




const MarketPricing = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Sales',
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 55, 40, 30, 25, 20, 15, 10] // Adjust data values accordingly
      }
    ]
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <h2>Market Pricing</h2>
      <div style={{ height: '400px' }}>
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              line: {
                tension: 0.4
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default MarketPricing;


