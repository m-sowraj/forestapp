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
const Stack = createNativeStackNavigator ();

export default function App() {
  const [type, settype] = useState(null)
  const [activePage, setActivePage] = useState('Home');

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

  const handleNavigationStateChange = (state) => {
    setActivePage(state.routes[state.index].name);
  };

  return (
    
    <NavigationContainer>
       <StatusBar backgroundColor="#eaf3f5" />
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="contact" component={Contactscreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ReportScreen" component={ReportScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
      <Stack.Screen name="AdminReportScreen" component={AdminReportScreen} />
      <Stack.Screen name="RewardsScreen" component={RewardsScreen} />


 
    </Stack.Navigator>


   <Footer activePage={activePage} setActivePage={setActivePage} />
       </NavigationContainer>


  );
}
const styles = StyleSheet.create({
  container: {
  
  },
});