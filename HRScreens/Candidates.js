import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderWithLogo from '../src/Component/HeaderWithLogo';
import CustomToggle from '../src/Component/CustomToggle';

const Candidates = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Reviewed');
  const tabs = ['Applied', 'Reviewed', 'Contacting', 'Shortlist'];
  const [appliedCandidate, setAppliedCandidate] = useState([]);
  const jobId = route.params.item._id;
  const [section, setSection] = useState('open');
  const [check, setCheck] = useState(false);
 console.log("dekho acche", route.params.item)
 const job = route.params.item;
  

  const message = `Hi [Candidate Name],

  We are currently looking for talented individuals to join our team for the role of [Job Role]. Based on your impressive background and experience, we believe you would be a great fit for this position.
  
  The role involves working on cutting-edge projects, collaborating with a team of skilled professionals, and contributing to innovative solutions that make a real impact.
  
  If you are interested in exploring this opportunity, we would love to hear from you. Please apply through the link below:
  
  [Insert Application Link]
  
  Feel free to reach out if you have any questions or need further information.
  
  Best regards,
  
  [Your Name]
  [Your Position]
  [Your Company]
  [Contact Information]`;

  const [inviteMessage, setInviteMessage] = useState(message);

  const ChangeCandidateJobStatus = async (AppliedId, candidateProfileStatus) => {
    try {
      const response = await fetch(`https://hiringtechb-1.onrender.com/candidate-job-status/${AppliedId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidateProfileStatus }),
      });

      const data = await response.json();
      setCheck(true);
      if (response.ok) {
        Alert.alert('Change Job Candidate Status Updated');
        fetchData(); // Fetch data again after status update
      } else {
        console.error('Failed to change status:', JSON.stringify(data.error));
      }
    } catch (error) {
      console.error('Error during status change:', error.toString());
    }
  };

  const CandidateCard = ({ item }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdown = () => {
      setShowDropdown(prevState => !prevState);
    };
    
    const newQuestions = item.questions;

    job.questions = newQuestions;
    console.log("card", job)
    return (
      <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('JobDetails', { job: job, viwedApplication: true, NotShowButton: true})}}>
        <View style={styles.head}>
          <View style={styles.profile}>
            <Text style={styles.name}>{item.candidateName}</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity
              style={styles.inviteButton}
              onPress={() => navigation.navigate('ChatScreen', { inviteMessage: inviteMessage, InviteAPI: true, candidateData: item })}
            >
              <Text style={styles.inviteText}>Invite</Text>
            </TouchableOpacity>
            <View style={styles.ContainerDrop}>
              <TouchableOpacity onPress={handleDropdown} style={styles.threeDots}>
                <Icon style={styles.dots} name="dots-vertical" color="#999" />
              </TouchableOpacity>

              {showDropdown && (
                <View style={styles.dropdown}>
                  <TouchableOpacity onPress={() => navigation.navigate('ScheduleInterview')}>
                 <Text style={styles.dropdownItem}>Schedule Interview</Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => navigation.navigate('AllInterview')}>
                  <Text style={styles.dropdownItem}>Shortlisting</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                  <Text style={styles.dropdownItem}>Hired</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                  <Text style={styles.dropdownItem}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{item.candidateEmail}</Text>
          <View style={styles.detail}>
            <Icon name="calendar-month-outline" size={20} color="#999" />
            <Text style={styles.detailText}>{item.appliedDate}</Text>
          </View>
          <View style={styles.detail}>
            <Icon name="file-outline" size={20} color="#999" />
            <Text style={styles.detailText}>{item.candidateProfileStatus}</Text>
          </View>
          <TouchableOpacity style={styles.detail} onPress={() => ChangeCandidateJobStatus(item._id, activeTab)}>
            <Icon name="download" size={20} color="#999" />
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://hiringtechb-1.onrender.com/job-posts/${jobId}/applications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Applied job', result);
      setAppliedCandidate(result);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [jobId, check]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const filteredCandidates = appliedCandidate.filter(
    (candidate) => candidate.candidateProfileStatus.toLowerCase() === activeTab.toLowerCase()
  );

  const renderItem = useCallback(({ item }) => <CandidateCard item={item} />, []);

  const leftSideTitle = 'Application';
  const rightSideTitle = 'Smart Souring';

  return (
    <View style={styles.appContainer}>
      <View style={styles.headerContainer}>
        <HeaderWithLogo imageSource={require('../src/Assets/dashboard/Logo.png')} image={false} />
      </View>
      <View style={styles.toggleContainer}>
        <CustomToggle section={section} setSection={setSection} leftSideTitle={leftSideTitle} rightSideTitle={rightSideTitle} />
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.openJobsButton}>
          <Text style={styles.openJobsText}>All the open and closed jobs</Text>
        </TouchableOpacity>
        <View style={styles.sortByContainer}>
          <Text style={styles.sortByText}>Sort By</Text>
        </View>
      </View>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, { borderBottomColor: activeTab === tab ? '#D79442' : 'transparent' }]}
            onPress={() => handleTabPress(tab)}
          >
            <Text style={{ color: activeTab === tab ? '#D79442' : 'gray' }}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredCandidates}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerContainer: {
    height: '8%',
  },
  toggleContainer: {
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    height: '5%',
    justifyContent: 'space-around',
  },
  openJobsButton: {
    width: '65%',
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: 'skyblue',
    justifyContent: 'center',
  },
  openJobsText: {
    color: 'skyblue',
    marginLeft: 10,
  },
  sortByContainer: {
    width: '30%',
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: 'skyblue',
    justifyContent: 'center',
  },
  sortByText: {
    color: 'skyblue',
    marginLeft: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  tab: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  profile: {
    marginBottom: 8,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'space-around',
  },
  inviteButton: {
    borderWidth: 1.5,
    borderColor: 'skyblue',
    borderRadius: 15,
    width: 70,
    alignItems: 'center',
  },
  inviteText: {
    fontSize: 15,
    color: '#175574',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#175574',
  },
  title: {
    fontSize: 14,
    color: '#175574',
    fontWeight: '600',
  },
  details: {
    justifyContent: 'space-between',
  },
  detail: {
    flexDirection: 'row',
  },
  detailText: {
    fontSize: 14,
    marginLeft: 4,
    color: '#175574',
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
    color: '#175574',
    textDecorationLine: 'underline',
  },
  ContainerDrop: {
    justifyContent: 'right',
    alignItems: 'center',
  },
  threeDots: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ABE0F8',
    padding: 2,
  },
  dots: {
    fontSize: 20,
  },
  dropdown: {
    position: 'absolute',
    zIndex: 1,
    right: 32,
    width: 150,
    top: -10,
    backgroundColor: '#fff',
    padding: 5,
    elevation: 3,
    borderRadius: 10,
  },
  dropdownItem: {
    padding: 5,
    color: '#175574',
  },
});

export default Candidates;
