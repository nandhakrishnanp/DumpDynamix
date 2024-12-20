import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomStyle from '../../../custom'
import axiosInstance from '../../../axiosconfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddInspection from './Inspection/AddInspection'
import Viewinpection from './Inspection/Viewinpection'
import { useIsFocused } from '@react-navigation/native';
import ChangeLanguage from './ChangeLanguage'

const Inspection = ({navigation}:any) => {

    const [Inspections , setInspections] =useState<any>(null)
    const [completedInception , setCompletedInception] =useState<any>(null)
    const [pendingInception , setPendingInception] =useState<any>(null)
    const isFocused = useIsFocused();
const getInspections = async () => {
try {
  const operator = await AsyncStorage.getItem('operator')
  console.log(JSON.parse(operator).vehicle_id);
  
   const res = await axiosInstance.get(`/inspection/${JSON.parse(operator).vehicle_id}`)
   const data = res.data
   console.log(data);
  const pendingInception =  data.filter((inspection:any)=>inspection.status === 'Pending')
  const completedInception =  data.filter((inspection:any)=>inspection.status === 'Approved')
  setCompletedInception(completedInception)
  setPendingInception(pendingInception)
    setInspections(data)
} catch (error) {
  Toast.show({
    type:'error',
    text1:'Error',
    text2:'Something went wrong'
  })
}
}

useEffect(()=>{

  if(isFocused){
  getInspections()
  }
},[isFocused])
  return (
    <ScrollView  style={{
      backgroundColor:CustomStyle.colour.background,
      paddingHorizontal:8
    }}>
      <View style={{
        padding:20,
        paddingHorizontal:15

      }}>
        <Text style={{
          fontSize:20,
          color:CustomStyle.colour.primary,
          fontWeight:'bold'
        }}>Weekly Inspections</Text>
      </View>
      <View style={{
        flexDirection:"row",
        gap:8,
        alignItems:'center',
      }}>

       <Text style={{
        width:10,
        height:10,
        borderRadius:6,
        backgroundColor:'red',
      }}></Text>
      <Text style={{
        fontSize:16,
        fontWeight:"bold"
      }}>Pending Inspections</Text>
    </View>

   {
    pendingInception && pendingInception.length>0 ? pendingInception.map((inspection:any)=>(
<Pressable  onPress={()=>{
  navigation.navigate('AddInspection',{
    inspection
  })
}}   >
<View style={{
  flexDirection:'row',
  justifyContent:'space-between',
  padding:10,
  backgroundColor:CustomStyle.colour.primary,
  borderRadius:6,
  margin:10,
  paddingVertical:25
}}>
  <View>
    <Text style={{
      fontSize:16,
      fontWeight:'bold',
      color:CustomStyle.colour.background
    }}>Inspection ID : {inspection._id.slice(-6)}</Text>
    <Text style={{
      fontSize:16,
      fontWeight:'bold',
      color:CustomStyle.colour.background
    }}>Inspection Week : {inspection.week}</Text>
  </View>
  <View>
    <Text style={{
      fontSize:16,
      paddingHorizontal:10,
      fontWeight:'bold',
      color:CustomStyle.colour.background
    }}>{inspection.status}</Text>
  </View>
  </View>
</Pressable>
    )) : <Text style={{
      fontSize:16,
      fontWeight:'bold',
      color:CustomStyle.colour.primary,
      textAlign:'center',
      margin:20
    }}>No Pending Inspections</Text>
   }

   
       


    <View style={{
        flexDirection:"row",
        gap:8,
        alignItems:'center',
      }}>

       <Text style={{
        width:10,
        height:10,
        borderRadius:6,
        backgroundColor:'green',
      }}></Text>
      <Text style={{
        fontSize:16,
        fontWeight:"bold"
      }}>Completed Inspections</Text>
    </View>

{
    completedInception && completedInception.length>0 ? completedInception.map((inspection:any)=>(
<Pressable  onPress={()=>{
  navigation.navigate('Viewinpection',{
    inspection
  })
}}>
<View style={{
  flexDirection:'row',
  justifyContent:'space-between',
  padding:10,
  backgroundColor:CustomStyle.colour.primary,
  borderRadius:6,
  margin:10,
  paddingVertical:25
}}>
  <View>
    <Text style={{
      fontSize:16,
      fontWeight:'bold',
      color:CustomStyle.colour.background
    }}>Inspection ID : {inspection._id.slice(-6)}</Text>
    <Text style={{
      fontSize:16,
      fontWeight:'bold',
      color:CustomStyle.colour.background
    }}>Inspection Week : {inspection.week}</Text>
  </View>
  <View>
    <Text style={{
      fontSize:16,
      fontWeight:'bold',
      paddingHorizontal:10,
      color:inspection.status === 'Pending' ? '#e36414' : 'white'
    }}>Completed</Text>
  </View>
  </View>
</Pressable>
    )) : <Text style={{
      fontSize:16,
      fontWeight:'bold',
      color:CustomStyle.colour.primary,
      textAlign:'center',
      marginTop:20
    }}>No Completed Inspections</Text>

}

    </ScrollView>
  )
}


const InspectionOperator = () => {

  const stack = createNativeStackNavigator()
  return (
   <stack.Navigator screenOptions={{
    headerShown:false
   }}>
      <stack.Screen name="Inspection" component={Inspection}/>
      <stack.Screen name="AddInspection" component={AddInspection}/>
      <stack.Screen name="Viewinpection" component={Viewinpection}/>
      <stack.Screen name="ChangeLanguage" component={ChangeLanguage}/>
    </stack.Navigator>
  )

}


export default InspectionOperator

const styles = StyleSheet.create({})