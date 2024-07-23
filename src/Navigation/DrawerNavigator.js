import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
import { NavigationContainer } from '@react-navigation/native';
import ChandidateProfile from "../Screen/Resume/ChandidateProfile";
import SetupResume from "../Screen/Resume/SetupResume";
import AppNavigator from "./Appnavigator";
import CustomDrawer from "../Component/CustomDrawer";
const DrawerNavigator = () =>{
    return(
        <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={{drawerPosition:"right",headerShown: false}}>
        <Drawer.Screen name="AppNavigator" component={AppNavigator} />
        <Drawer.Screen name="ChandidateProfile" component={ChandidateProfile} />
        <Drawer.Screen name="SetupResume" component={SetupResume} />
        </Drawer.Navigator>
        </NavigationContainer>
       
    )
}
export default DrawerNavigator