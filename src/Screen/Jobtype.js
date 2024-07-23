import { useNavigation } from "@react-navigation/native";
import React,{useState} from "react";
import {View,Text,TouchableOpacity,Image} from "react-native"
const Jobtype = () =>{
    const navigation = useNavigation()
    const [isVisibleh,setISVisibleh] = useState(false)
    const [isVisiblec,setISVisiblec] = useState(false)
    return(
        <View style={{
            flex:1,
            backgroundColor:'#ffffff',
            paddingHorizontal:20
        }}>
             <View style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:40,
                
            }}>
                <TouchableOpacity
                onPress={()=>{
                    navigation.goBack()
                }}
                >
                <Image
                source={require("../Assets/arrow-left.png")}
                style={{
                    width:24,
                    height:24,
                    resizeMode:'contain'
                }}
                />
                </TouchableOpacity>
               
                <Text style={{
                    fontSize:24,
                    fontWeight:'500',
                    color:'#000000',
                    marginLeft:10
                }}>
                Job Type
                </Text>
            </View>
            <View style={{
                marginTop:40
            }}>
                <Text style={{
                    fontSize:18,
                    fontWeight:'400',
                    color:'#000000'
                }}>
                Are you looking to take a job or hire an employee.
                </Text>
            </View>
            <TouchableOpacity 
            style={{
                alignItems:'center',
                marginTop:50,
                borderWidth:3,
                height:132,
                justifyContent:'center',
                borderRadius:40,
                borderColor:isVisiblec?'#A2CEF4':'#D1D1D166',
                backgroundColor:isVisiblec?'#A2CEF40D':'#ffffff'
            }}
            onPress={()=>{
                setISVisiblec(true)
                setISVisibleh(false)
            }}
            >
                <Text style={{
                    fontSize:24,
                    fontWeight:'500',
                    color:"#000000"
                }}>
                Find A Job
                </Text>
                <Text style={{
                    fontSize:16,
                    fontWeight:'300',
                    color:"#000000"
                }}>
                I want to find a job.
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={{
                alignItems:'center',
                marginTop:50,
                borderWidth:3,
                height:132,
                justifyContent:'center',
                borderRadius:40,
                borderColor:isVisibleh?'#A2CEF4':'#D1D1D166',
                backgroundColor:isVisibleh?'#A2CEF40D':'#ffffff'
            }}
            onPress={()=>{
                setISVisiblec(false)
                setISVisibleh(true)
            }}
            >
                <Text style={{
                    fontSize:24,
                    fontWeight:'500',
                    color:"#000000"
                }}>
                Hire An Employee
                </Text>
                <Text style={{
                    fontSize:16,
                    fontWeight:'300',
                    color:"#000000"
                }}>
                I want to find an employee.
                </Text>
            </TouchableOpacity>
            <View style={{
                flex:1,
                justifyContent:'flex-end',
                marginBottom:30
            }}>
            <TouchableOpacity
            style={{
                backgroundColor:isVisiblec||isVisibleh?'#000959':'#C9C9C933',
                height:56,
                alignItems:'center',
                justifyContent:'center',
                marginTop:12,
                borderRadius:16,
               
            }}
            >
                <Text style={{
                    fontSize:16,
                    fontWeight:'600',
                    color:isVisiblec||isVisibleh?'#A2CEF4':'#000000'
                }}>
                  Next
                </Text>
            </TouchableOpacity>
            </View>
            
        </View>
    )
}
export default Jobtype