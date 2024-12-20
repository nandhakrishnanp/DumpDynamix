import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosInstance from '../../../../axiosconfig';
import {format, differenceInSeconds} from 'date-fns'; // Import differenceInSeconds
import CustomStyle from '../../../../custom';

const Trip = ({truckdata}: any) => {
  const [allTrip, setAllTrip] = useState(null);

  const truck_id = truckdata.truckData.vehicle_id;
  const fetchTrips = async () => {
    const tripData = await axiosInstance.get(`/trip/${truck_id}`);
    const data = tripData.data;
    console.log(data);
    setAllTrip(data);
  };
  useEffect(() => {
    fetchTrips();
    const interval = setInterval(fetchTrips, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 18,
        marginHorizontal: 9,
      }}>
      {allTrip &&
        allTrip.map(item => (
          <View
            key={item._id}
            style={{
              backgroundColor: CustomStyle.colour.primary,
              padding: 10,
              paddingVertical: 18,
              margin: 10,
              borderRadius: 8,
              width: '100%',
              marginHorizontal: 30,
            }}>
            <Text
              style={{
                color: CustomStyle.colour.background,
                fontWeight: 'bold',
              }}>
              Trip Id : {item._id}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
              }}>
              <Text
                style={{
                  color: CustomStyle.colour.primary,
                  fontWeight: 'bold',
                  padding: 3,
                  borderRadius: 8,
                  marginVertical: 4,
                  backgroundColor: CustomStyle.colour.background,
                }}>
                Start Time : {format(new Date(item.startTime), 'hh:mm:ss a')}
              </Text>

              {item.status == 'Completed' && (
                <Text
                  style={{
                    color: CustomStyle.colour.primary,
                    fontWeight: 'bold',
                    padding: 3,
                    borderRadius: 8,
                    marginVertical: 4,
                    backgroundColor: CustomStyle.colour.background,
                  }}>
                  End Time : {format(new Date(item.endTime), 'hh:mm:ss a')}
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text
                style={{
                  color:
                    item.status == 'started'
                      ? CustomStyle.colour.background
                      : '#b3e79b',
                  fontWeight: 'bold',
                }}>
                Status : {item.status}
              </Text>

              {item.status == 'Completed' && (
                <View>
                <Text
                  style={{
                    color: CustomStyle.colour.background,
                    fontWeight: 'bold',
                  }}>
                  Payload : {item.payload} tons
                </Text>
                <Text  style={{
                    color: CustomStyle.colour.background,
                    fontWeight: 'bold',
                  }}>Distance Travelled : {item.distance}Km</Text>
                </View>
               
              )}
            </View>

            {item.status == 'Completed' && (
              <View>
                <Text
                  style={{
                    color: CustomStyle.colour.background,
                    fontWeight: 'bold',
                    marginTop: 8,
        fontSize:17
                  }}>
                  Total Time Taken:{' '}
                  {formatDuration(
                    differenceInSeconds(
                      new Date(item.endTime),
                      new Date(item.startTime),
                    ),
                  )}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent:"center",
                    alignItems:"center",
                    gap: 18,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: CustomStyle.colour.background,
                        fontWeight: 'bold',
                        marginTop: 8,
                        fontSize:26
                      }}>
                      {item.frontTireTKPH}
                    </Text>
                    <Text
                      style={{
                        color: CustomStyle.colour.background,
                        fontWeight: 'bold',
                        marginTop: 8,
                        fontSize:17

                      }}>
                      FrontTyreTkph
                    </Text>
                  </View>

                  <View style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: CustomStyle.colour.background,
                      fontWeight: 'bold',
                      marginTop: 8,
                      fontSize:26
                    }}>
                  {item.rearTireTKPH}
                  </Text>
                  <Text
                    style={{
                      color: CustomStyle.colour.background,
                      fontWeight: 'bold',
                      marginTop: 8,
                      fontSize:17
                    }}>
                    RearTyreTkph 
                  </Text>

                  </View>

                  
                </View>
              </View>
            )}
          </View>
        ))}

      {!allTrip ||
        (allTrip.length == 0 && (
          <Text
            style={{
              fontSize: 20,
              color: 'grey',
            }}>
            No Trips Available
          </Text>
        ))}
    </View>
  );
};

export default Trip;

const styles = StyleSheet.create({});
