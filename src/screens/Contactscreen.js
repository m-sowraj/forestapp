import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ContactComponent from '../component/Contactcomponent';

const profiles = [
  { name: 'Ram', department: 'Reg Department', phone: '+91 1234567890' },
  { name: 'Sam', department: 'Reg Department', phone: '+91 1234567890' },
  { name: 'John', department: 'Reg Department', phone: '+91 1234567890' },
  { name: 'Raj', department: 'Reg Department', phone: '+91 1234567890' },
  // ... other profiles
];

const headProfiles = [
  { name: 'Ram', department: 'Head Department', phone: '+911234567890' },
  { name: 'Sam', department: 'Head Department', phone: '+911234567890' },
  { name: 'John', department: 'Head Department', phone: '+911234567890' },
  { name: 'Raj', department: 'Head Department', phone: '+911234567890' },
  { name: 'Ram', department: 'Head Department', phone: '+911234567890' },
  { name: 'Sam', department: 'Head Department', phone: '+911234567890' },
  { name: 'John', department: 'Head Department', phone: '+911234567890' },
  { name: 'Raj', department: 'Head Department', phone: '+911234567890' },
  
  // ... other profiles
];

const ContactScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.text}>Regional department</Text>
        <ContactComponent profiles={profiles} />

        <Text style={styles.text}>Head department</Text>

        <ContactComponent profiles={headProfiles} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaf3f5',
    padding: 5,
    flexGrow: 1,
    marginTop: 10,
    alignContent:'center',
   
    
  },
  container2:{
    marginTop: 10,
 marginBottom:'20%',
 
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileContainer: {
    borderRadius: 8,
    padding: 1,
    marginBottom: 16,
    backgroundColor: 'white',
    width: '45%',

    
  },
});

export default ContactScreen;
