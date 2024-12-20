import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import CustomStyle from '../../../custom';
import Vector from '../../../assets/notificationVector.svg';
import axiosInstance from '../../../axiosconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import notificationDetail from './notification/notificationDetail';
import {format} from 'date-fns';

const NotificationOperator = ({navigation}: any) => {
  const [notification, setNotification] = useState<any>([]);
  const [vehicle_id, setVehicle_id] = useState<any>([]);
  const [suggestion, setSuggestion] =useState<any>([]);

  const isFocused = useIsFocused();
  const fetchNotificationData = async () => {
    const opertor = await AsyncStorage.getItem('operator');
    const vehicle = await JSON.parse(opertor).vehicle_id;
    setVehicle_id(vehicle);
    const res = await axiosInstance.get(`/notification/${vehicle}`);
    const response = await res.data;
    console.log('response', response);
    setNotification(response);
  };

 

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log('A new FCM message arrived!', remoteMessage);
      fetchNotificationData();
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
              onPress={() => {
                navigation.navigate('NotificationDetails', {item: item});
              }}
              style={{
                backgroundColor: '#CACAFF',
                borderBottomColor: CustomStyle.colour.accent,
                borderBottomWidth: 0.3,
                padding: 10,
                marginHorizontal: 10,
                paddingVertical: 20,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 4,
                gap: 10,
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
              <View
                style={{
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: CustomStyle.colour.accent,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: CustomStyle.colour.primary,
                    fontWeight: '800',
                    marginVertical: 3,
                  }}>
                  Alert On {item.vehicle_id}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: CustomStyle.colour.accent,
                  }}>
                  {format(new Date(item.createdAt), 'dd-MM-yy hh:mm a')}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const NotificatioStack = () => {
  const stack = createNativeStackNavigator();

  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="Notification" component={NotificationOperator} />
      <stack.Screen name="NotificationDetails" component={notificationDetail} />
    </stack.Navigator>
  );
};

export default NotificatioStack;

const styles = StyleSheet.create({});
