import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TruckPieChart = ({ numOfActiveTrucks, numOfRestTrucks }) => {
  const series = [ numOfActiveTrucks, numOfRestTrucks]; // Data values
  const options = {
    chart: {
      type: 'pie',
    },
    labels: [ 'Active Trucks', 'Resting Trucks'], // Labels for each section
    colors: [ '#9232ff', '#cba0fb'], // Custom colors
    legend: {
      position: 'bottom',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="pie" width="100%" height={300} />
    </div>
  );
};

export default TruckPieChart;
