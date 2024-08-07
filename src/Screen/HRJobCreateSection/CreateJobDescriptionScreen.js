import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import HeaderWithLogo from '../../Component/HeaderWithLogo';

const JobDescriptionScreen = ({ navigation, route }) => {
  const richText = useRef();
  const [jobDescription, setJobDescription] = useState(route.params?.jobDetails?.jobDescription || '');
  const [jobDetails, setJobDetails] = useState(route?.params?.jobDetails || {});
  const [initialLoad, setInitialLoad] = useState(true);

  const handleSubmit = () => {
    setJobDetails({ ...jobDetails, jobDescription });
  };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    } else if (Object.keys(jobDetails).length > 0) {
      console.log("Updated jobDetails: ", jobDetails);
      navigation.navigate('CreateJobScreen4', { jobDetails });
    }
  }, [jobDetails]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={{ height: '8%', marginTop: 5 }}>
        <HeaderWithLogo
          imageSource={require("../../Assets/dashboard/Logo.png")}
          image={false}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={{ color: 'orange', fontWeight: '500' }}>Create JOB Post</Text>
            <Text style={styles.header}>Describe the job</Text>
          </View>
          <View style={styles.editorContainer}>
            <Text style={{ fontSize: 17, color: 'skyblue', fontWeight: '500' }}>Job Description</Text>
            <RichToolbar
              editor={richText}
              actions={[actions.setBold, actions.insertBulletsList]}
              iconMap={{
                [actions.setBold]: ({ tintColor }) => (
                  <IconButton icon="format-bold" color={tintColor} />
                ),
                [actions.insertBulletsList]: ({ tintColor }) => (
                  <IconButton icon="format-list-bulleted" color={tintColor} />
                ),
              }}
              style={styles.toolbar}
            />
            <RichEditor
              ref={richText}
              style={styles.richEditor}
              placeholder="Write your job description here..."
              initialContentHTML={jobDescription}
              onChange={setJobDescription}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('CreateJobScreen2', { jobDetails })}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 16,
    marginLeft: 20,
  },
  header: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  editorContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 16,
  },
  toolbar: {
    flexDirection: 'row',
    borderWidth: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: 'skyblue',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  richEditor: {
    borderColor: 'skyblue',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    minHeight: 370,
  },
  footer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  backButton: {
    padding: 15,
    borderWidth: 1,
    width: '40%',
    height: '100%',
    alignItems: 'center',
    borderRadius: 20,
  },
  continueButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    width: '45%',
    alignItems: 'center',
    borderRadius: 20,
  },
  backButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobDescriptionScreen;
