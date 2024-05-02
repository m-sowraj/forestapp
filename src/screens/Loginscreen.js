import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet , Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [message, setMessage] = useState('');
  const [type, settype] = useState(null)
  const navigation = useNavigation();
  
  

  useEffect(() => {
    const get = async () =>{
      const value = await SecureStore.getItemAsync('key');
      if(value == null){
          settype(null)
      }
      else if(value == 1){
          settype(1)
      }
      else(
        settype(2)
      )
    }
    
    get();
  }, [])

  const handleLogin = async (userType) => {
    try {
      if(userType == 'admin'){
        settype(1)
        await SecureStore.setItemAsync('key', 1);
        navigation.navigate('home')
      }
      else{
        settype(2)
        await SecureStore.setItemAsync('key', 2);
        navigation.navigate('home')
      }
    
      
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <View style={styles.container}>

      <Image source={require('../../assets/elephantimg.png')} style={styles.logo} />
      <View style={styles.buttonsContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin('admin')}>
          <Text style={styles.buttonText}>Login as Admin</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin('user')}>
          <Text style={styles.buttonText}>Login as User</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#eaf3f5',
    zIndex:1000
  },
  message: {
    marginBottom: 20,
    fontSize: 18,
  },
  buttonContainer: {
    marginHorizontal: 10,
    
  },
  buttonsContainer: {
    marginVertical: 10,
    flexDirection:'row'
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  logo:{
    width: 400,
    height: 300,
  }
});

export default LoginScreen;
