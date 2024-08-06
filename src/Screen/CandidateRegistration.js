// import { useNavigation } from "@react-navigation/native";
// import React,{useState} from "react";
// import {View,Text,StyleSheet,TextInput, Image,TouchableOpacity,ScrollView} from "react-native"
// const CandidateRegistration = () =>{
    
//     const [Email,setEmail] = useState("")
//     const [Password,setPassword] = useState("")
//     const navigation = useNavigation()

//     return(
//         <View style={[styles.container]} >
//             <ScrollView>

//             <View style={[styles.headerViewStyle]}>
//             <Text style={[styles.headerFirstText]}>
//             Welcome To
//             </Text> 
//             <Text style={[styles.headerSecondText]}>
//             Hiring Tech
//             </Text>
//             </View>

         

//            <View style={{
//             marginHorizontal:20,
//             marginTop:20
//            }}>
//             <Text style={{
//                 fontSize:16,
//                 fontWeight:'500',
//                 color:'#060606'
//             }}>
//                 Full Name
//             </Text>
//             <TextInput
//             placeholder="Your Name"
//             style={{
//                 height:50,
//                 borderWidth:1,
//                 borderColor:'#9E9E9E',
//                 borderRadius:15,
//                 paddingLeft:10,
//                 marginTop:2

//             }}
//             />
//            </View>

//            <View style={{
//             marginTop:20,
//             marginHorizontal:20
//            }}>
//             <View style={{
//                 flexDirection:'row',
//                 alignItems:'center',
//                 justifyContent:'space-between'
//             }}>
//                 <Text style={{
//                 fontSize:16,
//                 fontWeight:'500',
//                 color:'#060606'
//             }}>
//                 Email*
//                 </Text>
                
//             </View>
//             <View style={{
//                 height:50,
//                 borderWidth:1,
//                 borderColor:'#9E9E9E',
//                 borderRadius:15,
//                 marginTop:2,
//                 flexDirection:'row',
//                 justifyContent:'space-between',
//                 alignItems:'center'
//             }}>
//                 <TextInput
//                 placeholder="abc@gmail.com"
//                 style={{
//                     paddingLeft:10,
//                 }}
//                 />
//                 <Image
//                 source={require("../Assets/eyeoff.png")}
//                 style={{
//                     width:15,
//                     height:15,
//                     resizeMode:'contain',
//                     marginRight:20
//                 }}
//                 />
//             </View>
//            </View>

//            <View style={{
//             marginTop:20,
//             marginHorizontal:20
//            }}>
//             <View style={{
//                 flexDirection:'row',
//                 alignItems:'center',
//                 justifyContent:'space-between'
//             }}>
//                 <Text style={{
//                 fontSize:16,
//                 fontWeight:'500',
//                 color:'#060606'
//             }}>
//                 Mobile Number
//                 </Text>
                
//             </View>
//             <View style={{
//                 height:50,
//                 borderWidth:1,
//                 borderColor:'#9E9E9E',
//                 borderRadius:15,
//                 marginTop:2,
//                 flexDirection:'row',
//                 justifyContent:'space-between',
//                 alignItems:'center'
//             }}>
//                 <TextInput
//                 placeholder="+91  |   0909090909"
//                 style={{
//                     paddingLeft:10,
//                 }}
//                 />
//                 <Image
//                 source={require("../Assets/eyeoff.png")}
//                 style={{
//                     width:15,
//                     height:15,
//                     resizeMode:'contain',
//                     marginRight:20
//                 }}
//                 />
//             </View>
//            </View>

         

//             <View style={{
//             marginTop:20,
//             marginHorizontal:20
//            }}>
//             <View style={{
//                 flexDirection:'row',
//                 alignItems:'center',
//                 justifyContent:'space-between'
//             }}>
//                 <Text style={{
//                 fontSize:16,
//                 fontWeight:'500',
//                 color:'#060606'
//             }}>
//                Enter Password*
//                 </Text>
                
//             </View>
//             <View style={{
//                 height:50,
//                 borderWidth:1,
//                 borderColor:'#9E9E9E',
//                 borderRadius:15,
//                 marginTop:2,
//                 flexDirection:'row',
//                 justifyContent:'space-between',
//                 alignItems:'center'
//             }}>
//                 <TextInput
//                 placeholder="abc@gmail.com"
//                 style={{
//                     paddingLeft:10,
//                 }}
//                 />
//                 <Image
//                 source={require("../Assets/eyeoff.png")}
//                 style={{
//                     width:15,
//                     height:15,
//                     resizeMode:'contain',
//                     marginRight:20
//                 }}
//                 />
//             </View>
//            </View>

//            <View style={{
//             marginTop:20,
//             marginHorizontal:20
//            }}>
//             <View style={{
//                 flexDirection:'row',
//                 alignItems:'center',
//                 justifyContent:'space-between'
//             }}>
//                 <Text style={{
//                 fontSize:16,
//                 fontWeight:'500',
//                 color:'#060606'
//             }}>
//                Confirm Password*
//                 </Text>
               
