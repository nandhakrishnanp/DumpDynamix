/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './src/App';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const configureApp = ()=>{
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  
    PushNotification.createChannel(
      {
        channelId: '102',
        channelName: 'Firebase',
        channelDescription: 'A channel for general notifications',
      },
      (created) => console.log(`Channel created: ${created}`),
    );
  }
configureApp();

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    PushNotification.localNotification({
        channelId: '102',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
        bigPictureUrl:"https://t3.ftcdn.net/jpg/04/52/82/90/360_F_452829077_JU5RhSmKQHYSi4mPpMaPIZweDiuIessf.jpg"

      });
  
});


AppRegistry.registerComponent(appName, () => App);
