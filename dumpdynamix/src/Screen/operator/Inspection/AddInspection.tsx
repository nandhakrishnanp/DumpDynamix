import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../../axiosconfig';
import CustomStyle from '../../../../custom';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import CameraSvg from '../../../../assets/camera.svg';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const AddInspection = ({navigation, route}: any) => {
  const {inspection} = route.params;

  const [tyres, setTyres] = useState<any>(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [currentTyre, setCurrentTyre] = useState<any>(null);
  const [capturedImages, setCapturedImages] = useState<any>({});
  const [IsUploading,setIsuploading] = useState(false);
  const [url,setUrl] = useState<any>(null)
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);
  const Cloudurl = "https://api.cloudinary.com/v1_1/dftwre0on/image/upload";
  const getData = async () => {
    const operator = await AsyncStorage.getItem('operator');
    const truck_id = JSON.parse(operator).vehicle_id;
    const res = await axiosInstance.get(`/truck_Details/tyre/${truck_id}`);
    setTyres(res.data);
  };

  const postData = async (images: any) => {
    try {
      const res = await axiosInstance.post('/inspection/complete', {
        InspectionId: inspection._id,
        images,
      });
      return res;
    } catch (error) {
        console.log("error",error);
        
      return error;
    }
  }

  const getPermmisiion = async () => {
    const {hasPermission, requestPermission} = useCameraPermission();
    if (!hasPermission) {
      return (
        <View
          style={{
            backgroundColor: CustomStyle.colour.background,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: CustomStyle.colour.primary,
            }}>
            Camera permission is required
          </Text>
          <Pressable
            onPress={() => requestPermission()}
            style={{
              padding: 10,
              margin: 20,
              backgroundColor: CustomStyle.colour.primary,
            }}>
            <Text
              style={{
                color: CustomStyle.colour.background,
              }}>
              Enable Camera Access
            </Text>
          </Pressable>
        </View>
      );
    }
    if (!device) {
      return <Text>Device not found</Text>;
    }
  };
  


  const handleImgToCloud = async (uri:string) => {
    
    const formData = new FormData();
    formData.append("file", {
        name: `image${Date.now()}`,
        type: "image/jpg",
        uri: uri,
    });
    formData.append("upload_preset", "User_imges");
    formData.append("cloud_name", "dftwre0on");
    try {
      const Cloudresponse = await fetch(Cloudurl,{
            method: "post",
            body: formData,
      });
      const res = await Cloudresponse.json();
        console.log("Cloudresponse",res);
      const url = res.url;
      return url;
    } catch (error) {
        console.log("error",error);
        
      return error;
    }
  };
  

  

  const openCamera = (tyreId: string) => {
    setCurrentTyre(tyres.find((tyre: any) => tyre.tyre_id === tyreId));
    setCameraVisible(true);
  };

  const captureImage = async () => {
    if (cameraRef.current && device) {
      const photo = await cameraRef.current.takePhoto();
      const photoUri = `file://${photo.path}`;
      setCapturedImages((prev: any) => ({
        ...prev,
        [currentTyre.tyre_id]: photoUri,
      }));
      console.log(capturedImages);

      setCameraVisible(false);
    }
  };

  const submitInspection = async () => {
    if (Object.keys(capturedImages).length !== tyres.length) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please capture all images',
      });
      return;
    }
    // Transform img into url
   setIsuploading(true);
    const images = await Promise.all(
      Object.values(capturedImages).map(async (img: any) => {
      const url =  await handleImgToCloud(img);
      const key = Object.keys(capturedImages).find((key) => capturedImages[key] === img);


        return {
            tyre_id: key,
            url,
        };
      }),
    );
   console.log("images",images);
   
    const res = await postData(images);
    console.log("res",res.data);
setIsuploading(false);
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Inspection submitted successfully',
    });

    navigation.goBack();
  };

  useEffect(() => {
    getData();
    getPermmisiion();
  }, []);

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          paddingHorizontal: 10,
          paddingVertical: 14,
          fontWeight: 'bold',
          color: CustomStyle.colour.primary,
        }}>
        Complete Inspection
      </Text>

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
            Inspection Week : {inspection.week}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: inspection.status === 'Pending' ? 'red' : 'green',
            }}>
            {inspection.status}
          </Text>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 18,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 17,
          }}>
          Capture Images
        </Text>
      </View>

      {tyres && (
        <FlatList
          data={tyres}
          style={{
            width: '100%',
          }}
          numColumns={2}
          keyExtractor={(item: any) => item._id}
          renderItem={({item}) => (
            <Pressable
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}
              onPress={() => openCamera(item.tyre_id)}>
              <View
                style={{
                  padding: 5,
                }}>
                <Image
                  width={100}
                  height={100}
                  source={{
                    uri: capturedImages[item.tyre_id]
                      ? capturedImages[item.tyre_id]
                      : 'https://assets.khetigaadi.com/tyres/goodyear-vajrasuper-rear.png',
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Tyre Id : {item.tyre_id}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Tyre Position : {item.tyre_position}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}

      {cameraVisible && (
        <Modal animationType="slide" visible={cameraVisible}>
          <View style={{flex: 1}}>
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={cameraVisible}
              photo={true}
              ref={cameraRef}
            />
            <View
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: 10,
                borderRadius: 5,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Current Tyre: {currentTyre?.tyre_id || 'Unknown'}
              </Text>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Position: {currentTyre?.tyre_position || 'Unknown'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={captureImage}
              style={{
                position: 'absolute',
                bottom: 50,
                left: '50%',
                transform: [{translateX: -50}],
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 50,
              }}>
              <CameraSvg width={50} height={50} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 60,
                left: '80%',
                transform: [{translateX: -50}],
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 30,
              }}
              onPress={() => {
                setCameraVisible(false);
              }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
   {
    IsUploading&&
    (
        <Modal animationType="slide" visible={IsUploading}>
          <View style={{flex: 1,justifyContent:'center',alignItems:'center',
            backgroundColor:'white',opacity:0.9
           }}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Uploading Images....</Text>
          </View>
        </Modal>
    )
   }
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => submitInspection()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              padding: 10,
              margin: 20,
              marginBottom: 20,
              backgroundColor: CustomStyle.colour.primary,
              color: CustomStyle.colour.background,
              width: 200,
              borderRadius: 10,
              textAlign: 'center',
            }}>
            Submit Inspection
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddInspection;

const styles = StyleSheet.create({});
