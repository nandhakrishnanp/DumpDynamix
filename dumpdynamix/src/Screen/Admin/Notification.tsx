import {
  Alert,
  Image,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import axiosInstance from '../../../axiosconfig';
import PushNotification from 'react-native-push-notification';
import Vector from '../../../assets/notificationVector.svg';

import CustomStyle from '../../../custom';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import notificationDetail from '../operator/notification/notificationDetail';
import { format } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';
function Notification({navigation}:any) {


  const isFocused =useIsFocused()

  const [notification, setNotification] = useState<any>([]);
  const requestPermission = async () => {
    console.log('oAuthorization statud');
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Authorization status:', granted);
      
    } else {
      Alert.alert(
        'Permission Denied',
        'Notifications will not be shown without permission.',
      );
    }

    // const authStatus = await messaging().requestPermission();
    // const enabled =
    //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //   console.log('Authorization status:', authStatus);
    // }
    // else{
    //   console.log('oAuthorization status:', authStatus);
    // }
  };

  const sendFcmToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();

      await axiosInstance.post('/Fcptoken', {token: token});
    } catch (err: any) {
      //Do nothing
      console.log(err.response.data);
      return;
    }
  };


  const fetchNotificationData = async () => {
    const res = await axiosInstance.get(`/notification`);
    const response = await res.data;
    console.log('response', response);
    setNotification(response);
  };
  useEffect(() => {
    requestPermission();
    fetchNotificationData();
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log('A new FCM message arrived!', remoteMessage);
      
      PushNotification.localNotification({
        channelId: '102',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
        bigPictureUrl:
          'https://t3.ftcdn.net/jpg/04/52/82/90/360_F_452829077_JU5RhSmKQHYSi4mPpMaPIZweDiuIessf.jpg',
      });
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    if (isFocused) {
      fetchNotificationData();
    }
  }, [isFocused]);
  return (
    <ScrollView
    style={{
      backgroundColor: CustomStyle.colour.background,
    }}>
 
   
    {notification.length == 0 ? (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
        }}>
        <Vector width={200} height={200} />
        <Text
          style={{
            paddingVertical: 10,
            fontSize: 17,
            color: CustomStyle.colour.primary,
            fontWeight: 'bold',
          }}>
          No Notification Yet
        </Text>
      </View>
    ) : (
      <View>
        <Text
          style={{
            padding: 10,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Notifications
        </Text>

        {notification.map((item: any, index: any) => (
          <Pressable
          onPress={()=>{
             navigation.navigate('NotificationDetails', {item:item , isadmin:true}) 
          }}
            style={{
              backgroundColor: '#CACAFF',
              borderBottomColor: CustomStyle.colour.accent,
              borderBottomWidth: 0.3,
              padding: 10,
              marginHorizontal:10,
              paddingVertical: 20,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical:4,
              gap:10,
            }}
            key={index}>
            <View>
              
              <Image
              style={{width: 50, height: 50}}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/256/559/559343.png',
                }}
              />
            </View>
            <View  style={{
              padding: 10,
            }} > 
            
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: CustomStyle.colour.accent,
              }}>
              {item.title}
            </Text>
            <Text style={{
              color:CustomStyle.colour.primary,
              fontWeight:"800",
              marginVertical:3
            }}>Alert On {item.vehicle_id}</Text>
                      <Text style={{
            fontSize:12,
            color:CustomStyle.colour.accent
           }}>{format(new Date(item.createdAt),"dd-MM-yy hh:mm a")}</Text>
           
           </View>
          </Pressable>
        ))}
      </View>
    )}
  </ScrollView>
  );
}



 const notificationStack = ()=>{
  const stack = createNativeStackNavigator();

  return(

    <stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <stack.Screen name="Notification" component={Notification}/>
      <stack.Screen name="NotificationDetails" component={notificationDetail}/>
    </stack.Navigator>
  )
}
export default notificationStack;

const styles = StyleSheet.create({});
