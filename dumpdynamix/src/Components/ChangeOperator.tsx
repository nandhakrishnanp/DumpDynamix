import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomStyle from '../../custom';
import Toast from 'react-native-toast-message';
import axiosInstance from '../../axiosconfig';

const ChangeOperator = ({navigation, route}: any) => {
  const [operatorName, setOperatorName] = useState<any>('');
  const [operatorEmail, setOperatorEmail] = useState<any>('');
  const [operatorPhone, setOperatorPhone] = useState<any>('');

  const {operatordata} = route.params;
  const handleOperatorChange = async () => {
    if (!operatorName || !operatorEmail || !operatorPhone) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
      });
      return;
    }

    if (!operatorEmail.includes('@')) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
      });
      return;
    }

    if (operatorPhone.length !== 10) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Phone Number',
      });
      return;
    }
    const res = await axiosInstance.post('/api/remove', {
      vehicle_id: operatordata.vehicle_id,
      operator_id: operatordata.operator_id,
      name: operatorName,
      email: operatorEmail,
      phone_number: operatorPhone,
    });
    const response = await res.data;
    if (response && response.operator_id) {
      Toast.show({
        type: 'success',
        text1: 'Operator Changed Successfully',
      });
      navigation.goBack();
    }
  };
  return (
    <View
      style={{
        backgroundColor: CustomStyle.colour.background,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: CustomStyle.colour.accent,
          fontWeight: 'bold',
          paddingHorizontal: 20,
          fontSize: 20,
          textAlign: 'center',
          paddingVertical: 3,
        }}>
        Create and Assign new Operator
      </Text>

      <View>
        <Text
          style={{
            color: CustomStyle.colour.primary,
            paddingHorizontal: 20,
            paddingVertical: 3,
          }}>
          Changing Operator for {operatordata.vehicle_id}
        </Text>
      </View>
      <View
        style={{
          margin: 10,
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Operator Name"
          value={operatorName}
          onChangeText={text => setOperatorName(text)}
          style={{
            backgroundColor: CustomStyle.colour.secondary,
            borderRadius: 10,
            margin: 10,
            padding: 20,

            color: CustomStyle.colour.accent,
            width: 310,
          }}
        />
        <TextInput
          placeholder="Operator Email"
          value={operatorEmail}
          onChangeText={text => setOperatorEmail(text)}
          style={{
            backgroundColor: CustomStyle.colour.secondary,
            borderRadius: 10,
            margin: 10,
            padding: 20,
            color: CustomStyle.colour.accent,
            width: 310,
          }}
        />
        <TextInput
          placeholder="Operator Phone"
          value={operatorPhone}
          keyboardType="numeric"
          onChangeText={text => setOperatorPhone(text)}
          style={{
            backgroundColor: CustomStyle.colour.secondary,
            borderRadius: 10,
            margin: 10,
            padding: 20,
            color: CustomStyle.colour.accent,
            width: 310,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            handleOperatorChange();
          }}
          style={{
            backgroundColor: CustomStyle.colour.primary,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 22,
            paddingVertical: 18,
            borderRadius: 9,
            width: 200,
            marginTop: 14,
          }}>
          <Text
            style={{
              color: CustomStyle.colour.background,

              fontSize: 16,
            }}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeOperator;

const styles = StyleSheet.create({});
