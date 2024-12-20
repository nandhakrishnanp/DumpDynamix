import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomStyle from '../../../custom';
import Loading from '../../Components/Loading';
import axiosInstance from '../../../axiosconfig';
import Details from './Details';
import DownloadPdfButton from './DownloadButton';
const TruckDetails = ({navigation, route}: any) => {
  const {vehicle_id} = route.params;
  console.log(vehicle_id);

  const [truckDetails, setTruckDetails] = useState<any>(null);
  const getTruckDetails = async () => {
    const res = await axiosInstance.get(`/truck_Details/${vehicle_id}`);
    const response = await res.data;
    console.log('response', response);

    setTruckDetails(response);
  };

  useEffect(() => {
    getTruckDetails();
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: CustomStyle.colour.background,
      }}>
      {truckDetails ? (
        <ScrollView>
          <View
            style={{
              marginHorizontal: 16,
              flexDirection: 'row',
              marginVertical: 10,
              justifyContent:"space-between"

            }}>
            <Text
              style={{
                fontSize: 27,
                fontWeight: 'bold',
                color: CustomStyle.colour.accent,
              }}>
              {vehicle_id}
            </Text>

            <DownloadPdfButton />
          </View>
          <Text
            style={{
              color: CustomStyle.colour.accent,
              fontWeight: 'bold',
              paddingHorizontal: 20,
              fontSize: 20,
              paddingVertical: 3,
            }}>
            Operator Details :
          </Text>

          <View
            style={{
              backgroundColor: CustomStyle.colour.primary,
              padding: 10,
              margin: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              height: 150,
              gap: 20,
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
              }}
              source={{
                uri: 'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png',
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: CustomStyle.colour.background,
                }}>
                {truckDetails.opearordata.name}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  paddingTop: 6,
                  color: CustomStyle.colour.background,
                }}>
                Id : {truckDetails.opearordata.operator_id}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('OperatorProfile', {
                      operatordata: truckDetails.opearordata,
                    });
                  }}
                  style={{
                    backgroundColor: CustomStyle.colour.background,
                    marginTop: 9,
                    alignItems: 'center',
                    padding: 4,
                    paddingHorizontal: 8,
                    borderRadius: 7,
                  }}>
                  <Text>Details</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.push('ChangeOperator', {
                      operatordata: truckDetails.opearordata,
                    });
                  }}
                  style={{
                    backgroundColor: CustomStyle.colour.background,
                    marginTop: 9,
                    alignItems: 'center',
                    padding: 4,
                    paddingHorizontal: 8,
                    borderRadius: 7,
                  }}>
                  <Text>Change operator</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <Details navigation={navigation} truckdata={truckDetails} />
        </ScrollView>
      ) : (
        <Loading />
      )}
    </ScrollView>
  );
};

export default TruckDetails;

const styles = StyleSheet.create({});
