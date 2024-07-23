import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from "../Reduxtoolkit/profileSlice";

const ChangePasswordScreen = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  
  const profile = useSelector(selectProfile);
  const candidateId = profile?.profile?.user?._id;
  // console.log(candidateId)


  const ChangePassword = async () => {
    if(newPassword == oldPassword ==  confirmPassword){
      Alert.alert('Filed is Empty')
    }

   if(newPassword !== confirmPassword){
      Alert.alert('Your Password does not match');
   }

    try {
      const response = await fetch('https://hiringtechb-2.onrender.com/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: candidateId,
          newPassword: newPassword,
          oldPassword : oldPassword
        }),
      });
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        Alert.alert('Your Password Successfully Change');
        navigation.navigate('Bottomtab');
      } else {
        Alert.alert('Change Password Failed', data.error);
      }
    } catch (error) {
      console.error('Error during Password reset:', error);
    }
  }

  const handlePasswordVisibility = (setVisibility, visibility) => {
    setVisibility(!visibility);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Password</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Old Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry={!isOldPasswordVisible}
            placeholder="Enter Old password"
          />
          <TouchableOpacity onPress={() => handlePasswordVisibility(setIsOldPasswordVisible, isOldPasswordVisible)}>
            <Icon name={isOldPasswordVisible ? "eye" : "eye-off"} size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!isNewPasswordVisible}
            placeholder="Enter New password"
          />
          <TouchableOpacity onPress={() => handlePasswordVisibility(setIsNewPasswordVisible, isNewPasswordVisible)}>
            <Icon name={isNewPasswordVisible ? "eye" : "eye-off"} size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!isConfirmPasswordVisible}
            placeholder="Re-enter password"
          />
          <TouchableOpacity onPress={() => handlePasswordVisibility(setIsConfirmPasswordVisible, isConfirmPasswordVisible)}>
            <Icon name={isConfirmPasswordVisible ? "eye" : "eye-off"} size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={ChangePassword}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDEFEF',
  },
  header: {
    fontSize: 30,
    color:'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color:'black',
    fontWeight:'600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'skyblue',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ChangePasswordScreen;
