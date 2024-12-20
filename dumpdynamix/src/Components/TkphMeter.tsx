import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';

const TkphMeter = ({tkph}:any) => {
  const [speed, setSpeed] = useState(0);

  return (
    <View style={styles.container}>
      <RadialSlider
      unit=''
      subTitle='TKPH'
         variant={'radial-circle-slider'}
      value={tkph} min={0} max={1500}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
         margin: 22,
  },
});

export default TkphMeter;