import * as React from 'react';
import { View, Text,Image,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from '../Screen/BottomTabScreen/Home';
import Toptab from './Toptab';
import Appleid from "../Screen/BottomTabScreen/Applied"

import Message from '../Screen/BottomTabScreen/Message';
const Tab = createBottomTabNavigator();


const Bottomtab = ()=> {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
    <Tab.Screen name="Home" component={Home} 
    options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
              source={require('../Assets/home.png')}
              style={{
                ...styles.imageStyle,
                tintColor: focused ? '#81402f' : '#175574',
              }}
            />
          </View>
        ),
        tabBarLabel: ({focused, color}) => (
          <Text
            style={{color: focused ? '#81402f' : '#175574'}}>
            Dashboard
          </Text>
        ),
      }}
    />
    <Tab.Screen name="Job" component={Toptab}
    options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
              source={require('../Assets/jobs.png')}
              style={{
                ...styles.imageStyle,
                tintColor: focused ? '#81402f' : '#175574',
              }}
            />
          </View>
        ),
        tabBarLabel: ({focused, color}) => (
          <Text
            style={{color: focused ? '#81402f' : '#175574'}}>
            jobs
          </Text>
        ),
      }}
    />

    <Tab.Screen name="Appleid" component={Appleid} 
     options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
              source={require('../Assets/Applied.png')}
              style={{
                ...styles.imageStyle,
                tintColor: focused ? '#81402f' : '#175574',
              }}
            />
          </View>
        ),
        tabBarLabel: ({focused, color}) => (
          <Text
            style={{color: focused ? '#81402f' : '#175574'}}>
            Applied
          </Text>
        ),
      }}
    />
  
    <Tab.Screen name="Message" component={Message} 
    options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
              source={require('../Assets/message.png')}
              style={{
                ...styles.imageStyle,
                tintColor: focused ? '#81402f' : '#175574',
              }}
            />
          </View>
        ),
        tabBarLabel: ({focused, color}) => (
          <Text
            style={{color: focused ? '#81402f' : '#175574'}}>
            Messages
          </Text>
        ),
      }}
    />
  </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      //backgroundColor:'#fff'
    },
    tabBarStyle: {
      backgroundColor: '#FDD312',
      height: 60,
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
      paddingHorizontal:20,
    },
    imageStyle: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
    },
  });
export default Bottomtab;