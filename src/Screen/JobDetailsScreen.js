
import React, { useState , useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
  const job = route.params.job;
  const HRJobDescription = route.params.HRJobDescription;
  const HRCandidate = route.params.HRCandidate;
  const [jobStatus, setJobStatus] = useState(route.params.job.jobStatus)
  console.log("ds",route.params.job.jobStatus)

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

  const [analytics, setAnalytics] = useState({
    impressions: { count: 4000, change: 30 },
    clickThroughRate: { rate: 9.10, change: -9 },
    clicks: { count: 389, change: 44 },
    applications: { count: 200, change: 42 }
  });
  console.log(HRCandidate , "dekh lere bhai tu ", role)


  async function ChangeJobStatus() {
    
    try{ 
      const response = await fetch(`http://192.168.29.188:5000/jobstatus/${jobId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({jobStatus}),
    });

    const data = await response.json();
    if (response.ok) {
      Alert.alert('Job Statused');
    } else {
      console.error('falied to change Status', JSON.stringify(data.error));
    }
  } catch (error) {
    console.error('Error during Stauschange:', error.toString());
  }
};

  useEffect(() =>{
        ChangeJobStatus()
  },[jobStatus])
 
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
        // valueField="value"
        placeholder="Select item"
        value={jobStatus}
        onChange={item => {
          setJobStatus(item.label);
        }}
      />
          <View style={{marginLeft:12}}>
            <Text style={styles.jobTitle}>UX/UI Intern</Text>
            <Text style={styles.companyInfo}>Accenture in India - Remote</Text>
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
  
        {jobDetail?.questions?.map((q) => (
          <View key={q.questionId} style={styles.questionContainer}>
            <Text style={styles.questionInput}>{q.question}</Text>
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
          {role === 'candidate' ? (
            <TouchableOpacity style={styles.applyButton} onPress={ApplyforJob} disabled={isButtonDisabled}>
              {isButtonDisabled ? (<Text style={styles.buttonText}>Applied</Text>) : (<Text style={styles.buttonText}>Apply</Text>)}
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

