import 'react-native-gesture-handler';
import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Job from '../Screen/TopTabScreen/Job';
import { StyleSheet, Text, View } from 'react-native'
import Internships from '../Screen/TopTabScreen/Internships';
import HeaderWithLogo from '../Component/HeaderWithLogo';

const Tab = createMaterialTopTabNavigator();

export default function Toptab() {
  return (
     <View style={{flex:1,backgroundColor: "#ffffff",}}>
        <View style={{height:'12%', justifyContent:'center', width:'100%', alignItems:'center'}}>
            <View style={{width:'80%'}}>
            <HeaderWithLogo
          imageSource={require("../Assets/dashboard/Logo.png")} 
          image = {false}
          />
      </View>
        </View>
        <Tab.Navigator 
            screenOptions={{
                tabBarStyle: { backgroundColor: '#f68b1e' }, // Background color of the tab bar
                tabBarIndicatorStyle: { backgroundColor: '#fff',}, // Indicator color
                tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' }, // Label style
                tabBarActiveTintColor: '#fff', // Active tab text color
                tabBarInactiveTintColor: 'silver', // Inactive tab text color
              }}
        >
          <Tab.Screen name="Jobs" component={Job} />
          <Tab.Screen name="Internships" component={Internships} />
        </Tab.Navigator>
    </View>
  );
}
