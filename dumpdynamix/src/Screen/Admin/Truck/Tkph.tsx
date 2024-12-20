import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosInstance from '../../../../axiosconfig';
import {LineChart, PieChart} from 'react-native-gifted-charts';

import Speed from '../../../../assets/speed.svg';
import CustomStyle from '../../../../custom';
import { fileMapCacheDirectory } from '../../../../metro.config';
import { format } from 'date-fns';
const Tkph = ({truckdata}: any) => {
  const vehicle_id = truckdata.truckData.vehicle_id;
  const [TkphData, setTkphData] = useState<any>([]);
  const [History, setHistory] = useState<any>();
  
  const fecthTkphData = async () => {
    const res = await axiosInstance.get(`/tkph/${vehicle_id}`);
    const data = await res.data;
    console.log(data.tkphData);
    setTkphData(data.tkphData);
  };

  const fetchTkphHistory = async () => {
    const history = await axiosInstance.get(`/tkph/history/${vehicle_id}`);

    const res = await history.data;
    setHistory(res.history.history);
    console.log(res.history.history);
  };
  useEffect(() => {
    fecthTkphData();
    fetchTkphHistory();
  }, []);

  return (
    <ScrollView>
      {TkphData && (
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
          }}>
            <View style={{
              flexDirection:"row",
              gap:9
            }}>
            <View
            style={{
              borderColor: 'black',
              borderWidth: 3,
              width: 150,
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '100%',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize:18
              }}>
              {TkphData.frontTireTKPH}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Front Tyres TKPH
            </Text>
          </View>
          <View
            style={{
              borderColor: 'black',
              borderWidth: 3,
              width: 150,
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '100%',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize:18
              }}>
              {TkphData.rearTireTKPH}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Rear Tyres TKPH
            </Text>
          </View>
            </View>
        
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              gap: 16,
              marginTop: 10,
            }}>
            <View
              style={{
                backgroundColor: CustomStyle.colour.primary,
                paddingHorizontal: 10,
                paddingVertical: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
              }}>
              <Text
                style={{
                  color: CustomStyle.colour.background,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                {TkphData.maxPayload} Tonnes
              </Text>
              <Text
                style={{
                  color: CustomStyle.colour.background,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                Max PayLoad{' '}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: CustomStyle.colour.primary,
                paddingHorizontal: 10,
                paddingVertical: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
              }}>
              <Text
                style={{
                  color: CustomStyle.colour.background,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                {TkphData.meanFrontTireLoad} Tonnes
              </Text>
              <Text
                style={{
                  color: CustomStyle.colour.background,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                Mean Tyre Load
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Speed width={50} height={70} />
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                {TkphData.awss} Km/hr
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Average Work Speed Per Shift
              </Text>
            </View>
          </View>
   <View style={{
  gap:8,
  marginTop:20
   }}>

       <Text style={{
        backgroundColor: CustomStyle.colour.primary,
        padding: 10,
        color: CustomStyle.colour.background,
        fontWeight: 'bold',
        borderRadius: 6,
       }}>Mean Tyre Load on Front Tyres :  {TkphData.meanFrontTireLoad} Tonnes</Text>
        <Text style={{
        backgroundColor: CustomStyle.colour.primary,
        padding: 10,
        color: CustomStyle.colour.background,
        fontWeight: 'bold',
        borderRadius: 6,
       }}>Mean Tyre Load on Rear Tyres : {TkphData.meanRearTireLoad} Tonnes</Text>



   </View>
          <View
            style={{
              marginTop: 20,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                margin: 10,
                textAlign: 'center',
              }}>
              TKPH Trend{' '}
              <Text
                style={{
                  color: CustomStyle.colour.primary,
                  margin: 10,
                }}>
                Last 6 days
              </Text>
            </Text>
            {History && (
              <View>
                <LineChart
                  data={History.map((item: any) => ({
                    value: item.minTkph, // y-axis value
                    label: format(new Date(item.date), 'dd/MM/yy'), // Format: DD:MM:YY
                  }))}
                  
                  data2={History.map((item: any) => ({
                    value: item.maxTkph, // y-axis value
                    label: `${new Date(item.date)
                      .getDate()
                      .toString()
                      .padStart(2, '0')}.${(new Date(item.date).getMonth() + 1)
                      .toString()
                      .padStart(2, '0')}.${new Date(item.date)
                      .getFullYear()
                      .toString()
                      .slice(-2)}`, // Format: DD:MM:YY
                  }))}
                  dataPointsColor2="#FF0000" // Data points color
                  color2={CustomStyle.colour.primary} // Line color
                  color={CustomStyle.colour.accent} // Line color
                  dataPointsColor1={CustomStyle.colour.secondary} // Data points color
                  thickness={4} // Line thickness
                  xAxisLabelTextStyle={{color: '#666', fontSize: 12}}
                  showStripOnFocus // Style for x-axis labels
                  focusEnabled
                  isAnimated
                  animationDuration={3000}
                  maxValue={1000}
                  curved
                  showVerticalLines
                  showTextOnFocus
                />

                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 6,
                      backgroundColor: CustomStyle.colour.primary,
                      marginRight: 5,
                    }}></Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginRight: 10,
                    }}>
                    Max TKPH
                  </Text>
                  <Text
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 6,
                      backgroundColor: CustomStyle.colour.accent,
                      marginRight: 5,
                    }}></Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                    }}>
                    Min TKPH
                  </Text>
                </View>

                <Text></Text>
              </View>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Tkph;

const styles = StyleSheet.create({});
