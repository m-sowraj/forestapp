import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import axios from 'axios';

const Allreports = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchSightings();
  }, []);

  const fetchSightings = async () => {
    setIsRefreshing(true);
    try {
      const response = await axios.get('https://elephant-tracker-api.onrender.com/api/elephant-sightings/confirmed');
      // Sort the confirmedSightings array based on timestamp in descending order
      const sortedSightings = response.data.confirmedSightings.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setMessages(sortedSightings);
    } catch (error) {
      console.error('Error fetching sightings:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchSightings();
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00C782" />
      ) : (
        <ScrollView
          style={styles.scrollView}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        >
          {messages.map((message, index) => (
            <View key={index} style={styles.messageBubble}>
              <Image source={require('../../assets/user.png')} style={styles.avatar} />
              <View style={styles.messageContent}>
                <Text>{message.description}</Text>
                <Text style={styles.status}> Accepted by: {message.confirmed_by.name}</Text>
                <Text>{new Date(message.timestamp).toLocaleString()}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  messageBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white', 
    marginHorizontal: 18,
    marginBottom: 10,
    borderRadius: 15,
    elevation: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  status: {
    color: 'blue',
  },
});

export default Allreports;
