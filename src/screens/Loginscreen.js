import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userType, setUserType] = useState('resident');
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(null);

  const handleLogin = async () => {
    try {
      if (phoneNumber === '' || password === '') {
        alert("Fill Details");
        return;
      }

      setIsLoading(true); // Set loading state to true

      const endpoint = userType === 'resident' ? 'https://elephant-tracker-api.onrender.com/api/userauth/login' : 'https://elephant-tracker-api.onrender.com/api/officerauth/login';

      const response = await axios.post(endpoint, {
        phone_num: phoneNumber,
        password: password,
      });

      const token = response.data.accessToken;
      await SecureStore.setItemAsync('jwtToken', token);
      console.log('Login Successful:', response.data);
      SecureStore.setItemAsync('key', userType === 'resident' ? "1" : "2");
      navigation.navigate('Home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid phone number or password");
      } else {
        console.error('Login Error:', error);
      }
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#63B58C" />
        </View>
      )}
      <Image source={require('../../assets/welcomeback.png')} style={styles.logo} />
      <View style={styles.form}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholder="876799XXXX"
        />
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            placeholder="Password"
          />
          <TouchableOpacity style={styles.passwordvisibility} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon name={isPasswordVisible ? 'eye' : 'eye-off'} type="feather" />
          </TouchableOpacity>
        </View>
        <View style={styles.radioContainer}>
          <TouchableOpacity style={styles.radio} onPress={() => setUserType('resident')}>
            <View style={[styles.outerCircle, userType === 'resident' && styles.selectedOuterCircle]}>
              {userType === 'resident' && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.radioText}>Resident</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radio} onPress={() => setUserType('forestOfficial')}>
            <View style={[styles.outerCircle, userType === 'forestOfficial' && styles.selectedOuterCircle]}>
              {userType === 'forestOfficial' && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.radioText}>Forest Official</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.forgotPassword}>Forget Password?</Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Log in</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 0.6,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  logo: {
    marginLeft: -20,
    width: '100%',
    height: '50%',
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordvisibility: {
    right: '60%',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2c7a7b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectedOuterCircle: {
    borderColor: '#2c7a7b',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2c7a7b',
  },
  radioText: {
    fontSize: 16,
  },
  forgotPassword: {
    color: '#63B58C',
    textAlign: 'center',
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: '#63B58C',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LoginScreen;
