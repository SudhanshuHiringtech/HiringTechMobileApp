import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from "react-redux";
import { selectProfile } from "../Reduxtoolkit/profileSlice";

const DeActivate = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const profile = useSelector(selectProfile);
  const name = profile?.profile?.user?.name;
  const email = profile?.profile?.user?.email;
  const userId = profile?.profile?.user._id; // Assuming userId is available in the profile

console.log(userId, "user ID");

const handleDeleteAccount = async () => {
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }
  
    try {
      const response = await fetch(`https://hiringtechb-2.onrender.com/delete-account/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
  
      console.log(response, 'response here')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data, "data text");
  
      if (data) {
        Alert.alert('Account Deleted', 'Your account has been successfully deleted.');
        navigation.navigate('Choosejob');  
      } else {
        Alert.alert('Error', 'Failed to delete account. Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to delete account. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert('Go Back')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://your-profile-image-url.com' }} // Replace with the user's profile image URL
          style={styles.profileImage}
        />
      </View>

      <Text style={styles.title}>{name} , we're sorry to see you go</Text>

      <Text style={styles.description}>
        Please note that deleting your account is irreversible and all the data associated with your <Text style={{fontWeight: 'bold'}}>{email}</Text> account (including access to trainings) will be permanently deleted.
      </Text>

      <Text style={styles.feedbackPrompt}>Enter Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Icon name="eye" size={20} color="#175574" />
          ) : (
            <Icon name="eye-off" size={20} color="#175574" />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.proceedButton} onPress={handleDeleteAccount}>
        <Text style={styles.proceedButtonText}>Delete my account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#175574',
  },
  description: {
    fontSize: 14,
    color: '#175574',
    marginBottom: 20,
    lineHeight: 20,
  },
  feedbackPrompt: {
    fontSize: 14,
    color: '#175574',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 25,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    marginRight: 1,
  },
  proceedButton: {
    backgroundColor: '#D79442',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DeActivate;