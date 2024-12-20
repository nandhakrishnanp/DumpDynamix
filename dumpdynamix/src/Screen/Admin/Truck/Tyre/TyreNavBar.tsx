import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const TyreNavBar = () => {

    const [selected , setSelected] = useState('Pressure')
  return (
    <View>
      <Text>TyreNavBar</Text>
    </View>
  )
}

export default TyreNavBar

const styles = StyleSheet.create({})