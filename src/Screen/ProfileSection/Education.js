// import React, { useState } from 'react';
// import { ScrollView, View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import HeaderWithLogo from '../../Component/HeaderWithLogo';
// import { setProfile, selectProfile } from "../../Reduxtoolkit/profileSlice";
// import { useSelector, useDispatch } from 'react-redux';


// const Education = ({navigation}) => {
//   const [educationFields, setEducationFields] = useState([{ id: 1, institution: '',  startDate: '', endDate: '', degree: '', fieldOfStudy: '', activities: '', grade: '' }]);
//   const profile = useSelector(selectProfile);
//   const userID = profile?.profile?.user?._id;
//   const addEducationField = () => {
//     setEducationFields([
//       ...educationFields,
//       { id: educationFields.length + 1, institution: '', startDate: '', endDate: '', degree: '', fieldOfStudy: '', activities: '', grade: '' },
//     ]);
//   };

//   const handleInputChange = (text, index, field) => {
//     const newFields = educationFields.map((item, idx) => {
//       if (idx === index) {
//         return { ...item, [field]: text };
//       }
//       return item;
//     });
//     setEducationFields(newFields);
//   };

  
//   const saveDetails =  async () => {
//     console.log(userID);
//     console.log(educationFields);
//   try {
//     const response = await fetch('https://hiringtechb-2.onrender.com/education', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id : userID,
//        education: educationFields
//       }),
//     });
//     console.log('Hi');
//     const data = await response.json();
//    // console.log(body);
//     if (response.ok) {
//       navigation.navigate('Bottomtab');
//       Alert.alert('profile Successful updated', `Welocme`);
//     } else {
//       console.error('Saved data faied', data.error);
//     }
//   } catch (error) {
//     console.error('Error during save:', error);
//   }
//   };

//   return (
//     <SafeAreaProvider>
//       <View style={styles.container}>
//         <View style={{ height:'9%'}}>
//         <HeaderWithLogo image={true} text="My Resume" />
//         </View>
//          <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {educationFields.map((field, index) => (
//           <View key={field.id} style={styles.fieldContainer}>
//             <Text style={styles.subHeader}>Graduation / Post graduation</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="institution / School"
//               value={field.institution}
//               onChangeText={(text) => handleInputChange(text, index, 'institution')}
//             />
//             <View style={styles.row}>
//               <TextInput
//                 style={[styles.input, styles.halfInput]}
//                 placeholder="Start Year"
//                 value={field.startDate}
//                 onChangeText={(text) => handleInputChange(text, index, 'startDate')}
//               />
//               <TextInput
//                 style={[styles.input, styles.halfInput]}
//                 placeholder="End Year"
//                 value={field.endDate}
//                 onChangeText={(text) => handleInputChange(text, index, 'endDate')}
//               />
//             </View>
//             <TextInput
//               style={styles.input}
//               placeholder="Degree or School"
//               value={field.degree}
//               onChangeText={(text) => handleInputChange(text, index, 'degree')}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="fieldOfStudy or filed"
//               value={field.fieldOfStudy}
//               onChangeText={(text) => handleInputChange(text, index, 'fieldOfStudy')}
//             />
//             <View style={styles.row}>
//               <TextInput
//                 style={[styles.input, styles.halfInput]}
//                 placeholder="activities/CGPA"
//                 value={field.activities}
//                 onChangeText={(text) => handleInputChange(text, index, 'activities')}
//               />
//               <TextInput
//                 style={[styles.input, styles.halfInput]}
//                 placeholder="Grade"
//                 value={field.grade}
//                 onChangeText={(text) => handleInputChange(text, index, 'grade')}
//               />
//             </View>
//           </View>
//         ))}
//         </ScrollView>
//         <View>
//         <TouchableOpacity style={styles.addButton} onPress={addEducationField}>
//           <Text style={styles.addButtonText}>Add More Education</Text>
//         </TouchableOpacity>
//         <Button title="Save" onPress={saveDetails} />
//         </View>
//       </View>
//     </SafeAreaProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height:'100%',
//     padding: 16,
//     backgroundColor: '#ffffff',
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
//     width:'90%',
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 10,
//     elevation: 3,
//   },
//   input: {
//     width: '90%',
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
// scrollContainer: {
//   flexGrow: 1,
//   paddingBottom: 20,
//   alignItems: 'center',
// },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default Education;

