import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import HeaderWithLogo from '../src/Component/HeaderWithLogo';
import CustomToggle from '../src/Component/CustomToggle';
import JobCard from '../src/Component/JobCard';

const HRJobsScreen = () => {
  const [section, setSection] = useState('open');
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [HRCandidate, setHRCandidate] = useState(true);

  async function fetchJobs() {
    try {
      const response = await fetch(`http://192.168.29.188:5000/jobstatus?status=${section}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setJobsData(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchJobs();
  }, [section]);

  console.log("Sfrrf", HRCandidate)
  const leftSideTitle = 'Open & Pause'
  const rightSideTitle = 'Closed'
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ height: '8%', alignItems: 'center' }}>
        <View style={{ height: '100%', width: '88%' }}>
          <HeaderWithLogo
            image={false}
            imageSource={require("../src/Assets/dashboard/Logo.png")} 
          />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <CustomToggle section={section} setSection={setSection} leftSideTitle = {leftSideTitle} rightSideTitle={rightSideTitle}/>
      </View>
      <Text>HRJobsScreen</Text>
      <View style={{ alignItems: 'center', height:'85%'
       }}>
        <View style={{ width: '90%' }}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={jobsData}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.recentJobsContentContainer}
              renderItem={({ item }) => (
                <JobCard
                  data={item}
                  cardType="recent"
                  cardStyles={styles.jobCard1}
                  onPress={() => handleCardPress(item.id)}
                  HRCandidate ={HRCandidate}
                />
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}

export default HRJobsScreen;

const styles = StyleSheet.create({
  recentJobsContentContainer: {
    paddingBottom: 50, // Ensure last card is fully visible
  },
  jobCard1: {
    width: '100%',
    height: 150,
    marginBottom: 15, // Adjust margin to ensure spacing
  },
});
