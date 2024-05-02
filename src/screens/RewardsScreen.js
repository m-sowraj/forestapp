import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator,Image , TouchableOpacity , Share} from 'react-native';
import axios from 'axios';

const RewardsScreen = () => {
  const [rewards, setRewards] = useState([]);
  const [totalRewards, setTotalRewards] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleSharePress = async (point) => {
    try {
        let imgpath;

        if (point == 5) {
          imgpath = require('../../assets/5Points.png');
        } else {
          imgpath = require('../../assets/2Points.png');
        }
        
        const result = await Share.share({
          message: `I have earned ${point} points by spotting an Elephant, Download this app to get notification about Elephants near you and earn points by spotting an elephant, APP LINK: '---app link ---'`,
          url: imgpath,
        });
        
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared via an activity
          console.log(`Shared via ${result.activityType}`);
        } else {
          // Shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await axios.get('https://elephant-tracker-api.onrender.com/api/rewards/user/662bd6a5c7bb26949f85185c');
        setRewards(response.data.rewards);
        console.log(response.data.rewards)
        calculateTotalRewards(response.data.rewards);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching rewards:', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchRewards();
  }, []);

  const calculateTotalRewards = (rewards) => {
    const total = rewards.reduce((acc, reward) => acc + reward.points, 0);
    setTotalRewards(total);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

// Function to format date (extract month and date alone)
const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.toLocaleString('default', { month: 'short' }); // Get short month name
    const day = date.getDate(); // Get date
    return `${month} ${day}`; // Concatenate month and date
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      

      {rewards.length === 0 ? (
        <Text style={styles.noRewards}>No rewards earned yet</Text>
      ) : (
        <>
        <Text style={styles.totalRewards}>Total Points Earned: {totalRewards}</Text>

        <Text style={styles.header}>Your Rewards</Text>
        <View style={styles.rewardItems}>
        {rewards.map((reward, index) => (
           
          <View key={index} style={styles.rewardItem}>
            <Text style={styles.rewardText}> {reward.points} </Text>
            <Text style={styles.rewardText1}> points won </Text>
            <Text style={styles.rewardText2}> Tell yout friends</Text>
            <Text style={styles.rewardText3}> For your report </Text>

            <Text style={styles.rewardText3}> on {formatDate(reward.timestamp)}</Text>
            <TouchableOpacity style={styles.share}  onPress={() =>handleSharePress(reward.points)}>
            <Image source={require('../../assets/share.png')} style={styles.shareimg}  />
             </TouchableOpacity>

       
          </View>
        )
        )}
        </View></>
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#eaf3f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  rewardItem: {
    width:'47%',
    margin: 5,
    padding: 10,
    height:130,
    alignContent:'center',
    backgroundColor:'white',
    elevation:10,
    borderRadius:20
  },
  rewardItems: {
    flexDirection:'row',
    padding: 10,
    flexWrap: 'wrap'
  },
  rewardText: {
    fontSize: 26,
    fontWeight:'bold',
    color:'#00C782',
  
  },
  rewardText1: {
    fontSize: 18,
  
    color:'#00C782',
    marginTop:-10,
    
    
  },
  rewardText3:{
    fontSize: 15,
    marginTop:-5,
  },
  rewardText2:{
        position:'absolute',
        right:15,
        bottom:5,
        color:'grey',
        fontSize: 8,
        
  },
  totalRewards: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    backgroundColor: '#D2E4D6',
    width: '100%',
    padding: 20,
    paddingLeft: '15%',
  },
  noRewards: {
    fontSize: 16,
    marginTop: 20,
    color: 'gray',
  },
  share:{
    position:'absolute',
 
    bottom:15,
    right:15
  },
  shareimg:{
    height:25,
    width:25,
  }
});

export default RewardsScreen;
