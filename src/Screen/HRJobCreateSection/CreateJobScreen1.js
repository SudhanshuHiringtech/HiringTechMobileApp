import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderWithLogo from '../../Component/HeaderWithLogo';

const CreateJobScreen1 = ({navigation}) => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setlocation] = useState('');
  const [jobType, setJobType] = useState([]);
  const [experience, setExperience] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [NumberOfOpening, setNumberOfOpening] = useState('');
  const [closingDate, setClosingDate] = useState('');

  const jobTypes = ['Full-time', 'Contract', 'Permanent Job', 'Internship', 'Apprenticeship'];
  const experienceLevels = [
    'No experience needed',
    'Under 1 year',
    '1-2 years',
    '2-3 years',
    '3-4 years',
    '4-6 years',
    '6-8 years',
    '8-10 years',
    'Above 10 years',
  ];
  const schedules = [
    '4 hours shift',
    '8 hours shift',
    '10 hours shift',
    '12 hours shift',
    'Monday to Friday',
    'Night shift',
    'Day shift',
    'Evening shift',
  ];
  const openingNumbers = ['1', '2', '3', '4', '5'];
  const closingDates = ['1 Week', '2 Weeks', '1 Month'];

  const handleJobTypeSelect = (type) => {
    setJobType(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleScheduleSelect = (sched) => {
    setSchedule(prev =>
      prev.includes(sched) ? prev.filter(s => s !== sched) : [...prev, sched]
    );
  };
  const handleExperienceSelect = (sched) => {
    setExperience(prev =>
      prev.includes(sched) ? prev.filter(s => s !== sched) : [...prev, sched]
    );
  };
 
  const handleSubmit = () => {
    const JobApplication = {
           jobTitle,
           location,
           jobType,
           experience,
           schedule,
           NumberOfOpening,
           closingDate,
    }
    console.log("1st time", JobApplication);
    navigation.navigate('CreateJobScreen2', {JobApplication})
  }


  return (
    <View style={{flex:1,  backgroundColor: "#ffffff",}}>
        <View style={{height:'8%', marginTop:5}}>
        <HeaderWithLogo
            imageSource={require("../../Assets/dashboard/Logo.png")} 
            image={false}
          />
        </View>
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={{color:'orange', fontWeight:'500'}}>Create JOB Post</Text>
      <Text style={styles.header}>Add Job Basics</Text>

      <Text style={styles.label}>Job Title*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Role"
        value={jobTitle}
        onChangeText={setJobTitle}
      />

      <Text style={styles.label}>Location Type*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter work mode"
        value={location}
        onChangeText={setlocation}
      />

      <Text style={styles.label}>Job Type*</Text>
      <View style={styles.toggleContainer}>
        {jobTypes.map((type, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.toggleButton, jobType.includes(type) && styles.selectedToggleButton]}
            onPress={() => handleJobTypeSelect(type)}
          >
            <Text style={[styles.toggleButtonText, jobType.includes(type) && styles.selectedToggleButtonText]}>
             + {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Experience Level*</Text>
      <View style={styles.toggleContainer}>
        {experienceLevels.map((sched, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.toggleButton, experience.includes(sched) && styles.selectedToggleButton]}
            onPress={() => handleExperienceSelect(sched)}
          >
            <Text style={[styles.toggleButtonText, experience.includes(sched) && styles.selectedToggleButtonText]}>
              + {sched}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Schedule</Text>
      <View style={styles.toggleContainer}>
        {schedules.map((sched, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.toggleButton, schedule.includes(sched) && styles.selectedToggleButton]}
            onPress={() => handleScheduleSelect(sched)}
          >
            <Text style={[styles.toggleButtonText, schedule.includes(sched) && styles.selectedToggleButtonText]}>
              + {sched}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Number of Job Openings*</Text>
      <TextInput
        style={styles.input}
        placeholder="Select number of openings"
        value={NumberOfOpening}
        onChangeText={setNumberOfOpening}
      />

      <Text style={styles.label}>Closing Date for this Job*</Text>
      <TextInput
        style={styles.input}
        placeholder="Select closing date"
        value={closingDate}
        onChangeText={setClosingDate}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Continue
      </Button>

      <Text style={styles.feedbackText}>Have feedback? Tell us more.</Text>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   // padding: 20,
    paddingLeft :20,
    paddingRight:20,
  },
  header: {
    fontSize: 20,
    color:'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'skyblue',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color:'black',
    fontWeight:'500',
    marginVertical: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toggleButton: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'skyblue',
    borderRadius: 20,
    margin: 5,
  },
  selectedToggleButton: {
    backgroundColor: '#FF9F1C',
    borderColor: '#FF9F1C',
  },
  toggleButtonText: {
    color: 'black',
    fontSize: 12,

  },
  selectedToggleButtonText: {
    color: '#fff',

  },
  button: {
    backgroundColor: '#FF9F1C',
    padding: 15,
    width:'60%',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  feedbackText: {
    color: 'orange',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default CreateJobScreen1;
