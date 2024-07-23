import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator, // Import ActivityIndicator for loader
} from "react-native";
import JobCard from "../../Component/JobCard";
import HeaderWithLogo from "../../Component/HeaderWithLogo";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const [jobsData, setJobsData] = useState([]);
  const [profile, setProfile] = useState(null);
  const [checkStatus, setCheckStatus] = useState();
  const [loading, setLoading] = useState(true); // State for loading

  async function fetchJobs() {
    try {
      const response = await fetch('https://hiringtechb-2.onrender.com/getalljobs');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const pro = await AsyncStorage.getItem('Profile');
      const profile = JSON.parse(pro);
      setProfile(profile);
      console.log("Designation", profile?.user?.userdesignation)
      setCheckStatus(profile?.user?.userdesignation);
      const data = await response.json();
      // console.log('Data received:', data);
      setJobsData(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  }
  
  useEffect(() => {
    fetchJobs()
  },[])

  const handleCardPress = (id) => {
    // Handle card press, e.g., navigate to details
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{height: '4%'}}>
          <HeaderWithLogo
            imageSource={require("../../Assets/dashboard/Logo.png")} 
            image={false}
          />
        </View>
        <View style={styles.welcomeContainer}>
        <ImageBackground
      source={
        checkStatus === 'candidate'
          ? require('../../Assets/dashboard/welcome.png')
          : require('../../Assets/WelcomeBanner.png')
      }
      style={styles.welcomeBackground}
      resizeMode="cover"
    >
            <Text style={styles.dateText}>Wednesday, 5 June 2024</Text>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{profile?.user?.name}</Text>
            <Text style={styles.subtitleText}>
              Ready to Land Your Dream Career? Let's Help!
            </Text>
          </ImageBackground>
        </View>

        <View style={styles.talentContainer}>
          <Text style={styles.sectionTitle}>Talent Talks</Text>

          <View style={styles.cardRow}>
            <ImageBackground
              source={require("../../Assets/dashboard/card1.png")}
              style={styles.card}
              resizeMode="contain"
            >
              <View style={styles.cardContent}>
                <View style={styles.cardTextContainer}>
                  <Image
                    source={require("../../Assets/dashboard/cardImage1.png")}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardText}>
                    <Text style={styles.cardNumber}>18</Text>
                    <Text style={styles.cardLabel}>Employers</Text>
                    <Text style={styles.cardLabel}>Interested in You</Text>
                  </View>
                </View>
                <Image
                  source={require("../../Assets/dashboard/cardarrow1.png")}
                  style={styles.cardArrow}
                />
              </View>
            </ImageBackground>
            <ImageBackground
              source={require("../../Assets/dashboard/card2.png")}
              style={styles.card}
              resizeMode="contain"
            >
              <View style={styles.cardContent}>
                <View style={styles.cardTextContainer}>
                  <Image
                    source={require("../../Assets/dashboard/cardImage1.png")}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardText}>
                    <Text style={styles.cardNumber}>18</Text>
                    <Text style={styles.cardLabel}>Pending</Text>
                    <Text style={styles.cardLabel}>applications</Text>
                  </View>
                </View>
                <Image
                  source={require("../../Assets/dashboard/cardarrow2.png")}
                  style={styles.cardArrow}
                />
              </View>
            </ImageBackground>
          </View>

          <View style={styles.cardRow}>
            <ImageBackground
              source={require("../../Assets/dashboard/card3.png")}
              style={styles.card}
              resizeMode="contain"
            >
              <View style={styles.cardContent}>
                <View style={styles.cardTextContainer}>
                  <Image
                    source={require("../../Assets/dashboard/cardImage1.png")}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardText}>
                    <Text style={styles.cardNumber}>18</Text>
                    <Text style={styles.cardLabel}>Shortlisted</Text>
                    <Text style={styles.cardLabel}>applications</Text>
                  </View>
                </View>
                <Image
                  source={require("../../Assets/dashboard/cardarrow3.png")}
                  style={styles.cardArrow}
                />
              </View>
            </ImageBackground>
            <ImageBackground
              source={require("../../Assets/dashboard/card4.png")}
              style={styles.card}
              resizeMode="contain"
            >
              <View style={styles.cardContent}>
                <View style={styles.cardTextContainer}>
                  <Image
                    source={require("../../Assets/dashboard/cardImage1.png")}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardText}>
                    <Text style={styles.cardNumber}>18</Text>
                    <Text style={styles.cardLabel}>applications</Text>
                    <Text style={styles.cardLabel}>submitted</Text>
                  </View>
                </View>
                <Image
                  source={require("../../Assets/dashboard/cardarrow4.png")}
                  style={styles.cardArrow}
                />
              </View>
            </ImageBackground>
          </View>
        </View>

        <View style={styles.featuredJobsContainer}>
          <Text style={styles.sectionTitle}>Featured Jobs</Text>
          {loading ? ( // Show loader while fetching
            <ActivityIndicator size="large" color="orange" style={styles.loader} />
          ) : (
            <FlatList
              data={jobsData}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <JobCard
                  data={item}
                  cardType="featured"
                  cardStyles={styles.jobCard}
                  onPress={() => handleCardPress(item.id)}
                />
              )}
            />
          )}
        </View>

        <View style={styles.recentJobsContainer}>
          <Text style={styles.sectionTitle}>Recent Jobs</Text>
          {loading ? ( // Show loader while fetching
            <ActivityIndicator size="large" color="orange" style={styles.loader} />
          ) : (
            <FlatList
              data={jobsData}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.recentJobsContentContainer}
              renderItem={({ item }) => (
                <JobCard
                  data={item}
                  cardType="recent"
                  cardStyles={styles.jobCard1}
                  onPress={() => handleCardPress(item.id)}
                />
              )}
            />
          )}
        </View> 
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  welcomeContainer: {
    width: "100%",
    height: height * 0.2,
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 20,
  },
  welcomeBackground: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#E7E7E7",
    marginLeft: 16,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFF7F7",
    marginLeft: 16,
    marginTop: 20,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFF7F7",
    marginLeft: 16,
    marginTop: 4,
  },
  subtitleText: {
    fontSize: 11,
    fontWeight: "400",
    color: "#E7E7E7",
    marginTop: 10,
    marginLeft: 16,
  },
  talentContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#175574",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  card: {
    width: width * 0.45,
    height: height * 0.1,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  cardTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  cardImage: {
    width: 34,
    height: 34,
  },
  cardText: {
    marginLeft: 10,
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  cardArrow: {
    width: 16,
    height: 16,
    marginTop: 10,
  },
  featuredJobsContainer: {
    width: '100%',
    height: height * 0.3,
  },
  recentJobsContainer: {
  },
  recentJobsContentContainer: {
    paddingBottom: 20, // Ensure last card is fully visible
  },
  jobCard: {
    marginRight: 10,
    width: width * 0.8,
  },
  jobCard1: {
    width: '100%',
    height:190,
    marginBottom: 30, // Adjust margin to ensure spacing
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.3,
  }
});

export default Home;
