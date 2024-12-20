import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TopTyreCharts = ({ data }) => {
  // Tooltip formatter to display tyre_Id alongside the data
  const tooltipFormatter = (value, name, props) => {
    const { payload } = props;
    return [`${value}`, `${name} (Tyre ID: ${payload.tyre_id})`];
  };

  return (
    <ResponsiveContainer width="80%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* XAxis shows both tyre_make and tyre_Id */}
        <XAxis
          dataKey="tyre_make"
          tickFormatter={(value, index) =>
            `${value} (ID: ${data[index]?.tyre_id || ''})`
          }
        />
        <YAxis />
        <Tooltip formatter={tooltipFormatter} />
        <Legend />
        <Bar dataKey="costPerWorkingHour" fill="#8884d8" />
        <Bar dataKey="operating_hours" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopTyreCharts;
