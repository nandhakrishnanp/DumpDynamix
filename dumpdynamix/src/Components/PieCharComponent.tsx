import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import CustomStyle from '../../custom';

const DonutChartWithPayload = ({ maxPayload, currentPayload }) => {
  const percentage = (currentPayload / maxPayload) * 100;
  const isCritical = percentage > 90; // Flag for critical state
  const color = isCritical ? "#d25537" : CustomStyle.colour.primary; // Red if > 90%, Green otherwise

  const data = [
    { value: percentage, color }, // Current payload slice
    { value: 100 - percentage, color: CustomStyle.colour.secondary }, // Remaining slice
  ];

  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        radius={100}
        innerRadius={80} // Makes it look like a donut
        showText={false} // We'll add custom text manually
      />
      <View style={styles.centerTextContainer}>
        <Text style={[styles.percentageText, { color: isCritical ? CustomStyle.colour.background : CustomStyle.colour.background ,paddingTop:35 }]}>
          {percentage.toFixed(1)}%
        </Text>
        <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: CustomStyle.colour.background,
            paddingHorizontal:4
        }}>
          {currentPayload} Tonnes
        </Text>
      </View>

      
      


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin:20
  },
  centerTextContainer: {
    position: 'absolute', // Center text on the chart
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  payloadText: {
    fontSize: 16,
    color: '#666',
  },
});

export default DonutChartWithPayload;