//             </View>
//             <View style={{
//                 height:50,
//                 borderWidth:1,
//                 borderColor:'#9E9E9E',
//                 borderRadius:15,
//                 marginTop:2,
//                 flexDirection:'row',
//                 justifyContent:'space-between',
//                 alignItems:'center'
//             }}>
//                 <TextInput
//                 placeholder="abc@gmail.com"
//                 style={{
//                     paddingLeft:10,
//                 }}
//                 />
//                 <Image
//                 source={require("../Assets/eyeoff.png")}
//                 style={{
//                     width:15,
//                     height:15,
//                     resizeMode:'contain',
//                     marginRight:20
//                 }}
//                 />
//             </View>
//            </View>

          

//            <TouchableOpacity
//            style={{
//             height:40,
//             marginHorizontal:20,
//             backgroundColor:'#C7C7C7',
//             justifyContent:'center',
//             alignItems:'center',
//             borderRadius:30,
//             borderWidth:1,
//             borderColor:'#000000',
//             marginTop:50
//            }}
//            onPress={()=>{
//             navigation.navigate("Preferences")
//            }}
//            >
//             <Text style={{
//                 fontSize:15,
//                 fontWeight:'500',
//                 color:'#000000'
//             }}>
//           Register and unlock jobs
//             </Text>
//            </TouchableOpacity>
//            <View style={{
//             height:40,
//             marginHorizontal:20,
//             backgroundColor:'#C7C7C7',
//             justifyContent:'center',
//             alignItems:'center',
//             borderRadius:30,
//             borderWidth:1,
//             borderColor:'#000000',
//             marginTop:20,
//             flexDirection:'row'
//            }}>
//             <Image
//             source={require("../Assets/Icon.png")}
//             style={{
//                 width:24,
//                 height:20,
//                 marginRight:6
//             }}
//             />
//               <TouchableOpacity
//            style={{
            
//            }}
//            >
//             <Text style={{
//                 fontSize:15,
//                 fontWeight:'500',
//                 color:'#000000'
//             }}>
//          Continue with Google
//             </Text>
//            </TouchableOpacity>
//            </View>

//            <View style={{
//             alignItems:'center',
//             alignSelf:'center',
//             justifyContent:'center',
//             marginBottom:20,
//             flexDirection:'row',
//             marginTop:12
//            }}>
//             <Text style={{
//                 fontSize:12,
//                 fontWeight:'500',
//                 color:'#AAAAAA'
//             }}>
//             Already have an account? 
//             </Text>
//             <TouchableOpacity
//             onPress={()=>{
//                 navigation.navigate("Signup",{item:1})
//             }}
//             >
//             <Text style={{
//                 fontSize:12,
//                 fontWeight:'500',
//                 color:'#4285F4',
//                 marginLeft:6
//             }}>
//             Log in
//             </Text>
//             </TouchableOpacity>
//            </View>
//            </ScrollView>
//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         backgroundColor:'#ffffff'
//     },
//     headerViewStyle:{
//         marginTop:60,
//         alignItems:'center'
//     },
//     headerFirstText:{
//         fontSize:24,
//         fontWeight:'400',
//         color:'#000000'
//     },
//     headerSecondText:{
//         fontSize:36,
//         fontWeight:'600',
//         color:'#0038FF'
//     },
//     emailInputViewStyle:{
//         marginTop:80,
//         marginHorizontal:20,

//     },
//     passwordInputViewStyle:{
//         marginTop:32,
//         marginHorizontal:20,

//     },
//     inputStyle:{
//         borderWidth:1,
//         borderRadius:20,
//        borderColor:'#0038FF80',
//        paddingLeft:20
//     },
//     rememberViewStyle:{
//         marginHorizontal:20,
//         marginTop:60,
//         alignItems:'center',
//         flexDirection:'row',
//         alignSelf:'center'
//     },
//     ImageStyle:{
//         width:24,
//         height:24,
//         resizeMode:'contain'
//     },
//     rememberTextStyle:{
//         fontSize:14,
//         fontWeight:'400',
//         color:'#000000',
//         marginLeft:5
//     },
//     buttonViewStyle:{
//         flexDirection:'row',
//         alignSelf:'center',
//         marginTop:40,
//         alignItems:'center'
//     },
//     buttonStyle:{
//         backgroundColor:'#000959',
//         width:94,
//         height:56,
//         justifyContent:'center',
//         alignItems:'center',
//         borderRadius:16
//     },
//     buttonTextStyle:{
//         fontSize:16,
//         fontWeight:'600',
//         color:'#A2CEF4'
//     },
//     orViewStyle:{
//         marginHorizontal:40
//     },
//     orTextStyle:{
//         fontSize:16,
//         fontWeight:'500',
//         color:'#000000'

