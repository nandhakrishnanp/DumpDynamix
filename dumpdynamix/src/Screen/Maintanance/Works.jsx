import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomStyle from '../../../custom';
import axiosInstance from '../../../axiosconfig';
import {useIsFocused} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkDetails from './WorkDetails';
import ComplteMaintanance from './ComplteMaintanance';

const Works = ({navigation}:any) => {
  const [works, setWorks] = useState([]);
  const isFocused = useIsFocused();
  const [completedWorks, setCompletedWorks] = useState([]);
  const fetchWorks = async () => {
    try {
      const res = await axiosInstance.get('/maintenance/getMaintancebyTeamId/TM003');
      setWorks(res.data);
      console.log(res.data);

    } catch (error) {
      console.error('Error fetching works:', error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      console.log('Fetching works...');
      fetchWorks();
    }
  }, [isFocused]);


  useEffect(() => {
  const completedWorks = works.filter((work) => work.status === 'completed');
  setCompletedWorks(completedWorks);
  }, [works]);
  return (
    <ScrollView>
      <View  style={{
        
      }}>
        <Text style={styles.header}>Scheduled Works</Text>
      </View>
      <View style={styles.content}>
        {works.length > 0 ? (
          works.map((work, index) => (
            <Pressable onPress={()=>{
              navigation.navigate('WorkDetails', {
                work: work,
              });
            }} key={index} style={styles.card}>
              <Text style={styles.title}>{work.maintenanceType}</Text>
              <Text style={styles.text}>Vehicle ID: {work.vehicle_id}</Text>
              <Text style={styles.text}>Scheduled Date: {work.scheduledDate}</Text>
              <Text style={styles.text}>Status: {work.status}</Text>
          {
            work.remarks && work.remarks !== "" && work.remarks !== null && (
            <Text style={styles.text}>Remarks: {work.remarks}</Text>
            )
                
          }
            </Pressable>
          ))
        ) : (
          <Text style={styles.noData}>No scheduled works available.</Text>
        )}
      </View>
      <View>
        <Text style={styles.header}>Completed Works</Text>

      </View>

      <View style={styles.content}>
        {completedWorks.length > 0 ? (
          completedWorks.map((work, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.title}>{work.maintenanceType}</Text>
              <Text style={styles.text}>Vehicle ID: {work.vehicle_id}</Text>
              <Text style={styles.text}>Scheduled Date: {work.scheduledDate}</Text>
              <Text style={styles.text}>Status: {work.status}</Text>
              {
            work.remarks && work.remarks !== "" && work.remarks !== null && (
            <Text style={styles.text}>Remarks: {work.remarks}</Text>
            )
                
          }
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No completed works available.</Text>
        )}
      </View>


    </ScrollView>
  );
};



const WorkStack = ()=>{
  const stack = createNativeStackNavigator();
  return(
    <stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <stack.Screen name="Works" component={Works}/>
      <stack.Screen name="WorkDetails" component={WorkDetails}/>
      <stack.Screen name="CompleteMaintance" component={ComplteMaintanance}/>
    </stack.Navigator>
  )
}

export default WorkStack;

const styles = StyleSheet.create({
  header: {
    fontSize: 19,
    color: CustomStyle.colour.primary,
    fontWeight: 'bold',
    padding: 10,
  },
  content: {
    padding: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  noData: {
    fontSize: 17,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});
