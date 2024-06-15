import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, RefreshControl } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const Myreports = () => {
  const [messages, setMessages] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMessages = async () => {
    const Id = await SecureStore.getItemAsync('Id');

    setIsRefreshing(true);
    try {
      const response = await axios.get(`https://elephant-tracker-api.onrender.com/api/elephant-sightings/user/${Id}`);
      // Sort the sightings array based on timestamp in descending order
      const sortedSightings = response.data.sightings.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setMessages(sortedSightings);
      console.log(sortedSightings);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
    >
      {messages.map((message, index) => (
        <View key={index} style={styles.messageBubble}>
          <Image source={require('../../assets/user.png')} style={styles.avatar} />
          <View style={styles.messageContent}>
            <Text>{message.description}</Text>
            <Text style={styles.status}> {message.confirmed ? 'Confirmed' : 'Not Confirmed'}</Text>
            <Text>{new Date(message.timestamp).toLocaleString()}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default Myreports;
