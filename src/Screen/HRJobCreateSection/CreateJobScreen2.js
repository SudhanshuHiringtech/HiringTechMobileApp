import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import HeaderWithLogo from '../../Component/HeaderWithLogo';

const CreateJobScreen2 = ({ navigation, route }) => {
  const [jobDetails, setJobDetails] = useState({});
  const [minPay, setMinPay] = useState('');
  const [maxPay, setMaxPay] = useState('');
  const [rate, setRate] = useState('');
  const [selectedIncentives, setSelectedIncentives] = useState([]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);

  const incentives = ['Yearly bonus', 'Stock options', 'Bonus opportunities', 'Overtime pay', 'Other'];
  const benefits = ['Health insurance', 'Referral program', 'Relocation assistance', 'Retirement plan', 'Parental leave'];

  const handleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const jobData = route.params.JobApplication;
  console.log("data agya ", jobData);

  const handleSubmit = () => {
    setJobDetails({ ...jobData, minPay, maxPay, rate, selectedIncentives, selectedBenefits });
  };

  useEffect(() => {
    if (Object.keys(jobDetails).length > 0) {
      console.log("Updated jobDetails: ", jobDetails);
      navigation.navigate('CreateJobDescriptionScreen', { jobDetails });
    }
  }, [jobDetails]);

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
          <Dropdown
            style={styles.dropdown}
            data={[{ label: '₹ 3 LPA', value: '₹ 3 LPA' }, { label: '₹ 4 LPA', value: '₹ 4 LPA' }]}
            labelField="label"
            valueField="value"
            placeholder="Min"
            value={minPay}
            onChange={item => setMinPay(item.value)}
          />
          <Dropdown
            style={styles.dropdown}
            data={[{ label: '₹ 4 LPA', value: '₹ 4 LPA' }, { label: '₹ 5 LPA', value: '₹ 5 LPA' }]}
            labelField="label"
            valueField="value"
            placeholder="Max"
            value={maxPay}
            onChange={item => setMaxPay(item.value)}
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
              <Text style={styles.selectionText}> + {item}</Text>
            </TouchableOpacity>
          ))}
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
              <Text style={styles.selectionText}> +{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: '8%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.Backbutton} onPress={() => navigation.navigate('CreateJobScreen1')}>
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
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    width: '45%',
    alignItems: 'center',
    borderRadius: 20,
  },
  Backbutton: {
    // backgroundColor: '#FFA500',
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
