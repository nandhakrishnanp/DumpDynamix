import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {format} from 'date-fns';
import CustomStyle from '../../custom';

const PressureVsDateChart = ({pressureData}: any) => {
  // Sample data: Pressure vs Date (in ISO format)

  // Transform the data for the chart (formatting date and pressure)
  const chartData = pressureData.map(item => ({
    // Convert date to timestamp (ms)
    value: item.pressure,
    label: format(new Date(item.date), 'dd-MM-yy'), // Format date as dd-MM-yy for labels
  }));

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={380} // Width of the chart
        height={250} // Height of the ch
        color1={CustomStyle.colour.accent}
        yAxisOffset={40}
        maxValue={130}
        areaChart
        startFillColor="rgb(64, 17, 255)"
        startOpacity={0.8}
        endFillColor="rgb(203, 241, 250)"
        endOpacity={0.3}
        isAnimated
        xAxisLabelTextStyle={{
          color: '#666',
          fontSize: 10,
        }}
        focusEnabled
        showTextOnFocus
        showDataPointLabelOnFocus
        showDataPointsForMissingValues
        animationDuration={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default PressureVsDateChart;
