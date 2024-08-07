import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleContinue = () => {
    // Logic for verifying OTP
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome To</Text>
      <Text style={styles.headerText}>Hiring Tech</Text>
      <Text style={styles.subHeaderText}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpChange(index, value)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}  onPress={() => navigation.navigate('Changepassword')}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff7f7',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0056b3',
    marginBottom: 40,
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0056b3',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 40,
  },
  otpInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    width: 50,
    height: 50,
    backgroundColor: '#f0f0f0',
  },
  continueButton: {
    backgroundColor: '#d68623',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OtpScreen;
