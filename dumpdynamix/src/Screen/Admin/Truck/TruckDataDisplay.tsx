import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from 'react-native-screens';
import CustomStyle from '../../../../custom';
import axiosInstance from '../../../../axiosconfig';
import CircleChart from '../../../Components/CircleChart';

const TruckDataDisplay = ({truckdata}: any) => {
  const vehicle_id = truckdata.truckData.vehicle_id;

  const [Suggstion, setSuggestion] = useState(null);
  const [isGettingSuggestion, setIsGettingSuggestion] = useState(false);

  
  const GetMainTananceSuggestion = async () => {
    const res = await axiosInstance.get(`/reports/llm/${vehicle_id}`);

    const response = await res.data;

    console.log('response', response);

    setSuggestion(JSON.parse(response));
  };

  useEffect(() => {
    console.log(truckdata);
  });
  return (
    <ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            color: truckdata.truckData.status == 'driving' ? 'green' : 'red',
          }}>
          Status :{' '}
          {truckdata.truckData.status == 'driving' ? 'Running' : 'Rest'}
        </Text>
      </View>
      {truckdata && (
        <View
          style={{
            paddingHorizontal: 20,
            margin: 10,

            borderRadius: 8,
            backgroundColor: CustomStyle.colour.primary,
            height: 190,
            width: '95%',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontWeight: '600',
                color: CustomStyle.colour.background,
                fontSize: 18,
                padding: 6,
              }}>
              Truck Model : {truckdata.truckData.truck_make}
            </Text>
            <Text
              style={{
                fontWeight: '600',
                color: CustomStyle.colour.background,
                fontSize: 18,
                padding: 6,
              }}>
              Truck Model : {truckdata.truckData.model}
            </Text>
            <Text
              style={{
                fontWeight: '600',
                color: CustomStyle.colour.background,
                fontSize: 18,
                padding: 6,
              }}>
              Make Year : {truckdata.truckData.year}
            </Text>
          </View>
          <Image
            width={140}
            height={100}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/033/029/820/non_2x/dump-truck-clipart-ai-generative-free-png.png',
            }}
          />
        </View>
      )}

      <Text
        style={{
          paddingHorizontal: 20,
          fontSize: 20,
          color: CustomStyle.colour.accent,
          fontWeight: 'bold',
        }}>
        Location
      </Text>

      <View
        style={{
          backgroundColor: '#b8b8ff',
          margin: 10,
          padding: 10,
          borderRadius: 8,
          flexDirection: 'row',
          width: '95%',
          justifyContent: 'space-around',
        }}>
        <Text style={styles.infoText}>
          Latitude: {truckdata.truckData.gps_coords.latitude}
        </Text>
        <Text style={styles.infoText}>
          Longitude: {truckdata.truckData.gps_coords.longitude}
        </Text>
      </View>

      <View style={{}}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: CustomStyle.colour.accent,
            }}>
            Maintanance Check Bot
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#7678ed',
            height: 190,
            width: '95%',
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            width={140}
            height={140}
            source={{
              uri: 'https://png.pngtree.com/png-vector/20240909/ourmid/pngtree-3d-website-maintenance-png-image_13799196.png',
            }}
          />
          <Pressable
            onPress={() => {
              setIsGettingSuggestion(true);
              GetMainTananceSuggestion();
            }}
            style={{
              backgroundColor: CustomStyle.colour.background,
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 4,
            }}>
            <Text>Check Now</Text>
          </Pressable>
          {isGettingSuggestion && (
            <Modal
              animationType="fade"
              transparent
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}>
                <View
                  style={{
                    minHeight: 240,
                    padding: 10,
                    backgroundColor: 'white',
                    width: '90%',
                    borderRadius: 2,
                    alignItems: 'center',
                  }}>
                  {Suggstion && (
                    <View
                      style={{
                        padding: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: CustomStyle.colour.accent,
                        }}>
                        Suggestion
                      </Text>
                      <CircleChart percentage={Suggstion.tyreHealthIndex} />

                      {Suggstion.suggestions.map((suggestion: any, index) => (
                        <Text
                          style={{
                            color: CustomStyle.colour.accent,
                            padding: 3,
                          }}>
                          {index + 1}.{suggestion}
                        </Text>
                      ))}
                      <Pressable
                        onPress={() => {
                          setIsGettingSuggestion(false);
                          setSuggestion(null);
                        }}
                        style={{
                          padding: 10,

                          borderRadius: 4,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            backgroundColor: CustomStyle.colour.primary,
                            padding: 10,
                            borderRadius: 8,
                            paddingHorizontal: 20,
                            color: CustomStyle.colour.background,
                          }}>
                          Close
                        </Text>
                      </Pressable>
                    </View>
                  )}


                  {!Suggstion && (
                    <Text
                    
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: CustomStyle.colour.accent,
                      }}>
                      Analysing Data...
                    </Text>
                  )
                      }
                </View>
              </View>
            </Modal>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default TruckDataDisplay;

const styles = StyleSheet.create({
  infoText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: CustomStyle.colour.accent,
  },
});
