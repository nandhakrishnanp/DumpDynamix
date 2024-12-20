import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CustomStyle from '../../../../custom'

const Viewinpection = ({navigation,route}:any) => {

    const {inspection} = route.params

  useEffect(()=>{
    console.log(inspection);
  },[])

  return (
    <ScrollView>
       <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: CustomStyle.colour.primary,
          borderRadius: 10,
          margin: 10,
          paddingVertical: 25,
        }}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: CustomStyle.colour.background,
            }}>
            Inspection ID : {inspection._id.slice(-6)}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: CustomStyle.colour.background,
            }}>
            Truck ID : {inspection.vehicle_id}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: CustomStyle.colour.background,
            }}>
            Inspection Week : {inspection.week}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: inspection.status === 'Pending' ? 'red' : 'white',
            }}>
            Completed
          </Text>
        </View>
      </View>


    {
        inspection && inspection.images.map((image:any,index:number)=>(
            <View key={index} style={{
                margin:10,
                alignItems:'center',
                elevation:5,
            }}>
                <Image source={{uri:image.url}} style={{
                    width:340,
                    height:340,
                
                }} />
                <View style={{
                    padding:8,
                    backgroundColor:CustomStyle.colour.primary,
                    width:340,
                    borderBottomEndRadius:10,
                    borderBottomStartRadius:10
                }}>
                    <Text style={{
                        color:CustomStyle.colour.background,
                        fontWeight:'bold'
                        ,
                        padding:3
                    }}>Tyre Id : {image.tyre_id}</Text>
                    <Text style={{
                        color:CustomStyle.colour.background,
                        fontWeight:'bold',
                        padding:3
                    }}>Inspected On : {image.dateTaken}</Text>
                </View>
            </View>
        ))

    }

    </ScrollView>
  )
}

export default Viewinpection

const styles = StyleSheet.create({})