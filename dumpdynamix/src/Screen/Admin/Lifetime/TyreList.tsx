import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import axiosInstance from '../../../../axiosconfig';
import CustomStyle from '../../../../custom';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const TyreList = ({navigation, truckdata}: any) => {
  const truck_id = truckdata.truckData.vehicle_id;
  const [tyres, setTyres] = React.useState(null);

  const fetchTyres = async () => {
    try {
      const response = await axiosInstance.get(`/truck_Details/tyre/VH002`);
      console.log(response.data);
      setTyres(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTyres();
  }, []);
  return (
    <View>
      {tyres &&
        tyres.map((tyre: any) => {
          return (
           <View style={{
            flexDirection: 'row',
            padding: 20,
            margin: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:CustomStyle.colour.secondary,
          
           }}>

            <View  style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image style={{
                width: 100,
                height: 100,
                }} source={{uri:"https://static.vecteezy.com/system/resources/previews/036/396/407/non_2x/ai-generated-tire-of-truck-on-transparent-background-ai-generated-png.png"}}/>
            </View>
            <View>

            <Text  style={{
                fontSize: 16,
                color:'black',
                padding: 7,
                fontWeight:'bold'
            }}>Tyre ID : {tyre.tyre_id}</Text>
            <Text  style={{
                fontSize: 16,
                color:'black',
                padding: 7,
                fontWeight:'bold'
            }}>Tyre Position : {tyre.tyre_position}</Text>
            </View>
    
           </View>
          );
        })}
    </View>
  );
};


const TyreStack = ({navigation,truckdata}:any)=>{
    const stack = createNativeStackNavigator();
    return(
        <stack.Navigator>
            <stack.Screen name="TyreList" component={TyreList}/>
        </stack.Navigator>
    )
}
export default TyreStack;

const styles = StyleSheet.create({});
