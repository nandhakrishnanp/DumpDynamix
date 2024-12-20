import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomStyle from '../../../../custom';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import axiosInstance from '../../../../axiosconfig';
import Toast from 'react-native-toast-message';

const AddStock = ({navigation}) => {
  const [expiryDate, setExpiryDate] = useState(null);
  const [manufactureDate, setManufactureDate] = useState(null);
  const [showExpiryPicker, setShowExpiryPicker] = useState(false);
  const [showManufacturePicker, setShowManufacturePicker] = useState(false);

  const [tyres, setTyres] = useState({
    brand: '',
    model: '',
    size: '',
    type: '',
    loadCapacity: 0,
    plyRating: 0,
    treadPattern: '',
    price: 0,
    quantityInStock: 0,
    manufactureDate: '',
    expiryDate: '',
    supplier: {
      name: '',
      contact: '',
    },
    compatibility: {
      truckModels: [],
    },
    notes: '',
  });

  const handleData = async () => {
    try {

      if(!tyres.brand || !tyres.model || !tyres.size || !tyres.type || !tyres.loadCapacity || !tyres.plyRating || !tyres.treadPattern || !tyres.price || !tyres.quantityInStock || !tyres.manufactureDate || !tyres.expiryDate || !tyres.supplier.name || !tyres.supplier.contact) {
        Toast.show({
          type: 'error',
          text1: 'Please fill all the fields',
        });
        return;
      }
      const response = await axiosInstance.post('/inventory/addtyre', tyres);
      Toast.show({
        type: 'success',
        text1: 'Stock added successfully',
      });
      navigation.navigate('Inventory')
      console.log(response.data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error adding stock',
      });
      console.error(error);
    }
  };

  useEffect(() => {
    if (expiryDate) {
      setTyres({ ...tyres, expiryDate: format(expiryDate, 'yyyy-MM-dd') });
    }
  }, [expiryDate]);

  useEffect(() => {
    if (manufactureDate) {
      setTyres({ ...tyres, manufactureDate: format(manufactureDate, 'yyyy-MM-dd') });
    }
  }, [manufactureDate]);

  return (
    <ScrollView
      style={{
        backgroundColor: CustomStyle.colour.background,
      }}
    >
      <Text
        style={{
          padding: 20,
          fontSize: 20,
          fontWeight: 'bold',
          color: CustomStyle.colour.accent,
        }}
      >
        Add Stock into Inventory
      </Text>

      {/* Tyre Fields */}
      {[
        { label: 'Tyre Brand', value: tyres.brand, key: 'brand' },
        { label: 'Tyre Model', value: tyres.model, key: 'model' },
        { label: 'Tyre Size', value: tyres.size, key: 'size' },
        { label: 'Tyre Type', value: tyres.type, key: 'type' },
        { label: 'Tread Pattern', value: tyres.treadPattern, key: 'treadPattern' },
      ].map((field, index) => (
        <View key={index}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${field.label}`}
            value={field.value}
            onChangeText={(text) => setTyres({ ...tyres, [field.key]: text })}
          />
        </View>
      ))}

      {/* Numeric Fields */}
      {[
        { label: 'Load Capacity', value: tyres.loadCapacity, key: 'loadCapacity' },
        { label: 'Ply Rating', value: tyres.plyRating, key: 'plyRating' },
        { label: 'Price', value: tyres.price, key: 'price' },
        { label: 'Quantity in Stock', value: tyres.quantityInStock, key: 'quantityInStock' },
      ].map((field, index) => (
        <View key={index}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${field.label}`}
            keyboardType="numeric"
            value={String(field.value)}
            onChangeText={(text) => setTyres({ ...tyres, [field.key]: Number(text) })}
          />
        </View>
      ))}

      {/* Date Fields */}
      {[
        { label: 'Expiry Date', date: expiryDate, setDate: setExpiryDate, showPicker: showExpiryPicker, setShowPicker: setShowExpiryPicker },
        { label: 'Manufacture Date', date: manufactureDate, setDate: setManufactureDate, showPicker: showManufacturePicker, setShowPicker: setShowManufacturePicker },
      ].map((field, index) => (
        <View key={index}>
          <Text style={styles.label}>{field.label}</Text>
          <Pressable
            onPress={() => field.setShowPicker(true)}
            style={styles.input}
          >
            <Text>
              {field.date ? format(field.date, 'dd-MM-yyyy') : `Select ${field.label}`}
            </Text>
          </Pressable>
          {field.showPicker && (
            <DateTimePicker
              testID={`${field.label}Picker`}
              value={field.date || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                field.setShowPicker(false);
                if (selectedDate) field.setDate(selectedDate);
              }}
            />
          )}
        </View>
      ))}

      {/* Supplier Fields */}
      {[
        { label: 'Supplier Name', value: tyres.supplier.name, key: 'name' },
        { label: 'Supplier Contact', value: tyres.supplier.contact, key: 'contact' },
      ].map((field, index) => (
        <View key={index}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${field.label}`}
            value={field.value}
            onChangeText={(text) =>
              setTyres({
                ...tyres,
                supplier: { ...tyres.supplier, [field.key]: text },
              })
            }
          />
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleData}>
        <Text style={styles.buttonText}>Add Stock</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddStock;

const styles = StyleSheet.create({
  label: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: CustomStyle.colour.accent,
  },
  input: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderColor: CustomStyle.colour.primary,
    borderWidth: 1,
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: CustomStyle.colour.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: CustomStyle.colour.background,
    fontSize: 18,
  },
});
