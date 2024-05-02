import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Homesvg from './icons/Home';
import SearchSVG from './icons/Searchsvg';
import SettingsSVG from './icons/Settingssvg';
import ProfileSVG from './icons/ProfileSvg';
import ReportSvg from './icons/ReportSvg';
import ContactsSvg from './icons/ContactsSvg';
import * as SecureStore from 'expo-secure-store';


const Footer = ({ activePage, setActivePage }) => {
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [type, settype] = useState(null)
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


 

  useEffect(() => {
    
    
    get();
  }, [type])
  
  const get = async () =>{
    const value = await SecureStore.getItemAsync('key');
    if(value == null){
        settype(1)
    }
    else if(value == 1){
        settype(1)
    }
    else(
      settype(2)
    )
  }
  
    
    return (
      <>
        {keyboardVisible ? null : (
          <View style={[styles.container, keyboardVisible && styles.containerHidden]}>
            <TouchableOpacity
              style={[styles.option]}
              onPress={() => {
                setActivePage('Home');
                navigation.navigate('Home');
              }}
            >
              {activePage === 'Home' ? <Homesvg color={'black'} /> : <Homesvg color={'white'} />}
              <Text style={[styles.optionText, activePage === 'Home' && styles.activeOptionText]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, activePage === 'Search' && styles.activeOption]}
              onPress={ async() => {
              const value = await SecureStore.getItemAsync('key');
              setActivePage('Search');
               if(value == null){
               settype(1)
               navigation.navigate('ReportsScreen');
               }
               else if(value == 1){
                settype(1)
                navigation.navigate('ReportsScreen');
                 }
                else{
                  settype(2)
                  navigation.navigate('AdminReportScreen');
                }
            

                 
                
              }}
            >
              {activePage === 'Search' ? <ReportSvg color="black" /> : <ReportSvg color={'white'} />}
              <Text style={[styles.optionText, activePage === 'Search' && styles.activeOptionText]}>Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, activePage === 'Settings' && styles.activeOption]}
              onPress={() => {setActivePage('Settings')  
              navigation.navigate('contact');
            }}
            >
              {activePage === 'Settings' ? <ContactsSvg color={'black'} /> : <ContactsSvg color={'white'} />}
              <Text style={[styles.optionText, activePage === 'Settings' && styles.activeOptionText]}>Contacts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, activePage === 'Profile' && styles.activeOption]}
              onPress={() => {setActivePage('Profile')
              navigation.navigate('Profile');
            }}
            >
              {activePage === 'Profile' ? <ProfileSVG color={'black'} /> : <ProfileSVG color={'white'} />}
              <Text style={[styles.optionText, activePage === 'Profile' && styles.activeOptionText]}>Profile</Text>
            </TouchableOpacity>
            </View>
        )}
      </>
    );
    

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00C782',
    paddingVertical: 10,
    position: 'absolute',
    borderRadius:25,
    elevation: 0,
    bottom: 5,
    left: 5,
    right: 5,
    height: 75,
    zIndex:10,
  },
  containerHidden: {
    bottom: Platform.OS === 'ios' ? 0 : 50, // Adjust this value based on your needs
  },
  option: {
    flex: 1,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: 'white',
  },
  activeOptionText: {
    color: 'black', // Change the color of the text for the active option
  },
});

export default Footer;
