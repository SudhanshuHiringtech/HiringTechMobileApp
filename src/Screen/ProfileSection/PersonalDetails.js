

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import HeaderWithLogo from '../../Component/HeaderWithLogo';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from "../../Reduxtoolkit/profileSlice";
import DocumentPicker from 'react-native-document-picker';

export default function PersonalDetails({ navigation }) {
  const profile = useSelector(selectProfile);
  const [firstName, setFirstName] = useState(profile?.profile?.user?.name || '');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(profile?.profile?.user?.email || '');
  const [contactNumber, setContactNumber] = useState(profile?.profile?.user?.mobileNumber || '');
  const [currentCity, setCurrentCity] = useState(profile?.profile?.user?.currentLocation || '');
  const [dob, setDob] = useState(profile?.profile?.user?.DOB || '');
  const [gender, setGender] = useState(profile?.profile?.user?.gender || '');
  const [image, setImage] = useState(profile?.profile?.user?.profileImage?.data ? `data:${profile.profile.user.profileImage.contentType};base64,${profile.profile.user.profileImage.data}` : null);
  const [profileImage, setProfileImage] = useState(profile?.profile?.user?.profileImage);
  const dispatch = useDispatch();
  const id = profile?.profile?.user?._id;
  console.log(profileImage)

  useEffect(() => {
    if (profile?.profile?.user?.profileImage?.data) {
      setImage(`data:${profile.profile.user.profileImage.contentType};base64,${profile.profile.user.profileImage.data}`);
    }
  }, [profile]);
 // console.log("Profile ka console", profile?.profile)
  const pickImage = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (result && result[0] && result[0].uri) {
        setImage(result[0].uri);
        setProfileImage(result[0]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the document picker');
      } else {
        console.error('DocumentPicker Error:', err);
      }
    }
  };

  const saveDetails = async () => {
    console.log({
      firstName,
      lastName,
      email,
      contactNumber,
      currentCity,
      dob,
      gender,
      image,
      id
    });

    try {
      let formData = new FormData();
      formData.append('id', id);
      formData.append('name', firstName);
      formData.append('email', email);
      formData.append('mobileNumber', contactNumber);
      formData.append('DOB', dob);
      formData.append('gender', gender);
      formData.append('currentLocation', currentCity);

      if (profileImage) {
        formData.append('file', {
          uri: profileImage.uri,
          name: profileImage.name,
          type: profileImage.type
        });
      }

      const response = await fetch('http://192.168.29.188:5000/personal-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        navigation.navigate('Bottomtab');
        Alert.alert('Profile Successfully Updated', 'Welcome');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error during save:', error);
    }
  };

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ backgroundColor: 'red', width: '88%' }}>
          <HeaderWithLogo image={true} text="My Resume" />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Personal Details</Text>
          <View style={styles.inputRow}>
            <View style={styles.NamesContainer}>
              <Text style={styles.label}>First name</Text>
              <TextInput
                style={styles.Nameinput}
                placeholder="First name"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.NamesContainer}>
              <Text style={styles.label}>Last name</Text>
              <TextInput
                style={styles.Nameinput}
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.imageUploadText}>
                Upload a professional picture of yourself (Max file size: 1MB and max resolution: 500px x 500px. File type - jpeg, jpg, png, gif)
              </Text>
            )}
          </TouchableOpacity>
          {image && (
            <TouchableOpacity style={styles.changePictureButton} onPress={pickImage}>
              <Text style={styles.changePictureButtonText}>Change picture</Text>
            </TouchableOpacity>
          )}
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Contact number</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.contactCode}
                placeholder="+91"
                value="+91"
                editable={false}
              />
              <TextInput
                style={styles.contactNumber}
                placeholder="Enter your M. Number"
                keyboardType="numeric"
                value={contactNumber}
                onChangeText={setContactNumber}
              />
            </View>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Current city</Text>
            <TextInput
              style={styles.input}
              placeholder="Current city"
              value={currentCity}
              onChangeText={setCurrentCity}
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={dob}
              onChangeText={setDob}
            />
          </View>
          <Text style={styles.genderLabel}>Gender</Text>
          <View style={styles.genderOptions}>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'Female' && styles.selectedGenderButton]}
              onPress={() => handleGenderSelection('Female')}
            >
              <Text style={styles.genderButtonText}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'Male' && styles.selectedGenderButton]}
              onPress={() => handleGenderSelection('Male')}
            >
              <Text style={styles.genderButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'Others' && styles.selectedGenderButton]}
              onPress={() => handleGenderSelection('Others')}
            >
              <Text style={styles.genderButtonText}>Others</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={saveDetails}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  section: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelContainer: {
    width: '95%',
  },
  NamesContainer: {
    width: '55%',
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
  },
  Nameinput: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
  },
  contactCode: {
    width: '20%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  contactNumber: {
    width: '75%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  imageUpload: {
    backgroundColor: '#e6f7ff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#7abaff',
  },
  imageUploadText: {
    fontSize: 12,
    color: '#666',
  },
  changePictureButton: {
    backgroundColor: '#e6f7ff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#7abaff',
  },
  changePictureButtonText: {
    fontSize: 14,
    color: 'orange',
  },
  genderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  genderButton: {
    backgroundColor: 'silver',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  selectedGenderButton: {
    backgroundColor: '#007bff',
  },
  genderButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

