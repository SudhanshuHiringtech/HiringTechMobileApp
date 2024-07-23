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
const SetupResume = () =>{
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

            <View>
                <Text style={{
                    fontSize:20,
                    fontWeight:'500',
                    color:'#000000'
                }}>
                Personal Details
                </Text>

                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    marginTop:20
                }}>
                 <View>
                    <Text style={{
                        fontSize:11,
                        fontWeight:'500',
                        color:'#060606'
                    }}>
                    First name
                    </Text>
                <TextInput  
                style={{
                    borderWidth:1,
                    borderColor:'#9E9E9E',
                    width:157,
                    borderRadius:15,
                    marginTop:4,
                    height:44
                }}
                />
                </View>
                <View>
                <Text style={{
                        fontSize:11,
                        fontWeight:'500',
                        color:'#060606',
                        marginLeft:20,
                        
                    }}>
                Last name
                </Text>
                <TextInput  
                style={{
                    borderWidth:1,
                    borderColor:'#9E9E9E',
                    width:157,
                    marginLeft:20,
                    borderRadius:15,
                    marginTop:4,
                    height:44
                }}
                />
                </View>
                
                </View>

                
            </View>

            <View style={{
                marginTop:20,
                alignItems:'center',
                flexDirection:'row'
            }}>
            <TextInput  
                style={{
                    borderWidth:1,
                    borderColor:'#9E9E9E',
                    width:74,
                    borderRadius:15,
                    marginTop:4,
                    height:71
                }}
                />
                
                <Text style={{
                    fontSize:12,
                    fontWeight:'400',
                    paddingHorizontal:10,
                    color:'#848484',
                    width:292
                }}>
                Upload a professional picture of yourself (Max file size : 1Mb and max reolution: 500px x 500px. File type - jpeg, jpg, png,  gif)
                </Text>
            </View>

            <View style={{
                backgroundColor:'#C0EBFF',
                height:44,
                alignItems:'center',
                justifyContent:'center',
                marginTop:20,
                borderWidth:1,
                borderColor:'#3787E5',
                borderRadius:9

            }}>
                <Text style={{
                    fontSize:11,
                    fontWeight:'500',
                    color:'#2C6FBE'
                }}>
                Change picture
                </Text>
            </View>

            <View style={{
                marginTop:20
            }}>
                    <Text style={{
                        fontSize:11,
                        fontWeight:'500',
                        color:'#060606'
                    }}>
                    Email
                    </Text>
                <TextInput  
                style={{
                    borderWidth:1,
                    borderColor:'#9E9E9E',
                    width:167,
                    borderRadius:15,
                    marginTop:4,
                    height:44
                }}
                />
                </View>

            
                <View style={{
                marginTop:20
            }}>
                    <Text style={{
                        fontSize:11,
                        fontWeight:'500',
                        color:'#060606'
                    }}>
                   Contact number
                    </Text>
                    <View style={{
                        flexDirection:'row',
                        alignItems:'center'
                    }}>
                    <TextInput  
                style={{
                    borderWidth:1,
                    borderColor:'#9E9E9E',
                    width:84,
                    borderRadius:15,
                    marginTop:4,
                    height:44
                }}
                />
                <TextInput  
                style={{
                    borderWidth:1,
                    borderColor:'#9E9E9E',
                    width:167,
                    borderRadius:15,
                    marginTop:4,
                    height:44,
                    marginLeft:20
                }}
                />
                    </View>
                
                </View>

                <View style={{
                marginTop:20
            }}>
                    <Text style={{
                        fontSize:11,
                        fontWeight:'500',
                        color:'#060606'
                    }}>
                   Current city

                    </Text>
                    <Text style={{
                        fontSize:11,
                        fontWeight:'500',
                        color:'#8A8A8F'
                    }}>
                    To connect you with opportunity closer to you
                    </Text>
                <TextInput  
                style={{
                    borderWidth:1,
                    borderColor:'#9E9E9E',
             
                    borderRadius:15,
                    marginTop:12,
                    height:44
                }}
                />
                </View>
              
                <View style={{
                marginTop:20
            }}>
                    <Text style={{
                        fontSize:11,
                        fontWeight:'500',
                        color:'#060606'
                    }}>
                   Gender
                    </Text>
                    <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        marginTop:32
                    }}>
                    <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    backgroundColor:'#0038FF',
                    paddingHorizontal:10,
                    paddingVertical:4,
                    borderRadius:23
                }}>
                    <Image
                    source={require('../../Assets/firstemoji.png')}
                    style={{
                        width:15,
                        height:16
                    }}
                    />
                    <Text style={{
                        fontSize:13,
                        fontWeight:'500',
                        color:'#FFFFFF'
                    }}>
                    {' '}Female
                    </Text>
                </View>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingHorizontal:10,
                    paddingVertical:4,
                    borderRadius:23,
                    marginHorizontal:24,
                    borderWidth:1,
                    borderColor:'#8A8A8F'
                }}>
                    <Image
                    source={require('../../Assets/firstemoji.png')}
                    style={{
                        width:15,
                        height:16
                    }}
                    />
                    <Text style={{
                        fontSize:13,
                        fontWeight:'500',
                        color:'#000000'
                    }}>
                    {' '}Male
                    </Text>
                </View>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    // backgroundColor:'#0038FF',
                    paddingHorizontal:10,
                    paddingVertical:4,
                    borderRadius:23,
                    borderWidth:1,
                    borderColor:'#8A8A8F'
                }}>
                    <Image
                    source={require('../../Assets/firstemoji.png')}
                    style={{
                        width:15,
                        height:16
                    }}
                    />
                    <Text style={{
                        fontSize:13,
                        fontWeight:'500',
                        color:'#000000'
                    }}>
                    {' '}Others
                    </Text>
                </View>
                    </View>
                
                </View>
           

           
            </ScrollView>
            
            
        </View>
    )
}
export default SetupResume