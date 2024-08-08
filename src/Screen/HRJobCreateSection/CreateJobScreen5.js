// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
// import { Checkbox } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import HeaderWithLogo from '../../Component/HeaderWithLogo';

// const CreateJobScreen5 = ({ navigation, route }) => {
//   const [questions, setQuestions] = useState(route?.params?.jobDetail?.questions || []);
//   const [filter, setFilter] = useState(false);
//   const [jobDetails, setJobDetails] = useState(route.params.jobDetails || {});

//   useEffect(() => {
//     if (Object.keys(jobDetails).length > 0) {
//       console.log("Received jobDetails: ", jobDetails.questions);
//     }
//   }, [jobDetails]);

//   const addQuestion = () => {
//     const newQuestion = { questionId: questions.length + 1, question: '', answer: '', answerText: '' };
//     setQuestions([...questions, newQuestion]);
//   };

//   const handleAnswerChange = (id, answer) => {
//     setQuestions(questions.map(q => q.questionId === id ? { ...q, answer, answerText: answer === 'write' ? q.answerText : '' } : q));
//   };

//   const handleQuestionChange = (id, question) => {
//     setQuestions(questions.map(q => q.questionId === id ? { ...q, question } : q));
//   };

//   const handleAnswerTextChange = (id, text) => {
//     setQuestions(questions.map(q => q.questionId === id ? { ...q, answerText: text } : q));
//   };

//   const removeQuestion = (id) => {
//     setQuestions(questions.filter(q => q.questionId !== id));
//   };

//   const handleContinue = () => {
//     const updatedJobDetails = { ...jobDetails, questions, filter };
//     console.log('Updated jobDetails:', updatedJobDetails);
//     navigation.navigate('JobDetails', { job: updatedJobDetails, HRJobDescription: true });
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <View>
//         <HeaderWithLogo  
//           imageSource={require("../../Assets/dashboard/Logo.png")}
//           image={false}
//         />
//       </View>
//       <ScrollView>
//         <View style={styles.header}>
//           <Text style={{ color: 'orange', fontWeight: '500' }}>Create JOB Post</Text>
//           <Text style={styles.headerTitle}>Receive Quality Applicant</Text>
//         </View>

//         <View style={styles.content}>
//           <Text style={styles.title}>Screening Questions</Text>
//           <Text style={styles.subTitle}>We recommend adding three or more questions. Applicants must answer these questions.</Text>
          
//           {questions.map((q) => (
//             <View key={q.questionId} style={styles.questionContainer}>
//               <TextInput
//                 style={styles.questionInput}
//                 placeholder="Enter your question"
//                 value={q.question}
//                 onChangeText={(text) => handleQuestionChange(q.questionId, text)}
//               />
//               <View style={styles.optionContainer}>
//                 <TouchableOpacity 
//                   style={styles.option} 
//                   onPress={() => handleAnswerChange(q.questionId, 'yes')}
//                 >
//                   <Checkbox 
//                     status={q.answer === 'yes' ? 'checked' : 'unchecked'} 
//                     color={'orange'}
//                   />
//                   <Text style={styles.optionText}>Yes</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                   style={styles.option} 
//                   onPress={() => handleAnswerChange(q.questionId, 'no')}
//                 >
//                   <Checkbox 
//                     status={q.answer === 'no' ? 'checked' : 'unchecked'} 
//                     color={'orange'} 
//                   />
//                   <Text style={styles.optionText}>No</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                   style={styles.option} 
//                   onPress={() => handleAnswerChange(q.questionId, 'write')}
//                 >
//                   <Checkbox 
//                     status={q.answer === 'write' ? 'checked' : 'unchecked'} 
//                     color={'orange'}
//                   />
//                   <Text style={styles.optionText}>Write</Text>
//                 </TouchableOpacity>
//               </View>
//               {q.answer === 'write' && (
//                 <TextInput
//                   style={styles.answerInput}
//                   placeholder="Enter your answer"
//                   value={q.answerText}
//                   onChangeText={(text) => handleAnswerTextChange(q.questionId, text)}
//                 />
//               )}
//               <TouchableOpacity 
//                 onPress={() => removeQuestion(q.questionId)} 
//                 style={styles.removeButton}
//               >
//                 <Icon name="trash-can-outline" size={24} color="skyblue" />
//               </TouchableOpacity>
//             </View>
//           ))}
          
