import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from "react-native"
const Addskill = () =>{
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
                    fontSize:14,
                    fontWeight:'500',
                    color:'#060606'

                }}>
                Add Your Skills
                </Text>
                <View style={{
                    borderWidth:1,
                    marginTop:4,
                    borderRadius:15,
                    borderColor:'#9E9E9E'
                }}>
                <TextInput
                placeholder="Type skills"
                style={{
                    marginLeft:10
                }}
                />
                </View>
                
            </View>
            <View style={{
                flexDirection:'row',
                alignItems:'center'
            }}>
            <TouchableOpacity style={{
                // backgroundColor:'#0038FF',
                padding:5,
                borderRadius:23,
                // width:105,
                marginTop:24,
                alignItems:'center',
                borderWidth:1,
                borderColor:'#ABE0F8',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                paddingHorizontal:10

            }}>
                <Image
                source={require("../../Assets/html.png")}
                style={{
                    width:15,
                    height:15,
                    resizeMode:'contain'
                }}
                />
                <Text style={{
                    fontSize:12,
                    fontWeight:'400',
                    color:'#175574',
                    marginLeft:4
                }}>
                   {"HTML"}{" ×"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                // backgroundColor:'#0038FF',
                padding:5,
                borderRadius:23,
                // width:105,
                marginTop:24,
                alignItems:'center',
                borderWidth:1,
                borderColor:'#ABE0F8',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                marginLeft:10,
                paddingHorizontal:10

            }}>
                <Image
                source={require("../../Assets/html.png")}
                style={{
                    width:15,
                    height:15,
                    resizeMode:'contain'
                }}
                />
                <Text style={{
                    fontSize:12,
                    fontWeight:'400',
                    color:'#175574',
                    marginLeft:4
                }}>
                   {"CSS"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                marginLeft:10,
                marginTop:24
            }}>
                <Text style={{
                    fontSize:14,
                    fontWeight:'400',
                    color:'#17557480',
                    opacity:0.5
                }}>
                Select Skills
                </Text>
            </TouchableOpacity>
            </View>

           

            
             <TouchableOpacity
            style={{
                backgroundColor:'#000959',
                height:56,
                alignItems:'center',
                justifyContent:'center',
                marginTop:52,
                borderRadius:16,
            }}
            onPress={()=>{
                navigation.navigate("Looking")
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
export default Addskill