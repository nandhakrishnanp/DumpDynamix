import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TkphChart = ({ data }) => {
    
    useEffect(()=>{
   console.log("chart rendered" , data);
  if(data){
    data.sort((a,b) => new Date(a.date) - new Date(b.date));
  }
    },[data])
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(date) => format(new Date(date),'dd-MM-yyyy')}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(label) =>
            `Date: ${new Date(label).toLocaleDateString()}`
          }
        />
        <Area
          type="monotone"
          dataKey="minTkph"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="maxTkph"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TkphChart;
