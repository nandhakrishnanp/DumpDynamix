import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomStyle from '../../../../custom'

const FailedTyres = () =>{
  return (
    <View style={{
        backgroundColor:CustomStyle.colour.background,
        minHeight:"100%",
        alignItems:"center",
        justifyContent:"center"
    }}>
      <Text style={{
        textAlign:"center",
        fontSize:18
      }}>FailedTyres</Text>
    </View>
  )
}

export default FailedTyres

const styles = StyleSheet.create({})