import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaintanceBottomTab from './MaintanceBottomTab';
import MaintanceLogin from './MaintanceLogin';

const MaintanaceStack = () => {

    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
        
    }}>
        <Stack.Screen name="MaintanceLogin" component={MaintanceLogin} />  
      <Stack.Screen name="MaintanceBottomTab" component={MaintanceBottomTab} />
      
    </Stack.Navigator>
  )
}

export default MaintanaceStack

const styles = StyleSheet.create({})