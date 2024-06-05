import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import Footer from './src/component/footer';
import { useEffect, useState } from 'react';
import React from 'react';
import HomeScreen from './src/screens/Homescreen';
import Contactscreen from './src/screens/Contactscreen';
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
const Stack = createNativeStackNavigator ();

export default function App() {
  

  return (
    
    <NavigationContainer>
       <StatusBar backgroundColor="#eaf3f5" />
       

        <Stack.Navigator initialRouteName="Inpages">

            <Stack.Screen name="Inpages" component={Inpages} options={{ headerShown: false }}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AuthScreen" component={Authscreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />



        </Stack.Navigator>
       </NavigationContainer>


  );
}

function Inpages() {

  
  const [activePage, setActivePage] = useState('Home');



  const handleNavigationStateChange = (state) => {
    setActivePage(state.routes[state.index].name);
  };
  return (
    <>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="contact" component={Contactscreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ReportScreen" component={ReportScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
      <Stack.Screen name="AdminReportScreen" component={AdminReportScreen} />
      <Stack.Screen name="RewardsScreen" component={RewardsScreen} />
      <Stack.Screen name="Reportpage" component={Reportpage} />




 
    </Stack.Navigator>

   <Footer activePage={activePage} setActivePage={setActivePage} />


   </>
  )
}