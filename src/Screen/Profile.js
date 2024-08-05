
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // Import DocumentPicker from react-native-document-picker
import HeaderWithLogo from '../Component/HeaderWithLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from "../Reduxtoolkit/profileSlice";

export default function Profile({ navigation }) {
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [resumeDetails, setResumeDetails] = useState(null);

  
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  //console.log("DD", profile.profile.user.email)
  const email = profile?.profile?.user?.email
  const userId = profile?.profile?.user?._id
  console.log(profile)


  const pickDocument = async (type) => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          type === 'resume' ? DocumentPicker.types.pdf : '*/*', // For resumes, restrict to PDFs
          type === 'certificates' ? DocumentPicker.types.images : '*/*', // For certificates, allow images and all file types
        ],
      });

      const document = Array.isArray(res) && res.length > 0 ? res[0] : res;

      console.log('Document picked:', document);
      if (type === 'certificates') {
        setCertificateDetails(document); // Store certificate details in state
        console.log(certificateDetails.name)
      } else if (type === 'resume') {
        setResumeDetails(document); // Store resume details in state
        console.log(resumeDetails)
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picking cancelled');
      } else {
        console.log('Error picking document:', err);
      }
    }
  };

  async function SaveDocuments(id, resumeFile, certificationFile) {
    // Create a new FormData object
    const formData = new FormData();
  
    // Append the ID and files to the FormData object
    formData.append('id', userId);
    formData.append('resume', resumeDetails);
    formData.append('certification', certificateDetails);
  
    try {
      // Send a POST request with the FormData
      const response = await fetch('https://hiringtechb-2.onrender.com/upload-files', {
        method: 'POST',
        body: formData,
      });
  
      // Check if the response is OK
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        navigation.navigate('Bottomtab')
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ height: '8%', width: '88%' }}>
        <HeaderWithLogo
          image={true}
          text="Profile" // Pass your header text dynamically
        />
      </View>
      <Text style={styles.header}>Update Your Profile</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('PersonalDetails') }}>
          <Text style={styles.buttonText}>Personal Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Education') }}>
          <Text style={styles.buttonText}>Education</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('WorkExperience') }}>
          <Text style={styles.buttonText}>Work Experience</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.uploadSection} onPress={() => pickDocument('certificates')}>
      { certificateDetails != null ? ( <View>
        <Text style={styles.uploadText}>Uploaded Certificates </Text>
          <Text style={styles.uploadText}>{certificateDetails.name}</Text>
          </View>
        ) :
        ( <View>
        <Text style={styles.uploadText}>Upload Certificates </Text>
          </View>
        )
      }
        <Text style={styles.uploadFormats}>Supported formats: doc, docx, pdf, jpeg up to 5MB</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadSection} onPress={() => pickDocument('resume')}>
      { resumeDetails != null ? ( <View>
        <Text style={styles.uploadText}>Uploaded Resume </Text>
          <Text style={styles.uploadText}>{resumeDetails.name}</Text>
          </View>
        ) :
        ( <View>
        <Text style={styles.uploadText}>Upload Resume</Text>
          </View>
        )
      }
        <Text style={styles.uploadFormats}>Supported formats: pdf up to 5MB</Text>
      </TouchableOpacity>

      <TextInput style={styles.additionalInput} placeholder="+ Add additional detail/ accomplishment" />
      <TouchableOpacity style={styles.saveButton} onPress={SaveDocuments}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: "#ffffff",
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 20,
  },
  section: {
    width: '90%',
  },
  button: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 19,
    color: 'black',
    fontWeight: '600'
  },
  uploadSection: {
    backgroundColor: '#e6f7ff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#7abaff',
  },
  uploadText: {
    fontSize: 16,
    marginBottom: 10,
  },
  uploadFormats: {
    fontSize: 12,
    color: '#666',
  },
  uploadedSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  uploadedText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  additionalInput: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#007bff',
    height: '7%',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  saveButtonText: {
    fontSize: 30,
    color: '#fff',
  },
});
