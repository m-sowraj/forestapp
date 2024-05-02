import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const Contactcomponent = ({ profiles }) => {
  
  const handlePhoneCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      {profiles.map((profile, index) => (
        <View key={index} style={styles.profileContainer}>
          <View style={styles.profileContaine1}>
            <Image source={require('../../assets/user.png')} style={styles.logo1} />
            <View key={index} style={styles.profileContainer2}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.department}>{profile.department}</Text>
          
         
          <TouchableOpacity style={styles.phone} onPress={() => handlePhoneCall(profile.phone)}>
            <Image source={require('../../assets/phone.png')} style={styles.logo} />
            <Text style={styles.ph}>{profile.phone}</Text>
          </TouchableOpacity>
          </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
    marginTop: 10,
    margin: 0,
    justifyContent: 'space-evenly',
    width: '100%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  profileContainer: {
    elevation: 5,
    borderRadius: 8,
    padding: 5,
    marginBottom: 16,
    backgroundColor: 'white',
    width: '45%',
    marginRight: '1%',
    flexDirection: 'col'
  },
  profileContaine1: {
    margin: 0,
    padding: 0,
    flexDirection: 'row',
  },
  department: {
    fontSize: 10,
  },
  ph:{
    fontSize:8,
  },
  logo1: {
    width: 55,
    height: '100%',
    marginRight: 10,
    marginBottom: 5,
    borderRadius:10
  },
  logo: {
    width: 10,
    height: 10,
    margin: 5,
  },
  phone: {
    width: '100%',
    alignItems:'center',
    backgroundColor: '#00C782',
    padding: 3,
    borderRadius: 5,
    flexDirection: 'row'
  }
});

export default Contactcomponent;
