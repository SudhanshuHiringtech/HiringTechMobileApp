import * as React from 'react';
import { ScrollView, StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';
import { Checkbox} from 'react-native-paper';

const AddComplaintScreen = ({navigation}) => {
  const [complaints, setComplaints] = React.useState({
    moneySecurityDepositFee: false,
    unpaidInternship: false,
    stipendNotAdvertised: false,
    stipendNotReceived: false,
    differentWorkProfile: false,
    differentLocations: false,
    noResponse: false,
    promotionalWork: false,
    noCertificate: false,
    inappropriateBehavior: false,
    others: false,
  });

  const toggleCheckbox = (name) => {
    setComplaints({ ...complaints, [name]: !complaints[name] });
  };

  return (
    <View style={styles.container}>
        <View style={{height:'8%', justifyContent:'center'}}>
            <Text style={{fontSize:30, marginLeft:50, color:'black', fontWeight:'700'}}>Add Complaint</Text>
        </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {Object.keys(complaints).map((complaint, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              status={complaints[complaint] ? 'checked' : 'unchecked'}
              onPress={() => toggleCheckbox(complaint)}
              color={'orange'}
            />
            <Text style={{fontSize:15, color:'black'}}>{formatComplaintText(complaint)}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.applyButton} onPress={()=>navigation.navigate('ComplaintRegisterScreen')}>
            <Text style={styles.buttonText}>Complaint !</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.buttonText}>Add Complaint</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const initialState = {
  moneySecurityDepositFee: false,
  unpaidInternship: false,
  stipendNotAdvertised: false,
  stipendNotReceived: false,
  differentWorkProfile: false,
  differentLocations: false,
  noResponse: false,
  promotionalWork: false,
  noCertificate: false,
  inappropriateBehavior: false,
  others: false,
};

const formatComplaintText = (key) => {
  switch (key) {
    case 'moneySecurityDepositFee':
      return 'Asking for money/security/deposit/fee';
    case 'unpaidInternship':
      return 'Unpaid internship offered';
    case 'stipendNotAdvertised':
      return 'Stipend offered but not as advertised';
    case 'stipendNotReceived':
      return 'Stipend not received after work';
    case 'differentWorkProfile':
      return 'Different work profile offered';
    case 'differentLocations':
      return 'Different locations offered';
    case 'noResponse':
      return 'No response after submitting assignment';
    case 'promotionalWork':
      return 'Promotional/sale work given assignment';
    case 'noCertificate':
      return 'Certificate of completion not received';
    case 'inappropriateBehavior':
      return 'Inappropriate/abusive behavior';
    case 'others':
      return 'Others';
    default:
      return '';
  }
};

const handleSubmit = () => {
  // handle submit logic
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollView: {
    padding: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  applyButton: {
    backgroundColor: '#f68b1e',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 170,
    height: 50,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    fontWeight:'800',
  },
});

export default AddComplaintScreen;
