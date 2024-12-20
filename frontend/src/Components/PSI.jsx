import React from 'react';
import Chart from 'react-apexcharts';

const CircularGauge = ({ psi }) => {
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
            formatter: (val) => `${Math.round(val)} PSI`,
            fontSize: '24px',
            fontWeight: 'bold',
          },
        },
      },
    },
    labels: ['Pressure'],
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

export default CircularGauge;
