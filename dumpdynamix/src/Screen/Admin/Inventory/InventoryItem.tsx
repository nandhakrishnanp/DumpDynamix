import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomStyle from '../../../../custom';
import {format} from 'date-fns';

const InventoryItem = ({navigation, route}) => {
  const {item} = route.params;
  return (
    <ScrollView
      style={{
        backgroundColor: CustomStyle.colour.background,
      }}>
      <View
        style={{
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={{
            uri: 'https://www.apollotyres.com/content/dam/orbit/syncforce/products/1792/T0013305.png',
          }}
        />

        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {item.brand} {item.model}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: CustomStyle.colour.primary,
            padding: 10,
            paddingHorizontal: 35,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: CustomStyle.colour.background,
              fontWeight: 'bold',
            }}>
            Type
          </Text>
          <Text
            style={{
              color: CustomStyle.colour.background,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {item.type}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: CustomStyle.colour.primary,
            padding: 10,
            paddingHorizontal: 35,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: CustomStyle.colour.background,
              fontWeight: 'bold',
            }}>
            Size
          </Text>
          <Text
            style={{
              color: CustomStyle.colour.background,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {item.size}
          </Text>
        </View>
      </View>

      <View
        style={{
          padding: 20,
          backgroundColor: '#f8f8f8',
        }}>
        <Text
          style={{
            padding: 10,
            fontSize: 16,
            borderWidth: 2,
            marginVertical: 2,
            borderRadius: 5,
            fontWeight: 'bold',
          }}>
          PLyRating : {item.plyRating}
        </Text>
        <Text
          style={{
            padding: 10,
            fontSize: 16,
            borderWidth: 2,
            marginVertical: 2,
            borderRadius: 5,
            fontWeight: 'bold',
          }}>
          TreadPattern : {item.treadPattern}
        </Text>
        <Text
          style={{
            padding: 10,
            fontSize: 16,
            borderWidth: 2,
            marginVertical: 2,
            borderRadius: 5,
            fontWeight: 'bold',
          }}>
          ManufactureDate : {format(new Date(item.manufactureDate), 'hh-MM-yy')}
        </Text>
        <Text
          style={{
            padding: 10,
            fontSize: 16,
            borderWidth: 2,
            marginVertical: 2,
            borderRadius: 5,
            fontWeight: 'bold',
          }}>
          ExpiryDate : {format(new Date(item.expiryDate), 'hh-MM-yy')}
        </Text>
        <Text
          style={{
            padding: 10,
            fontSize: 16,
            borderWidth: 2,
            marginVertical: 2,
            borderRadius: 5,
            fontWeight: 'bold',
          }}>
          LoadCapacity : {format(new Date(item.loadCapacity), 'hh-MM-yy')}
        </Text>
      </View>

      <View
        style={{
          padding: 20,
        }}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 20,
          }}>
          Supplier
        </Text>

        <View style={{
            padding:10,
            backgroundColor:CustomStyle.colour.primary,
            borderRadius:8,
            marginTop:10
        }}>
          <Text style={{
            paddingVertical:5,
            color:"white",
            fontWeight:"bold",
            fontSize:16
          }}>Agency : {item.supplier.name}</Text>
          <Text style={{
            paddingVertical:5,
            color:"white",
            fontWeight:"bold",
            fontSize:16
          }} >Mobile Number : {item.supplier.contact}</Text>
        </View>
      </View>

     
      <View
        style={{
            paddingHorizontal:20
        }}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 20,
          }}>
          Truck Compatibility
        </Text>

        <View style={{
            padding:10,
            backgroundColor:CustomStyle.colour.primary,
            borderRadius:8,
            marginVertical:10
        }}>

            {
                item.compatibility.truckModels.map((item,index)=>{
                    return(
                        <Text style={{
                            color:"white",
                            fontSize:16,
                            fontWeight:"bold",
                            paddingVertical:4
                        }}>{index+1} . {item}</Text>
                    )
                })
            }
           </View>
       
      

      </View>


     
    </ScrollView>
  );
};

export default InventoryItem;

const styles = StyleSheet.create({});
