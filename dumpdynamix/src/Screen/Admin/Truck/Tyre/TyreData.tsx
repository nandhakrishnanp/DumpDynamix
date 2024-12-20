import {Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomStyle from '../../../../../custom';
import CircleChart from '../../../../Components/CircleChart';
import PressureVsDateChart from '../../../../Components/PressureChart';
import {format} from 'date-fns';

import Document from '../../../../../assets/Document.svg'
import History  from '../../../../../assets/history.svg'
import TyreSpec from './TyreSpec';
import Cost from './Cost';
import Log from './Log';
const TyreData = ({navigation, route}: any) => {
  const {tyrePressureData} = route.params;
  const [selected, setSelected] = useState('Spec')

  const fullform = (position: string) => {
    if (position === 'FL') {
      return 'Front Left';
    }
    if (position === 'FR') {
      return 'Front Right';
    }
    if (position === 'RL1') {
      return 'Rear Left 1';
    }
    if (position === 'RL2') {
      return 'Rear Left 2';
    }
    if (position === 'RR1') {
      return 'Rear Right 1';
    }
    if (position === 'RR2') {
      return 'Rear Right 2';
    }
  };
  useEffect(() => {
    console.log('data', tyrePressureData);
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: CustomStyle.colour.background,
        height: '100%',
      }}>
      {' '}

      <View style={{
        flexDirection:"row",
        alignItems:"center",
        width:380,
        justifyContent:"flex-end",
        gap:10,
      }} >
        <View style={{
          flexDirection:"row",
          alignItems:"center",
          gap:5
        }}>
        <Image  width={40} height={40} source={{
          uri:"https://uxwing.com/wp-content/themes/uxwing/download/computers-mobile-hardware/battery-charge-level-100-percent-icon.png"
        }}/>
           <Text style={{
            fontSize:18,
            fontWeight:"bold"
           }}>{tyrePressureData.battery_Percentage}</Text>
        </View>
       
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 30,
        }}>
        <Image
          width={200}
          height={200}
          source={{
            uri: 'https://png.pngtree.com/png-vector/20240129/ourmid/pngtree-truck-wheel-with-new-tires-parts-png-image_11512198.png',
          }}
        />
        <Text
          style={{
            color: CustomStyle.colour.accent,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
          Tyre ID : {tyrePressureData.tyre_id}
        </Text>
        <Text
          style={{
            color: CustomStyle.colour.accent,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
          Tyre Position : {fullform(tyrePressureData.tyre_position)}
        </Text>
      </View>
      <View
        style={{
          padding: 10,

          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: CustomStyle.colour.primary,
          }}>
          <Text
            style={{
              backgroundColor: CustomStyle.colour.primary,
              color: 'white',
              padding: 10,
              borderRadius: 5,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {tyrePressureData.tyre_pressure} PSI
          </Text>
          <Text
            style={{
              color: CustomStyle.colour.accent,
              fontWeight: 'bold',
              fontSize: 16,
              padding: 2,
            }}>
            Current Tyre Pressure
          </Text>
        </View>
      </View>
      <View>

      </View>
   <View
     style={{
      marginVertical:10,
      
      flexDirection:'row',
      gap:15
     }}
   >

    <Pressable
    onPress={()=>{
      setSelected('Spec')
    }}
    style={{
      flexDirection:'row',
      alignItems:'center',
      gap:3,
      marginLeft:10,
      borderBottomColor:CustomStyle.colour.primary,
      borderBottomWidth:selected === 'Spec' ? 2 : 0,
      paddingBottom:4,
    }}>
    <Document width={30} height={30}/>
      <Text style={{
        fontSize:18,
       
        fontWeight:"bold"
      }}>
         Details
      </Text>
    </Pressable>


    <Pressable
    onPress={()=>{
      setSelected('Cost')
    }}
    style={{
      flexDirection:'row',
      alignItems:'center',
      gap:3,
      marginLeft:10,
      borderBottomColor:CustomStyle.colour.primary,
      borderBottomWidth:selected === 'Cost' ? 2 : 0,
      paddingBottom:4,
    }}>
   <Image style={{
      width:25,
      height:25
   }} source={{uri:"https://cdn-icons-png.flaticon.com/512/25/25473.png"}}/>
      <Text style={{
        fontSize:18,
        fontWeight:"bold"
      }}>
         Cost
      </Text>
    </Pressable>

    
    <Pressable
    onPress={()=>{
      setSelected('Log')
    }}
    style={{
      flexDirection:'row',
      alignItems:'center',
      gap:3,
      marginLeft:10,
      borderBottomColor:CustomStyle.colour.primary,
      borderBottomWidth:selected === 'Log' ? 2 : 0,
      paddingBottom:4,
    }}>
    <History width={30} height={30}/>
      <Text style={{
        fontSize:18,
        fontWeight:"bold"
      }}>
         Expense Log
      </Text>
    </Pressable>
   </View>

    {/* tyre specification */}
     
     {
        selected === 'Spec' && <TyreSpec
        tyrePressureData={tyrePressureData} />
     }
  {
    selected=='Cost' &&<Cost  tyre={tyrePressureData}  />
  }
  {
    selected === 'Log' && <Log  tyre_id={tyrePressureData.tyre_id}/>
  }
    

      
    </ScrollView>
  );
};

export default TyreData;

const styles = StyleSheet.create({});
