import React from 'react';
import { View,Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Authscreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <Image source={require('../../assets/welcomeback.png')} style={styles.logo} />

    
    <View style={styles.buttonContainer}>
    
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
    
              <Text style={styles.submitbuttonText} onPress={ () =>{navigation.navigate('LoginScreen')} } >Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            // onPress={handleSubmit} 
          >
            
              <Text style={styles.submitbuttonText1} onPress={ () => {navigation.navigate('Signup')}}>Create an account</Text>
          
          </TouchableOpacity>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  },
  logo: {
    marginLeft: -20,
    width: '100%',
    height: '50%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  buttonContainer: {
    flex: 1, // Make the container take up the remaining space
    justifyContent: 'flex-end', // Align buttons at the bottom
    width: '100%', // Adjust width as needed
    marginBottom:'15%'
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
  button: {
    backgroundColor: 'white',
    justifyContent:'center',
    color:'white',
    borderRadius: 5,
    borderWidth:1,
    borderBlockColor:'#375a48',
    marginVertical: 5,
    width:"90%",
    height:70,
    margin:'3%',
    borderRadius:30,
    
  },
  submitbuttonText: {
    color:'white',
    fontSize: 24,
    marginLeft:'10%',
  },
  submitbuttonText1: {
    color:'#375a48',
    fontSize: 20,
    marginLeft:'10%',
  },
});

export default Authscreen;
