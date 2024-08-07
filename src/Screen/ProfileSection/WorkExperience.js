
// import React, { useState } from 'react';
// import { ScrollView, View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import HeaderWithLogo from '../../Component/HeaderWithLogo';

// const WorkExperience = () => {
//   const [workExperienceFields, setWorkExperienceFields] = useState([
//     { id: 1, company: '', startDate: '', endDate: '', companyLink: '', jobType: '', desfignation: '', location: '', description: '' },
//   ]);

//   const addWorkExperienceField = () => {
//     setWorkExperienceFields([
//       ...workExperienceFields,
//       { id: workExperienceFields.length + 1, company: '', startDate: '', endDate: '', companyLink: '', jobType: '', desfignation: '', location: '', description: '' },
//     ]);
//   };

//   const handleInputChange = (text, index, field) => {
//     const newFields = workExperienceFields.map((item, idx) => {
//       if (idx === index) {
//         return { ...item, [field]: text };
//       }
//       return item;
//     });
//     setWorkExperienceFields(newFields);
//   };

//   return (
//     <SafeAreaProvider>
//       <View style={styles.container}>
//         <View style={{ height: '9%' }}>
//           <HeaderWithLogo image={true} text="My Resume" />
//         </View>
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           {workExperienceFields.map((field, index) => (
//             <View key={field.id} style={styles.fieldContainer}>
//               <Text style={styles.subHeader}>Work Experience</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Company Name"
//                 value={field.company}
//                 onChangeText={(text) => handleInputChange(text, index, 'company')}
//               />
//               <View style={styles.row}>
//                 <TextInput
//                   style={[styles.input, styles.halfInput]}
//                   placeholder="Start Date"
//                   value={field.startDate}
//                   onChangeText={(text) => handleInputChange(text, index, 'startDate')}
//                 />
//                 <TextInput
//                   style={[styles.input, styles.halfInput]}
//                   placeholder="End Date"
//                   value={field.endDate}
//                   onChangeText={(text) => handleInputChange(text, index, 'endDate')}
//                 />
//               </View>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Company Link"
//                 value={field.companyLink}
//                 onChangeText={(text) => handleInputChange(text, index, 'companyLink')}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Job Type"
//                 value={field.jobType}
//                 onChangeText={(text) => handleInputChange(text, index, 'jobType')}
//               />
//               <View style={styles.row}>
//                 <TextInput
//                   style={[styles.input, styles.halfInput]}
//                   placeholder="desfignation"
//                   value={field.desfignation}
//                   onChangeText={(text) => handleInputChange(text, index, 'desfignation')}
//                 />
//                 <TextInput
//                   style={[styles.input, styles.halfInput]}
//                   placeholder="Location"
//                   value={field.location}
//                   onChangeText={(text) => handleInputChange(text, index, 'location')}
//                 />
//               </View>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Job Description"
//                 value={field.description}
//                 onChangeText={(text) => handleInputChange(text, index, 'description')}
//               />
//             </View>
//           ))}
//           <TouchableOpacity style={styles.addButton} onPress={addWorkExperienceField}>
//             <Text style={styles.addButtonText}>Add More Work Experience</Text>
//           </TouchableOpacity>
//           <Button desfignation="Save" onPress={() => console.log(workExperienceFields)} />
//         </ScrollView>
//       </View>
//     </SafeAreaProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#ffffff',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingBottom: 20,
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   subHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 8,
//   },
//   fieldContainer: {
//     marginBottom: 16,
//     width: '90%',
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 10,
//     elevation: 3,
//   },
//   input: {
//     width: '100%',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//     elevation: 2,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   halfInput: {
//     width: '48%',
//   },
//   addButton: {
//     backgroundColor: '#ff8c00',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default WorkExperience;

import React, { useState, useEffect } from 'react';
import { ScrollView, View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderWithLogo from '../../Component/HeaderWithLogo';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from "../../Reduxtoolkit/profileSlice";

const WorkExperience = ({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const userID = profile?.profile?.user?._id;
  const workExperienceFromRedux = profile?.profile?.user?.experience || [];
  console.log(profile?.profile?.user?.experience);

  const [workExperienceFields, setWorkExperienceFields] = useState(
    workExperienceFromRedux.map((field, index) => ({
      id: index + 1,
      company: field.company || '',
      startDate: field.startDate || '',
      endDate: field.endDate || '',
      companyLink: field.companyLink || '',
      workMode: field.workMode || '',
      designation: field.designation || '',
      location: field.location || '',
      description: field.description || ''
    }))
  );

  const addWorkExperienceField = () => {
    setWorkExperienceFields([
      ...workExperienceFields,
      { id: workExperienceFields.length + 1, company: '', startDate: '', endDate: '', companyLink: '', workMode: '', designation: '', location: '', description: '' },
    ]);
  };

  const handleInputChange = (text, index, field) => {
    const newFields = workExperienceFields.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: text };
      }
      return item;
    });
    setWorkExperienceFields(newFields);
  };

  const saveDetails = async () => {
    console.log(userID);
    const updatedWorkExperienceFields = workExperienceFields.map(field => ({
      ...field,
      company: field.company || null,
      startDate: field.startDate || null,
      endDate: field.endDate || null,
      companyLink: field.companyLink || null,
      workMode: field.workMode || null,
      designation: field.designation || null,
      location: field.location || null,
      description: field.description || null
    }));

    console.log(updatedWorkExperienceFields);
    try {
      const response = await fetch('https://hiringtechb-1.onrender.com/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userID,
          experience: updatedWorkExperienceFields
        }),
      });
      const data = await response.json();
      console.log(response)
      if (response.ok) {
        navigation.navigate('Bottomtab');
        Alert.alert('Profile Successfully Updated', 'Welcome');
      } else {
        Alert.alert('Saved data failed', data.error);
      }
    } catch (error) {
      console.error('Error during save:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={{ height: '9%' }}>
          <HeaderWithLogo image={true} text="My Resume" />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {workExperienceFields.map((field, index) => (
            <View key={field.id} style={styles.fieldContainer}>
              <Text style={styles.subHeader}>Work Experience</Text>
              <TextInput
                style={styles.input}
                placeholder="Company Name"
                value={field.company}
                onChangeText={(text) => handleInputChange(text, index, 'company')}
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Start Date"
                  value={field.startDate}
                  onChangeText={(text) => handleInputChange(text, index, 'startDate')}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="End Date"
                  value={field.endDate}
                  onChangeText={(text) => handleInputChange(text, index, 'endDate')}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Company Link"
                value={field.companyLink}
                onChangeText={(text) => handleInputChange(text, index, 'companyLink')}
              />
              <TextInput
                style={styles.input}
                placeholder="Work Mode"
                value={field.workMode}
                onChangeText={(text) => handleInputChange(text, index, 'workMode')}
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Designation"
                  value={field.designation}
                  onChangeText={(text) => handleInputChange(text, index, 'designation')}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Location"
                  value={field.location}
                  onChangeText={(text) => handleInputChange(text, index, 'location')}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Job Description"
                value={field.description}
                onChangeText={(text) => handleInputChange(text, index, 'description')}
              />
            </View>
          ))}
        </ScrollView>
        <View>
          <TouchableOpacity style={styles.addButton} onPress={addWorkExperienceField}>
            <Text style={styles.addButtonText}>Add More Work Experience</Text>
          </TouchableOpacity>
          <Button title="Save" onPress={saveDetails} />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  fieldContainer: {
    marginBottom: 16,
    width: '90%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 3,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  addButton: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WorkExperience;
