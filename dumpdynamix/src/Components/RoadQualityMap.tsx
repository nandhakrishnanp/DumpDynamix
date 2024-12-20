import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {
  Callout,
  Heatmap,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import axiosInstance from '../../axiosconfig';
import Toast from 'react-native-toast-message';

const RoadQualityMap = () => {
    const points = [
        { latitude: 11.5715, longitude: 79.504, weight: 1 }, // Red for poor quality
        { latitude: 11.572, longitude: 79.5035, weight: 2.3 }, // Yellow for medium quality
        { latitude: 11.579, longitude: 79.505, weight: 1.3 },
        { latitude: 11.576, longitude: 79.509, weight: 1 },
        { latitude: 11.574, longitude: 79.502, weight: 1.3 },
        { latitude: 11.576, longitude: 79.509, weight: 1 } // Green for high quality
        // Add more points based on your data
      ];
    
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        cameraZoomRange={{
          minCenterCoordinateDistance: 12,
          maxCenterCoordinateDistance: 20,
        }}
        zoomControlEnabled={true}
        initialRegion={{
          latitude: 11.6,
          longitude: 79.48,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
         <Heatmap
          points={points}
          opacity={0.8} // Adjust opacity as desired
          radius={50} // Adjust radius for visualization
           // Set max intensity based on max weight (in this case, 3)
          gradient={{
            colors: ["#FF0000", "#FFFF00", "#00FF00"], // Red, Yellow, Green
            startPoints: [0.2, 0.5, 1.0], // Adjust color distribution
            colorMapSize: 256,
          }}
        />
      </MapView>
    </View>
  );
};

export default RoadQualityMap;

const styles = StyleSheet.create({
  container: {
    height: 730,
    width: 400,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
