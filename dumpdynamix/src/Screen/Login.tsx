import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,

} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomStyle from '../../custom';
import axiosInstance from '../../axiosconfig';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
export default function Login({navigation}: any) {


  useEffect(() => {
    AsyncStorage.getItem('isLogin').then(val => {
      if (val === 'true') {

        AsyncStorage.getItem('admin').then(val => {
          if (val) {
            navigation.replace('dashboard');
          }
          else {
            navigation.replace('operator');
          }
        }
      
        );
      }

    });
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

const GenerateFcmToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();

      return token;
    } catch (err: any) {
      //Do nothing
      console.log(err.response.data);
      return;
    }
  };

  
  
const handleAdminLogin = async () => {
    try {
      if (email === '' || password === '') {
        Toast.show({
          type: 'error',
          text2: 'Please fill all the fields',
        });
      } else {
        const token = await GenerateFcmToken();
        const res = await axiosInstance.post('/api/login', {
          email,
          password,
          token,
        });
        const response = res.data;

        if (response && response.adminId) {
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
          });
          await AsyncStorage.setItem('isLogin', 'true');
      
          await AsyncStorage.setItem('admin', JSON.stringify(response.admin));
          navigation.replace('dashboard');
        } else {
          Toast.show({
            type: 'error',
            text1: response.message,
          });
        }
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }
  };

  const handleOperatorLogin = async () => {

    try {
      if (email === '' || password === '') {
        Toast.show({
          type: 'error',
          text2: 'Please fill all the fields',
        });
      } else {
        const token = await GenerateFcmToken();
        const res = await axiosInstance.post('/api/loginoperator', {
          email,
          password,
          token,
        });
        const response = res.data;

        if (response && response.operator) {
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
          });
          await AsyncStorage.setItem('isLogin', 'true');
          await AsyncStorage.setItem('operator', JSON.stringify(response.operator));

          navigation.replace('operator');
        } else {
          Toast.show({
            type: 'error',
            text1: response.message,
          });
        }
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }
  }

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: isAdmin ? CustomStyle.colour.background : CustomStyle.colour.secondary,
        justifyContent: 'center',
      }}>
      <View>

   <View style={{
    alignItems: 'center',
    justifyContent: 'center',
    margin:10
   }}>

<Image style={{
  borderRadius:80
}} width={110} height={110}  source={{uri:"https://thumbs.dreamstime.com/b/flat-design-illustration-yellow-dump-truck-simple-purple-backdrop-cartoon-dump-truck-purple-background-318751137.jpg"}}/>
  <Text style={{
    padding:10,
    fontSize:18,
    fontWeight:'bold',
  }}> {isAdmin ? "Admin" :"Operators"}</Text>
   </View>
        <Text
          style={{
            fontSize: 28,
            textAlign: 'center',
            color: CustomStyle.colour.primary,
            fontWeight: 'bold',
            alignItems: 'flex-start',
          }}>
          Login into DumpDynamix
        </Text>

        <View style={{margin: 10}}>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            onFocus={() => setEmailFocused(true)} // Set focus
            onBlur={() => setEmailFocused(false)} // Remove focus
            style={{
              backgroundColor: '#EAE8F2',
              padding: 10,
              margin: 10,
              borderRadius: 5,
              borderWidth: isEmailFocused ? 1 : 0, // Add border if focused
              borderColor: CustomStyle.colour.primary, // Set the border color
            }}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
            onFocus={() => setPasswordFocused(true)} // Set focus
            onBlur={() => setPasswordFocused(false)} // Remove focus
            style={{
              padding: 10,
              backgroundColor: '#EAE8F2',
              margin: 10,
              borderRadius: 5,
              borderWidth: isPasswordFocused ? 1 : 0, // Add border if focused
              borderColor: CustomStyle.colour.primary, // Set the border color
            }}
          />

          <Pressable
            onPress={() => {
              if (isAdmin) {
                handleAdminLogin();
              }else{
                handleOperatorLogin();
              }
            }}>
            <Text
              style={{
                backgroundColor: CustomStyle.colour.primary,
                padding: 10,
                margin: 10,
                borderRadius: 5,
                color: 'white',
                textAlign: 'center',
              }}>
              Login
            </Text>
          </Pressable>
        </View>


{
     isAdmin ? 
     <TouchableOpacity
       onPress={() => {
         setIsAdmin(false);
       }}>
       <Text
         style={{
           textAlign: 'center',
           color: CustomStyle.colour.primary,
           marginTop: 20,
           fontSize: 17,
           textTransform: 'capitalize',
         }}>
         If you are an Operator ? Click here
       </Text>
     </TouchableOpacity> : <TouchableOpacity
       onPress={() => {
         setIsAdmin(true);
       }}>
       <Text
         style={{
           textAlign: 'center',
           color: CustomStyle.colour.primary,
           marginTop: 20,
           fontSize: 17,
           textTransform: 'capitalize',
         }}>
         If you are an Admin ? Click here
       </Text>
     </TouchableOpacity>
}


 <TouchableOpacity
       onPress={() => {
         navigation.navigate('maintance');
       }}>
       <Text
         style={{
           textAlign: 'center',
           color: CustomStyle.colour.primary,
           marginTop: 20,
           fontSize: 17,
           textTransform: 'capitalize',
         }}>
         Maintanance Login
       </Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({});
