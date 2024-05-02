import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios'; // Import Axios
import * as Location from 'expo-location'; // Import Location from expo
import { useNavigation } from '@react-navigation/native';
import customMarkerImage from '../../assets/elephant.png';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false); 
  const [location, setLocation] = useState(null);
  const [elephantSightings, setElephantSightings] = useState([]);

  // Function to fetch user's current location
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  };

  // Function to fetch elephant sightings data
  const fetchElephantSightings = async () => {
    try {
      const response = await axios.get('https://elephant-tracker-api.onrender.com/api/elephant-sightings/confirmed');
      setElephantSightings(response.data.confirmedSightings);
    } catch (error) {
      console.error('Error fetching elephant sightings:', error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true); // Set refreshing indicator to true
    // Fetch location and elephant sightings data again
    getLocation();
   
    fetchElephantSightings();
    setRefreshing(false); // Set refreshing indicator back to false when done
  };

  useEffect(() => {
    getLocation(); // Fetch location when component mounts
    fetchElephantSightings(); // Fetch elephant sightings when component mounts
  }, []);

  return (
    <View style={styles.container}>
      {refreshing && ( // Conditionally render loader when loading is true
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#E04B35" style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 1000 }} />

        </View>
      )}
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.buttonText2}>Forest App</Text>
      </View>
      <View style={styles.report}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReportScreen')}>
          <Text style={styles.buttonText}>Make a Report</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        {/* <Text style={styles.refreshButtonText}>Refresh</Text> */}
        <Image source={require('../../assets/refresh.png')} style={styles.refresh} />

      </TouchableOpacity>

      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            description="This is your current location"
          
            style={styles.marker}
          />
          
          {/* Map over elephant sightings to render markers */}
          {elephantSightings.map((sighting, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: sighting.latitude,
                longitude: sighting.longitude,
              }}
              title="Elephant Sighting"
              description={sighting.description}
              image={customMarkerImage}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  
  refreshButton: {
    position: 'absolute',
    bottom: '12%',
    right: 20,
    backgroundColor: '#00C782',
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    zIndex:100
  },
  report: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: 50,

    top: 90,
    zIndex: 1000,
  },
  header: {
    position: 'absolute',
    alignItems: 'center',

    backgroundColor: '#eaf3f5',
    width: '100%',
    height: 70,
    borderRadius: 100,
    top: 10,
    paddingTop: 20,
    padding: 10,
    zIndex: 1000,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  refresh:{
    width: 20,
    height: 20,

   
  },
  buttonText2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: '22%',
  },

  button: {
    width: '90%',
    height: '90%',

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E04B35',
    elevation: 10,
    borderRadius: 5,
  },
  marker: {
    width: 5, // specify the width you desire
    height: 5, // specify the height you desire
  },
});
