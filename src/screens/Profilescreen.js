import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    email: '',
    fullname: 'ab',
    password: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const Id = await SecureStore.getItemAsync('Id');
        const Key = await SecureStore.getItemAsync('key');
        console.log(Key)
        if(Key == '1'){      
        console.log('hi')

        const response = await axios.get(`https://elephant-tracker-api.onrender.com/api/users/${Id}`);
        console.log(response.data)
        const profiledata = {
          email:response.data.user.email,
          fullname:response.data.user.fullname,
          phoneNumber:response.data.user.phone_num,
          password:'adasdas'

        }
        console.log(profiledata)
        setProfile(profiledata);
      }else{

        const response = await axios.get(`https://elephant-tracker-api.onrender.com/api/officers/${Id}`);
        console.log(response.data)
        const profiledata = {
          email:response.data.officer.email,
          fullname:response.data.officer.name,
          phoneNumber:response.data.officer.phone,
          password:'adasdas'

        }
        console.log(profiledata)
        setProfile(profiledata);

      }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('Id');
      await SecureStore.deleteItemAsync('jwtToken');
      await SecureStore.deleteItemAsync('key');


      navigation.navigate('AuthScreen');
    } catch (error) {
      console.error('Error logging out:', error);
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
            <Text style={styles.avatarText}>{profile.fullname.charAt(0)}</Text>
          </View>
        </View>
        <View style={styles.container2}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.data}>{profile.email}</Text>
          <View style={styles.line}></View>

         

          <Text style={styles.label}>Fullname:</Text>
          <Text style={styles.data}>{profile.fullname}</Text>
          <View style={styles.line}></View>

          <Text style={styles.label}>Password:</Text>
          <Text style={styles.data}>{profile.password.replace(/./g, '*')}</Text>
          <View style={styles.line}></View>

          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.data}>{profile.phoneNumber}</Text>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('RewardsScreen')}>
          <Text style={styles.buttonText2}>Rewards</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText2}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
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
    alignItems: 'center',
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
    fontWeight: 'bold',
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
