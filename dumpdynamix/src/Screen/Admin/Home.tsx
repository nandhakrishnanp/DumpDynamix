import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomStyle from '../../../custom';
import Profilimg from '../../../assets/profile.svg';
import Qr from '../../../assets/qr.svg';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraPage from '../../Components/Camera';
import Profile from './Profile';
import axiosInstance from '../../../axiosconfig';
import Toast from 'react-native-toast-message';
import TruckDetails from './TruckDetails';
import OPeratorProfile from '../operator/OPeratorProfile';
import ChangeOperator from '../../Components/ChangeOperator';
import TyreData from './Truck/Tyre/TyreData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Viewinpection from '../operator/Inspection/Viewinpection';

function HomeComponent({navigation}: any) {
  const [greeting, setGreeting] = useState<string>();
  const [truckData, setTruckData] = useState<any>();

  function GenrateGreet() {
    const hours = new Date().getHours(); // Get current hour (0-23)

    let greeting;

    if (hours >= 0 && hours < 12) {
      greeting = 'Good Morning';
    } else if (hours >= 12 && hours < 17) {
      greeting = 'Good Afternoon';
    } else {
      greeting = 'Good Evening';
    }

    return greeting;
  }

  const FetchTruckData = async () => {
    try {
      const res = await axiosInstance.get('/truck_Details');
      const response = await res.data;
      setTruckData(response);
      console.log(response);
    } catch (error: any) {
      Toast.show({
        type: 'Error While Fetching Data',
        text1: error.message,
      });
    }
  };

  useEffect(() => {
    setGreeting(GenrateGreet());
    FetchTruckData();
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: CustomStyle.colour.background,
        minHeight: '100%',
      }}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={() => navigation.push('Profile')}
          style={{
            alignItems: 'center',

            padding: 5,
          }}>
          <Profilimg width={50} height={50} />
          <Text
            style={{
              color: CustomStyle.colour.accent,
              fontWeight: 'bold',
            }}>
            Profile
          </Text>
        </Pressable>

        {/* <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: CustomStyle.colour.primary,
          }}>
          Welcome Admin
        </Text> */}
        <Pressable
          style={{
            alignItems: 'center',

            padding: 5,
          }}
          onPress={() => navigation.push('Camera')}>
          <Qr width={40} height={40} />
          <Text
            style={{
              color: CustomStyle.colour.accent,
              fontWeight: 'bold',
            }}>
            Quick QR
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          backgroundColor: CustomStyle.colour.primary,
          padding: 10,
          margin: 10,
          borderRadius: 10,
          justifyContent: 'center',

          height: 150,
        }}>
        <Text
          style={{
            color: CustomStyle.colour.background,
            fontSize: 20,
            paddingHorizontal: 20,
          }}>
          {greeting}{' '}
          <Text
            style={{
              fontWeight: 'bold',
            }}>
            {AsyncStorage.getItem('admin').then(res => {
              return JSON.parse(res).name;
            })}
          </Text>
        </Text>
        <Text
          style={{
            color: CustomStyle.colour.background,
            fontSize: 27,
            paddingHorizontal: 20,
            fontWeight: 'bold',
          }}>
          Wellcome Back !
        </Text>
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
          DashBoard
        </Text>
      </View>

      {truckData && truckData.length > 0 ? (
        <View
          style={{
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: '#479ae8',
                padding: 10,
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 13,
                margin: 2,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: CustomStyle.colour.background,
                }}>
                Total Trucks
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 30,
                  color: CustomStyle.colour.background,
                }}>
                {truckData.length}
              </Text>
            </View>
            <View
              style={{
                width: '50%',
              }}>
              <View
                style={{
                  backgroundColor: '#68b06b',
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  margin: 2,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: CustomStyle.colour.background,
                  }}>
                  Trucks Active
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    color: CustomStyle.colour.background,
                  }}>
                  {
                    truckData.filter((truck: any) => truck.status === 'driving')
                      .length
                  }
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#e36262',
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  margin: 2,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: CustomStyle.colour.background,
                  }}>
                  Trucks At Rest
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    color: CustomStyle.colour.background,
                  }}>
                  {
                    truckData.filter((truck: any) => truck.status === 'rest')
                      .length
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: CustomStyle.colour.primary,
            }}>
            Loading...
          </Text>
        </View>
      )}

      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          padding: 12,
          color: CustomStyle.colour.accent,
        }}>
        Trucks Details
      </Text>
      {truckData && truckData.length > 0 ? (
        <FlatList
          numColumns={2}
          data={truckData}
          keyExtractor={item => item._id}
          renderItem={(item: any) => (
            <Pressable
              onPress={() => {
                navigation.navigate('TruckDetails', item.item);
              }}
              style={{
                padding: 20,
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',

                margin: 5,
                borderRadius: 10,
              }}>
              <Image
                style={{
                  width: 110,
                  height: 100,
                }}
                source={{
                  uri: 'https://png.pngtree.com/png-vector/20240320/ourmid/pngtree-dump-truck-tipper-truck-png-image_12019297.png',
                }}
              />

              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: CustomStyle.colour.primary,
                }}>
                {item.item.vehicle_id}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'semi-bold',
                  fontSize: 16,
                  color: CustomStyle.colour.accent,
                }}>
                {item.item.truck_make}
              </Text>
            </Pressable>
          )}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: CustomStyle.colour.primary,
            }}>
            Loading...
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

export default function Home() {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="Homes" component={HomeComponent} />
      <stack.Screen name="Camera" component={CameraPage} />
      <stack.Screen name="Profile" component={Profile} />
      <stack.Screen name="TruckDetails" component={TruckDetails} />
      <stack.Screen name="OperatorProfile" component={OPeratorProfile} />
      <stack.Screen name="ChangeOperator" component={ChangeOperator} />
      <stack.Screen name="TyreData" component={TyreData} />
      <stack.Screen name="Viewinpection" component={Viewinpection} />
    </stack.Navigator>
  );
}
const styles = StyleSheet.create({});
