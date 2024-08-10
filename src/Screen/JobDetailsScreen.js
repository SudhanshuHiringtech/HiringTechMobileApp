
import React, { useState , useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import MainJobCard from '../Component/MainJobCard';
import { WebView } from 'react-native-webview';
import { Checkbox, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { selectProfile } from "../Reduxtoolkit/profileSlice";
import HeaderWithLogo from '../Component/HeaderWithLogo';
import { Dropdown } from 'react-native-element-dropdown';

const JobDetailsScreen = ({ route, navigation }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const job = route?.params?.job;
  const HRJobDescription = route.params.HRJobDescription;
  const HRCandidate = route.params.HRCandidate;
  const [jobStatus, setJobStatus] = useState(route?.params?.job?.jobStatus)
  const [jobUpdate, setJobUpdate] = useState()
  const [questions, setQuestions] = useState([]);
   
  console.log("Dum Damak Dum Dumm", job);
  
  const  viewedApplication = route?.params?.viwedApplication;

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
   // questions: data.questions || [], 
    experienceRequired: data.experienceRequired || data.experience?.[0] || '',
  });

  const jobDetail = standardizeJobData(job);



  useEffect(() => {
    if (job?.questions) {
      setQuestions(job.questions);
    }
    if (job) {
     // setJobDetails(route.params.jobDetails);
      if (job.questions) {
        setQuestions(job.questions);
      }
    }
  }, [route.params]);

   // Update state when jobDetails changes
   useEffect(() => {
    if (Object.keys(job).length > 0 && job.questions) {
      setQuestions(job.questions);
    }
  }, [job]);

  
  const profile = useSelector(selectProfile);
  const jobId = job?._id;
  const candidateId = profile?.profile?.user?._id;
  const candidateName = profile?.profile?.user?.name;
  const candidateEmail = profile?.profile?.user?.email; 
  const resume = profile?.profile?.user?.resume;
  const role = profile?.profile?.user?.userdesignation;

  const UpdateJob = route.params.UpdateJob;
  const NotShowButton = route.params.NotShowButton || false;

  const [isDisabled, setIsDisabled] = useState(role === 'candidate' || viewedApplication === true);
  console.log("DDD", UpdateJob)


  // Ensure applications is set correctly

// Create  Job Here 
  const CreateJobApplication = async () => {
    console.log("check", { ...jobDetail, questions, recruiterId : candidateId})
    try {
      const response = await fetch('http://192.168.29.188:5000/job-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...jobDetail, questions, recruiterId : candidateId }),
      });
      const result = await response.json();
      if (response.status === 201) {
        Alert.alert('Job post created successfully:');
        navigation.navigate('Home');
      } else {
        console.log(result)
        Alert.alert('Error creating job post:', JSON.stringify(result));
      }
    } catch (error) {
      console.error('Error:', error.toString());
    }
  };
  async function updateJobPost() {
    try {
      const response = await fetch(`https://hiringtechb-1.onrender.com/job-update/${jobId}`, {
        method: 'POST', // Assuming the endpoint is using POST method for update
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobDetail),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const updatedJobPost = await response.json();
      Alert.alert('Your Job Update Successfully');
      navigation.navigate('Home');
      console.log('Updated Job Post:', updatedJobPost);
      return updatedJobPost;
    } catch (error) {
      console.error('Error updating job post:', error);
    }
  }


  const ApplyforJob = async () => {
    try {
      const response = await fetch('http://192.168.29.188:5000/apply-job', {
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
          questions:questions,
          coverLetter: "I am excited to apply for the React Native Developer Engineer position..."
        }),
      });

      const data = await response.json();
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
    navigation.navigate('JobDetails', { job: updatedJobDetails, HRJobDescription: true });
  };

  const [analytics, setAnalytics] = useState({
    impressions: { count: 4000, change: 30 },
    clickThroughRate: { rate: 9.10, change: -9 },
    clicks: { count: 389, change: 44 },
    applications: { count: 200, change: 42 }
  });
  console.log(HRCandidate , "dekh lere bhai tu ", role)


  
  const ChangeJobStatus = async (newStatus) => {
    try {
      const response = await fetch(`https://hiringtechb-1.onrender.com/jobstatus/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobStatus: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Job Status Updated');
      } else {
        console.error('Failed to change status:', JSON.stringify(data.error));
      }
    } catch (error) {
      console.error('Error during status change:', error.toString());
    }
  };

useEffect(() => {
  if (jobUpdate) {
    setJobStatus(jobUpdate.label);
    const jobS = jobUpdate.label;
    ChangeJobStatus(jobS);
  }
}, [jobUpdate]);
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {HRCandidate === true && role === 'recuriter' ? (
        <View style={{height:'38%',}}>
          <View style={{height:'8%'}}>
            <HeaderWithLogo 
             imageSource={require("../Assets/dashboard/Logo.png")} 
             image={false}
             />
          </View>
            <Dropdown
        style={styles.status}
        containerStyle={{borderRadius:30}}
        placeholderStyle={{color:'black'}}
        selectedTextStyle={{color:'black'}}
        data={[
          { label: 'open', value: '1' },
          { label: 'closed', value: '2' },
        ]}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={jobUpdate}
        onChange={item => setJobUpdate(item)}
      />
          <View style={{marginLeft:12}}>
            <Text style={styles.jobTitle}>{jobDetail?.jobTitle}</Text>
            <Text style={styles.companyInfo}>{jobDetail?.company} - {jobDetail?.workMode}</Text>
          </View>
          <Text style={styles.candidateTitle}>Candidates</Text>
          <View style={styles.candidates}>
            <View style={styles.candidateStats}>
              <View>
                <Text>0</Text>
                <Text>Applied</Text>
              </View>
              <View>
                <Text>0</Text>
                <Text>Contacting</Text>
              </View>
              <View>
                <Text>0</Text>
                <Text>Awaiting{"\n"} review</Text>
              </View>
              <View>
                <Text>0</Text>
                <Text>Hired</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.inviteButtonText}>Invite More Candidates</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.analytics}>
            <Text style={styles.analyticsTitle}>Analytics</Text>
            <View style={styles.analyticsCard}>
              <Text>{analytics.impressions.count}</Text>
              <Text style={styles.textStyle}>Job Impressions</Text>
              <Text>{analytics.impressions.change}% {analytics.impressions.change > 0 ? 'more' : 'less'} than usual</Text>
            </View>
            <View style={styles.analyticsCard}>
              <Text>{analytics.clickThroughRate.rate}%</Text>
              <Text style={styles.textStyle}>Click Through Rate</Text>
              <Text>{analytics.clickThroughRate.change}% {analytics.clickThroughRate.change > 0 ? 'more' : 'less'} than usual</Text>
            </View>
            <View style={styles.analyticsCard}>
              <Text>{analytics.clicks.count}</Text>
              <Text style={styles.textStyle}>Clicks</Text>
              <Text>{analytics.clicks.change}% {analytics.clicks.change > 0 ? 'more' : 'less'} than usual</Text>
            </View>
            <View style={styles.analyticsCard}>
              <Text>{analytics.applications.count}</Text>
              <Text style={styles.textStyle}>Applications</Text>
              <Text>{analytics.applications.change}% {analytics.applications.change > 0 ? 'more' : 'less'} than usual</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.jobCardContainer}>
          <MainJobCard job={jobDetail} HRJobDescription={HRJobDescription} descriptionOpen={true}/>
        </View>
      )}
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
  
  {questions.map((q) => (
            <View key={q.questionId} style={styles.questionContainer}>
              <TextInput
                style={styles.questionInput}
                editable={!isDisabled}
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
                    disabled={viewedApplication}
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
                    disabled={viewedApplication}
                  />
                  <Text style={styles.optionText}>No</Text>
                </TouchableOpacity>
              </View>
                <TextInput
                  style={styles.answerInput}
                  editable={!viewedApplication}
                  placeholder="Enter your answer"
                  value={q.answerText}
                  onChangeText={(text) => handleAnswerTextChange(q.questionId, text)}
                />
            </View>
          ))}
        <View style={styles.applyButtonContainer}>
          {role === 'candidate' ? (
            <TouchableOpacity style={styles.applyButton} onPress={ApplyforJob} disabled={isButtonDisabled}>
              {isButtonDisabled ? (<Text style={styles.buttonText}>Applied</Text>) : (<Text style={styles.buttonText}>Apply</Text>)}
            </TouchableOpacity>
          ) : UpdateJob == true && role === 'recuriter' ? 
          (
            <TouchableOpacity style={styles.applyButton} onPress={updateJobPost}>
            <Text style={styles.buttonText}>Update Job</Text>
          </TouchableOpacity>
          )
          : NotShowButton == false && role === 'recuriter' ? 
          (
            <TouchableOpacity style={styles.applyButton} onPress={CreateJobApplication}>
              <Text style={styles.buttonText}>Create Job</Text>
            </TouchableOpacity>
          ) :
            null
          }
        </View>
      </View>
    </ScrollView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
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
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  companyInfo: {
    fontSize: 16,
    color: '#666',
  },
  status: {
    //padding: 16,
    flexDirection : 'row',
    borderWidth:1,
    borderColor:'skyblue',
    width:'60%',
    paddingHorizontal: 30,
   // justifyContent:'space-around',
    alignItems:'center',
    height:'8%',
    borderRadius: 20,
    marginBottom: 16,
  },
  statusText: {
    color: 'black',
    fontSize:18,
    fontWeight: '700',
  },
  candidates: {
    backgroundColor: '#D79442',
    padding: 16,
    borderRadius: 30,
    marginBottom: 16,
    elevation: 1,
  },
  candidateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft:10,
  },
  candidateStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inviteButton: {
    backgroundColor: '#f68b1e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textStyle:{
    fontSize:15,
    color: 'black',
  },
  inviteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  analytics: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  analyticsCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default JobDetailsScreen;

