import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Pressure from './Truck/Pressure';
import TruckDataDisplay from './Truck/TruckDataDisplay';
import Tkph from './Truck/Tkph';
import InspectionReport from './Truck/InspectionReport';
import CustomStyle from '../../../custom';
import Trip from './Trip/Trip';
import TyreList from './Lifetime/TyreList';
import TyreStack from './Lifetime/TyreList';

const Details = ({truckdata, navigation}: any) => {
  const [selected, setSelected] = useState('TruckDataDisplay');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        paddingVertical: 15,
      }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingHorizontal: 8,
          marginHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              marginHorizontal: 3,
              padding: 8,
              borderRadius: 8,
              color: 'white',
              backgroundColor:
                selected === 'TruckDataDisplay'
                  ? CustomStyle.colour.primary
                  : CustomStyle.colour.secondary,
            }}
            onPress={() => setSelected('TruckDataDisplay')}>
            Truck Details
          </Text>
          <Text
            style={{
              marginHorizontal: 3,
              padding: 8,
              borderRadius: 8,
              color: 'white',
              backgroundColor:
                selected === 'Pressure'
                  ? CustomStyle.colour.primary
                  : CustomStyle.colour.secondary,
            }}
            onPress={() => setSelected('Pressure')}>
            Pressure Analysis
          </Text>
          <Text
            style={{
              marginHorizontal: 3,
              padding: 8,
              borderRadius: 8,
              color: 'white',
              backgroundColor:
                selected === 'Tkph'
                  ? CustomStyle.colour.primary
                  : CustomStyle.colour.secondary,
            }}
            onPress={() => setSelected('Tkph')}>
            Tkph Analysis
          </Text>
          <Text
            style={{
              marginHorizontal: 3,
              padding: 8,
              borderRadius: 8,
              color: 'white',
              backgroundColor:
                selected === 'InspectionReport'
                  ? CustomStyle.colour.primary
                  : CustomStyle.colour.secondary,
            }}
            onPress={() => setSelected('InspectionReport')}>
            Inspection
          </Text>
          <Text
            style={{
              marginHorizontal: 3,
              padding: 8,
              borderRadius: 8,
              color: 'white',
              backgroundColor:
                selected === 'Trip'
                  ? CustomStyle.colour.primary
                  : CustomStyle.colour.secondary,
            }}
            onPress={() => setSelected('Trip')}>
            Trip Logbook
          </Text>
          <Text
            style={{
              marginHorizontal: 3,
              padding: 8,
              borderRadius: 8,
              color: 'white',
              backgroundColor:
                selected === 'TyreList'
                  ? CustomStyle.colour.primary
                  : CustomStyle.colour.secondary,
            }}
            onPress={() => setSelected('TyreList')}>
            Tyre LifeTime
          </Text>
        </View>
      </ScrollView>
      {selected === 'TruckDataDisplay' && (
        <TruckDataDisplay truckdata={truckdata} />
      )}
      {selected === 'Pressure' && (
        <Pressure navigation={navigation} truckdata={truckdata} />
      )}
      {selected === 'Tkph' && <Tkph truckdata={truckdata} />}
      {selected === 'InspectionReport' && (
        <InspectionReport navigation={navigation} truckdata={truckdata} />
      )}
      {selected === 'Trip' && <Trip truckdata={truckdata} />}
        {/* {selected === 'TyreList' && <TyreList  truckdata={truckdata} />} */}

    </ScrollView>
  );
};

export default Details;
const styles = StyleSheet.create({});
