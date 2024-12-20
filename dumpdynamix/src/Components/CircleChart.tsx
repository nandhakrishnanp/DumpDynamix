import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CustomStyle from '../../custom';
import { LineChart, PieChart } from 'react-native-gifted-charts';

const CircleChart = ({ percentage }:any) => {
  return (
    <View style={styles.container}>
    <PieChart
      data={[
        { value: percentage, color: CustomStyle.colour.primary }, // Filled percentage
        { value: 100 - percentage, color: CustomStyle.colour.secondary }, // Remaining percentage
      ]}
      radius={70} // Size of the circle
      donut={true} // Makes it a donut chart
      innerRadius={50} // Inner circle size (for the donut effect)
      centerLabelComponent={() => (
        <Text style={styles.percentageText}>{percentage}%</Text>
      )}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
   padding: 10,
  },
  percentageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CustomStyle.colour.primary,
  },
});

export default CircleChart;
