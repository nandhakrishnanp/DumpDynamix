import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../axiosconfig';
import Toast from 'react-native-toast-message';
import CustomStyle from '../../../custom';
import RadialVariant from '../../Components/SpeedoMeter';
import PayloadMeter from '../../Components/Payloadmeter';
import LanguageIcon from '../../../assets/language.svg';
import {useIsFocused} from '@react-navigation/native';
import TkphMeter from '../../Components/TkphMeter';
import {loadLocalRawResource} from 'react-native-svg';
import LottieView from 'lottie-react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChangeLanguage from './ChangeLanguage';

const TyreHealth = ({navigation}: any) => {
  const isFocus = useIsFocused();
  const [language, setLanguage] = useState('en-US');
  const [modalVisible, setModalVisible] = useState(false);
  const [vehicleId, setVehicleId] = useState('');
  const [speakingText, setSpeakingText] = useState('');
  const [TruckData, setTruckData] = useState(null);
  const [FL, setFL] = useState(null);
  const [FR, setFR] = useState(null);
  const [RL1, setRL1] = useState(null);
  const [RL2, setRL2] = useState(null);
  const [RR1, setRR1] = useState(null);
  const [RR2, setRR2] = useState(null);
  const [tkphData, setTkphData] = useState(null);
  const languageOptions = [
    {label: 'English', value: 'en-US'},
    {label: 'Tamil', value: 'ta-IN'},
    {label: 'Marathi', value: 'mr-IN'},
    {label: 'Hindi', value: 'hi-IN'},
  ];

  const languageDialogs = {
    'en-US': 'Pressure is low in the front left tyre',
    'ta-IN': 'முன் இடது சக்கரத்தில் அழுத்தம் குறைவாக உள்ளது',
    'mr-IN': 'सामने डाव्या टायरमध्ये दाब कमी आहे',
    'hi-IN': 'सामने बाएं टायर में दबाव कम है',
  };

  const getPosition = position => {
    switch (position) {
      case 'FL':
        return 'front left';
      case 'FR':
        return 'front right';
      case 'RL1':
        return 'rear left 1';
      case 'RL2':
        return 'rear left 2';
      case 'RR1':
        return 'rear right 1';
      case 'RR2':
        return 'rear right 2';
      default:
        return '';
    }
  };
  const speak = (promt: string, languages: string) => {
    Tts.setDefaultLanguage(languages);
    setSpeakingText(promt);
    setTimeout(() => setSpeakingText(''), 4000);
    Tts.speak(promt); // Speak the
  };
  const TyrePressureAlert = async (state, position, percent) => {
    const percentage =
      typeof percent === 'number' ? percent.toFixed(2) : percent.slice(0, 4);

    position = getPosition(position);
    const PressureDialogs = {
      'en-US': `Tyre pressure is ${state} in the ${position} tyre by ${percentage}%.`,
      'ta-IN': `சக்கரத்தின் அழுத்தம் ${state} ஆக உள்ளது ${position} சக்கரத்தில் ${percentage}%.`,
      'mr-IN': `टायरमध्ये दाब ${state} आहे ${position} टायरमध्ये ${percentage}%.`,
      'hi-IN': `टायर में दबाव ${state} है ${position} टायर में ${percentage}%.`,
    };

    const currentLang = await AsyncStorage.getItem('language');
    console.log('cureent', currentLang);
    if (currentLang) {
      speak(PressureDialogs[currentLang], currentLang);
    } else {
      Alert.alert('Please Select Language');
    }
  };

  useEffect(() => {
    const fetchVehicleId = async () => {
      try {
        const cLanguage = AsyncStorage.getItem('language');
        if (cLanguage) {
          setLanguage(cLanguage);
        }
        const operatorData = await AsyncStorage.getItem('operator');
        const parsedData = await JSON.parse(operatorData);
        if (parsedData) {
          setVehicleId(parsedData.vehicle_id);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Operator data not found',
            text2: 'Please log in again',
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error retrieving operator data',
          text2: error.message,
        });
      }
    };

    fetchVehicleId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!vehicleId) {
          return; // Prevent fetching if vehicleId is not set.
        }

        const res = await axiosInstance.get(
          `/truck_Details/display/${vehicleId}`,
        );
        setTruckData(res.data);
        console.log(res.data);

        const response = await axiosInstance.get(`/tkph/${vehicleId}`);
        const data = response.data;
        setTkphData(data.tkphData);
        console.log(data.tkphData);
        res.data.pressureData.forEach(item => {
          if (Number(item.pressure) !== 0) {
            const standardPressure = Number(item.standard_pressure);
            const pressure = Number(item.pressure);

            if (pressure < standardPressure * 0.75) {
              TyrePressureAlert(
                'low',
                item.tyre_position,
                (pressure / standardPressure) * 100 - 100,
              );
            } else if (pressure > standardPressure ) {
              TyrePressureAlert(
                'high',
                item.tyre_position,
                (pressure / standardPressure) * 100 - 100,
              );
            }
          }

          switch (item.tyre_position) {
            case 'FL':
              setFL(item);
              break;
            case 'FR':
              setFR(item);
              break;
            case 'RL1':
              setRL1(item);
              break;
            case 'RL2':
              setRL2(item);
              break;
            case 'RR1':
              setRR1(item);
              break;
            case 'RR2':
              setRR2(item);
              break;
            default:
              break;
          }
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Data Fetch Error',
          text2: error.message,
        });
      }
    };

    let interval;
    if (isFocus && vehicleId) {
      fetchData();
      interval = setInterval(fetchData, 5000);
    }
    return () => {
      clearInterval(interval);
      Tts.stop();
    };
  }, [isFocus, vehicleId]);

  return (
    <ScrollView
      style={{
        backgroundColor: CustomStyle.colour.background,
        minHeight: '100%',
        width: '100%',
      }}>
      {tkphData ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: CustomStyle.colour.primary,
                padding: 10,
              }}>
              DumpDynamix
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChangeLanguage');
              }}>
              <LanguageIcon width={35} height={35} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              // flexDirection:"row",
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            {TruckData && (
              <>
                <RadialVariant speeds={TruckData.loadData.current_speed} />
                {speakingText ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: CustomStyle.colour.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 380,
                      margin: 10,
                      padding: 10,
                      borderRadius: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center',
                      }}>
                      {speakingText}
                    </Text>
                    {/* <LottieView
                      source={{
                        uri: 'https://lottie.host/d0d44a89-99e1-400d-b841-5c910b2f85b2/Kq7RgVdjZW.lottie',
                      }}
                      autoPlay
                      loop
                      style={{
                        width: 200,
                        height: 100,
                      }}
                    /> */}
                  </View>
                ) : (
                  <>
                    <LottieView
                      source={{
                        uri: 'https://lottie.host/8d4bd66a-5284-40a0-a7c5-1cd855911b52/U2TjUpN1Zl.lottie',
                      }}
                      autoPlay
                      loop
                      style={{
                        width: 200,
                        height: 100,
                      }}
                    />
                  </>
                )}
                <PayloadMeter
                  Payload={TruckData.loadData.payload_in_tones}
                  maxPayload={TruckData.loadData.maximum_payload}
                />
              </>
            )}
            {tkphData && <TkphMeter tkph={tkphData.frontTireTKPH} />}
          </View>
          {FL && FR && RL1 && RL2 && RR1 && RR2 && (
            <View style={{alignItems: 'center', position: 'relative'}}>
              <Text
                style={{
                  borderRadius: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  padding: 5,
                  backgroundColor:
                    FL.pressure < FL.standard_pressure * 0.75 ||
                    FL.pressure > FL.standard_pressure * 1.15
                      ? 'red'
                      : 'white',
                  color: 'black',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  position: 'absolute',
                  left: 62,
                  top: 94,
                }}>
                {FL.pressure}
              </Text>
              <Text
                style={{
                  borderRadius: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  padding: 5,
                  backgroundColor:
                    FR.pressure < FR.standard_pressure * 0.75 ||
                    FR.pressure > FR.standard_pressure * 1.15
                      ? 'red'
                      : 'white',
                  color: 'black',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  position: 'absolute',
                  left: 295,
                  top: 94,
                }}>
                {FR.pressure}
              </Text>

              <Text
                style={{
                  borderRadius: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  padding: 5,
                  backgroundColor:
                    RL1.pressure < RL1.standard_pressure * 0.75 ||
                    RL1.pressure > RL1.standard_pressure * 1.15
                      ? 'red'
                      : 'white',
                  color: 'black',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  position: 'absolute',
                  left: 50,
                  top: 390,
                }}>
                {RL1.pressure}
              </Text>
              <Text
                style={{
                  borderRadius: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  padding: 5,
                  backgroundColor:
                    RL2.pressure < RL2.standard_pressure * 0.75 ||
                    RL2.pressure > RL2.standard_pressure * 1.15
                      ? 'red'
                      : 'white',
                  color: 'black',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  position: 'absolute',
                  left: 116,
                  top: 450,
                }}>
                {RL2.pressure}
              </Text>
              <Text
                style={{
                  borderRadius: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  padding: 5,
                  backgroundColor:
                    RR1.pressure < RR1.standard_pressure * 0.75 ||
                    RR1.pressure > RR1.standard_pressure * 1.15
                      ? 'red'
                      : 'white',

                  color: 'black',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  position: 'absolute',
                  left: 310,
                  top: 390,
                }}>
                {RR1.pressure}
              </Text>
              <Text
                style={{
                  borderRadius: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  padding: 5,
                  backgroundColor:
                    RR2.pressure < RR2.standard_pressure * 0.75 ||
                    RR2.pressure > RR2.standard_pressure * 1.15
                      ? 'red'
                      : 'white',

                  color: 'black',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  position: 'absolute',
                  left: 250,
                  top: 450,
                }}>
                {RR2.pressure}
              </Text>
              <Image
                style={{width: 250, height: 500}}
                source={{
                  uri: 'https://i.postimg.cc/nrZPz9r3/Chassis-removebg-preview.png',
                }}
              />
            </View>
          )}
        </>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',

            width: '100%',
            height: 800,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <LottieView
              source={{
                uri: 'https://lottie.host/4fede9cf-4309-4fe1-9582-c46ad631b283/SWZbQsqm5e.lottie',
              }}
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: CustomStyle.colour.primary,
              }}>
              Preparing Dynamix
            </Text>
            <Text
              style={{
                paddingVertical: 8,
              }}>
              Please wait while Dynamix is being prepared for you.
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const DynamixStack = () => {
  const stack = createNativeStackNavigator();

  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="dynamix" component={TyreHealth} />
      <stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
    </stack.Navigator>
  );
};

export default DynamixStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: CustomStyle.colour.primary,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: CustomStyle.colour.accent,
  },
});
