import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from "react-native"
const Workmode = () =>{
    const navigation = useNavigation()
    return(
        <View style={{
            flex:1,
            backgroundColor:'#ffffff',
            paddingHorizontal:20
        }}>
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginTop:20
            }}>
            <View style={{
            flexDirection:'row',
            alignItems:'center',
            
           }}>
            <TouchableOpacity>
                <Image 
                source={require("../../Assets/pre.png")}
                style={{
                    width:18,
                    height:18,
                    resizeMode:'contain'
                }}
                />
            </TouchableOpacity>
            <Text style={{
                fontSize:25,
                fontWeight:'500',
                color:'#000000',
                marginLeft:12
            }}>
            Preferences
            </Text>
           </View>
           <View style={{
            flexDirection:'row',
            alignItems:'center',
            
           }}>
       
                <Image 
                source={require("../../Assets/notification.png")}
                style={{
                    width:18,
                    height:18,
                    resizeMode:'contain'
                }}
                />
                <Image 
                source={require("../../Assets/tv.png")}
                style={{
                    width:18,
                    height:18,
                    resizeMode:'contain',
                    marginLeft:8
                }}
                />
            
            
           </View>
            </View>

            <View style={{
                marginTop:20
            }}>
                <Text style={{
                fontSize:25,
                fontWeight:'500',
                color:'#000000',

            }}>
                Your preferences
                </Text>
            </View>

            <View style={{
                marginTop:20
            }}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'500',
                    color:'#000000'
                }}>
                Work mode
                </Text>
            </View>

        <View style={{
            flexDirection:'row',
            alignItems:'center'
        }}>
        <TouchableOpacity style={{
                backgroundColor:'#0038FF',
                padding:10,
                borderRadius:23,
                width:85,
                marginTop:24,
                alignItems:'center'
            }}>
                <Text style={{
                    fontSize:12,
                    fontWeight:'400',
                    color:'#FFFFFF'
                }}>
                    {"+ Remote"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor:'#0038FF',
                padding:10,
                borderRadius:23,
                width:85,
                marginTop:24,
                alignItems:'center',
                marginLeft:12
            }}>
                <Text style={{
                    fontSize:12,
                    fontWeight:'400',
                    color:'#FFFFFF'
                }}>
                    {"+ In office"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor:'#0038FF',
                padding:10,
                borderRadius:23,
                width:75,
                marginTop:24,
                alignItems:'center',
                marginLeft:12
            }}>
                <Text style={{
                    fontSize:12,
                    fontWeight:'400',
                    color:'#FFFFFF'
                }}>
                    {"+ Hybrid"}
                </Text>
            </TouchableOpacity>
        </View>
            

            
             <TouchableOpacity
            style={{
                backgroundColor:'#000959',
                height:56,
                alignItems:'center',
                justifyContent:'center',
                marginTop:"40%",
                borderRadius:16,
            }}
            onPress={()=>{
                navigation.navigate("WorkExpe")
            }}

            >
                <Text style={{
                    fontSize:16,
                    fontWeight:'600',
                    color:'#A2CEF4'
                }}>
                  Next
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export default Workmode