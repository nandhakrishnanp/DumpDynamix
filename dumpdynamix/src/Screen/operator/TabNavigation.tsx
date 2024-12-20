import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeOperator from './HomeOperator';
import InspectionOperator from './InspectionOperator';
import NotificationOperator from './NotificationOperator';
import TyreHealth from './TyreHealth';
import HomeIcon from '../../../assets/homeicon.svg';
import HealthIcon from '../../../assets/health.svg';
import NotificationIcon from '../../../assets/bell.svg';
import InspectioIcon from '../../../assets/inspection.svg';
import CustomStyle from '../../../custom';
const TabNavigation = () => {
  const tab = createBottomTabNavigator();

  return (
    <tab.Navigator
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
      }}>
      <tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => <HomeIcon width={30} color={color} />,
        }}
        name="HomeOperator"
        component={HomeOperator}
      />
      <tab.Screen
        options={{
          tabBarLabel: 'Inspection',
          tabBarIcon: ({color, size}) => <InspectioIcon />,
        }}
        name="InspectionOperator"
        component={InspectionOperator}
      />
      <tab.Screen
        options={{
          tabBarLabel: 'Dynamix',
          tabBarIcon: ({color, size}) => <HealthIcon color={color} />,
        }}
        name="Dynamix"
        component={TyreHealth}
      />
      <tab.Screen
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({color, size}) => <NotificationIcon width={30} />,
        }}
        name="NotificationOperator"
        component={NotificationOperator}
      />
    </tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
