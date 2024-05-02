import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image, ScrollView } from 'react-native';
import Myreports from '../component/Myreports';
import Allreports from '../component/Allreports';

const ScreenWithButtons = () => {
  const [activeButton, setActiveButton] = useState('component1');

  const showComponentHandler = (component) => {
    setActiveButton(component);
  };

  return (
    
    <View style={{ flex: 1,marginTop:10, alignItems: 'center' , marginBottom:80 }}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeButton === 'component1' && styles.activeButton]}
          onPress={() => showComponentHandler('component1')}>
          <Text style={styles.buttonText}>My reports</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button1, activeButton === 'component2' && styles.activeButton]}
          onPress={() => showComponentHandler('component2')}>
          <Text style={styles.buttonText}>Other reports</Text>
        </TouchableOpacity>
      </View>
      {activeButton === 'component1' && <Myreports />}
      {activeButton === 'component2' && <Allreports />}
    </View>
  );
};



const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,

    
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  button: {
    padding: 10,
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
    backgroundColor: 'grey',
    width:'45%'
   
  },
  button1: {
    padding: 10,
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    backgroundColor: 'grey',
    width:'45%'
   
  },
  status:{
    color:'blue'
  },
  activeButton: {
    backgroundColor: '#00C782',
  },
  buttonText: {
    color: '#ffffff',
    textAlign:'center'
  },
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    
  },
  messageBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white', 
    marginHorizontal:18,
    marginBottom:10,
    borderRadius:15,
    elevation:5
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

});

export default ScreenWithButtons;
