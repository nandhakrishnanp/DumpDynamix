import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Tooltip as RechartsTooltip } from 'recharts';

// Assuming you have a `performanceData` prop passed into the component
const PerformanceScoresChart = ({ performanceData }) => {
  // Function to get the tyre logo URL (can be dynamic as shown before)
  const getTyreLogo = (make) => {
    const tyreLogos = {
      Bridgestone: "https://i.pinimg.com/originals/47/4f/46/474f46832a6981e75af3806988976538.png",
      Apollo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh1kRb4e_oO66pfRumyerbfY_QOHw-2OCk0Q&s",
      Goodyear: "https://logos-world.net/wp-content/uploads/2023/03/Goodyear-Logo.png",
      Michelin: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOy3ZlV9jfHJXXeG2QNULgmZtYnbXgD5QD9w&s",
      BKT: "https://logowik.com/content/uploads/images/balkrishna-industries-bkt-tires8121.jpg"
    };

    return tyreLogos[make] || "https://default-logo.png";
  };


  const CustomTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const { tyre_make, performance_score } = payload[0].payload;
     const logoUrl = getTyreLogo(tyre_make);

      return (
        <div className="custom-tooltip font-Inter  flex flex-col  items-center" style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "5px", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}>
          <img src={logoUrl} alt={`${tyre_make} logo`}  className=' w-16 h-16 object-contain' />
          <p ><strong>{tyre_make}</strong></p>
          <p>Performance Score: {performance_score}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="70%" height={300}>
      <BarChart data={performanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="expense_count" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="performance_score" fill="#8884d9" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceScoresChart;
