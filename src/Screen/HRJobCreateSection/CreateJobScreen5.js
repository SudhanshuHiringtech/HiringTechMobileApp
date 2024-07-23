import React, { useState , useEffect} from 'react';
import { View, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderWithLogo from '../../Component/HeaderWithLogo';

const CreateJobScreen5 = ({navigation, route}) => {
  const [questions, setQuestions] = useState([
    { questionId: 1, question: 'Have you completed your graduation?', answer: 'yes' }
  ]);
  const [filter, setFilter] = useState(false);
  const [jobDetails, setJobDetails] = useState({});

  const jobData = route.params.jobDetails;
  console.log("data laya hai🥳", jobData)

  const addQuestion = () => {
    const newQuestion = { questionId: questions.length + 1, question: '', answer: '' };
    setQuestions([...questions, newQuestion]);
  };

  const handleAnswerChange = (id, answer) => {
    setQuestions(questions.map(q => q.questionId === id ? { ...q, answer } : q));
  };

  const handleQuestionChange = (id, question) => {
    setQuestions(questions.map(q => q.questionId === id ? { ...q, question } : q));
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.questionId !== id));
  };
  
  const handleContinue = () => {
    console.log('Questions:', questions);
    console.log('Filter:', filter);
    setJobDetails({...jobData, questions, filter})
  };

  useEffect(() => {
    if (Object.keys(jobDetails).length > 0) {
      console.log("Updated 🤪🤪😂😂🤪: ", jobDetails);
      navigation.navigate('JobDetails', { job : jobDetails, HRJobDescription: true });
    }
  }, [jobDetails]);
  

  return (
    <View style={{ flex: 1, backgroundColor: '#fff'}}>
      <View>
        <HeaderWithLogo  
          imageSource={require("../../Assets/dashboard/Logo.png")}
          image={false}
        />
      </View>
      <ScrollView>
        <View style={styles.header}>
          <Text style={{color:'orange', fontWeight:'500'}}>Create JOB Post</Text>
          <Text style={styles.headerTitle}>Receive Quality Applicant</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Screening questions</Text>
          <Text style={styles.subTitle}>We recommend adding three or more questions. Applicants must answer this question.</Text>
          
          {questions.map((q) => (
            <View key={q.questionId} style={styles.questionContainer}>
              <TextInput
                style={styles.questionInput}
                placeholder="Enter your question"
                value={q.question}
                onChangeText={(text) => handleQuestionChange(q.questionId, text)}
              />
              <View style={styles.optionContainer}>
                <TouchableOpacity style={styles.option} onPress={() => handleAnswerChange(q.questionId, 'yes')}>
                  <Checkbox status={q.answer === 'yes' ? 'checked' : 'unchecked'} color={'orange'}/>
                  <Text style={styles.optionText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => handleAnswerChange(q.questionId, 'no')}>
                  <Checkbox status={q.answer === 'no' ? 'checked' : 'unchecked'} color={'orange'} />
                  <Text style={styles.optionText}>No</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => removeQuestion(q.questionId)} style={styles.removeButton}>
                <Icon name="trash-can-outline" size={24} color="skyblue" />
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity style={styles.addButton} onPress={addQuestion}>
            <Icon name="plus" size={20} color="#000" />
            <Text style={styles.addButtonText}>Add more questions</Text>
          </TouchableOpacity>

          <View style={styles.qualificationContainer}>
            <Checkbox status={filter ? 'checked' : 'unchecked'} onPress={() => setFilter(!filter)} color={'orange'} />
            <Text style={styles.qualificationText}>Filter out and Send Rejection Note to applicants who don't meet any must have qualifications</Text>
          </View>

          <Text style={styles.previewTitle}>Preview</Text>
          <TextInput
            style={styles.previewText}
            multiline
            value="Thank you so much for your application. While we appreciate your interest in our company, we have decided to move forward with another candidate at this time. We hope that you reapply to us in the future and have the very best of luck in all your endeavors. Have a wonderful day! Best Wishes, Hiring Tech"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText2}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.feedbackButton} onPress={() => {}}>
            <Text style={styles.feedbackButtonText}>Have feedback? Tell us more.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 25,
    color:'black',
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  questionInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 8,
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  removeButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  qualificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  qualificationText: {
    fontSize: 14,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  previewText: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    textAlignVertical: 'top',
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#ffa726',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  feedbackButton: {
    alignItems: 'center',
    marginTop:20,
    marginBottom: 16,
  },
  feedbackButtonText: {
    color: '#000',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'orange',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  continueButton: {
    backgroundColor: 'orange',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButtonText: {
    color: 'black',
  },
});

export default CreateJobScreen5;
