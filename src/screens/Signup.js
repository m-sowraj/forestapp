import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView , Image , ScrollView, KeyboardAvoidingView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import * as Location from 'expo-location'; // Import Location from expo
import { useNavigation } from '@react-navigation/native';


export default function Signup() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Resident');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location.coords
  
  };

  const handleSubmit = async () => {
    const location = await getLocation();
    if(fullName==''){
        alert('Enter fullname');
        return;
    }
    // Phone number validation
    if (phoneNumber.length !== 10) {
      alert('Invalid Phone number');
      return;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email address');
      return;
    }
  
    // Password strength validation
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
        alert('Password must meet the following criteria:\n\n' +
        '- At least 8 characters long\n' +
        '- Contains at least one uppercase letter\n' +
        '- Contains at least one lowercase letter\n' +
        '- Contains at least one number\n' +
        '- Contains at least one special character\n');
      return;
    }
  
    // Confirm password validation
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    // All validations passed, send data to backend
    const formData = {
        fullname: fullName,
        phone_num: phoneNumber,
        email: email,
        password: password,
        latitude: location.latitude,
        longitude: location.longitude,
    };
  
    axios.post('https://elephant-tracker-api.onrender.com/api/userauth/register', formData)
      .then(response => {
        // Handle success
        console.log('Data sent successfully:', response.data);
        // Optionally, you can reset the form fields here
        setFullName('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('Resident');
        navigation.navigate('LoginScreen')
      })
      .catch(error => {
        // Handle error
        console.error('Error sending data:', error);
        // Additional error handling
        if (error.response) {
          console.error('Server responded with:', error.response.data);
          alert('Error: ' + error.response.data.message);
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('Error: No response received from server');
        } else {
          console.error('Error:', error.message);
          alert('Error: ' + error);
        }
      });
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
    <Image source={require('../../assets/welcomeback.png')} style={styles.logo} />
    <KeyboardAvoidingView  behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
         <View style={styles.form}>
          <Text style={styles.signUpText}>Sign up</Text>
          <TextInput
            style={styles.input}
            placeholder="Full name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Create password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.radioContainer}>
            <TouchableOpacity style={styles.radio} onPress={() => setRole('Resident')}>
              <View style={[styles.outerCircle, role === 'Resident' && styles.selectedOuterCircle]}>
                {role === 'Resident' && <View style={styles.innerCircle} />}
              </View>
              <Text style={styles.radioText}>Resident</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radio} onPress={() => setRole('Forest Official')}>
              <View style={[styles.outerCircle, role === 'Forest Official' && styles.selectedOuterCircle]}>
                {role === 'Forest Official' && <View style={styles.innerCircle} />}
              </View>
              <Text style={styles.radioText}>Forest Official</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button2}
            // onPress={handleSubmit} 
          >
            <LinearGradient
              colors={['#375a48', '#00E7B6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                justifyContent: 'center',
                borderRadius: 30,
                width: '100%',
                height: 70,
              }}
            >
              <Text style={styles.submitbuttonText} onPress={handleSubmit}>SUBMIT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5F3EA',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    padding: 16,
    borderRadius: 10,
    marginTop:'2%',
  },
  signUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
  },
  logo:{
   
    marginLeft:-20,
    width: '100%',
    height: '30%',
  },
  
  submitbuttonText: {
    color:'white',
    fontSize: 26,
  
    textAlign: 'center',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
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
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c7a7b',
    padding: 16,
    borderRadius: 10,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    marginRight: 8,
  },
  button2: {
    backgroundColor: '#375a48',
    justifyContent:'center',
    color:'white',
    borderRadius: 5,
    marginVertical: 5,
    width:"90%",
    height:70,
    margin:'3%',
    borderRadius:30,
    
  },
});
