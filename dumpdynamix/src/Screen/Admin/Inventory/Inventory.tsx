import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosInstance from '../../../../axiosconfig';
import Loading from '../../../Components/Loading';
import CustomStyle from '../../../../custom';
import SearchIcon from '../../../../assets/Search.svg';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InventoryItem from './InventoryItem';
import FailedTyres from './FailedTyres';
import AddStock from './AddStock';
import Add from '../../../../assets/Add.svg'
import { useIsFocused } from '@react-navigation/native';
const Inventory = ({navigation}) => {
  const [tyres, setTyres] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredTyres, setFilteredTyres] = useState([]);

  const isFocus = useIsFocused();
  const fetchInventory = async () => {

    try {
      const res = await axiosInstance.get('/inventory/');
      console.log('res', res.data);
      setTyres(res.data);
      setFilteredTyres(res.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const HandleSearch = (searchText: string) => {
    setSearchText(searchText);
    if (searchText === '') {
      setFilteredTyres(tyres);
    } else {
      const filtered = tyres.filter(
        item =>
          item.model.toLowerCase().includes(searchText.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredTyres(filtered);
    }
  };

  useEffect(() => {
    if(isFocus){
    fetchInventory();
    }
  }, [isFocus]);

  return (
    <ScrollView
      style={{
        backgroundColor: CustomStyle.colour.background,
        width: '100%',
      }}>
      {tyres ? (
        <View>
          <View
            style={{
              width: '94%',
              flexDirection: 'row',
              alignItems: 'center',
              margin: 10,
              gap: 10,
            }}>

              <View style={{
                flexDirection:"row",
                gap:4,
                flex:1
              }}>
              <Text
              style={{
                color: CustomStyle.colour.primary,
                fontSize: 22,
                fontWeight: 'bold',
              }}>
              Tyres Inventory
            </Text>

            <Image
              style={{
                width: 35,
                height: 30,
            
              }}
              source={{
                uri: 'https://cdn-icons-png.freepik.com/256/10996/10996271.png?semt=ais_hybrid',
              }}
            />
              </View>
           
       
       <Pressable   onPress={()=>{
          navigation.navigate("FailedTyres")
       }}>
       <Image
              style={{
                width: 35,
                height: 30,
              }}
              source={{
                uri: 'https://static.vecteezy.com/system/resources/thumbnails/012/042/301/small_2x/warning-sign-icon-transparent-background-free-png.png',
              }}
            />
       </Pressable>
          
          </View>
          <View
            style={{
              backgroundColor: CustomStyle.colour.primary,
              height: 170,
              margin: 10,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: CustomStyle.colour.background,
              }}>
              Search Inventory
            </Text>

            <View
              style={{
                margin: 15,
                flexDirection: 'row',
                gap: 10,
              }}>
              <TextInput
                style={{
                  backgroundColor: CustomStyle.colour.background,
                  width: 210,
                  borderRadius: 10,
                  padding: 5,
                }}
                placeholder="Search By Tyre Model"
                value={searchText}
                onChangeText={HandleSearch}
              />

              <Add width={35} height={35} onPress={()=>{
                navigation.navigate("AddStock")
              }
              }/>
            </View>
          </View>

          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: CustomStyle.colour.primary,
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}>
            Available Tyres
          </Text>
          <View
            style={{
              width: '100%',
            }}>
            <FlatList
              style={{
                marginHorizontal: 3,
              }}
              data={filteredTyres}
              numColumns={2}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate('InventoryItem', {item});
                  }}
                  style={{
                    backgroundColor: '#dce0ff',
                    padding: 10,
                    margin: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '49%',
                    borderRadius: 4,
                  }}>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: 'contain',
                    }}
                    source={{
                      uri: 'https://imagesm.plexussquare.in/CHERRYAGENCIES/Images/16-07-2018/1531737179303.png',
                    }}
                  />
                  <Text
                    style={{
                      paddingTop: 10,
                      fontSize: 16,
                      textAlign: 'center',
                      color: CustomStyle.colour.accent,
                      fontWeight: 'bold',
                    }}>
                    {item.brand} {item.model}
                  </Text>

                  <Text
                    style={{
                      color: CustomStyle.colour.primary,
                      fontWeight: 'bold',
                      paddingTop: 3,
                    }}>
                    Stock : {item.quantityInStock} Nos
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </ScrollView>
  );
};

const InventoryStack = () => {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="Inventory" component={Inventory} />
      <stack.Screen name="InventoryItem" component={InventoryItem} />
      <stack.Screen name="FailedTyres" component={FailedTyres}/>
      <stack.Screen name="AddStock" component={AddStock}/>
    </stack.Navigator>
  );
};

export default InventoryStack;
