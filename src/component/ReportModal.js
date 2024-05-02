import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Reportpage = ({ route }) => {
  const { report } = route.params;
  console.log(report)
  const navigation = useNavigation();
  
  const handleconfirm = async (type , id) => {
    try {
     
    if(type ==1){
       
      const response1 = await axios.put(`https://elephant-tracker-api.onrender.com/api/elephant-sightings/${id}/confirm`,{
        
            officerId: "662bdbdc6f2db6b013a3db04",
            confirmationStatus: "confirmed"
         
      });
    
      console.log(response1.data);
    
    } 
    else{
       
      const response1 = await axios.put(`https://elephant-tracker-api.onrender.com/api/elephant-sightings/${id}/confirm`,{
        
            officerId: "662bdbdc6f2db6b013a3db04",
            confirmationStatus: "notconfirmed"
         
      });
     
      console.log(response1.data);
    }
    }
     catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      navigation.navigate('AdminReportScreen')
    }
    }

  const handleClose = () => {
    // Implement close functionality here
    console.log("Modal closed");
  };

  return (

      <View style={styles.modalContent}>
        <View style={styles.toplayer}>
        <Image source={require('../../assets/user.png')} style={styles.avatar} />
        <View style={styles.topleftplayer}>
        <Text style={styles.name}>{report.user_id.fullname}</Text>
        <View style={styles.toplayer}>
        <Image source={require('../../assets/greenphone.png')} style={styles.avatar1} />
        <Text style={styles.phone}>{report.user_id.phone_num}</Text>

        </View>
        </View>
        </View>
        <Text style={styles.description}>{report.description}</Text>
        <Text style={styles.timestamp}>{new Date(report.timestamp).toLocaleString()}</Text>
        {/* Add other details like image, user name, phone number, etc. */}
        <TouchableOpacity style={[styles.button, styles.aanButton]} onPress={()=>handleconfirm(1,report._id)}>
            <Text style={styles.buttonText}>Approve and notify</Text>
          </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={()=>handleconfirm(1,report._id)}>
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={()=>handleconfirm(2,report._id)}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>

  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal:15,
    marginVertical:20,
    borderRadius:20,
    padding: 20,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 1,
    backgroundColor: 'red',
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  aanButton:{
    width:'100%',
    backgroundColor:'grey',
    marginBottom:10
  },
  toplayer:{
    flexDirection:'row',
   
  },
  avatar1:{
    marginTop:5,
    width: 16,
    height: 16,
   
  },
  topleftplayer:{
    justifyContent:'center',
    flexDirection:'col',
    paddingLeft:25,
  },
  name:{
    fontWeight:'bold',
    fontSize:20,
  },
  phone:{fontSize:15,},
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent:'center',
    alignItems:'center'
    
  },
  acceptButton: {
    width:'48%',
    backgroundColor: 'grey',
  },
  rejectButton: {
    width:'48%',
    backgroundColor: 'grey',
  },
  buttonText: {
    color: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 10,
  },
});

export default Reportpage;
