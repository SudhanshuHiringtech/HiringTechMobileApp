import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

const ChangePasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [retypedPassword, setRetypedPassword] = useState('');

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
  };

  const handleRetypedPasswordChange = (text) => {
    setRetypedPassword(text);
  };

  const handleUpdate = () => {
    // TODO: Implement password update logic
    console.log('New Password:', newPassword);
    console.log('Retyped Password:', retypedPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To Hiring Tech</Text>
      <Text style={styles.subtitle}>Change Password</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={handleNewPasswordChange}
          secureTextEntry
        />
        <Text style={styles.error}>
          {newPassword.length < 8 &&
            'Password must be at least 8 characters long.'}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Retype New Password</Text>
        <TextInput
          style={styles.input}
          value={retypedPassword}
          onChangeText={handleRetypedPasswordChange}
          secureTextEntry
        />
        <Text style={styles.error}>
          {newPassword !== retypedPassword &&
            'Passwords do not match. Please re-enter your password.'}
        </Text>
      </View>
      <Button title="Update" onPress={handleUpdate} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default ChangePasswordScreen;