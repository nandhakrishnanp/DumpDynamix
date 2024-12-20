import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, SafeAreaView, Image } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import CustomStyle from '../../../custom';

const ComplteMaintanance = ({ navigation, route }: any) => {
  const { work } = route.params;
  const [remarks, setRemarks] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();



  const handlePhotoCapture = async () => {
    if (!device) return;

    const photo = await device;
    setPhotoUri(photo.path);
    setShowCamera(false);
    alert('Photo captured successfully!');
  };


  const handleSubmit = () => {
    if (!photoUri || !remarks.trim()) {
      alert('Please capture a photo and add remarks before submitting.');
      return;
    }
    alert('Maintenance work submitted successfully!');
    navigation.goBack();
  };

  if (!hasPermission) {
    return (
      <View style={styles.permissionView}>
        <Text style={styles.permissionText}>Camera permission is required</Text>
        <Pressable onPress={() => requestPermission()} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Enable Camera Access</Text>
        </Pressable>
      </View>
    );
  }

  if (showCamera && device) {
    return (
      <SafeAreaView style={styles.cameraContainer}>
        <Camera
          style={styles.fullScreenCamera}
          device={device}
          isActive={true}
          photo={true}
        />
        <Pressable style={styles.captureButton} onPress={handlePhotoCapture}>
          <Text style={styles.captureButtonText}>Capture</Text>
        </Pressable>
        <Pressable style={styles.closeButton} onPress={() => setShowCamera(false)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Maintenance Completion</Text>

      <View style={styles.card}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photoPreview} />
        ) : (
          <Text style={styles.instructions}>No photo captured yet.</Text>
        )}

        <Button
          title="Capture Photo"
          onPress={() => setShowCamera(true)}
          color={CustomStyle.colour.primary}
        />

        <TextInput
          style={styles.remarksInput}
          placeholder="Enter remarks"
          value={remarks}
          onChangeText={setRemarks}
        />

        <Button
          title="Submit"
          onPress={handleSubmit}
          color={CustomStyle.colour.primary}
        />
      </View>
    </SafeAreaView>
  );
};

export default ComplteMaintanance;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: CustomStyle.colour.background,
  },
  header: {
    textAlign: 'center',
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    padding: 20,
    backgroundColor: CustomStyle.colour.secondary,
    margin: 20,
    borderRadius: 10,
  },
  instructions: {
    marginBottom: 10,
    fontSize: 16,
  },
  photoPreview: {
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  remarksInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  permissionView: {
    backgroundColor: CustomStyle.colour.background,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  permissionText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: CustomStyle.colour.primary,
  },
  permissionButton: {
    padding: 10,
    margin: 20,
    backgroundColor: CustomStyle.colour.primary,
  },
  permissionButtonText: {
    color: CustomStyle.colour.background,
  },
  cameraContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  fullScreenCamera: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 50,
  },
  captureButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
