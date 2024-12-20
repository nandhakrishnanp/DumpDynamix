import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomStyle from '../../../custom'
import Logout from '../../../assets/logout.svg'
import Email from '../../../assets/email.svg'

import AsyncStorage from '@react-native-async-storage/async-storage'
import axiosInstance from '../../../axiosconfig'
import Toast from 'react-native-toast-message'
export default function Profile({navigation}:any) {
   const [admin,setAdmin]=useState<any>(null)
   const getAdmin=async()=>{
     const admin=await AsyncStorage.getItem('admin')
     setAdmin(JSON.parse(admin))
     console.log(admin);
     
   }
  useEffect(()=>{
    getAdmin()
  },[])



  return (
    <View style={{
      backgroundColor:CustomStyle.colour.background,
    }}>

      <Image style={{
        width:'100%',
        height:170,
      }} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOmAPmzTbTF5HUFu6Mcz5B5y0hVRf7AaOQFA&s"}} />
      <View style={{
        padding:15 ,
        flexDirection:'row'
      }}>
      <Image style={{
        width:80,
        height:80,
      }} source={{uri:"https://cdn-icons-png.flaticon.com/512/10813/10813372.png"}} />
      <View style={{
        padding:15
      }}>
        <Text style={{
          fontSize:20,
          fontWeight:'bold',
          color:CustomStyle.colour.primary
        }}>{admin ? admin.name : "Admin"}</Text>
               <Text style={{
          fontSize:15,
          fontWeight:'bold',
          color:CustomStyle.colour.accent
        }}>{admin ? admin.email :null}</Text>
        </View>
 
      </View>
        
      <View style={{
        alignItems:'center',
      }}>
          <Pressable  onPress={async()=>{

           await axiosInstance.post("/api/logoutAdmin",{email : admin.email});
            await AsyncStorage.removeItem('admin')

  await AsyncStorage.setItem('isLogin','false')
 navigation.replace('login')
 Toast.show({
  type:'success',
  text1:'Logout',
  text2:'Successfully Logged Out'
})
          }} style={{
            paddingHorizontal:10,
            paddingVertical:2,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:"center",
            backgroundColor:"#ef233c",
            borderRadius:10,
            width:'50%',
          
          }}>
         
              <Logout   width={40} height={40}/>
             <Text style={{
                color:CustomStyle.colour.background,
                fontWeight:'bold',
                fontSize:20,
                paddingHorizontal:10
             }}>Logout</Text>
          </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})