import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import CustomStyle from '../custom';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Screen/Login';
import Dashboard from './Screen/Admin/Dashboard';
import Toast from 'react-native-toast-message';
import TruckDetails from './Screen/Admin/TruckDetails';
import PushNotification from 'react-native-push-notification';
import TabNavigation from './Screen/operator/TabNavigation';
import MaintanceBottomTab from './Screen/Maintanance/MaintanceBottomTab';
import MaintanaceStack from './Screen/Maintanance/MaintanaceStack';


const App = () => {

 
  const stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <stack.Navigator  initialRouteName='login'>
          <stack.Screen
            options={{
              headerShown: false,
            }}
            name="login"
            component={Login}
          />
          <stack.Screen
            options={{
              headerShown: false,
            }}
            name="maintance"
          
            component={MaintanaceStack}
          />
          <stack.Screen
            options={{
              headerShown: false,
            }}
            name="dashboard"
            component={Dashboard}
          />

        <stack.Screen  options={
          {headerShown:false}
        }  name="truckdetail" component={TruckDetails}    />

        <stack.Screen  options={
          {headerShown:false}
        }  name="operator" component={TabNavigation}    />
        </stack.Navigator>
      </NavigationContainer>
      <Toast visibilityTime={1300} />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
