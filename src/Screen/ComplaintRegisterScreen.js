import * as React from 'react';
import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from "../Reduxtoolkit/profileSlice";


const ComplaintRegisterScreen = () => {
  const [subject, setSubject] = React.useState('');
  const [complaintType, setComplaintType] = React.useState('');
  const [complaintText, setComplaintText] = React.useState('');

  const profile = useSelector(selectProfile);
  const name = profile?.profile?.user?.name;

  const handleSend = () => {
    // handle send logic
  };

  return (

      <ScrollView contentContainerStyle={styles.container}>
        <View style={{height:'70%', justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.greeting}>Hello {name},</Text>
        <Text style={styles.subGreeting}>Register your Complaint here for your help.</Text>
        
        <View style={{width:'90%'}}>
        <Text style={styles.label}>Choose subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Report a complaint"
          value={subject}
          onChangeText={setSubject}
        />
        </View>
        <View style={{width:'90%'}}>
        <Text style={styles.label}>COMPLAINT TYPE</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.addComplaintType}>+ Add complaint type</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.textarea}
          placeholder="Type your complaint here"
          value={complaintText}
          onChangeText={setComplaintText}
          multiline
        />
        </View>
       
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.attachment}>📎 Attachment</Text>
        </TouchableOpacity>
        </View>


      <Text style={styles.responseTime}>
        We will get back to you within 24 hours. Thank you for your feedback !
      </Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    //paddingBottom: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'black',
    marginBottom:10,
  },
  subGreeting: {
    fontSize: 16,
    color:'black',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color:'black',
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 20,
  },
  addComplaintType: {
    color: 'orange',
    marginBottom: 12,
  },
  textarea: {
    height: 130,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    paddingTop: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  attachment: {
    color: 'orange',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  responseTime: {
    textAlign: 'center',
    marginBottom: 16,
    color: 'orange',
  },
  applyButton: {
    backgroundColor: '#f68b1e',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 50,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    fontWeight:'800',
  },
});

export default ComplaintRegisterScreen;
