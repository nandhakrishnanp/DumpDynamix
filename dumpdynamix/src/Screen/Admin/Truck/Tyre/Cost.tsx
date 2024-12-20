import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomStyle from '../../../../../custom';
import axiosInstance from '../../../../../axiosconfig';

const Cost = ({tyre}: any) => {


    const [tyres, setTyre] = useState<any>(null);

  const fetvhTyreById = async (tyre_id: any) => {
    try {
      const response = await axiosInstance.get(`/truck_Details/tyre/id/${tyre_id}`);
      if (response.data) {
        setTyre(response.data);
        tyre.Miscellaneous_cost = response.data.Miscellaneous_cost;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log('tyre', tyre);
    fetvhTyreById(tyre.tyre_id);
  }, []);
  return (
    <View style={{}}>


  {
    tyres && <View>
    <View style={{
            position:"relative",
          }}>
             <Image
             source={{uri:"https://png.pngtree.com/png-vector/20240319/ourmid/pngtree-dark-scene-with-large-pink-and-blue-gradient-neon-ring-png-image_12010023.png"}}
              style={{
                width: "100%",
                height: 230,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                objectFit: 'contain',
              }}
             />
             <View  style={{
               position:"absolute",
               top:80,
               left:133,
               alignItems:"center",
             }}>
              <View style={{
                flexDirection:"row",
                alignItems:"center",
              }}>
    
             
                  <Image
              style={{
                width: 20,
                height: 20,
                objectFit: 'contain',
              }}
              source={{
                uri: 'https://webstockreview.net/images/r-clipart-money-indian-2.png',
              }}
            />
             <Text
             style={{
              color:CustomStyle.colour.accent,
              fontSize:28,
              fontWeight:"bold",
             }}
            
            >{((tyres.purchase_cost+tyres.Miscellaneous_cost)/tyres.operating_hours).toFixed(2)}</Text>
     </View>
            <Text style={{
              color:CustomStyle.colour.accent,
              fontSize:12,
              fontWeight:"bold",
            }}>Cost Per Working Hour</Text>
             </View>
             
          </View>
        
       <View style={{
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
          gap:10,
          flexWrap:"wrap",
          paddingVertical:10,
          paddingBottom:18
       }}>
       <View
              style={{
                gap: 4,
                marginHorizontal: 10,
              }}>
                
              <Text style={{
                fontSize:18,
                fontWeight:"bold",
                color:CustomStyle.colour.primary
              }}>Purchase Cost</Text>
              <View style={{
                flexDirection:"row",
                gap:4,
                alignItems:"center"
              }}>
              <Image
              style={{
                width: 23,
                height: 23,
                objectFit: 'contain',
              }}
              source={{
                uri: 'https://webstockreview.net/images/r-clipart-money-indian-2.png',
              }}
            />
              <Text 
              style={{
                fontSize:28,
                fontWeight:"bold",
                color:CustomStyle.colour.accent
              }}>{tyres.purchase_cost}</Text>
              </View>
       
            </View>
            <View
              style={{
                gap: 4,
                marginHorizontal: 10,
              }}>
                
              <Text style={{
                fontSize:18,
                fontWeight:"bold",
                color:CustomStyle.colour.primary
              }}>Miscellaneous Cost</Text>
              <View style={{
                flexDirection:"row",
                gap:4,
                alignItems:"center"
              }}>
              <Image
              style={{
                width: 23,
                height: 23,
                objectFit: 'contain',
              }}
              source={{
                uri: 'https://webstockreview.net/images/r-clipart-money-indian-2.png',
              }}
            />
              <Text 
              style={{
                fontSize:28,
                fontWeight:"bold",
                color:CustomStyle.colour.accent
              }}>{tyres.Miscellaneous_cost}</Text>
              </View>
       
            </View>
    
            <View
              style={{
                gap: 4,
                marginHorizontal: 10,
              }}>
                
              <Text style={{
                fontSize:18,
                fontWeight:"bold",
                color:CustomStyle.colour.primary
              }}>Total Operating Hours</Text>
              <View style={{
                flexDirection:"row",
                gap:4,
                alignItems:"center"
              }}>
              <Image
              style={{
                width: 35,
                height: 35,
                objectFit: 'contain',
              }}
              source={{
                uri: 'https://pixsector.com/cache/dfb978ba/av75ec8f90c1751f34dfe.png',
              }}
            />
              <Text 
              style={{
                fontSize:28,
                fontWeight:"bold",
                color:CustomStyle.colour.accent
              }}>{tyre.operating_hours}</Text>
              </View>
       
            </View>
       </View>
           
    </View>
  }

      
    </View>
  );
};

export default Cost;

const styles = StyleSheet.create({});
