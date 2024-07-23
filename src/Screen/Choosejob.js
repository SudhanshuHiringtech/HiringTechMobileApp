import { useNavigation } from "@react-navigation/native";
import React,{useState} from "react";
import {View,Text,TouchableOpacity,Image} from "react-native"
const Choosejob = () =>{
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
                marginTop:80,
                alignItems:'center'
            }}>
                <Text style={{
                    fontSize:24,
                    fontWeight:'400',
                    color:'#000000'
                }}>
                Are you looking to take a job or 
                </Text>
                <Text style={{
                    fontSize:24,
                    fontWeight:'400',
                    color:'#000000'
                }}>
                hire an employee.
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
                navigation.navigate("Login",{item:1})
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
                navigation.navigate("Login",{item:2})
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
            
            </View>
            
        </View>
    )
}
export default Choosejob