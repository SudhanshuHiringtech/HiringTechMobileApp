import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // Dummy email check
    if (email !== 'uixlibraries@gmail.com') {
      setError('We cannot find your email.');
    } else {
      setError('');
      // Logic to handle password reset
      navigation.navigate('Otp');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      <Text style={styles.subHeader}>
        Enter your email and we'll send you a link to reset your password.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}  onPress={() => navigation.navigate('DemoOTPForgotPassword')}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backToLoginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLoginText}>Back to Login</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backToLoginButton: {
    marginTop: 20,
  },
  backToLoginText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default ForgotPassword;
