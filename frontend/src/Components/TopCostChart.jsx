import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

const TyreCostChart = ({ data }) => {
  // Format the date for the X-axis
  const formattedData = data.map((item) => ({
    ...item,
    formattedDate: format(new Date(item.date), "dd MMM yyyy HH:mm"), // Format: 05 Dec 2024 14:20
  }));

  return (
    <ResponsiveContainer width="80%" height={300}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="formattedDate" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const { formattedDate, cost, costReason } = payload[0].payload;
              return (
                <div style={{ background: "#fff", padding: "10px", border: "1px solid #ccc" }}>
                  <p className=" font-Inter" ><strong>Date:</strong> {formattedDate}</p>
                  <p className=" font-Inter" ><strong>Cost:</strong> ₹{cost}</p>
                  <p className=" font-Inter" ><strong>Reason:</strong> {costReason}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line type="monotone" dataKey="cost" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TyreCostChart;
