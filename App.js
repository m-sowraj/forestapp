import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ActivityIndicator, View } from 'react-native';
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
import ContactScreen from './src/screens/Contactscreen'; // Remove duplicate import
import io from 'socket.io-client';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const socket = io('https://elephant-tracker-api.onrender.com/');

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync();

    socket.on('elephant_sighting_confirmed', (data) => {
      console.log('Notification received:', data);
      console.log(data.message, data.sighting.description)
      showNotification(data.message, data.sighting.description);
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  const showNotification = async (title, message) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: message,
      },
      trigger: { seconds: 2 },
    });
  };

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

// async function registerForPushNotificationsAsync() {
//   const { status } = await Notifications.requestPermissionsAsync();
//   if (status !== 'granted') {
//     alert('Failed to get push token for push notification!');
//     return;
//   }

//   Notifications.setNotificationChannelAsync('default', {
//     name: 'default',
//     importance: Notifications.AndroidImportance.MAX,
//     vibrationPattern: [0, 250, 250, 250],
//     lightColor: '#FF231F7C',
//   });
// }

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}