import React, { useState, useEffect } from 'react';
import { ScrollView, View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderWithLogo from '../../Component/HeaderWithLogo';
import { setProfile, selectProfile } from "../../Reduxtoolkit/profileSlice";
import { useSelector, useDispatch } from 'react-redux';

const Education = ({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const userID = profile?.profile?.user?._id;
  const educationFromRedux = profile?.profile?.user?.education || [];

  const [educationFields, setEducationFields] = useState(
    educationFromRedux.map((field, index) => ({
      id: index + 1,
      institution: field.institution || '',
      startDate: field.startDate || '',
      endDate: field.endDate || '',
      degree: field.degree || '',
      fieldOfStudy: field.fieldOfStudy || '',
      activities: field.activities || '',
      grade: field.grade || ''
    }))
  );

  const addEducationField = () => {
    setEducationFields([
      ...educationFields,
      { id: educationFields.length + 1, institution: '', startDate: '', endDate: '', degree: '', fieldOfStudy: '', activities: '', grade: '' },
    ]);
  };

  const handleInputChange = (text, index, field) => {
    const newFields = educationFields.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: text };
      }
      return item;
    });
    setEducationFields(newFields);
  };

  const saveDetails = async () => {
    console.log(userID);
    const updatedEducationFields = educationFields.map(field => ({
      ...field,
      institution: field.institution || null,
      startDate: field.startDate || null,
      endDate: field.endDate || null,
      degree: field.degree || null,
      fieldOfStudy: field.fieldOfStudy || null,
      activities: field.activities || null,
      grade: field.grade || null
    }));

    console.log(updatedEducationFields);
    try {
      // Assuming you have an action in your profileSlice to update education data
      dispatch(setProfile({ education: updatedEducationFields }));

      // Example API call if needed to persist data
      
      const response = await fetch('https://hiringtechb-1.onrender.com/education', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userID,
          education: updatedEducationFields
        }),
      });
      const data = await response.json();
      if (response.ok) {
        navigation.navigate('Bottomtab');
        Alert.alert('Profile Successfully Updated', `Welcome`);
      } else {
        console.error('Saved data failed', data.error);
      }
      
      navigation.navigate('Bottomtab');
      Alert.alert('Profile Successfully Updated', `Welcome`);
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
          {educationFields.map((field, index) => (
            <View key={field.id} style={styles.fieldContainer}>
              <Text style={styles.subHeader}>Graduation / Post graduation</Text>
              <TextInput
                style={styles.input}
                placeholder="Institution / School"
                value={field.institution}
                onChangeText={(text) => handleInputChange(text, index, 'institution')}
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Start Year"
                  value={field.startDate}
                  onChangeText={(text) => handleInputChange(text, index, 'startDate')}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="End Year"
                  value={field.endDate}
                  onChangeText={(text) => handleInputChange(text, index, 'endDate')}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Degree or School"
                value={field.degree}
                onChangeText={(text) => handleInputChange(text, index, 'degree')}
              />
              <TextInput
                style={styles.input}
                placeholder="Field of Study or Filed"
                value={field.fieldOfStudy}
                onChangeText={(text) => handleInputChange(text, index, 'fieldOfStudy')}
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Activities/CGPA"
                  value={field.activities}
                  onChangeText={(text) => handleInputChange(text, index, 'activities')}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Grade"
                  value={field.grade}
                  onChangeText={(text) => handleInputChange(text, index, 'grade')}
                />
              </View>
            </View>
          ))}
        </ScrollView>
        <View>
          <TouchableOpacity style={styles.addButton} onPress={addEducationField}>
            <Text style={styles.addButtonText}>Add More Education</Text>
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
    height: '100%',
    padding: 16,
    backgroundColor: '#ffffff',
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
    width: '90%',
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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Education;


