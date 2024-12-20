import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import axiosInstance from '../../axiosconfig';
import Toast from 'react-native-toast-message';
import CustomStyle from '../../custom';

const MapComponent = ({navigation}:any) => {
  const [truckData, setTruckData] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);

  const FetchTruckData = async () => {
    try {
      const res = await axiosInstance.get('/truck_Details');
      const response = res.data;
      setTruckData(response);
      console.log(response);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error While Fetching Data',
        text2: error.message,
      });
    }
  };

  useEffect(() => {
    FetchTruckData();
  }, []);

  const handleMarkerPress = item => {
    setSelectedTruck(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {truckData && truckData.length > 0 ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 11.5715,
            longitude: 79.504,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {truckData.map(item => (
            <Marker
              key={item._id}
              coordinate={{
                latitude: item.gps_coords.latitude,
                longitude: item.gps_coords.longitude,
              }}
              onPress={() => handleMarkerPress(item)}
            />
          ))}
        </MapView>
      ) : null}

      {/* Custom Modal for displaying truck details */}
      {selectedTruck && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                <View>
                  
                </View>
                Vehicle ID: {selectedTruck.vehicle_id}
              </Text>
              <Text style={{
                fontSize: 16,
                marginBottom: 5,
                fontWeight:"800",
                color:CustomStyle.colour.accent
              }}>Status: {selectedTruck.status}</Text>
              <Text 
              style={{
                fontSize: 16,
                marginBottom: 10,
                fontWeight:"800",
                color:CustomStyle.colour.accent
              }}
              >Truck Make: {selectedTruck.truck_make}</Text>
                <Text 
              style={{
                fontSize: 16,
                marginBottom: 10,
                fontWeight:"800",
                color:CustomStyle.colour.accent
              }}
              >Truck Model: {selectedTruck.model}</Text>
              {/* Add more details as needed */}
              <View style={{
                flexDirection: 'row',
                gap:15
              }}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setModalVisible(false)
                    navigation.push("TruchDetails" , {vehicle_id :selectedTruck.vehicle_id })}}>
                  <Text style={styles.closeButtonText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 730,
    width: 400,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: CustomStyle.colour.background,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:CustomStyle.colour.primary
  },
  closeButton: {
    marginTop: 20,
    padding: 8,
    paddingHorizontal: 14,
    backgroundColor: CustomStyle.colour.primary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapComponent;
