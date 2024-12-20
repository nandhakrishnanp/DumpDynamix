import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextComponent,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import CustomStyle from '../../../custom';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OPeratorProfile = ({navigation, route}: any) => {
  const {operatordata} = route.params;

  useEffect(() => {
    console.log(operatordata);
  }, []);
  return (
    <View
      style={{
        backgroundColor: CustomStyle.colour.background,
      }}>
      <Image
        style={{
          width: '100%',
          height: 200,
        }}
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5FsdW50Sed-zDPxn6qGGSkVHd0TRaAuetQQ&s',
        }}
      />
      <View
        style={{
          padding: 15,
          flexDirection: 'row',
        }}>
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/10813/10813372.png',
          }}
        />
        <View
          style={{
            padding: 15,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: CustomStyle.colour.primary,
            }}>
            {operatordata.name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: CustomStyle.colour.accent,
            }}>
            Role: Operator
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            padding: 20,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Details :
        </Text>

        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: CustomStyle.colour.primary,
            padding: 10,
            borderRadius: 8,
          }}>
          <Text
            style={{
              fontSize: 17,
              padding:8,
              color: CustomStyle.colour.background,
            }}>
          Operator Id : {operatordata.operator_id}
          </Text>

          <Text
            style={{
              fontSize: 17,
              padding:8,
              color: CustomStyle.colour.background,
            }}>
            Email : {operatordata.email}
          </Text>
          <Text
            style={{
              fontSize: 17,
              padding:8,
              color: CustomStyle.colour.background,
            }}>
            Mobile : {operatordata.phone_number}
          </Text>
          <Text
            style={{
              fontSize: 17,
              padding:8,
              color: CustomStyle.colour.background,
            }}>
            Vechicle Id : {operatordata.vehicle_id}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OPeratorProfile;

const styles = StyleSheet.create({});
