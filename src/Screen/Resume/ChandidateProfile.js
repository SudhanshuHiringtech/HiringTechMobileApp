import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity
} from "react-native"
const ChandidateProfile = () =>{
    const navigation = useNavigation()
    return(
        <View style={{
            flex:1,
            backgroundColor:'#FFF7F7',
            paddingHorizontal:20
        }}>
            <ScrollView>

          
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginTop:20
            }}>
            
            
            <Text style={{
                fontSize:25,
                fontWeight:'500',
                color:'#000000',
                // marginLeft:12
            }}>
            My Resume
            </Text>
          
           <View style={{
            flexDirection:'row',
            alignItems:'center',
            
           }}>
       
                <Image 
                source={require("../../Assets/notification.png")}
                style={{
                    width:25,
                    height:25,
                    resizeMode:'contain'
                }}
                />
                <Image 
                source={require("../../Assets/tv.png")}
                style={{
                    width:30,
                    height:30,
                    resizeMode:'contain',
                    marginLeft:8
                }}
                />
            
            
           </View>
            </View>
            <View style={{height:1,backgroundColor:'#44404026',marginVertical:20}}/>


            <View style={{
                backgroundColor:'#ffffff',
                padding:32,
                alignItems:'center',
                marginTop:24
            }}>

            <View style={{
                borderWidth:1,
                borderColor:'#9E9E9E',
                width:229,
                height:44,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:9
            }}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'500',
                    color:'#000000'
                }}>
                Personal Details
                </Text>
            </View>
            <View style={{
                borderWidth:1,
                borderColor:'#9E9E9E',
                width:229,
                height:44,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:9,
                marginTop:16
            }}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'500',
                    color:'#000000'
                }}>
                Education
                </Text>
            </View>
            <View style={{
                borderWidth:1,
                borderColor:'#9E9E9E',
                width:229,
                height:44,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:9,
                marginTop:16
            }}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'500',
                    color:'#000000'
                }}>
                Work Experience
                </Text>
            </View>
            <View style={{
                borderWidth:1,
                borderColor:'#9E9E9E',
                width:229,
                height:44,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:9,
                marginTop:16
            }}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'500',
                    color:'#000000'
                }}>
                Certifications
                </Text>
            </View>
            <View style={{
                borderWidth:1,
                borderColor:'#9E9E9E',
                width:229,
                height:44,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:9,
                marginTop:16
            }}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'500',
                    color:'#000000'
                }}>
                Add Portfolio
                </Text>
            </View>

            <View style={{
                borderWidth:1,
                borderColor:'#ABE0F8',
                width:273,
                height:98,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:9,
                marginVertical:50,

            }}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'500',
                    color:'#000000'
                }}>
               Upload Resume
                </Text>
                <Text style={{
                    fontSize:8,
                    fontWeight:'500',
                    color:'#000000'
                }}>
               Supported formats: doc, docx, pdf, jpeg up to 5MB
                </Text>
            </View>
           
            </View>



            <View style={{
                backgroundColor:'#ffffff',
                
              
                marginTop:24,
                paddingTop:10,
                paddingHorizontal:12,
                height:141,
                marginBottom:60
            }}>

                <Text style={{
                    fontSize:14,
                    fontWeight:'500',
                    color:'#3787E5'
                }}>
                + Add additional detail/ accomplishment
                </Text>


           
            </View>

           

           
            </ScrollView>
            
            
        </View>
    )
}
export default ChandidateProfile