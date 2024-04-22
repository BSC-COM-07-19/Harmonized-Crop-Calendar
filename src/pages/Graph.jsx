import Chart from 'chart.js/auto'; 
import React from 'react';
import { Bar } from 'react-chartjs-2';

const Graph = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}> {/* Adjust width and margin */}
      <h2>Sales Report</h2>
      <div style={{ height: '400px' }}> {/* Adjust height */}
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </div>
    </div>
  );
};

export default Graph;

