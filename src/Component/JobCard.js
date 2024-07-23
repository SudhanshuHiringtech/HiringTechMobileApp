

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const JobCard = ({ cardType, cardStyles, data, onPress }) => {
  const navigation = useNavigation() 
   console.log(data);
  return (
    <TouchableOpacity style={[styles.card, cardStyles]} onPress={() => {navigation.navigate('JobDetails', {job:data})}}>
      <View style={styles.rowSpaceBetween}>
        <View style={styles.rowCenter}>
          <Image source={require("../Assets/dashboard/Mask.png")} style={styles.avatar} />
          {cardType === 'featured' ? (
            // <Text style={styles.vacantLandText}>Vacant Land</Text>
            <View style={styles.textContainer}>
            <Text style={styles.titleText0}>{data.jobTitle}</Text>
            <Text style={styles.vacantLandText}>{`${data.company} · ${data.location}`}</Text>
          </View>
          ) : (
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{data.jobTitle}</Text>
              <Text style={styles.vacantLandText}>{`${data.company} · ${data.location}`}</Text>
            </View>
          )}
        </View>
        <View style={styles.rowCenter}>
          <Image source={require("../Assets/dashboard/save.png")} style={styles.saveIcon} />
          {cardType === 'recent' && (
            <Image source={require("../Assets/dashboard/share.png")} style={styles.shareIcon} />
          )}
        </View>
      </View>
      <View style={styles.bottomContent}>
        <Text style={styles.salaryText}>{`₹ ${data.minPay} - ₹ ${data.maxPay} LPA`}</Text>
        <View style={styles.rowSpaceBetween}>
          <View style={styles.rowCenter}>
            {data.workMode && 
            <><View style={styles.tag}>
                <Text style={styles.tagText}>{data.workMode}</Text>
              </View><View style={styles.tag2}>
                  <Text style={styles.tagText}>{data.jobType}</Text>
                </View></>
            }
            {data.numberOfOpening && <View style={[styles.tag, { marginLeft: 12,}]}><Text style={styles.tagText}>Opening : {data.numberOfOpening}</Text></View>}
          </View>
          {cardType === 'recent' && (
            <Text style={styles.postedText}>Posted 2 hours ago</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    
    padding: 15,
    width:270,
    height:200,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#17557433",
   // marginBottom: 30,
    // Adjust width and height dynamically where it's used
  },
  rowSpaceBetween: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomContent: {
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  textContainer: {
    marginLeft: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#175574",
  },
  titleText0 : {
    fontSize: 14,
    fontWeight: "500",
    color: "#175574",
  },
  vacantLandText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#175574",
  },
  saveIcon: {
    width: 18,
    height: 18,
  },
  shareIcon: {
    width: 20,
    height: 20,
    marginLeft: 12,
  },
  salaryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#175574",
    marginTop: 10,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexDirection :'row',
    marginRight:10,
    backgroundColor: "#ABE0F8",
    borderRadius: 18,
  },
  tag2: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexDirection :'row',
    backgroundColor: "#ABE0F8",
    borderRadius: 18,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#175574",
  },
  postedText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D79442",
    marginTop: 12,
  },
});

export default JobCard;
