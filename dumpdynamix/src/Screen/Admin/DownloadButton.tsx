import React from 'react';
import { Button, Alert, Platform, Pressable, Text, TouchableOpacity } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import { PermissionsAndroid } from 'react-native';
import axiosInstance from '../../../axiosconfig';
import Report from "../../../assets/report.svg"

const DownloadPdfButton = () => {
  const vehicleId = 'VH002';


  const getDownloadPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'File Download Permission',
          message: 'Your permission is required to save files to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log('Permission Error: ', err);
      return false;
    }
  };

  const generateAndDownloadPDF = async () => {
    const { config, fs } = RNFetchBlob;
    const dirs = fs.dirs;
    const downloadDir = dirs.DownloadDir;
    const date = new Date();
    const hourminutesecond = date.getHours() + date.getMinutes() + date.getSeconds();
    const path = `${downloadDir}/DumpDynamix_Report${hourminutesecond}.pdf`;
  
    try {
      // Request the PDF as a blob
      const response = await axiosInstance.post(
        '/reports/generate',
        { vehicle_id: vehicleId },
        { responseType: 'blob' }
      );
  
      // Convert blob to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1]; // Get only the base64 part
  
        // Write the base64 data to the file
        await RNFetchBlob.fs.writeFile(path, base64data, 'base64');
  
        // Notify user of completion
        Alert.alert('Download Complete', `File saved to ${path}`);
      };
  
      // Start reading the blob as base64
      reader.readAsDataURL(response.data);
    } catch (error) {
      console.log('Download Error: ', error);
      Alert.alert('Error', 'Failed to generate and download the file');
    }
  };
  

  

  return(
    <TouchableOpacity onPress={generateAndDownloadPDF} style={{
      paddingHorizontal: 10,
      flexDirection:"row",
      alignItems:"center"
    }}>
      <Report width={30} height={30} />
     <Text style={{
      paddingHorizontal:5,
      fontSize:18
     }}>Generate Report</Text>
  
    </TouchableOpacity>
  )
};

export default DownloadPdfButton;
