import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [type, settype] = useState(null)

  useEffect(() => {
    const get = async () => {
      const value = await SecureStore.getItemAsync('key');
      if (value == null) {
        settype(1)
      }
      else if (value == 1) {
        settype(1)
      }
      else {
        settype(2)
      }
    }

    get();
  }, [type])

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleLogin = async (userType) => {
    try {
      if (userType == 'admin') {
        settype(2)
        SecureStore.setItemAsync('key', "2");
      }
      else {
        settype(1)
        SecureStore.setItemAsync('key', "1");
      }
    } catch (error) {

    }
  };

  return (
       <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image source={require('../../assets/back.png')} style={styles.logo1} />
        </TouchableOpacity>
        <Image source={require('../../assets/profile.png')} style={styles.logo} />
        <View style={styles.avatar}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>S</Text>
          </View>
        </View>
        <View style={styles.container2}>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.data}>sraj@example.com</Text>
          <View style={styles.line}></View>

          <Text style={styles.label}>Username:</Text>
          <Text style={styles.data}>Raj_s_Raj</Text>
          <View style={styles.line}></View>

          <Text style={styles.label}>Fullname:</Text>
          <Text style={styles.data}>SowRaj</Text>
          <View style={styles.line}></View>

          <Text style={styles.label}>Password:</Text>
          <Text style={styles.data}>*******</Text>
          <View style={styles.line}></View>

          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.data}>123-456-7890</Text>
          <View style={styles.line}></View>

        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('RewardsScreen')}>
          <Text style={styles.buttonText2}>Rewards</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('AuthScreen')}>
          <Text style={styles.buttonText2}>Logout</Text>
        </TouchableOpacity>

        {type == 1 && (
          <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogin('admin')}>
            <Text style={styles.buttonText2}>Login as Admin</Text>
          </TouchableOpacity>
        )}

        {type == 2 && (
          <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogin('user')}>
            <Text style={styles.buttonText2}>Login as User</Text>
          </TouchableOpacity>
        )}
        </View>
      </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    padding: '5%',
    marginBottom: 80,
    backgroundColor: '#eaf3f5',
   
  },
  container2: {
    justifyContent: 'flex-start',
    marginHorizontal: 15,
   
  },
  avatar: {
    marginBottom: 10,
    alignItems: 'center'
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 40,
    backgroundColor: '#00C782',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 3,
    elevation: 10,
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#264233',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  data: {
    fontSize: 18,
    marginBottom: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonText2: {
    color: 'black',
    fontSize: 18,
  },
  logo: {
    position: 'absolute',
    right: 0,
    top: '10%',
    width: 180,
    height: 330,
  },
  logo1: {
    width: 30,
    height: 20,
    marginRight: 10,
    marginBottom: 20,
  },
});

export default ProfileScreen;
