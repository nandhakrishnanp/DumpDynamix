import { Button, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native' 
import React, { useEffect, useState } from 'react' 
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera' 
import Toast from 'react-native-toast-message' 
import CustomStyle from '../../custom' 
 
export default function CameraPage({navigation}: any) { 
    const [codeScanned, setCodeScanned] = useState(null) 
    const [isNavigating, setIsNavigating] = useState(false)  // Flag to prevent multiple navigations
    const device = useCameraDevice('back') 

    const codeScanner = useCodeScanner({ 
        codeTypes: ['qr'], 
        onCodeScanned: codes  => {  
          if (codes.length > 0 && !isNavigating) {  // Check if already navigating
            if (codes[0].value ) {
              setCodeScanned(codes[0]?.value)            
              setIsNavigating(true)  // Set the flag to prevent multiple navigations
console.log(codeScanned);

              navigateToData(codes[0]?.value)
            } 
          } 
        }, 
    });

    const { hasPermission, requestPermission } = useCameraPermission()
    if (!hasPermission) { 
        return ( 
            <View style={{ 
                backgroundColor: CustomStyle.colour.background, 
                height: '100%', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: 10 
            }}> 
                <Text style={{ 
                    fontWeight: "bold", 
                    fontSize: 20, 
                    color: CustomStyle.colour.primary 
                }}>Camera permission is required</Text> 
                <Pressable onPress={() => requestPermission()} style={{ 
                    padding: 10, 
                    margin: 20, 
                    backgroundColor: CustomStyle.colour.primary, 
                }}> 
                    <Text style={{ 
                        color: CustomStyle.colour.background, 
                    }}> 
                        Enable Camera Access 
                    </Text> 
                </Pressable> 
            </View> 
        ) 
    } 
    if (!device) { 
        return <Text>Device not found</Text> 
    } 

    const navigateToData = async (scannedCode: string) => { 
        Toast.show({ 
            type: 'success', 
            position: 'top', 
            text1: 'Truck Identified', 
            text2: scannedCode, 
        }); 
      
        // Navigation logic (uncomment to enable navigation)
        navigation.replace('TruckDetails', { vehicle_id: scannedCode }) 

        // Reset the navigation flag after some time or upon the completion of navigation
        setTimeout(() => {
          setIsNavigating(false)
        }, 7500);
    } 

    return ( 
        <SafeAreaView style={styles.safeArea} > 
            <Camera 
                style={styles.fullScreenCamera} 
                device={device} 
                isActive={true} 
                codeScanner={codeScanner} 
            /> 
        </SafeAreaView> 
    ) 
} 

const styles = StyleSheet.create({ 
    fullScreenCamera: { 
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        flex: 1, 
        zIndex: 100, 
    }, 
    safeArea: { 
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
    }, 
}) 
