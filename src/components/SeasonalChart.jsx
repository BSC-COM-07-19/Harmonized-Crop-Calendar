import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList
} from 'recharts';

const SeasonalChart = () => {
  const data = [
    { name: 'Planting', NOV: 1, DEC: 1, JAN: 1 },
    { name: 'Rainy season', NOV: 1, DEC: 1, JAN: 1, FEB: 1, MAR: 1, APR: 1 },
    { name: 'Winter harvest', NOV: 1, DEC: 1, JAN: 1 },
    { name: 'Lean season', NOV: 1, DEC: 1, JAN: 1, FEB: 1 },
    { name: 'Peak labor demand', NOV: 1, DEC: 1, JAN: 1, FEB: 1 },
    { name: 'Green harvest', FEB: 1, MAR: 1, APR: 1, MAY: 1 },
    { name: 'Winter planting', APR: 1, MAY: 1, JUN: 1, JUL: 1, AUG: 1 },
    { name: 'Main harvest', APR: 1, MAY: 1, JUN: 1, JUL: 1, AUG: 1 },
    { name: 'Tobacco sales and auction', APR: 1, MAY: 1, JUN: 1, JUL: 1, AUG: 1 },
    { name: 'Winter harvest', SEP: 1, OCT: 1 },
    { name: 'Peak labor demand', SEP: 1, OCT: 1 },
  ];

  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
          <p>{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>Seasonal Calendar for a Typical Year</h1>
      <BarChart
        width={1000}
        height={1000}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {['NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'].map(month => (
          <Bar
            key={month}
            dataKey={month}
            stackId="a"
            fill={`#${Math.floor(Math.random()*16777215).toString(16)}`}
          >
            <LabelList dataKey={month} position="center" />
          </Bar>
        ))}
      </BarChart>
    </div>
  );
};

export default SeasonalChart;
