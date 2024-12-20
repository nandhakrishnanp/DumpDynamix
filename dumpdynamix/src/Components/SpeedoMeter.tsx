import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RadialSlider} from 'react-native-radial-slider';
import CustomStyle from '../../custom';

const RadialVariant = ({speeds}: any) => {
  const [speed, setSpeed] = useState(100);

  return (
    <View style={styles.container}>
      <RadialSlider
        lineColor={CustomStyle.colour.primary}
        unit={'Km/hr'}
        variant={'speedometer-marker'}
        value={speeds}
        min={0}
        max={120}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 10,
  },
});

export default RadialVariant;
