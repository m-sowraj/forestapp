import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, RefreshControl ,  TouchableOpacity } from 'react-native';
import axios from 'axios';
import ReportModal from './ReportModal';
import { useNavigation } from '@react-navigation/native';

const PendingReports = () => {
  const [messages, setMessages] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const fetchMessages = async () => {
    setIsRefreshing(true);
    try {
      const response = await axios.get(`https://elephant-tracker-api.onrender.com/api/elephant-sightings/unconfirmed`);
      // Sort the unconfirmedSightings array based on timestamp in descending order
      const sortedSightings = response.data.unconfirmedSightings.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setMessages(sortedSightings);
      console.log(sortedSightings);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const handleReportPress = (report) => {
    setSelectedReport(report);
    setModalVisible(true);
    navigation.navigate('Reportpage',{report:report})

  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchMessages();
  };

  const handleconfirm = async (type , id) => {
    try {
      setIsRefreshing(true);
    if(type ==1){
       
      const response1 = await axios.put(`https://elephant-tracker-api.onrender.com/api/elephant-sightings/${id}/confirm`,{
        
            officerId: "662bdbdc6f2db6b013a3db04",
            confirmationStatus: "confirmed"
         
      });
      handleRefresh()
      console.log(response1.data);
    
    } 
    else{
       
      const response1 = await axios.put(`https://elephant-tracker-api.onrender.com/api/elephant-sightings/${id}/confirm`,{
        
            officerId: "662bdbdc6f2db6b013a3db04",
            confirmationStatus: "notconfirmed"
         
      });
      handleRefresh()
      console.log(response1.data);
    }
    }
     catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsRefreshing(false);
    }
    }

  
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
    >
      {messages.map((message, index) => (
         <TouchableOpacity key={index} onPress={() => handleReportPress(message)}>
        <View key={index} style={styles.messageBubble}>
        {/* <ReportModal visible={modalVisible} onClose={() => setModalVisible(false)} report={selectedReport} /> */}
          <Image source={require('../../assets/user.png')} style={styles.avatar} />
          <View style={styles.messageContent}>
            <Text>{message.description}</Text>
            <Text>{new Date(message.timestamp).toLocaleString()}</Text>

            <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={[styles.button,  styles.activeButton]}
              onPress={() => handleconfirm(1 , message._id)}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button,  styles.activeButton]}
              onPress={() => handleconfirm(2 , message._id)}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
        </TouchableOpacity>
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
  buttoncontainer:{
      flexDirection:'row'
  },
  messageContent: {
    flex: 1,
  },
  status: {
    color: 'blue',
  },
  button: {
    backgroundColor: '#C1C1C1',
    justifyContent:'center',
    alignItems:'center',
    padding: 1,
    borderRadius: 5,
    marginVertical: 5,
    width:"37%",
    margin:'3%',
  },

});

export default PendingReports;
