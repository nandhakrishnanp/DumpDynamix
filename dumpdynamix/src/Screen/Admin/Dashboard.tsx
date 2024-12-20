import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';

import Notification from './Notification';
import Analytics from './Analytics';
import HomeIcon from '../../../assets/homeicon.svg';
import AnalyticsIcon from '../../../assets/analytics.svg';
import MapIcon from '../../../assets/map.svg';
import NotificationIcon from '../../../assets/bell.svg';
import InventoryIcon from '../../../assets/inventory.svg';
import CustomStyle from '../../../custom';
import TruckDetails from './TruckDetails';
import MapStack from './Map';
import Inventory from './Inventory/Inventory';


const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f8f8f8', // Background color of the tab bar
          height: 60, // Set the height of the tab bar
          paddingBottom: 5,
          paddingTop: 3, // Optional: adjust padding
        },
        tabBarActiveTintColor: CustomStyle.colour.primary, // Color of the active tab icon
        tabBarInactiveTintColor: '#8e8e93', // Color of the inactive tab icon
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <HomeIcon width={30} color={color} />,
          tabBarLabel: ({color}) => <Text style={{color: color,fontSize:13}}>Home</Text>,
        }}
      />
 
       <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({color}) => (
            <NotificationIcon width={30} color={color} />
          ),
          tabBarLabel: ({color}) => (
            <Text style={{color: color , fontSize:13}}>Notification</Text>
          ),
        }}
      />
      
      <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{
          tabBarIcon: ({color}) => <InventoryIcon width={30} color={color} />,
          tabBarLabel: ({color}) => (
            <Text style={{color: color , fontSize:13}}>Inventory</Text>
          ),
        }}
      />
      
      <Tab.Screen
        name="Map"
        component={MapStack}
        options={{
          tabBarIcon: ({color}) => <MapIcon width={30} color={color} />,
          tabBarLabel: ({color}) => <Text style={{color: color ,fontSize:13}}>Map</Text>,
        }}
      />
     
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
