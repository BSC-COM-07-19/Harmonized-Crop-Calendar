import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import TransparentLogo from '../assets/download.png'; // Adjust the path based on your file structure

const SeasonalChart = () => {
  const data = [
    {
      name: 'Corn, sweet (Low Altitude)',
      imageUrl: TransparentLogo,
      sowing: { APR: 1, MAY: 1, JUN: 1 },
      harvesting: { JUL: 1, AUG: 1, SEP: 1 }
    },
    {
      name: 'Corn, sweet (Medium Altitude)',
      imageUrl: TransparentLogo,
      sowing: { APR: 1, MAY: 1, JUN: 1 },
      harvesting: { NOV: 1, DEC: 1 }
    }
  ];

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
      const dataKey = payload[0].dataKey;
      const activity = payload[0].payload.name;

      if (dataKey.startsWith('sowing')) {
        return (
          <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
            <p>{`${label} : ${payload[0].value}`}</p>
            <p>Sowing Period: {data.find(item => item.name === activity).sowing[label] ? 'Yes' : 'No'}</p>
          </div>
        );
      }
      if (dataKey.startsWith('harvesting')) {
        return (
          <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
            <p>{`${label} : ${payload[0].value}`}</p>
            <p>Harvesting Period: {data.find(item => item.name === activity).harvesting[label] ? 'Yes' : 'No'}</p>
          </div>
        );
      }
    }
    return null;
  };

  // Transform data to align months horizontally and activities vertically
  const transformedData = [];
  months.forEach(month => {
    const monthData = { month };
    data.forEach(activity => {
      monthData[activity.name + '_sowing'] = activity.sowing[month] ? 1 : 0;
      monthData[activity.name + '_harvesting'] = activity.harvesting[month] ? 1 : 0;
    });
    transformedData.push(monthData);
  });

  const CustomYAxisTick = ({ x, y, payload }) => {
    const activity = data[payload.value];
    return (
      <g transform={`translate(${x},${y})`}>
        <image href={activity.imageUrl} x="-70" y="0" height="50px" width="70px" />
        <text x="-30" y="25" textAnchor="end" fill="#666" writingMode="vertical-rl">{activity.name}</text>
      </g>
    );
  };

  return (
    <div>
      <h1>Seasonal Calendar</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 70, bottom: 20 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="category" dataKey="month" orientation="top" />
          <YAxis type="number" tick={<CustomYAxisTick />} tickCount={data.length} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {data.map(activity => (
            <React.Fragment key={activity.name}>
              <Bar dataKey={activity.name + '_sowing'} stackId="a" fill="#8884d8" />
              <Bar dataKey={activity.name + '_harvesting'} stackId="a" fill="#82ca9d" />
            </React.Fragment>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeasonalChart;
