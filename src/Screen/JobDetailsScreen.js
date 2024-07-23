import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MainJobCard from '../Component/MainJobCard';
import { WebView } from 'react-native-webview';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { selectProfile } from "../Reduxtoolkit/profileSlice";

const JobDetailsScreen = ({ route, navigation }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const job = route.params.job;
  const HRJobDescription = route.params.HRJobDescription;
  console.log(HRJobDescription);

  const [webViewHeight, setWebViewHeight] = useState(0);

  const standardizeJobData = (data) => ({
    jobTitle: data.jobTitle || '',
    jobDescription: data.jobDescription || data.description,
    company: data.company || "Hiring Tech",
    jobType: data.jobType?.[0] || '',
    jobStatus: data.jobStatus || "open",
    workMode: data.workMode || "WFO",
    location: data.location || '',
    numberOfOpenings: data.numberOfOpenings || 3,
    closedDeadline: data.closedDeadline || data.closingDate || '',
    skillsRequired: data.skillsRequired || data.skillsRquired || [],
    salaryYearlyOrMonthly: data.salaryYearlyOrMonthly || data.rate || '',
    incentivesAndPerks: data.incentivesAndPerks || data.selectedIncentives || [],
    benefits: data.benefits || data.selectedBenefits || [],
    minPay: data.minPay || data.minSalary || 0,
    maxPay: data.maxPay || data.maxSalary || 0,
    workingHours: data.workingHours || data.schedule || '',
    questions: data.questions || [], 
    experienceRequired: data.experienceRequired || data.experience?.[0] || '',
  });

  const jobDetail = standardizeJobData(job);

  console.log("Final 👱🏿‍♂️👱🏿‍♂️", jobDetail);

  const CreateJobApplication = async () => {
    try {
      const response = await fetch('https://hiringtechb-2.onrender.com/job-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobDetail)
      });
      const result = await response.json();
      console.log(":", result);
      if (response.status === 201) {
        Alert.alert('Job post created successfully:');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error creating job post:', JSON.stringify(result));
      }
    } catch (error) {
      console.error('Error:', error.toString());
    }
  };

  const profile = useSelector(selectProfile);
  const jobId = job?._id;
  const candidateId = profile?.profile?.user?._id;
  const candidateName = profile?.profile?.user?.name;
  const candidateEmail = profile?.profile?.user?.email; 
  const resume = profile?.profile?.user?.resume;
  const role = profile?.profile?.user?.userdesignation;
  console.log("fsR", jobId)

  const ApplyforJob = async () => {
    try {
      const response = await fetch('https://hiringtechb-2.onrender.com/apply-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateEmail: candidateEmail,
          candidateName: candidateName,
          candidateId: candidateId,
          candidateProfileStatus: 'Applied',
          jobPost: jobId,
          resume: resume,
          coverLetter: "I am excited to apply for the React Native Developer Engineer position..."
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        Alert.alert('Applied Successful');
        setIsButtonDisabled(true);
      } else {
        console.error('Apply failed:', JSON.stringify(data.error));
      }
    } catch (error) {
      console.error('Error during Apply:', error.toString());
    }
  };

  const injectedJavaScript = `
    document.body.style.zoom = '1.0';
    setTimeout(function() { window.ReactNativeWebView.postMessage(document.body.scrollHeight); }, 500);
  `;

  const handleAnswerChange = (id, answer) => {
    setQuestions(jobDetail?.questions?.map(q => q.questionId === id ? { ...q, answer } : q));
  };

  const handleQuestionChange = (id, question) => {
    setQuestions(jobDetail?.questions?.map(q => q.questionId === id ? { ...q, question } : q));
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.jobCardContainer}>
        <MainJobCard job={jobDetail} HRJobDescription={HRJobDescription} descriptionOpen={true}/>
      </View>
      <View style={styles.card}>
        <Text style={{ fontSize: 15, color: 'black', fontWeight: '900' }}>Job Description</Text>
        <Text style={styles.cardTitle}>About The Job</Text>
        <View style={{ height: webViewHeight }}>
          <WebView
            originWhitelist={['*']}
            source={{ html: jobDetail.jobDescription }}
            style={styles.webview}
            injectedJavaScript={injectedJavaScript}
            scalesPageToFit={false}
            onMessage={(event) => {
              setWebViewHeight(parseInt(event.nativeEvent.data));
            }}
          />
        </View>
        <Text style={styles.cardTitle}>Technical Skills</Text>
        {jobDetail?.skillsRequired?.map((skill, index) => (
          <Text key={index} style={styles.description}>
            ➼ {skill}
          </Text>
        ))}
        <Text style={styles.cardTitle}>Qualifications</Text>
        <Text style={styles.description}>
          ➼ {jobDetail.experienceRequired}
        </Text>
        <Text style={styles.cardTitle}>Incentives</Text>
        {jobDetail?.incentivesAndPerks?.map((skill, index) => (
          <Text key={index} style={styles.description}>
            ➼ {skill}
          </Text>
        ))}
        <Text style={styles.cardTitle}>Benefits</Text>
        {jobDetail?.benefits?.map((skill, index) => (
          <Text key={index} style={styles.description}>
            ➼ {skill}
          </Text>
        ))}

        {jobDetail?.questions?.map((q) => (
            <View key={q.questionId} style={styles.questionContainer}>
              <Text  style={styles.questionInput}>{q.question}</Text>
               
              
              <View style={styles.optionContainer}>
                <TouchableOpacity style={styles.option} onPress={() => handleAnswerChange(q.id, 'yes')}>
                  <Checkbox status={q.answer === 'yes' ? 'checked' : 'unchecked'} color={'orange'}/>
                  <Text style={styles.optionText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => handleAnswerChange(q.id, 'no')}>
                  <Checkbox status={q.answer === 'no' ? 'checked' : 'unchecked'} color={'orange'} />
                  <Text style={styles.optionText}>No</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => removeQuestion(q.id)} style={styles.removeButton}>
                <Icon name="trash-can-outline" size={24} color="skyblue" />
              </TouchableOpacity>
            </View>
          ))}
            <View style={styles.applyButtonContainer}>
          { role == 'candidate' ? (
            <TouchableOpacity style={styles.applyButton} onPress={ApplyforJob} disabled={isButtonDisabled}>
             {isButtonDisabled ? (<Text style={styles.buttonText}>Applied</Text>) :(<Text style={styles.buttonText}>Apply</Text>)}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.applyButton} onPress={CreateJobApplication}>
              <Text style={styles.buttonText}>Create Job</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  jobCardContainer: {
    marginBottom: 20,
  },
  applyButtonContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  applyButton: {
    backgroundColor: '#f68b1e',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 50,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 30,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 18,
    color: 'black',
    marginTop: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    marginLeft: 20,
    color: 'black',
  },
  webview: {
    flex: 1,
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
});

export default JobDetailsScreen;
