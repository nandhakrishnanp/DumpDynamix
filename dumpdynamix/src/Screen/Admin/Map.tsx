import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MapComponent from '../../Components/Map'
import RoadQualityMap from '../../Components/RoadQualityMap';
import CustomStyle from '../../../custom';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TruckDetails from './TruckDetails';

const Map = ({navigation}:any) => {

   const [isRoadQuality , setIsRoadQuality] = useState(false);

   

  return (
    <View>
      {
        isRoadQuality ? <RoadQualityMap/> : <MapComponent navigation={navigation}/>
      }
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>  
       <Pressable onPress={()=>{
          setIsRoadQuality(false)
       }}>

          <Text style={{
            fontWeight: 'bold',
            color:CustomStyle.colour.background,
            borderRadius:10,
            padding:10,margin:10,
            backgroundColor: isRoadQuality ? CustomStyle.colour.secondary : CustomStyle.colour.primary,
          }}>Live Tracking</Text>
       </Pressable>
       <Pressable onPress={()=>{
          setIsRoadQuality(true)
       }}>

          <Text style={{
            fontWeight: 'bold',
            color:CustomStyle.colour.background,
            borderRadius:10,
            padding:10,margin:10,
            backgroundColor: isRoadQuality ? CustomStyle.colour.primary : CustomStyle.colour.secondary,
          }}>Road Quality Map</Text>
       </Pressable>
      
      </View>
    </View>
  )
}

const MapStack =()=>{
  const stack = createNativeStackNavigator();

   return(
    <stack.Navigator>
          <stack.Screen options={{
            headerShown:false
          }} name='Maps' component={Map} />
          <stack.Screen options={
            {
              headerShown:false
            }}
            name="TruchDetails" 
            component={TruckDetails}
          />
    </stack.Navigator>
   )

}

export default MapStack

const styles = StyleSheet.create({})