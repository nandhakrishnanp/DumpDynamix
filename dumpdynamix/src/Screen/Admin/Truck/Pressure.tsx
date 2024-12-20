import {View, Text, Image, ScrollView, Pressable, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomStyle from '../../../../custom';
import axiosInstance from '../../../../axiosconfig';

const Pressure = ({navigation,truckdata}:any) => {
  
  const [tyrePressureData , setTyrePressureData] = useState<any>();

  const [FL, setFL] = useState(0);
  const [FR, setFR] = useState(0);
  const [RL1, setRL1] = useState(0);
  const [RL2, setRL2] = useState(0);
  const [RR1, setRR1] = useState(0);
  const [RR2, setRR2] = useState(0);
    const truck_id = truckdata.truckData.vehicle_id;
   const getTyrePressureData = async () => {
    const res = await axiosInstance.get(`/truck_Details/tyre/${truck_id}`)
    const response = await res.data
    console.log(response);
    
    setTyrePressureData(response);
   }
  let dataval = {
    truck: {
      tyrePressure: 30,
    },
  };

  useEffect(()=>{
   if(tyrePressureData){
      
    tyrePressureData.map((item:any)=>{
         if(item.tyre_position === 'FL'){
             setFL(item.tyre_pressure)
         }
          if(item.tyre_position === 'FR'){
              setFR(item.tyre_pressure)
          }
          if(item.tyre_position === 'RL1'){
              setRL1(item.tyre_pressure)
          }
          if(item.tyre_position === 'RL2'){
              setRL2(item.tyre_pressure)
          }
          if(item.tyre_position === 'RR1'){
              setRR1(item.tyre_pressure)
          }
          if(item.tyre_position === 'RR2'){
              setRR2(item.tyre_pressure)
          }

    })

   }
  },[tyrePressureData])
  useEffect(()=>{
    getTyrePressureData()
  },[])
  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    style={{
      backgroundColor:CustomStyle.colour.background,
    }}>
      <View>
        <Text style={{fontSize: 20, padding: 20, fontWeight: 'bold'}}>
          Tyre Pressure{' '}
          <Text style={{color: CustomStyle.colour.primary}}>Realtime</Text>
        </Text>
      </View>

      <View style={{alignItems: 'center', position: 'relative'}}>
        <Text
          style={{
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            position: 'absolute',
            left: 62,
            top: 94,
          }}>
          {FL}
        </Text>
        <Text
          style={{
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            position: 'absolute',
            left: 295,
            top: 94,
          }}>
          {FR}
        </Text>

        <Text
          style={{
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            position: 'absolute',
            left: 50,
            top: 390,
          }}>
          {RL1}
        </Text>
        <Text
          style={{
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            position: 'absolute',
            left: 116,
            top: 450,
          }}>
          {RL2}
        </Text>
        <Text
          style={{
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            position: 'absolute',
            left: 310,
            top: 390,
          }}>
          {RR1}
        </Text>
        <Text
          style={{
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            position: 'absolute',
            left: 250,
            top: 450,
          }}>
          {RR2}
        </Text>
        <Image
          style={{width: 250, height: 500}}
          source={{
            uri: 'https://i.postimg.cc/nrZPz9r3/Chassis-removebg-preview.png',
          }}
        />
      </View>

      <View>
        <Text
          style={{
            fontSize: 20,
            padding: 20,
            fontWeight: 'bold',

            color: CustomStyle.colour.accent,
          }}>
          Tyre Wise Analysis
        </Text>

      </View>

      {
        tyrePressureData && tyrePressureData.map((item:any)=>{
          return(
            <TouchableOpacity onPress={()=>{
              navigation.push("TyreData",{
                tyrePressureData:item
              })
            }} style={{elevation:2,borderRadius:8,paddingVertical:27,padding: 18, marginHorizontal: 18,marginVertical:5, backgroundColor: '#b8b8ff',

              flexDirection:"row",
              alignItems:"center"
            }}>
              
              <View>
                <Image width={100} height={100} source={{uri:"https://static.vecteezy.com/system/resources/thumbnails/036/396/403/small/ai-generated-tire-of-truck-on-transparent-background-ai-generated-png.png"}}/>
              </View>
              <View style={{
                
              }}>
              <Text style={{fontSize: 16, padding:4,

                fontWeight:"800"
              }}>
              Tyre Id: {item.tyre_id}
            </Text>
            <Text style={{fontSize: 16, padding:4 ,  fontWeight:"800" }}>
              Tyre Position: {item.tyre_position}
            </Text>
            <Text style={{fontSize: 16, padding:4 ,   fontWeight:"800"}}>
              Tyre Pressure: {item.tyre_pressure} PSI
            </Text>
              </View>
          </TouchableOpacity>
          )
        } 
        )
      }
    </ScrollView>
  );
};

export default Pressure;
