import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location'; // Import Expo Location module

const api = axios.create({
  baseURL: 'https://elephant-tracker-api.onrender.com/',
});

// Function to get user's geolocation
const getUserLocation = async () => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({});
    const location = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
    return location;
  } catch (error) {
    console.error('Error getting user location:', error);
    return null;
  }
};

api.interceptors.request.use(
  async (config) => {
    const userId = await SecureStore.getItemAsync('userId');
    let jwtToken = await SecureStore.getItemAsync('jwtToken');
    
    // Get user's geolocation
    const location = await getUserLocation();
  
    if (!jwtToken) {
      // If token is not available, redirect to login or handle the case accordingly
      // For example, you could redirect to the login screen
      window.location.href = '/login';
    } else {
      // Check if the token is expired
      const tokenExpiration = jwtToken && jwtToken.expiry ? new Date(jwtToken.expiry) : null;
      const currentTime = new Date();
      if (tokenExpiration && tokenExpiration < currentTime) {
        // Token is expired, fetch new token
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        const response = await api.post('/auth/refresh-token', { refreshToken });
        jwtToken = response.data.token;
        // Update the stored token with the new token
        SecureStore.setItemAsync('jwtToken', jwtToken);
      }

      config.headers['Authorization'] = `Bearer ${jwtToken}`;
      config.headers['X-User-Location'] = JSON.stringify(location); // Include location in headers
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
