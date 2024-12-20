import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Loading from '../../../Components/Loading';
import CustomStyle from '../../../../custom';
import axiosInstance from '../../../../axiosconfig';
import Toast from 'react-native-toast-message';
import {compareAsc, format} from 'date-fns';
import PressureVsDateChart from '../../../Components/PressureChart';
const notificationDetail = ({navigation, route}: any) => {
  const {item, isadmin} = route.params;
  const [operator, setOperator] = useState<any>(null);
  const [tyreData, setTyreData] = useState<any>(null);
  const [suggestion, setSuggestion] = useState<any>(null);
  const[isLoading,setIsLoading]=useState(false);
  const fetchTyreData = async () => {
    try {
      console.log(item.tyre_id);

      const response = await axiosInstance.get(
        `/truck_Details/tyre/id/${item.tyre_id}`,
      );
      console.log(response.data);
      setTyreData(response.data);
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch tyre data',
      });
    }
  };
  const fetchSuggestion = async (data: any) => {
    const res = await axiosInstance.post('notification/find', {
      data: data,
    });

    const suggestions = await res.data;
    console.log(suggestions.response);

    setSuggestion(JSON.parse(suggestions.response));
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

  const calloperator = async (phonenumber: string) => {
    let url = `tel:+91${phonenumber}`;
    try {
      // Attempt to open the dialer
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open dialer:', error);
      Alert.alert('Error', 'Unable to make the call. Please try again later.');
    }
  };
  const fetchoperatorDatabyVehicleId = async () => {
    try {
      const response = await axiosInstance.post(`/api/fetchoperator`, {
        vehicle_id: item.vehicle_id,
      });
      setOperator(response.data.operator);
      console.log(response.data.operator);
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch operator data',
      });
    }
  };
  useEffect(() => {
    if (isadmin) {
      fetchoperatorDatabyVehicleId();
    }
    fetchTyreData();
  }, []);
  return (
    <ScrollView
      style={{
        backgroundColor: CustomStyle.colour.background,
        width: '100%',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          backgroundColor: CustomStyle.colour.primary,
          margin: 10,
          borderRadius: 6,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',

            color: CustomStyle.colour.background,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: CustomStyle.colour.background,
            fontWeight: 'bold',
          }}>
          {item.body}
        </Text>
      </View>

      <View>
        {tyreData ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                paddingVertical: 7,
              }}>
              <Image
                source={{
                  uri: 'https://www.continental-tires.com/content/dam/conti-tires-cms/continental/b2b/products/truck-tires/Continental__HDC1-ED_30Gradansicht_3k_V01.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png',
                }}
                style={{
                  width: 180,
                  height: 200,
                }}
              />

              <View
                style={{
                  alignItems: 'flex-start',
                  margin: 10,
                  width: 180,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: CustomStyle.colour.background,
                    textTransform: 'capitalize',
                    backgroundColor: CustomStyle.colour.accent,
                    padding: 8,
                    borderRadius: 6,
                    width: 180,
                  }}>
                  Position : {getPosition(tyreData.tyre_position)}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: CustomStyle.colour.background,
                    textTransform: 'capitalize',
                    marginVertical: 5,
                    width: 180,
                    backgroundColor: CustomStyle.colour.accent,
                    padding: 8,
                    borderRadius: 6,
                  }}>
                  KM driven : {tyreData.km_drived} Km
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: CustomStyle.colour.background,
                    textTransform: 'capitalize',
                    width: 180,
                    backgroundColor: CustomStyle.colour.accent,
                    padding: 8,
                    borderRadius: 6,
                  }}>
                  Fixed on :{format(new Date(tyreData.fixed_date), 'dd-MM-yy')}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#d0ccfa',
                marginTop: 10,
              }}>
           
              {suggestion ? (
                <View style={{
                  margin: 10,
                }}>
                  <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: CustomStyle.colour.accent,
                    marginBottom: 10,
              
                  }}>Potential Cause of Failure</Text>

                  <Text style={{
                    fontSize: 16,
                    color: CustomStyle.colour.background,
                    backgroundColor: CustomStyle.colour.accent,
                    padding: 8,
                    borderRadius: 7,
                    textAlign: 'center',
                    margin: 3,
                  }}>{suggestion.potential_Cause}</Text>



                  <View>
                    <Text style={{
                      fontSize: 17,
                      fontWeight: 'bold',
                      color: CustomStyle.colour.accent,
                      marginVertical: 10,
                    }}>Suggested Action</Text>

                    <Text style={{
                      fontSize: 16,
                      color: CustomStyle.colour.background,
                      backgroundColor: CustomStyle.colour.accent,
                      padding: 8,
                      borderRadius: 7,
                      textAlign: 'center',
                      margin: 3,
                    }}>{suggestion.suggested_Action}</Text>

                  

                  </View>
                </View>
              ) : (
                <TouchableOpacity
            
                  onPress={() => {
                    fetchSuggestion(item);
                    setIsLoading(true);
                  }}>
                      
              
                  <Text
                    style={{
                      fontSize: 16,
        
                      color: CustomStyle.colour.background,
                      backgroundColor: CustomStyle.colour.accent,
                      padding: 8,
                      borderRadius: 7,
                      width: 180,
                      textAlign: 'center',
                      margin: 10,
                    }}>
                   {isLoading ? 'Analysing The Data...' : 'Reason For Failure'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View
              style={{
                margin: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: CustomStyle.colour.accent,
                  marginBottom: 10,
                }}>
                Pressure History
              </Text>
              <PressureVsDateChart pressureData={tyreData.pressure_history} />
            </View>
            {operator && (
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: CustomStyle.colour.accent,
                    margin: 10,
                  }}>
                  Contact Operator
                </Text>
                <View
                  style={{
                    marginHorizontal: 6,
                    backgroundColor: '#c8c8c8',
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}>
                  <View
                    style={{
                      borderRadius: 6,
                      flexDirection: 'row',
                      margin: 2,
                      marginVertical: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,

                      padding: 8,
                    }}>
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/3649/3649810.png',
                      }}
                      style={{
                        width: 90,
                        height: 90,
                      }}
                    />
                    <View
                      style={{
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: CustomStyle.colour.accent,
                          marginBottom: 10,
                        }}>
                        Name : {operator.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: CustomStyle.colour.accent,
                          marginBottom: 10,
                        }}>
                        Phone : {operator.phone_number}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: CustomStyle.colour.accent,
                        }}>
                        Email : {operator.email}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => calloperator(operator.phone_number)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: CustomStyle.colour.accent,
                        padding: 10,
                        paddingHorizontal: 18,
                        borderRadius: 8,
                        margin: 8,
                        color: CustomStyle.colour.background,
                        fontWeight: 'bold',
                      }}>
                      Call Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ) : (
          <Loading />
        )}
      </View>
    </ScrollView>
  );
};

export default notificationDetail;

const styles = StyleSheet.create({});
