import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart from chart.js/auto
import 'chartjs-adapter-date-fns';

const MarketPricing = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Crop Price',
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [200, 220, 230, 250, 260, 270, 280, 290, 300, 290, 280, 250] 
      }
    ]
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
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
            },
            plugins: {
              title: {
                display: true,
                text: 'Crop Price Against Month'
              },
              legend: {
                display: true,
                position: 'bottom'
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Months'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Price (in MWK)' 
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default MarketPricing;