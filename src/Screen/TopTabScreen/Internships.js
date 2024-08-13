import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import MainJobCard from '../../Component/MainJobCard';
import JobFilterBottomSheet from '../../Component/JobFilterBottomSheet';

const Internships = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading
  const [filterData, setFilterData] = useState({
    isJobOfferAttached: false,
    minStipend: 0,
    maxDuration: 6,
    jobMode: null,
    experience: null,
    location: '',
    jobTitle: '',
    company: '',
    skillsList: [],
  });


    // Function to fetch jobs based on filters
  async function fetchFilteredJobs(filters) {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          title: filters.jobTitle,
          company: filters.company,
          techStack: filters.skillsList.length > 0 ? filters.skillsList.join(',') : undefined,
          experienceRequired: filters.experience,
          location: filters.location,
          workMode: filters.jobMode,
        }).toString();
  
        const response = await fetch(`https://hiringtechb-1.onrender.com/filterjobs?${queryParams}`);
        
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        const data = await response.json();
        console.log('Filtered internship jobs:', data);
        setJobs(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    }

  const handleApply = (data) => {
    console.log('Filter Data:', data);
    setFilterData(data);
    fetchFilteredJobs(data);
    // Call your API or handle the filter data as needed
  };

  const handleClearFilter = () => {
    setFilterData({
      isJobOfferAttached: false,
      minStipend: 0,
      maxDuration: 6,
      jobMode: null,
      experience: null,
      location: '',
      jobTitle: '',
      company: '',
      skillsList: [],
    });
    
  };

  const refRBSheet = useRef();

  async function fetchJobs() {
    try {
      const response = await fetch('https://hiringtechb-1.onrender.com/jobs/internship');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('fulltime jobs:', data);
      setJobs(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false); // Hide loader after data is fetched
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? ( // Show loader while loading
        <ActivityIndicator size="large" color="orange" style={styles.loader} />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MainJobCard job={item} />}
        />
      )}
      <TouchableOpacity onPress={() => refRBSheet.current.open()}>
        <Text style={styles.openButton}>Open Filters</Text>
      </TouchableOpacity>
      <JobFilterBottomSheet
        ref={refRBSheet}
        filterData={filterData}
        setFilterData={setFilterData}
        onApply={handleApply}
        onClear={handleClearFilter}
        call={'Internship'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    marginTop: 16,
    color: '#007bff',
  },
});

export default Internships;
