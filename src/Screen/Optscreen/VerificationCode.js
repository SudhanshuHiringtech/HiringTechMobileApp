import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert,TouchableOpacity } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';

const VerificationCode = () => {
    const navigation = useNavigation()
  const [otp, setOtp] = useState('');

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const verifyOtp = () => {
    if (otp.length === 4) {
      Alert.alert('OTP Verified', `Your OTP is ${otp}`);
    } else {
      Alert.alert('Invalid OTP', 'Please enter a 4-digit OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={[styles.subtitle,{marginTop:8}]}>
      We Are Automatically detecting 
      </Text>
      <Text style={styles.subtitle}>
      a SMS Sent to your Number
      </Text>
      <OTPTextInput
        inputCount={4}
        handleTextChange={handleOtpChange}
        tintColor="#000"
        offTintColor="#bbb"
        textInputStyle={styles.textInput}
      />
      <View style={{width:'100%',height:1,backgroundColor:'#000000',opacity:0.5,marginVertical:30}}/>
      <TouchableOpacity
      style={{
        backgroundColor:'#2BA0D2',
        alignItems:'center',
        justifyContent:'center',
        width:297,
        height:47,
        marginTop:32
      }}
      onPress={()=>{
        navigation.navigate("Success")
      }}
      >
        <Text style={{
            fontSize:32,
            fontWeight:'700',
            color:'#FFFFFF'
        }}>
            Verify
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color:'#000000'
  },
  subtitle:{
    fontSize: 18,
    fontWeight: '400',
    color:'#000000',
    lineHeight:27
    // opacity:0.2
  },
  textInput: {
    // borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000',
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
    marginTop:20,
    marginLeft:20,
    backgroundColor:'#AFAAAA'
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default VerificationCode;
