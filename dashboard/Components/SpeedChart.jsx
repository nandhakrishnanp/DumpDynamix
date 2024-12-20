import React from 'react';
import Chart from 'react-apexcharts';
function roundTo(value, decimals) {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
const SpeedChart = ({ psi }) => {
  const options = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '80%',

        },
    
        dataLabels: {
          show: true,
          value: {
            formatter: (val) => `${roundTo(val, 3)} Km/hr`,
            fontSize: '24px',
            fontWeight: 'bold',
          },
        },
      },
    },
    labels: ['Speed'],
    colors: ['#5600FF'], 
  };

  const series = [psi]; 

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={210}
      />
    </div>
  );
};

export default SpeedChart;
