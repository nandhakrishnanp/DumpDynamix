import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Profilimg from '../../../assets/profile.svg';
import CustomStyle from '../../../custom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OPeratorProfile from './OPeratorProfile';
import Logout from '../../../assets/logout.svg';
import axiosInstance from '../../../axiosconfig';
import Toast from 'react-native-toast-message';
import Details from '../Admin/Details';
import DonutChartWithPayload from '../../Components/PieCharComponent';
import Tkph from '../Admin/Truck/Tkph';
import LottieView from 'lottie-react-native';
const Home = ({navigation}: any) => {
  const [truckdata, setTruckDetails] = useState(null);

  const getTruckDetails = async () => {
    const operaordata = await AsyncStorage.getItem('operator');
    const operatordata = JSON.parse(operaordata);
    const vehicle_id = operatordata.vehicle_id;

    console.log('vehicle_id', vehicle_id);

    const res = await axiosInstance.get(`/truck_Details/${vehicle_id}`);
    const response = await res.data;
    console.log('response', response);
    setTruckDetails(response.truckData);
  };

  useEffect(() => {
    getTruckDetails();
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: CustomStyle.colour.background,
      }}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={async () => {
            const operaordata = await AsyncStorage.getItem('operator');
            if (operaordata) {
              const operatordata = JSON.parse(operaordata);
              navigation.navigate('OperatorProfile', {
                operatordata: operatordata,
              });
            }
          }}>
          <Profilimg width={50} height={50} />
        </Pressable>

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: CustomStyle.colour.primary,
          }}>
          DumperDynamix
        </Text>

        <Pressable
          onPress={async () => {
            const operator = await AsyncStorage.getItem('operator');

            await axiosInstance.post('/api/logoutOperator', {
              email: operator ? JSON.parse(operator).email : null,
            });

            await AsyncStorage.removeItem('operator');
            await AsyncStorage.setItem('isLogin', 'false');
            navigation.replace('login');
            Toast.show({
              type: 'success',
              text1: 'Logout Successful',
            });
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: CustomStyle.colour.accent,
            }}>
            Logout
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          alignItems: 'center',
          backgroundColor: CustomStyle.colour.secondary,
          paddingBottom: 30,
          borderStartEndRadius: 60,
          borderEndEndRadius: 60,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            style={{
              objectFit: 'contain',
            }}
            width={200}
            height={200}
            source={{
              uri: 'https://www.komatsu.eu/-/media/projects/komatsu/products/rigid-dump-trucks/hd605_10.ashx?rev=7dca69f79bf44b8ab99599a29c134970',
            }}
          />
        </View>

        {truckdata ? (
          <>
            <View
              style={{
                gap: 10,
                padding: 10,

                borderRadius: 7,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',

                  color: CustomStyle.colour.accent,
                }}>
                Truck Id : {truckdata.vehicle_id}
              </Text>

              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',

                  color: CustomStyle.colour.accent,
                }}>
                Truck Make : {truckdata.truck_make}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',

                  color: CustomStyle.colour.accent,
                }}>
                Truck Model : {truckdata.model}
              </Text>
            </View>
          </>
        ) : (
          <View>
    <LottieView 
        source={{uri:"https://lottie.host/128c4d55-fc14-4df3-a49d-6ac9abae7539/plWtPTylZw.lottie"}}
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
          marginTop: 20,
        }}
        />
          </View>
        )}
      </View>

      {truckdata ? (
        <View
          style={{
            padding: 10,
            paddingVertical: 23,
            marginVertical: 13,
            marginHorizontal: 18,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: CustomStyle.colour.primary,
            }}>
            Payload Details
          </Text>

          <DonutChartWithPayload
            maxPayload={truckdata.maximum_payload}
            currentPayload={truckdata.payload_in_tones}
          />
          <View
            style={{
              alignItems: 'center',
              padding: 10,
              paddingVertical: 8,
            }}>
            <Text
              style={{
                color: CustomStyle.colour.accent,
                fontSize: 16,
                fontWeight: 'bold',

              }}>
              Maximum Payload : {truckdata.maximum_payload} Tonnes
            </Text>
            <Text
            style={{
              color: CustomStyle.colour.accent,
              fontSize: 16,
              fontWeight: 'bold',
            }}
            >Current Payload : {truckdata.payload_in_tones} Tonnes</Text>
          </View>
        </View>
      ) : (
        <View>
          <LottieView 
        source={{uri:"https://lottie.host/128c4d55-fc14-4df3-a49d-6ac9abae7539/plWtPTylZw.lottie"}}
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
  
          marginTop: 20,
        }}
        />
        </View>
      )}

      {truckdata ? (
        <View
          style={{
            padding: 10,
            paddingVertical: 23,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: CustomStyle.colour.primary,
            }}>
            Tonne Kilometer Per Hour
          </Text>

          <Tkph
            truckdata={{
              truckData: {
                vehicle_id: truckdata.vehicle_id,
              },
            }}
          />
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const HomeOperator = ({navigation}: any) => {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="Home" component={Home} />
      <stack.Screen name="OperatorProfile" component={OPeratorProfile} />
    </stack.Navigator>
  );
};

export default HomeOperator;

const styles = StyleSheet.create({});
