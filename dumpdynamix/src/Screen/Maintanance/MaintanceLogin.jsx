import {Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomStyle from '../../../custom';
import Toast from 'react-native-toast-message';

const MaintanceLogin = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [TeamId, setTeamId] = React.useState('');



  const checkLogin = () => {
    if (email === 'kumar@gmail.com' && password === 'admin') {
      navigation.replace('MaintanceBottomTab');
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Login Success',
        visibilityTime: 2000,
      });
    } else {
      alert('Invalid Email or Password');
    }
  }
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: CustomStyle.colour.secondary,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{
        width: '80%',
        backgroundColor: CustomStyle.colour.primary,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }} >
        <Image style={{
          width: 100,
          height: 100,
        }} source={{uri:"https://png.pngtree.com/png-clipart/20240418/original/pngtree-maintenance-technician-cartoon-png-image_14887468.png"}}/>
        <Text
          style={{
            fontSize: 18,
            color: CustomStyle.colour.background,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Maintanance  Login
        </Text>
 
        <View style={{
          width: '80%',
       
        }}>
           
          <TextInput
             style={{
              backgroundColor: '#EAE8F2',
              padding: 10,
              marginVertical: 10,
              borderRadius: 5,
              borderWidth: 1, // Add border if focused
              borderColor: CustomStyle.colour.primary, // Set the border color,
           
            }}
            placeholder='Enter Email'
            onChangeText={text => setEmail(text)}
            value={email}
          />
            <TextInput
             style={{
              backgroundColor: '#EAE8F2',
              padding: 10,
              marginVertical: 10,
              borderRadius: 5,
              borderWidth: 1, // Add border if focused
              borderColor: CustomStyle.colour.primary, // Set the border color,
           
            }}
            secureTextEntry={true}
            placeholder='Enter Password'
            onChangeText={text => setPassword(text)}
            value={password}
            //passwordRules={true}
          />
            
          
        </View>

        <TouchableOpacity onPress={()=>
          checkLogin()
        } style={{

        }}>
          <Text
            style={{
              backgroundColor: CustomStyle.colour.background,
              padding: 10,
              borderRadius: 5,
              color: CustomStyle.colour.primary,
              fontWeight: 'bold',
              marginVertical: 10,
              textAlign: 'center',
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MaintanceLogin;

const styles = StyleSheet.create({});
