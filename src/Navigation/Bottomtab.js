import * as React from 'react';
import { View, Text,Image,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from "../Reduxtoolkit/profileSlice";

import Home from '../Screen/BottomTabScreen/Home';
import Toptab from './Toptab';
import Appleid from "../Screen/BottomTabScreen/Applied"

import Message from '../Screen/BottomTabScreen/Message';
import HRJobsScreen from '../../HRScreens/HRJobsScreen';
import Candidates from '../Screen/BottomTabScreen/Candidates'
const Tab = createBottomTabNavigator();


const Bottomtab = ()=> {

  const profile = useSelector(selectProfile);
  //console.log("DD", profile.profile.user.email)
  const userdesignation = profile?.profile?.user?.userdesignation;
  console.log("userDesignation",userdesignation)

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
    <Tab.Screen name="Job" component={ userdesignation == 'recuriter' ? HRJobsScreen : Toptab }
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

            <Tab.Screen
                name="Appleid"
                component={Appleid}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require("../Assets/Applied.png")}
                                style={{
                                    ...styles.imageStyle,
                                    tintColor: focused ? "#D79442" : "#175574",
                                }}
                            />
                        </View>
                    ),
                    tabBarLabel: ({ focused, color }) => ( 
                        
                        <Text
                            style={[
                                styles.text,
                                { fontWeight: focused ? "bold" : "normal" },
                            ]}>
                            Applied
                        </Text>
                    ),
                }}
            />
            <Tab.Screen 
            name="Candidates"
            component={Candidates}
            options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            source={require("../Assets/Applied.png")}
                            style={{
                                ...styles.imageStyle,
                                tintColor: focused ? "#D79442" : "#175574",
                            }}
                        />
                    </View>
                ),
                tabBarLabel: ({ focused, color }) => ( 
                    
                    <Text
                        style={[
                            styles.text,
                            { fontWeight: focused ? "bold" : "normal" },
                        ]}>
                        Candidates
                    </Text>
                ),
            }}
            />

            <Tab.Screen
                name="Message"
                component={Message}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require("../Assets/message.png")}
                                style={{
                                    ...styles.imageStyle,
                                    tintColor: focused ? "#D79442" : "#175574",
                                }}
                            />
                        </View>
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text
                            style={[
                                styles.text,
                                { fontWeight: focused ? "bold" : "normal" },
                            ]}>
                            Messages
                        </Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
const styles = StyleSheet.create({
    text: {
        color: "#175574",
        fontSize: 12,
    },
    imageStyle: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    tabBarStyle: {
        paddingHorizontal: 20,
        height: 65,
    },
    tabBarItemStyle: {
        resizeMode: "contain",
        marginBottom: 10,
    },
});
export default Bottomtab;
