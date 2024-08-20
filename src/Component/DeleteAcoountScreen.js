import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from "react-redux";
import { selectProfile } from "../Reduxtoolkit/profileSlice";

// import { selectProfile } from "../redux/profileSlice";

const DeleteAccountScreen = ({ navigation }) => {
  const [feedback, setFeedback] = useState('');
  const profile = useSelector(selectProfile);
  const name = profile?.profile?.user?.name;
  const email = profile?.profile?.user?.email;

  const handleDeleteAccount = () => {
    navigation.navigate('DeActivate');
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

      <Text style={styles.title}>{name}, we're sorry to see you go</Text>

      <Text style={styles.description}>
        Please note that deleting your account is irreversible and all the data associated with your <Text style={{fontWeight: 'bold'}}>{email}</Text> account (including access to trainings) will be permanently deleted.
      </Text>

      <Text style={styles.feedbackPrompt}>
        * Before you leave, please tell us why you’d like to delete your Hiring Tech account. This information will help us improve. (Optional)
      </Text>

      <TextInput
        style={styles.textInput}
        placeholder="Your feedback matters"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      <TouchableOpacity style={styles.proceedButton} onPress={handleDeleteAccount}>
        <Text style={styles.proceedButtonText} >Proceed</Text>
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
    color:'#175574',
  },
  description: {
    fontSize: 14,
    color:'#175574',
    marginBottom: 20,
    lineHeight: 20,
  },
  feedbackPrompt: {
    fontSize: 14,
    color: '#D79442',
    marginBottom: 10,
  },
  textInput: {
    height: 100,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F8F8F8',
    textAlignVertical: 'top',
    marginBottom: 20,
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

export default DeleteAccountScreen;
