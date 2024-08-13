import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from "../Reduxtoolkit/profileSlice";


const JobHeader = ({ data, cardType, navigation }) => (
    <View style={styles.headerContainer}>
        <View style={styles.header}>
            <Image
                source={require("../Assets/dashboard/Mask.png")}
                style={styles.avatar}
            />
            <View style={styles.headerData}>
                {cardType !== "featured" && (
                    <Text
                        style={styles.jobRole}
                        ellipsizeMode="tail"
                        numberOfLines={1}>
                        {data.jobTitle}
                    </Text>
                )}
                <Text
                    style={[
                        styles.companyLocation,
                        cardType === "featured" && {
                            color:  "#175574",
                            fontSize: 14,
                            fontWeight: "500",
                        },
                    ]}>
                    {data.company}{" "}
                    {cardType !== "featured" && `· ${data.location}`}
                </Text>
            </View>
        </View>
        <View
            style={[
                styles.headerOptions,
                cardType === "featured" && { alignItems: "center" },
            ]}>
            <Image
                source={require("../Assets/dashboard/save.png")}
                style={styles.icon}
            />
            {cardType === "recent" && (
                <TouchableOpacity onPress={()=>{navigation.navigate('CreateJobScreen1', {jobDetail :data, UpdateJob:true})}}>
                <Image
                    source={require("../Assets/dashboard/share.png")}
                    style={styles.icon}
                />
                </TouchableOpacity>
            )}
        </View>
    </View>
);

const JobTags = ({ data }) => (
    <View style={styles.tagsContainer}>
        {[data.workMode, data.jobType].map((item, index) => (
            <Text key={index} style={styles.tagText}>
                {item}
            </Text>
        ))}
    </View>
);

const JobCard = ({ cardType, cardStyles, data, onPress, HRCandidate }) => {
    const navigation = useNavigation();
   // console.log("sunao bhaiya", HRCandidate);

    return (
        <TouchableOpacity
            style={[styles.container, cardStyles]}
            onPress={() => {
                navigation.navigate("JobDetails", { job: data, NotShowButton: true});
            }}>
            <JobHeader data={data} cardType={cardType} navigation={navigation} />
            <View style={styles.bodyContainer}>
                {cardType === "featured" && (
                    <>
                        <Text
                            style={styles.jobRole}
                            ellipsizeMode="tail"
                            numberOfLines={1}>
                            {data.jobTitle}
                        </Text>
                        <Text style={styles.companyLocation}>
                            {data.location}
                        </Text>
                    </>
                )}
                <Text
                    style={styles.salaryText}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    ₹ {data.minPay} LPA - ₹ {data.maxPay} LPA
                </Text>
            </View>
            <View
                style={[
                    styles.footerContainer,
                    cardType === "featured" && { marginTop: 20 },
                ]}>
                <JobTags data={data} />
                {cardType === "recent" && (
                    <Text style={styles.postedText}>Posted 2 hours ago</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: { borderWidth: 0.05, borderRadius: 3, padding: 15 },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    header: {
        flexDirection: "row",
        gap: 10,
        width: "70%",
    },
    avatar: {
        width: 40,
        height: 40,
    },
    icon: {
        width: 18,
        height: 18,
    },
    headerData: {
        flexDirection: "column",
        justifyContent: "center",
        width: "90%",
    },
    jobRole: {
        color: "#175574",
        fontWeight: "500",
        fontSize: 16,
    },
    companyLocation: {
        fontSize: 12,
    },
    headerOptions: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },
    bodyContainer: {
        flexDirection: "column",
        gap: 4,
        marginTop: 12,
    },
    salaryText: {
        color: "#175574",
        marginTop: 4,
    },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: 12,
    },
    tagsContainer: {
        flexDirection: "row",
        gap: 10,
    },
    tagText: {
        backgroundColor: "#ABE0F8",
        color: "#175574",
        fontWeight: "500",
        fontSize: 10,
        borderRadius: 25,
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    postedText: { fontSize: 10, color: "#D79442" },
});

export default JobCard;
