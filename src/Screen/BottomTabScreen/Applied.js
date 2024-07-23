import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { selectProfile } from "../../Reduxtoolkit/profileSlice";

import HeaderWithLogo from "../../Component/HeaderWithLogo";
import AppliedJobsCard from "../../Component/AppliedJobsCard";
import AppliedJobsFilter from "../../Component/AppliedJobsFilter";

const Applied = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const profile = useSelector(selectProfile);
  const candidateId = profile?.profile?.user?._id;

  const refRBSheet = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://hiringtechb-2.onrender.com/appliedjobs/${candidateId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("job", result);
        setJobs(result);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [candidateId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#f68b1e" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    jobs.length === 0 ? (
      <View style={styles.appliedContainer}>
        <Text style={styles.noApplicationsText}>No recent applications</Text>
        <Text style={styles.subText}>Still looking for Jobs?</Text>
        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Browse Jobs</Text>
        </TouchableOpacity> */}
      </View>
    ) : (
      <View style={styles.Container}>
        <View style={{ height: '13%', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ height: '12%', justifyContent: 'center', width: '80%' }}>
            <HeaderWithLogo
              imageSource={require("../../Assets/dashboard/Logo.png")}
              image={false}
            />
          </View>
        </View>
        <View style={{ marginLeft: 25 }}>
          <Text style={{ fontSize: 28, color: 'black', fontWeight: '400' }}>My Applications</Text>
        </View>
        <View style={{ height: '80%' }}>
          <FlatList
            data={jobs}
            renderItem={({ item }) => <AppliedJobsCard job={item} />}
            keyExtractor={item => item?.id}
          />
        </View>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <Text>Open Filters</Text>
        </TouchableOpacity>
        <AppliedJobsFilter ref={refRBSheet} />
      </View>
    )
  );
};

export default Applied;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  appliedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noApplicationsText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  subText: {
    fontSize: 20,
    color: '#7F8C8D',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f68b1e',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#7F8C8D',
  },
});