//           <TouchableOpacity style={styles.addButton} onPress={addQuestion}>
//             <Icon name="plus" size={20} color="#000" />
//             <Text style={styles.addButtonText}>Add more questions</Text>
//           </TouchableOpacity>

//           <View style={styles.qualificationContainer}>
//             <Checkbox 
//               status={filter ? 'checked' : 'unchecked'} 
//               onPress={() => setFilter(!filter)} 
//               color={'orange'} 
//             />
//             <Text style={styles.qualificationText}>Filter out and send rejection notes to applicants who don't meet any must-have qualifications.</Text>
//           </View>

//           <Text style={styles.previewTitle}>Preview</Text>
//           <TextInput
//             style={styles.previewText}
//             multiline
//             value="Thank you so much for your application. While we appreciate your interest in our company, we have decided to move forward with another candidate at this time. We hope that you reapply to us in the future and have the very best of luck in all your endeavors. Have a wonderful day! Best Wishes, Hiring Tech"
//           />

//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
//               <Text style={styles.buttonText2}>Back</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={handleContinue}>
//               <Text style={styles.buttonText}>Continue</Text>
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity style={styles.feedbackButton} onPress={() => {}}>
//             <Text style={styles.feedbackButtonText}>Have feedback? Tell us more.</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     padding: 16,
//   },
//   headerTitle: {
//     fontSize: 25,
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   content: {
//     padding: 16,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   subTitle: {
//     fontSize: 14,
//     marginBottom: 16,
//   },
//   questionContainer: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 16,
//     elevation: 2,
//   },
//   questionInput: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 8,
//     fontSize: 16,
//   },
//   optionContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   optionText: {
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   answerInput: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 8,
//     marginTop: 8,
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   addButtonText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: '#000',
//   },
//   removeButton: {
//     alignSelf: 'flex-end',
//     marginTop: 8,
//   },
//   qualificationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   qualificationText: {
//     fontSize: 14,
//   },
//   previewTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   previewText: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 16,
//     textAlignVertical: 'top',
//     elevation: 2,
//   },
//   feedbackButton: {
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 16,
//   },
//   feedbackButtonText: {
//     color: '#000',
//     fontSize: 16,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//   },
//   button: {
//     padding: 10,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'orange',
//     alignItems: 'center',
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   continueButton: {
//     backgroundColor: 'orange',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   buttonText2: {
//     color: 'orange',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default CreateJobScreen5;


import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderWithLogo from '../../Component/HeaderWithLogo';

const CreateJobScreen5 = ({ navigation, route }) => {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState(false);
  const [jobDetails, setJobDetails] = useState({});
  
  const UpdateJob = route?.params?.UpdateJob
  console.log("job update", UpdateJob)
  // Initialize state with route params when component mounts or route params change
  useEffect(() => {
    if (route.params?.jobDetail?.questions) {
      setQuestions(route.params.jobDetail.questions);
    }
    if (route.params?.jobDetails) {
      setJobDetails(route.params.jobDetails);
      if (route.params.jobDetails.questions) {
        setQuestions(route.params.jobDetails.questions);
      }
    }
  }, [route.params]);

  // Update state when jobDetails changes
  useEffect(() => {
    if (Object.keys(jobDetails).length > 0 && jobDetails.questions) {
      setQuestions(jobDetails.questions);
    }
  }, [jobDetails]);

  const addQuestion = () => {
    const newQuestion = { questionId: questions.length + 1, question: '', answer: '', answerText: '' };
    setQuestions([...questions, newQuestion]);
  };

  const handleAnswerChange = (id, answer) => {
    setQuestions(questions.map(q => q.questionId === id ? { ...q, answer, answerText: answer === 'write' ? q.answerText : '' } : q));
  };

  const handleQuestionChange = (id, question) => {
    setQuestions(questions.map(q => q.questionId === id ? { ...q, question } : q));
  };

  const handleAnswerTextChange = (id, text) => {
    setQuestions(questions.map(q => q.questionId === id ? { ...q, answerText: text } : q));
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.questionId !== id));
  };

  const handleContinue = () => {
    const updatedJobDetails = { ...jobDetails, questions, filter };
    console.log('Updated jobDetails:', updatedJobDetails);
    navigation.navigate('JobDetails', { job: updatedJobDetails, HRJobDescription: true, UpdateJob });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View>
        <HeaderWithLogo  
          imageSource={require("../../Assets/dashboard/Logo.png")}
          image={false}
        />
      </View>
      <ScrollView>
        <View style={styles.header}>
          <Text style={{ color: 'orange', fontWeight: '500' }}>Create JOB Post</Text>
          <Text style={styles.headerTitle}>Receive Quality Applicant</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Screening Questions</Text>
          <Text style={styles.subTitle}>We recommend adding three or more questions. Applicants must answer these questions.</Text>
          
          {questions.map((q) => (
            <View key={q.questionId} style={styles.questionContainer}>
              <TextInput
                style={styles.questionInput}
                placeholder="Enter your question"
                value={q.question}
                onChangeText={(text) => handleQuestionChange(q.questionId, text)}
              />
              <View style={styles.optionContainer}>
                <TouchableOpacity 
                  style={styles.option} 
                  onPress={() => handleAnswerChange(q.questionId, 'yes')}
                >
                  <Checkbox 
                    status={q.answer === 'yes' ? 'checked' : 'unchecked'} 
                    color={'orange'}
                  />
                  <Text style={styles.optionText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.option} 
                  onPress={() => handleAnswerChange(q.questionId, 'no')}
                >
                  <Checkbox 
                    status={q.answer === 'no' ? 'checked' : 'unchecked'} 
                    color={'orange'} 
                  />
                  <Text style={styles.optionText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.option} 
                  onPress={() => handleAnswerChange(q.questionId, 'write')}
                >
                  <Checkbox 
                    status={q.answer === 'write' ? 'checked' : 'unchecked'} 
                    color={'orange'}
                  />
                  <Text style={styles.optionText}>Write</Text>
                </TouchableOpacity>
              </View>
              {q.answer === 'write' && (
                <TextInput
                  style={styles.answerInput}
                  placeholder="Enter your answer"
                  value={q.answerText}
                  onChangeText={(text) => handleAnswerTextChange(q.questionId, text)}
                />
              )}
              <TouchableOpacity 
                onPress={() => removeQuestion(q.questionId)} 
                style={styles.removeButton}
              >
                <Icon name="trash-can-outline" size={24} color="skyblue" />
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity style={styles.addButton} onPress={addQuestion}>
            <Icon name="plus" size={20} color="#000" />
            <Text style={styles.addButtonText}>Add more questions</Text>
          </TouchableOpacity>

          <View style={styles.qualificationContainer}>
            <Checkbox 
              status={filter ? 'checked' : 'unchecked'} 
              onPress={() => setFilter(!filter)} 
              color={'orange'} 
            />
            <Text style={styles.qualificationText}>Filter out and send rejection notes to applicants who don't meet any must-have qualifications.</Text>
          </View>

          <Text style={styles.previewTitle}>Preview</Text>
          <TextInput
            style={styles.previewText}
            multiline
            value="Thank you so much for your application. While we appreciate your interest in our company, we have decided to move forward with another candidate at this time. We hope that you reapply to us in the future and have the very best of luck in all your endeavors. Have a wonderful day! Best Wishes, Hiring Tech"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
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
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 25,
    color: 'black',
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
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 8,
    fontSize: 16,
  },
  answerInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
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
  feedbackButton: {
    alignItems: 'center',
    marginTop: 20,
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
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: 'orange',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateJobScreen5;
