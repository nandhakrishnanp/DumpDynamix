import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import MaintanceNotification from './MaintanceNotification'
import Works from './Works'
import MaintanceLogin from './MaintanceLogin'
import CustomStyle from '../../../custom'

const MaintanceBottomTab = () => {
    const tab = createBottomTabNavigator();
  return (
    <tab.Navigator  screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f8f8f8', // Background color of the tab bar
          height: 60, // Set the height of the tab bar
          paddingBottom: 5,
          paddingTop: 3, // Optional: adjust padding
        },
        tabBarActiveTintColor: CustomStyle.colour.primary, // Color of the active tab icon
        tabBarInactiveTintColor: '#8e8e93', // Color of the inactive tab icon
    }} >
    
          <tab.Screen  options={{
          tabBarIcon: ({color}) => <Image style={{
            objectFit: 'contain',
          }} width={25} height={25} source={{uri:"https://www.pngall.com/wp-content/uploads/8/Task-List-PNG-Clipart.png"}}/>,
          tabBarLabel: ({color}) => <Text style={{color: color,fontSize:13}}>Works</Text>,
        }}  name="Works" component={Works} />
      <tab.Screen  options={{
          tabBarIcon: ({color}) => <Image width={30} height={30} source={{uri:"https://cdn-icons-png.flaticon.com/512/3119/3119338.png"}}/>,
          tabBarLabel: ({color}) => <Text style={{color: color,fontSize:13}}>Notification</Text>,
        }}  name="MaintanceNotification" component={MaintanceNotification} />
    
    
    </tab.Navigator>
  )
}

export default MaintanceBottomTab

const styles = StyleSheet.create({})