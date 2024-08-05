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
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const talentCardData = [
    {
        id: "1",
        background: require("../../Assets/dashboard/card1.png"),
        image: require("../../Assets/dashboard/interested.png"),
        number: 18,
        labels: ["Employers", "Interested in You"],
        arrow: require("../../Assets/dashboard/cardarrow1.png"),
    },
    {
        id: "2",
        background: require("../../Assets/dashboard/card2.png"),
        image: require("../../Assets/dashboard/pending.png"),
        number: 5,
        labels: ["Pending", "applications"],
        arrow: require("../../Assets/dashboard/cardarrow2.png"),
    },
    {
        id: "3",
        background: require("../../Assets/dashboard/card3.png"),
        image: require("../../Assets/dashboard/shortlisted.png"),
        number: 6,
        labels: ["Shortlisted", "applications"],
        arrow: require("../../Assets/dashboard/cardarrow3.png"),
    },
    {
        id: "4",
        background: require("../../Assets/dashboard/card4.png"),
        image: require("../../Assets/dashboard/rejected.png"),
        number: 2,
        labels: ["applications", "submitted"],
        arrow: require("../../Assets/dashboard/cardarrow4.png"),
    },
];

const Home = () => {
    const navigation = useNavigation();
    const [jobsData, setJobsData] = useState([]);
    const [profile, setProfile] = useState(null);
    const [checkStatus, setCheckStatus] = useState();
    const [loading, setLoading] = useState(true); // State for loading

    async function fetchJobs() {
        try {
            const response = await fetch(
                "https://hiringtechb-2.onrender.com/getalljobs"
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const pro = await AsyncStorage.getItem("Profile");
            const profile = JSON.parse(pro);
            setProfile(profile);
          //  console.log("Designation", profile?.user?.userdesignation);
            setCheckStatus(profile?.user?.userdesignation);
            const data = await response.json();
            //console.log('Data received:', data);
            setJobsData(data);
        } catch (error) {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        } finally {
            setLoading(false); // Set loading to false after fetch
        }
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleCardPress = (id) => {
        // Handle card press, e.g., navigate to details
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <HeaderWithLogo
                    imageSource={require("../../Assets/dashboard/Logo.png")}
                    image={false}
                />
                <View style={styles.welcomeContainer}>
                    <ImageBackground
                        source={
                            checkStatus === "candidate"
                                ? require("../../Assets/dashboard/welcome.png")
                                : require("../../Assets/WelcomeBanner.png")
                        }
                        style={styles.welcomeBackground}
                        resizeMode="cover">
                        <Text style={styles.dateText}>
                            {/*show full day name, followed by date, month and year*/}
                            {new Date().toLocaleDateString("en-IN", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </Text>
                        <Text style={styles.welcomeText}>Welcome back,</Text>
                        <Text style={styles.nameText}>
                            {profile?.user?.name}
                        </Text>
                        <Text style={styles.subtitleText}>
                            Ready to Land Your Dream Career? Let's Help!
                        </Text>
                    </ImageBackground>
                </View>

                <View style={styles.talentContainer}>
                    <Text style={styles.sectionTitle}>Talent Talks</Text>
                    <View style={styles.talentCardsContainer}>
                        {talentCardData.map((card, index) => (
                            <ImageBackground
                                key={card.id}
                                source={card.background}
                                style={styles.talentCardImage}
                                resizeMode="stretch">
                                <View style={styles.talentCardContent}>
                                    <Image
                                        source={card.image}
                                        style={styles.cardImage}
                                    />
                                    <View style={styles.talentCardText}>
                                        <Text style={styles.talentCardNumber}>
                                            {card.number}
                                        </Text>
                                        <Text style={styles.talentCardLabel}>
                                            {card.labels[0]}
                                        </Text>
                                        <Text style={styles.talentCardLabel}>
                                            {card.labels[1]}
                                        </Text>
                                    </View>
                                    <Image
                                        source={card.arrow}
                                        style={styles.talentCardArrow}
                                    />
                                </View>
                            </ImageBackground>
                        ))}
                    </View>
                </View>

                <View style={styles.featuredJobsContainer}>
                    <View style={styles.sectionHeaderContainer}>
                        <Text style={styles.sectionTitle}>Featured Jobs</Text>
                        <Text
                            style={styles.sectionSubtitle}>{`See all >`}</Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color="orange"
                            style={styles.loader}
                        />
                    ) : (
                        <FlatList
                            data={jobsData}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={
                                styles.featuredJobsContentContainer
                            }
                            renderItem={({ item }) => (
                                <JobCard
                                    data={item}
                                    cardType="featured"
                                    onPress={() => handleCardPress(item.id)}
                                    cardStyles={styles.jobCard}
                                />
                            )}
                        />
                    )}
                </View>

                <View style={styles.recentJobsContainer}>
                    <View style={styles.sectionHeaderContainer}>
                        <Text style={styles.sectionTitle}>Recent Jobs</Text>
                        <Text
                            style={styles.sectionSubtitle}>{`See all >`}</Text>
                    </View>

                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color="orange"
                            style={styles.loader}
                        />
                    ) : (
                        <FlatList
                            data={jobsData}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                            contentContainerStyle={
                                styles.recentJobsContentContainer
                            }
                            renderItem={({ item }) => (
                                <JobCard
                                    data={item}
                                    cardType="recent"
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
        borderRadius: 20,
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
        marginBottom: 20,
    },
    sectionHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#175574",
        marginBottom: 10,
    },
    sectionSubtitle: {
        fontSize: 12,
        fontWeight: "500",
        color: "rgba(23, 85, 116, 0.5)",
    },
    cardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    talentContainer: {
        marginVertical: 20,
        width: "100%",
    },
    talentCardsContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 10,
    },
    talentCardImage: {
        width: width * 0.425,
    },
    talentCardContent: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        position: "relative",
    },
    talentCardText: {
        // marginLeft: 10,
    },
    talentCardNumber: {
        fontSize: 22,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    talentCardLabel: {
        fontSize: 10,
        fontWeight: "500",
        color: "#FFFFFF",
    },
    talentCardArrow: {
        margin: 10,
        position: "absolute",
        width: 16,
        height: 16,
        right: 0,
        top: 0,
    },
    cardTextContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardImage: {
        width: "30%",
        height: "50%",
        resizeMode: "contain",
    },

    featuredJobsContainer: {
        width: "100%",
    },
    featuredJobsContentContainer: {
        paddingBottom: 20, // Ensure last card is fully visible
        gap: 15,
    },
    recentJobsContainer: {},
    recentJobsContentContainer: {
        paddingBottom: 20, // Ensure last card is fully visible
        gap: 15,
    },
    jobCard: {
        width: width * 0.6,
    },

    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: height * 0.3,
    },
});

export default Home;
