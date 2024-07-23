import React, {useState, useEffect} from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from "../Reduxtoolkit/profileSlice";

const SplashScreen = ({navigation}) => {

  const [loggedIn, setLoggedIn] = useState(false); // Initialize to false
  const dispatch = useDispatch(); 

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem('isLoggedIn');
        const profile = await AsyncStorage.getItem('Profile');
        // Convert data to boolean
        setLoggedIn(data);
        // setLoggedIn(false);
        const Profile = JSON.parse(profile);
        dispatch(setProfile(Profile));
        //console.log('check', Profile.user.name);
      } catch (error) {
        console.error('Error fetching isLoggedIn:', error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    // console.log('dekh bhai ye login', loggedIn);

    const timer = setTimeout(() => {
      // Navigate based on loggedIn value
      if (loggedIn) {
        console.log('red');
        navigation.navigate('Bottomtab');
      } else {
        console.log('yellow');
        navigation.navigate('Choosejob');
        //  navigation.navigate('');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [loggedIn, navigation]); // Added loggedIn and navigation to dependency array



  return (
    <View style={styles.container}>
          <Image
            source={require('../Assets/splash.png')}
            resizeMode="contain"
            style={styles.mainIcon}
          />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F7FAF8',
  },
  mainIcon: {
    width: '100%',
  },
});

export default SplashScreen;
