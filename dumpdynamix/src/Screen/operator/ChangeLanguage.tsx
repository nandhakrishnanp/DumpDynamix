import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomStyle from '../../../custom';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangeLanguage({navigation}: any) {
  const languageOptions = [
    {label: 'English', value: 'en-US'},
    {label: 'Tamil', value: 'ta-IN'},
    {label: 'Marathi', value: 'mr-IN'},
    {label: 'Hindi', value: 'hi-IN'},
  ];

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Select Language</Text>
            {languageOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={async () => {
                  await AsyncStorage.setItem('language', option.value);
                  navigation.pop()
                }}
                style={styles.option}>
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: CustomStyle.colour.primary,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: CustomStyle.colour.accent,
  },
});
