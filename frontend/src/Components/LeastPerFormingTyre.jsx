import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LeastTyre = ({ data }) => {
  // Add a formatter for Tooltip to display additional information
  const tooltipFormatter = (value, name, props) => {
    const { payload } = props;
    return [`${value}`, `${name} (Tyre ID: ${payload.tyre_id})`];
  };

  return (
    <ResponsiveContainer width="80%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* Include both tyre_make and tyre_Id in the X-axis */}
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

export default LeastTyre;
