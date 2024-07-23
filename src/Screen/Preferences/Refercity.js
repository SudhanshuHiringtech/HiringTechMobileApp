

import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from "react-native"
const Refercity = () =>{
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
                <View style={{
                    flexDirection:'row',
                    alignItems:'center'
                }}>
                <Text style={{
                    fontSize:14,
                    fontWeight:'500',
                    color:'#060606'

                }}>
                Preferred city
                </Text>
                <Text style={{
                    fontSize:14,
                    fontWeight:'500',
                    color:'#9F9F9F'

                }}>
                (Optional)
                </Text>

                </View>
               
                <View style={{
                    borderWidth:1,
                    marginTop:4,
                    borderRadius:15,
                    borderColor:'#9E9E9E'
                }}>
                <TextInput
                placeholder="Add more locations"
                style={{
                    marginLeft:10
                }}
                />
                </View>
                
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
                navigation.navigate("Preferences")
            }}

            >
                <Text style={{
                    fontSize:16,
                    fontWeight:'600',
                    color:'#A2CEF4'
                }}>
                  Save
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export default Refercity