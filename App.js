import React from "react";
import {View,Text} from "react-native"
import AppNavigator from "./src/Navigation/Appnavigator";
import 'react-native-gesture-handler';
import DrawerNavigator from "./src/Navigation/DrawerNavigator";
const App = () =>{
    return(
       <DrawerNavigator/>
    )
}
export default App