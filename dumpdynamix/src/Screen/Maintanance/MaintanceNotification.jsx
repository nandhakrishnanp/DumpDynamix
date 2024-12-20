import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosconfig';
import { useIsFocused } from '@react-navigation/native';
import { format } from 'date-fns';
import CustomStyle from '../../../custom';

const MaintanceNotification = () => {
  const [works, setWorks] = useState([]);
  const isFocused = useIsFocused();

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
      if(works.length > 0){
      // console.log(works[0].createdAt)
      //soert in descending order
      works.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log(works)

      }
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Maintenance Notifications</Text>
      {works.length > 0 ? (
        works.map((work, index) => (
          <View key={index} style={styles.notificationCard}>
            <Text style={styles.notificationText}>
              New work added by Admin: <Text style={styles.highlight}>{work.maintenanceType}</Text>
            </Text>
            <Text style={styles.notificationDetails}>Vehicle ID: {work.vehicle_id}</Text>
            <Text style={styles.notificationDetails}>Created at: { format( work.createdAt,'yyyy-MM-dd')}</Text>

            
          </View>
        ))
      ) : (
        <Text style={styles.noNotifications}>No new notifications.</Text>
      )}
    </ScrollView>
  );
};

export default MaintanceNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  notificationCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  notificationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444',
  },
  highlight: {
    color: CustomStyle.colour.primary,
  },
  notificationDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  noNotifications: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});
