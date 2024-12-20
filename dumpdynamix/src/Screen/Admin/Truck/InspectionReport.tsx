import { ScrollView, StyleSheet, Text, View ,Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../../axiosconfig';
import CustomStyle from '../../../../custom';

const InspectionReport = ({truckdata,navigation}:any) => {

  const truck_id = truckdata.truckData.vehicle_id;

  const [Inspections , setInspections] =useState<any>(null)
    const [completedInception , setCompletedInception] =useState<any>(null)
    const [pendingInception , setPendingInception] =useState<any>(null)

    const getInspections = async () => {
      try {
      
         const res = await axiosInstance.get(`/inspection/${truck_id}`)
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
     
        getInspections()
        
      },[])
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
<Pressable   >
<View style={{
  flexDirection:'row',
  justifyContent:'space-between',
  padding:10,
  backgroundColor:CustomStyle.colour.primary,
  borderRadius:10,
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
      color:inspection.status === 'Pending' ? 'red' : 'green'
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
  borderRadius:10,
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

export default InspectionReport

const styles = StyleSheet.create({})