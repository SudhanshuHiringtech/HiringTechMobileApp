import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setProfile } from "../Reduxtoolkit/profileSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import GoogleAuth from "../Component/GoogleAuth"; // Import the GoogleAuth component
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from "./Theme";

const Login = ({ route }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isGoogleAuthVisible, setIsGoogleAuthVisible] = useState(false);
  const [ShowPassword, SetShowPassword] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch(); // Get the dispatch function
  const { item } = route?.params;

  const handleLogin = async () => {
    try {
      const response = await fetch('https://hiringtechb-1.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: Email,
          password: Password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(setProfile(data)); // Dispatch the setProfile action
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        await AsyncStorage.setItem('Profile', JSON.stringify(data));
        navigation.navigate('Bottomtab');
        Alert.alert('Login Successful', 'Welcome');
      } else {
        Alert.alert('Invalid credentials', data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const GoogleAuthentication = () => {
    setIsGoogleAuthVisible(true); // Show the GoogleAuth component
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerViewStyle}>
          <Text style={styles.headerFirstText}>Welcome Back To</Text>
          <Text style={styles.headerSecondText}>Hiring Tech</Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#000000' }}>
            {item === 1 ? "Candidate Login" : "HR Login"}
          </Text>
        </View>
        <Text style={styles.TextInputlabelStyle}>Email</Text>
        <View style={styles.emailInputViewStyle}>
          <TextInput
            placeholder="Enter Email Address"
            onChangeText={setEmail}
            style={styles.inputStyle}
          />
        </View>
        <Text style={styles.TextInputlabelStyle}>Password</Text>
        <View style={styles.passwordInputViewStyle}>
            <TextInput
              placeholder="Enter Password"
              // secureTextEntry={true}
              onChangeText={setPassword}
              style={styles.inputStyle}
              secureTextEntry={!ShowPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => SetShowPassword(!ShowPassword)}
            >
            <Text> {ShowPassword?  <Icon name="eye" size={20} color="#175574" /> :   <Icon name="eye-off" size={20} color="#175574" />}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.ForgotPassword}>
          <Text>Forgotten Password</Text>
        </View>
        <View style={styles.rememberViewStyle}>
          <Image source={require("../Assets/check_box.png")} style={styles.ImageStyle} />
          <Text style={styles.rememberTextStyle}>Remember Me</Text>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton} onPress={GoogleAuthentication}>
          <Image source={require("../Assets/Icon.png")} style={styles.googleIconStyle} />
          <View>
            <Text style={styles.buttonText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
        {isGoogleAuthVisible && <GoogleAuth navigation={navigation} authType="login" />}
        <View style={styles.signupViewStyle}>
          <Text style={styles.alreadyTextStyle}>Already Have An Account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(item === 1 ? "CandidateRegistration" : "HrRegistration")}
          >
            <Text style={styles.signupTextStlye}>
              {item === 1 ? "Register" : "Sign Up"}
            </Text>
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
  emailInputViewStyle: {
    marginTop: 32,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'orange',
  },
  passwordInputViewStyle: {
    marginTop: 32,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'orange',
  },
  TextInputlabelStyle:{
    fontSize: 16,
    marginLeft:20,
    marginTop:20,
    marginBottom: -20,
  },
  ForgotPassword: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    marginLeft: 30,
    marginTop: 10,
  },
  rememberViewStyle: {
    marginHorizontal: 20,
    marginTop: 60,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  ImageStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  rememberTextStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginLeft: 5,
  },
  loginButton: {
    height: 40,
    marginHorizontal: 20,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 50,
  },
  googleButton: {
    height: 50,
    marginHorizontal: 20,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 20,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
  googleIconStyle: {
    width: 24,
    height: 20,
    marginRight: 6,
  },
  signupViewStyle: {
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  alreadyTextStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  signupTextStlye: {
    fontSize: 16,
    fontWeight: '500',
    color: 'orange',
    // backgroundColor:theme.primaryColor,
  },
});

export default Login;
