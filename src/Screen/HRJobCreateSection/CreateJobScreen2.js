import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import HeaderWithLogo from '../../Component/HeaderWithLogo';

const CreateJobScreen2 = ({ navigation, route }) => {
  const jobDetail = route?.params?.jobDetail || {};
  const UpdateJob = route?.params?.UpdateJob;
  console.log(UpdateJob)
  const [jobDetails, setJobDetails] = useState(jobDetail);
  const [minPay, setMinPay] = useState(jobDetail.minPay || '');
  const [maxPay, setMaxPay] = useState(jobDetail.maxPay || '');
  const [rate, setRate] = useState(jobDetail.salaryYearlyOrMonthly || '');
  const [selectedIncentives, setSelectedIncentives] = useState(jobDetail.incentivesAndPerks || []);
  const [selectedBenefits, setSelectedBenefits] = useState(jobDetail.benefits || []);
  const [customIncentive, setCustomIncentive] = useState('');
  const [customBenefits, setCustomBenefits] = useState('');

  const [incentives, setIncentives] = useState(['Yearly bonus', 'Stock options', 'Bonus opportunities', 'Overtime pay', 'Other']);
  const [benefits, setBenefits] = useState(['Health insurance', 'Referral program', 'Relocation assistance', 'Retirement plan', 'Parental leave']);

  const handleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleCustomIncentiveSubmit = () => {
    if (customIncentive) {
      setSelectedIncentives([...selectedIncentives, customIncentive]);
      setIncentives([...incentives, customIncentive]);
      setCustomIncentive('');
    }
    console.log(selectedIncentives);
  };

  const handleCustomBenefitsSubmit = () => {
    if (customBenefits) {
      setSelectedBenefits([...selectedBenefits, customBenefits]);
      setBenefits([...benefits, customBenefits]);
      setCustomBenefits('');
    }
    console.log(selectedBenefits);
  };

  const handleSubmit = () => {
    const updatedJobDetails = {
      ...jobDetails,
      minPay,
      maxPay,
      rate,
      selectedIncentives,
      selectedBenefits,
    };
    console.log("Updated jobDetails: ", updatedJobDetails);
    navigation.navigate('CreateJobDescriptionScreen', { jobDetails: updatedJobDetails , UpdateJob });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ height: '8%', marginTop: 5 }}>
        <HeaderWithLogo
          imageSource={require("../../Assets/dashboard/Logo.png")}
          image={false}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ color: 'orange', fontWeight: '500' }}>Create JOB Post</Text>
        <Text style={styles.header}>Add Pay & Benefits</Text>

        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdown}
            placeholder="Min Salary"
            value={minPay}
            onChangeText={setMinPay}
          />
          <TextInput
            style={styles.dropdown}
            placeholder="Max Salary"
            value={maxPay}
            onChangeText={setMaxPay}
          />
          <Dropdown
            style={styles.dropdown}
            data={[{ label: 'Yearly', value: 'Yearly' }, { label: 'Monthly', value: 'Monthly' }]}
            labelField="label"
            valueField="value"
            placeholder="Rate"
            value={rate}
            onChange={item => setRate(item.value)}
          />
        </View>

        <Text style={styles.sectionHeader}>Incentive & Perks</Text>
        <View style={styles.selectionContainer}>
          {incentives.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.selectionItem,
                selectedIncentives.includes(item) && styles.selectedItem,
                selectedIncentives.includes(item) && styles.selectedBorder
              ]}
              onPress={() => handleSelection(item, selectedIncentives, setSelectedIncentives)}
            >
              <Text style={[
                styles.selectionText,
                selectedIncentives.includes(item) && styles.selectedText
              ]}>
                + {item}
              </Text>
            </TouchableOpacity>
          ))}
          <TextInput
            style={styles.customInput}
            placeholder="Enter the Incentive & Perks"
            value={customIncentive}
            onChangeText={setCustomIncentive}
            onBlur={handleCustomIncentiveSubmit}
          />
        </View>

        <Text style={styles.sectionHeader}>Benefits</Text>
        <View style={styles.selectionContainer}>
          {benefits.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.selectionItem,
                selectedBenefits.includes(item) && styles.selectedItem,
                selectedBenefits.includes(item) && styles.selectedBorder
              ]}
              onPress={() => handleSelection(item, selectedBenefits, setSelectedBenefits)}
            >
              <Text style={[
                styles.selectionText,
                selectedBenefits.includes(item) && styles.selectedText
              ]}>
                + {item}
              </Text>
            </TouchableOpacity>
          ))}
          <TextInput
            style={styles.customInput}
            placeholder="Enter the Benefits"
            value={customBenefits}
            onChangeText={setCustomBenefits}
            onBlur={handleCustomBenefitsSubmit}
          />
        </View>
        <View style={{ height: '8%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.Backbutton} onPress={() => navigation.navigate('CreateJobScreen1', { jobDetail })}>
            <Text style={styles.BackbuttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdown: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'skyblue',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  sectionHeader: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  selectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  selectionItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'skyblue',
    borderRadius: 20,
    margin: 5,
  },
  selectedBorder: {
    borderColor: 'orange',
  },
  selectedItem: {
    backgroundColor: 'orange',
  },
  selectionText: {
    fontSize: 13,
    color: 'black',
  },
  selectedText: {
    color: 'white',
  },
  customInput: {
    padding: 3,
    borderWidth: 1.5,
    borderColor: 'skyblue',
    borderRadius: 20,
    margin: 5,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    width: '45%',
    alignItems: 'center',
    borderRadius: 20,
  },
  Backbutton: {
    padding: 15,
    borderWidth: 1,
    width: '45%',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  BackbuttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateJobScreen2;
