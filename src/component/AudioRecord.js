import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';

export default function AudioRecorder({ onAudioRecorded }) {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [audioUri, setAudioUri] = useState(null);

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudioUri(uri);
    if (onAudioRecorded) {
      onAudioRecorded(uri);
    }
    console.log('Recording stopped and stored at', uri);
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
  };

  const playSound = async () => {
    console.log('Playing sound..');
    await sound.playAsync();
  };

  const deleteSound = () => {
    setSound(null);
    setAudioUri(null);
    if (onAudioRecorded) {
      onAudioRecorded(null);
    }
  };

  return (
    <View style={styles.container}>
      {!sound && (
        <TouchableOpacity style={styles.button} onPress={recording ? stopRecording : startRecording}>
          <Text style={styles.buttonText}>{recording ? 'Stop Recording' : 'Record Audio'}</Text>
          <Image source={require('../../assets/audio.png')} style={styles.img} />
        </TouchableOpacity>
      )}
      {sound && (
        <View style={styles.audioControls}>
          <TouchableOpacity style={styles.controlButton} onPress={playSound}>
            <Text style={styles.controlButtonText}>Play Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={deleteSound}>
            <Text style={styles.controlButtonText}>Delete Audio</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#00C782',
    fontSize: 18,
    fontWeight: 'bold',
  },
  img: {
    height: 20,
    width: 15,
    marginHorizontal: 10,
  },
  audioControls: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    width: '45%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '2%',
  },
  controlButtonText: {
    color: '#00C782',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
