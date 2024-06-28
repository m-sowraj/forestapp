import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Audio } from 'expo-av';

const Reportpage = ({ route }) => {
  const { report } = route.params;
  const navigation = useNavigation();
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false); // State to control image modal

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const handlePlayAudio = async (audioUrl) => {
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: audioUrl },
      { shouldPlay: true }
    );

    setSound(newSound);
    setIsPlaying(true);
  };

  const handleStopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const handleConfirm = async (type, id , notif) => {
    try {
      const Id = await SecureStore.getItemAsync('Id');

      const response1 = await axios.put(`https://elephant-tracker-api.onrender.com/api/elephant-sightings/${id}/confirm`, {
        officerId: Id,
        confirmationStatus: type === 1 ? "confirmed" : "notconfirmed",
        NotificationStatus: notif === 1 ? "yes" : "no"

      });

      console.log(response1.data);
    } catch (error) {
      console.error('Error confirming report:', error);
    } finally {
      navigation.navigate('AdminReportScreen');
    }
  };

  const toggleImageModal = () => {
    setShowImageModal(!showImageModal);
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.toplayer}>
        <TouchableOpacity onPress={toggleImageModal}>
          <Image source={{ uri: report.image_url }} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.topleftplayer}>
          <Text style={styles.name}>{report.user_id.fullname || report.user_id.name }</Text>
          <View style={styles.toplayer}>
            <Image source={require('../../assets/greenphone.png')} style={styles.avatar1} />
            <Text style={styles.phone}>{report.user_id.phone_num || report.user_id.phone}</Text>
          </View>
        </View>
      </View>

      <Modal
        visible={showImageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleImageModal}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={toggleImageModal}>
            <Image source={{ uri: report.image_url }} style={styles.fullScreenImage} resizeMode="contain" />
          </TouchableWithoutFeedback>
        </View>
      </Modal>

      <Text style={styles.description}>{report.description}</Text>
      <Text style={styles.timestamp}>{new Date(report.timestamp).toLocaleString()}</Text>
      {report.audio_url && (
        <>
          {isPlaying ? (
            <TouchableOpacity style={styles.button} onPress={handleStopAudio}>
              <Text style={styles.stopButton}>Stop Audio</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => handlePlayAudio(report.audio_url)}>
              <Text style={styles.playButton}>Play Audio</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      <TouchableOpacity style={[styles.button, styles.aanButton]} onPress={() => handleConfirm(1, report._id , 1)}>
        <Text style={styles.buttonText}>Approve and notify</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => handleConfirm(1, report._id , 0)}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={() => handleConfirm(2, report._id , 0)}>
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 1,
    backgroundColor: 'red',
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  aanButton: {
    width: '100%',
    backgroundColor: 'grey',
    marginBottom: 10,
  },
  toplayer: {
    flexDirection: 'row',
  },
  avatar1: {
    marginTop: 5,
    width: 16,
    height: 16,
  },
  topleftplayer: {
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: 25,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  phone: {
    fontSize: 15,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    width: '48%',
    backgroundColor: 'grey',
  },
  rejectButton: {
    width: '48%',
    backgroundColor: 'grey',
  },
  buttonText: {
    color: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 10,
  },
  playButton: {
    color: 'white',
    marginBottom: 10,
    padding: 10,
    borderRadius: 7,
    width: '108%',
    backgroundColor: '#00C782',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButton: {
    color: 'white',
    marginBottom: 10,
    padding: 10,
    borderRadius: 7,
    width: '108%',
    backgroundColor: '#00C782',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});

export default Reportpage;
