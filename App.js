import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ActivityIndicator, View, Alert, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Footer from './src/component/footer';
import { useEffect, useState } from 'react';
import React from 'react';
import HomeScreen from './src/screens/Homescreen';
import ProfileScreen from './src/screens/Profilescreen';
import ReportScreen from './src/screens/ReportScreen';
import * as SecureStore from 'expo-secure-store';
import ReportsScreen from './src/screens/ReportsScreen';
import AdminReportScreen from './src/screens/AdminReportScreen';
import LoginScreen from './src/screens/Loginscreen';
import RewardsScreen from './src/screens/RewardsScreen';
import Reportpage from './src/component/ReportModal';
import Signup from './src/screens/Signup';
import Authscreen from './src/screens/Authscreen';
import ContactScreen from './src/screens/Contactscreen'; 
import io from 'socket.io-client';
import messaging from "@react-native-firebase/messaging";

const socket = io('https://elephant-tracker-api.onrender.com/');

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  const requestPermissions = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = 
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      await messaging().subscribeToTopic('all');
    } else {
      console.log("Permission not granted:", authStatus);
    }
  };

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await requestPermissions();
        const token = await messaging().getToken();
        console.log("FCM Token:", token);
        
        // Handle notification when app is opened from a quit state
        const initialNotification = await messaging().getInitialNotification();
        if (initialNotification) {
          console.log("Initial Notification:", initialNotification.data);
        }

        // Handle notification when the app is in the background or killed state
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          console.log("Background notification:", remoteMessage.data);
        });
        messaging().onMessageReceived(async (remoteMessage) => {
          console.log("Background notification:", remoteMessage.data);
        })

        // Handle notification when app is running in the foreground
        messaging().onMessage(async (remoteMessage) => {
          Alert.alert(JSON.stringify(remoteMessage.data.title), JSON.stringify(remoteMessage.data.body));
        });

      
      } catch (error) {
        console.error("Error initializing notifications:", error);
      }
    };
    initializeNotifications();
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('jwtToken');
      setInitialRoute(token ? 'Inpages' : 'AuthScreen');
    };

    checkToken();
  }, []);

  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#eaf3f5" />
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Inpages" component={Inpages} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AuthScreen" component={Authscreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Inpages() {
  const [activePage, setActivePage] = useState('Home');

  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="contact" component={ContactScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReportScreen" component={ReportScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
        <Stack.Screen name="AdminReportScreen" component={AdminReportScreen} />
        <Stack.Screen name="RewardsScreen" component={RewardsScreen} />
        <Stack.Screen name="Reportpage" component={Reportpage} />
      </Stack.Navigator>
      <Footer activePage={activePage} setActivePage={setActivePage} />
    </>
  );
}
