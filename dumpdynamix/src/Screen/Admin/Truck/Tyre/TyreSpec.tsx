import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomStyle from '../../../../../custom'
import { format } from 'date-fns'
import PressureVsDateChart from '../../../../Components/PressureChart'

const TyreSpec = ({
    tyrePressureData,
    navigation,
}:any) => {
  return (
    <View>
         <View>
      <Text
        style={{
          padding: 20,
          fontSize: 18,
          fontWeight: 'bold',
          color: CustomStyle.colour.accent,
        }}>
        Tyre Specification{' '}
      </Text>
      <View
        style={{
          padding: 18,
          margin: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: CustomStyle.colour.primary,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: CustomStyle.colour.background,
            padding: 7,
          }}>
          {' '}
          Model : {tyrePressureData.tyre_model}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: CustomStyle.colour.background,
            padding: 7,
          }}>
          {' '}
          Tyre Make : {tyrePressureData.tyre_make}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: CustomStyle.colour.background,
            padding: 7,
          }}>
          {' '}
          Tyre Size : {tyrePressureData.tyre_size}
        </Text>
      </View>
      <Text
        style={
          {
          padding: 20,
          fontSize: 18,
          fontWeight: 'bold',
          color: CustomStyle.colour.accent,
        }}>
        Tyre Details
      </Text>
      <View
        style={{
          padding: 18,
          margin: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: CustomStyle.colour.primary,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: CustomStyle.colour.background,
            padding: 7,
          }}>
          {' '}
          Number Of KM Driven : {tyrePressureData.km_drived} KM
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: CustomStyle.colour.background,
            padding: 7,
          }}>
          {' '}
          Tyre Installed :{' '}
          {format(new Date(tyrePressureData.fixed_date), 'dd-MM-yy')}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: CustomStyle.colour.background,
            padding: 7,
          }}>
          {' '}
          Last Inspection :{' '}
          {format(new Date(tyrePressureData.last_inspection_date), 'dd-MM-yy ')}
        </Text>
      </View>
      <Text
        style={{
          padding: 20,
          fontSize: 18,
          fontWeight: 'bold',
          color: CustomStyle.colour.accent,
        }}>
        Pressure Trend
      </Text>
      <View
        style={{
          margin: 8,
        }}>
        <PressureVsDateChart pressureData={tyrePressureData.pressure_history} />
      </View>
      </View>
    </View>
  )
}

export default TyreSpec

const styles = StyleSheet.create({})