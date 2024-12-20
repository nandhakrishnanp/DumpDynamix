import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomStyle from '../../custom'
import LottieView from 'lottie-react-native'


const Loading = () => {
  return (
    <View style={{
        minHeight:"100%",
        alignItems:"center",
        justifyContent:"center"
    }}>
         <LottieView 
        source={{uri:"https://lottie.host/128c4d55-fc14-4df3-a49d-6ac9abae7539/plWtPTylZw.lottie"}}
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
  
          marginTop: 20,
        }}
        />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})