//     },
//     googleIconStyle:{
//         width:56,
//         height:56,
//         resizeMode:'contain'
//     },
//     signupViewStyle:{
//         marginTop:60,
//         alignItems:'center'
//     },
//     alreadyTextStyle:{
//         fontSize:16,
//         fontWeight:'600',
//         color:'#000000'
//     },
//     signupTextStlye:{
//         fontSize:16,
//         fontWeight:'500',
//         color:'#68B3F4'
//     },
//     TextInputlabelStyle:{
//         fontSize:12,
//         fontWeight:'400',
//         color:'#000000',
//         opacity:0.5
//     }
//   });
// export default CandidateRegistration


import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from "../Reduxtoolkit/profileSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CandidateRegistration = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const userdesignation = "candidate";
    const navigation = useNavigation();

    const  handleRegister = async () => {
         console.log(name);
         console.log(email);
         console.log(mobileNumber);
         console.log(password);
         console.log(confirmPassword);

         if(password !== confirmPassword){
            Alert.alert('Incorrect', `Your password not match`);
         }
        //  if(password.length <= 6){
        //     Alert.alert('Invaild Password', `Your password incorrect formate`);
        //  }

         try {
            const response = await fetch('https://hiringtechb-1.onrender.com/register-candidate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name:name,
                email: email,
                password: password,
                mobileNumber:mobileNumber,
                userdesignation: userdesignation,
              }),
            });
            console.log('Hi');
            const data = await response.json();
            console.log(data);
            if (response.ok) {
        //      dispatch(setProfile(data));
        //     await AsyncStorage.setItem("token", data.token);
        //     await AsyncStorage.setItem('isLoggedIn',  JSON.stringify(true));
        //    await AsyncStorage.setItem('Profile', JSON.stringify(data));
             navigation.navigate('Otp', {email : email});
              Alert.alert('Enter Your OTP');
            } else {
               Alert.alert('registeration failed:', data.error);
            }
          } catch (error) {
            console.error('Error during login:', error);
          }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.headerViewStyle}>
                    <Text style={styles.headerFirstText}>Welcome To</Text>
                    <Text style={styles.headerSecondText}>Hiring Tech</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        placeholder="Your Name"
                        value={name}
                        onChangeText={(text)=>{setName(text)}}
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email </Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Enter your email Id "
                            value={email}
                            onChangeText={(text)=>{setEmail(text)}}
                            style={styles.textInput}
                        />
                        <Image
                            source={require("../Assets/eyeoff.png")}
                            style={styles.icon}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mobile Number</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Enter Your Phone Number"
                            value={mobileNumber}
                            onChangeText={(text)=>{setMobileNumber(text)}}
                            style={styles.textInput}
                        />
                        <Image
                            source={require("../Assets/eyeoff.png")}
                            style={styles.icon}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Password*</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={(text)=>{setPassword(text)}}
                            style={styles.textInput}
                            secureTextEntry
                        />
                        <Image
                            source={require("../Assets/eyeoff.png")}
                            style={styles.icon}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password*</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={(text)=>{setConfirmPassword(text)}}
                            style={styles.textInput}
                            secureTextEntry
                        />
                        <Image
                            source={require("../Assets/eyeoff.png")}
                            style={styles.icon}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleRegister}
                >
                    <Text style={styles.registerButtonText}>Register and unlock jobs</Text>
                </TouchableOpacity>

                <View style={styles.googleButtonContainer}>
                    <Image
                        source={require("../Assets/Icon.png")}
                        style={styles.googleIcon}
                    />
                    <TouchableOpacity>
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Signup", { item: 1 });
                        }}
                    >
                        <Text style={styles.loginText}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    headerViewStyle: {
        marginTop: 60,
        alignItems: 'center',
    },
    headerFirstText: {
        fontSize: 24,
        fontWeight: '400',
        color: 'orange',
    },
    headerSecondText: {
        fontSize: 36,
        fontWeight: '600',
        color: 'orange',
    },
    inputContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    label: {
        marginLeft:10,
        fontSize: 16,
        fontWeight: '500',
        color: '#060606',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#9E9E9E',
        borderRadius: 15,
        paddingLeft: 10,
        marginTop: 2,
    },
    inputWrapper: {
        height: 50,
        borderWidth: 1,
        borderColor: '#9E9E9E',
        borderRadius: 15,
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
    },
    icon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginRight: 20,
    },
    registerButton: {
        height: 40,
        marginHorizontal: 20,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 50,
    },
    registerButtonText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#fff',
    },
    googleButtonContainer: {
        height: 40,
        marginHorizontal: 20,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 20,
        flexDirection: 'row',
    },
    googleIcon: {
        width: 24,
        height: 20,
        marginRight: 6,
    },
    googleButtonText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#fff',
    },
    footer: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        marginTop: 12,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#AAAAAA',
    },
    loginText: {
        fontSize: 12,
        fontWeight: '500',
        color: 'orange',
        marginLeft: 6,
    },
});

export default CandidateRegistration;
