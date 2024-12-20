import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';
import CustomStyle from '../../custom';

const PayloadMeter = ({Payload,maxPayload}:any) => {
  const [speed, setSpeed] = useState(0);

  return (
    <View style={styles.container}>
      <RadialSlider
      disabled={true}
  sliderTrackColor={CustomStyle.colour.secondary}
  linearGradient={[{color:CustomStyle.colour.primary},{color:CustomStyle.colour.primary}]}
  unit='Tonnes'
      subTitle='Payload'
         variant={'radial-circle-slider'}
      value={Payload} min={0} max={maxPayload}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
 
  },
});

export default PayloadMeter;