import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, ScrollView, TextInput, Image, Alert, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import * as Location from 'expo-location'; // Import Location from expo
import AudioRecorder from '../component/AudioRecord';

export default function ReportScreen() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const navigation = useNavigation();
  

  useEffect(() => {
    (async () => {
      
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
        }
      
    })();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location.coords
  
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };



  const handleSubmit = async () => {
    const location = await getLocation();
    const data = {
      user_id:"662bd6a5c7bb26949f85185c",
      latitude: location.latitude,
      longitude: location.longitude,
      description: description,
      image_url: "image.uri" , 
      audio_url:  "audio.uri"  
    };
  
    // Send the data to your server using Axios
    axios.post('https://elephant-tracker-api.onrender.com/api/elephant-sightings', data)
      .then(response => {
        // Handle success
        console.log('Submission successful:', response.data);
        // Reset the form after successful submission
        setImage(null);
  
        setDescription('');
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting report:', error);
        // Optionally, you can show an error message to the user
      });
  };
  

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
    contentContainerStyle={styles.scrollViewContainer}
    showsVerticalScrollIndicator={false}
  >
    <View style={styles.container}>
                <Image source={require('../../assets/logo.png')} style={styles.logo1} />
               <View style={styles.header}>
               <TouchableOpacity onPress={handleBackPress}>
                    <Image source={require('../../assets/back.png')} style={styles.logo} />
                </TouchableOpacity>
                 <Text style={styles.buttonText2}>Make a New Report</Text>
               </View>

 
      {image && (
        <>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.imgcontainer}>
       
            <TouchableOpacity style={styles.button1} onPress={takePhoto}>
            <Text style={styles.buttonText}>Click Again</Text>
            </TouchableOpacity>
            </View>
        </>
      
      )
      
      }
       {!image && (
        <>
        
            <View style={styles.imgcontainer2}>
            <TouchableOpacity style={styles.takePhotobutton} onPress={takePhoto}>
            <Text style={styles.buttonText}>Click Image</Text>
            </TouchableOpacity>
     
            
            </View>
        </>
      
      )
      
      }


      <TextInput
        style={[styles.input, { height: 100}]}
        placeholder="Description"
        onChangeText={text => setDescription(text)}
        value={description}
        multiline
      />

      <AudioRecorder />
            

<TouchableOpacity
      style={[
        styles.button2,
        { opacity: image ? 1 : 1 },
      ]}
      onPress={handleSubmit} 
      disabled={!image}
    >
      <LinearGradient
        colors={[ '#375a48','#00E7B6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          justifyContent: 'center',
          
          borderRadius: 30,
       
          width: '100%',
          height: 70,
        
        }}
      >
        <Text style={styles.submitbuttonText}>SUBMIT</Text>
      </LinearGradient>
    </TouchableOpacity>
    
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#eaf3f5",
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom:80,
  },
  imgcontainer:{
    flexDirection:'row',
    justifyContent: 'space-between',
    
   
  },
  imgcontainer2:{
    
   width:'100%'
  },
  button: {
    backgroundColor: '#00C782',
    justifyContent:'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width:"47%",
    margin:'3%',
  },
  button1: {
    backgroundColor: '#00C782',
    justifyContent:'center',
    padding: 2,
    borderRadius: 5,
    height:20,
    width:"45%",
    marginTop:-20,
    
  },
  takePhotobutton:{
    borderStyle: 'dashed',
    borderColor: 'gray',
    borderWidth: 1,
    paddingVertical:'20%',
    paddingHorizontal:'30%',
    borderRadius:11,
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
  button3: {
    backgroundColor: '#00C782',
    justifyContent:'center',
    padding: 10,
    borderRadius: 5,
    marginTop:10,
    marginVertical: 5,
    width:"100%",
    
    height: 50,
    
  },
  buttonText: {
    color: '#1B4332',
    fontSize: 26,
    fontWeight:'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: '#1B4332',
    fontSize: 12,
    fontWeight:'bold',
    textAlign: 'center',
  },
  submitbuttonText: {
    color:'white',
    fontSize: 26,
    fontWeight:'bold',
    textAlign: 'center',
  },
  image: {
    borderRadius:10,
    width: 350,
    height: 200,
    marginVertical: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',

    borderBottomWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  header:{
   
    alignItems:'center',
    
    backgroundColor:'#eaf3f5',
    width:'100%',

    borderRadius:100,
    marginBottom:'10%',
    paddingTop:5,
   
    zIndex:1000,
    flexDirection:'row',
  },

  logo: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  logo1: {
    width: 100,
    height: 100,
  },
 buttonText2: {
  fontSize: 25,
  fontWeight: 'bold',
  color: '#1B4332',
  marginLeft:'10%'
},
});
