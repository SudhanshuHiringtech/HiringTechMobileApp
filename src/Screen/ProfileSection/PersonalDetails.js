
// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image, ScrollView,Alert } from 'react-native';
// import HeaderWithLogo from '../../Component/HeaderWithLogo';
// import { useSelector, useDispatch } from 'react-redux';
// import { setProfile, selectProfile } from "../../Reduxtoolkit/profileSlice";


// export default function PersonalDetails({navigation}) {
//   const profile = useSelector(selectProfile);
//   const [firstName, setFirstName] = useState(profile?.profile?.user?.name);
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState(profile?.profile?.user?.email);
//   const [contactNumber, setContactNumber] = useState(profile?.profile?.user?.mobileNumber);
//   const [currentCity, setCurrentCity] = useState(profile?.profile?.user?.currentLocation);
//   const [dob, setDob] = useState(profile?.profile?.user?.DOB);
//   const [gender, setGender] = useState(profile?.profile?.user?.gender);
//   const [image, setImage] = useState(null);
//   const dispatch = useDispatch();
//   console.log("personal", profile?.profile?.user?._id);
//   const id = profile?.profile?.user?._id;

//   const pickImage = async () => {
//     // let result = await ImagePicker.launchImageLibraryAsync({
//     //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     //   allowsEditing: true,
//     //   aspect: [1, 1],
//     //   quality: 1,
//     // });

//     // if (!result.canceled) {
//     //   setImage(result.uri);
//     // }
//     console.log("Hi");
//   };

//   const saveDetails =  async () => {
//     console.log({
//       firstName,
//       lastName,
//       email,
//       contactNumber,
//       currentCity,
//       dob,
//       gender,
//       image,
//       id
//     });

//   console.log(id);
//   try {
//     const response = await fetch('https://hiringtechb-2.onrender.com/personal-details', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id: id,
//         name: firstName,
//         email: email,
//         mobileNumber: contactNumber,
//         DOB: dob,
//         gender:gender,
//         currentLocation: currentCity
//       }),
//     });
//     console.log('Hi');
//     const data = await response.json();
//     console.log(data);
//     if (response.ok) {
//       navigation.navigate('Bottomtab');
//       Alert.alert('profile Successful updated', `Welocme`);
//     } else {
//       Alert.alert('you do leave filed  a empty', data.error);
//     }
//   } catch (error) {
//     console.error('Error during save:', error);
//   }
  

//   };

//   const handleGenderSelection = (selectedGender) => {
//     setGender(selectedGender);
//     console.log(selectedGender);
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <View style={{ backgroundColor: 'red', width: '88%' }}>
//           <HeaderWithLogo image={true} text="My Resume" />
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.sectionHeader}>Personal Details</Text>
//           <View style={styles.inputRow}>
//             <View style={styles.NamesContainer}>
//               <Text style={styles.label}>First name</Text>
//               <TextInput
//                 style={styles.Nameinput}
//                 placeholder="First name"
//                 value={firstName}
//                 onChangeText={setFirstName}
//               />
//             </View>
//             <View style={styles.NamesContainer}>
//               <Text style={styles.label}>Last name</Text>
//               <TextInput
//                 style={styles.Nameinput}
//                 placeholder="Last name"
//                 value={lastName}
//                 onChangeText={setLastName}
//               />
//             </View>
//           </View>
//           <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
//             {image ? (
//               <Image source={{ uri: image }} style={styles.image} />
//             ) : (
//               <Text style={styles.imageUploadText}>
//                 Upload a professional picture of yourself (Max file size: 1MB and max resolution: 500px x 500px. File type - jpeg, jpg, png, gif)
//               </Text>
//             )}
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.changePictureButton} onPress={pickImage}>
//             <Text style={styles.changePictureButtonText}>Change picture</Text>
//           </TouchableOpacity>
//           <View style={styles.labelContainer}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//             />
//           </View>
//           <View style={styles.labelContainer}>
//             <Text style={styles.label}>Contact number</Text>
//             <View style={styles.inputRow}>
//               <TextInput
//                 style={styles.contactCode}
//                 placeholder="+91"
//                 value="+91"
//                 editable={false}
//               />
//               <TextInput
//                 style={styles.contactNumber}
//                 placeholder="Enter your M. Number"
//                 keyboardType="numeric"
//                 value={contactNumber}
//                 onChangeText={setContactNumber}
//               />
//             </View>
//           </View>
//           <View style={styles.labelContainer}>
//             <Text style={styles.label}>Current city</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Current city"
//               value={currentCity}
//               onChangeText={setCurrentCity}
//             />
//           </View>
//           <View style={styles.labelContainer}>
//             <Text style={styles.label}>Date of Birth</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Date of Birth"
//               value={dob}
//               onChangeText={setDob}
//             />
//           </View>
//           <Text style={styles.genderLabel}>Gender</Text>
//           <View style={styles.genderOptions}>
//             <TouchableOpacity
//               style={[styles.genderButton, gender === 'Female' && styles.selectedGenderButton]}
//               onPress={() => handleGenderSelection('Female')}
//             >
//               <Text style={styles.genderButtonText}>Female</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.genderButton, gender === 'Male' && styles.selectedGenderButton]}
//               onPress={() => handleGenderSelection('Male')}
//             >
//               <Text style={styles.genderButtonText}>Male</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.genderButton, gender === 'Others' && styles.selectedGenderButton]}
//               onPress={() => handleGenderSelection('Others')}
//             >
//               <Text style={styles.genderButtonText}>Others</Text>
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity style={styles.saveButton} onPress={saveDetails}>
//             <Text style={styles.saveButtonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     paddingVertical: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 20,
//   },
//   section: {
//     width: '90%',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 3,
//   },
//   sectionHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   labelContainer: {
//     width: '95%',
//   },
//   NamesContainer: {
//     width: '55%',
//   },
//   label: {
//     fontSize: 12,
//     marginBottom: 5,
//   },
//   input: {
//     width: '90%',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//     elevation: 2,
//   },
//   Nameinput: {
//     width: '85%',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//     elevation: 2,
//   },
//   contactCode: {
//     width: '20%',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//     elevation: 5,
//   },
//   contactNumber: {
//     width: '75%',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//     elevation: 5,
//   },
//   imageUpload: {
//     backgroundColor: '#e6f7ff',
//     padding: 20,
//     borderRadius: 10,
//     marginVertical: 20,
//     alignItems: 'center',
//     borderStyle: 'dashed',
//     borderWidth: 1,
//     borderColor: '#7abaff',
//   },
//   imageUploadText: {
//     fontSize: 12,
//     color: '#666',
//   },
//   changePictureButton: {
//     backgroundColor: '#e6f7ff',
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//     alignItems: 'center',
//     borderStyle: 'dashed',
//     borderWidth: 1,
//     borderColor: '#7abaff',
//   },
//   changePictureButtonText: {
//     fontSize: 14,
//     color: '#007bff',
//   },
//   genderLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   genderOptions: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   genderButton: {
//     backgroundColor: 'silver',
//     padding: 10,
//     borderRadius: 20,
//     alignItems: 'center',
//   },
//   selectedGenderButton: {
//     backgroundColor: '#007bff',
//   },
//   genderButtonText: {
//     fontSize: 14,
//     color: '#fff',
//   },
//   saveButton: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 20,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     fontSize: 16,
//     color: '#fff',
//   },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//     marginTop: 20,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
// });

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import HeaderWithLogo from '../../Component/HeaderWithLogo';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from "../../Reduxtoolkit/profileSlice";
import DocumentPicker from 'react-native-document-picker';

export default function PersonalDetails({ navigation }) {
  const profile = useSelector(selectProfile);
  const [firstName, setFirstName] = useState(profile?.profile?.user?.name);
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(profile?.profile?.user?.email);
  const [contactNumber, setContactNumber] = useState(profile?.profile?.user?.mobileNumber);
  const [currentCity, setCurrentCity] = useState(profile?.profile?.user?.currentLocation);
  const [dob, setDob] = useState(profile?.profile?.user?.DOB);
  const [gender, setGender] = useState(profile?.profile?.user?.gender);
  const [image, setImage] = useState(profile?.profile?.user?.profileImage);
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();
  console.log("personal", profile?.profile?.user?._id);
  const id = profile?.profile?.user?._id;
  console.log("profile", profile?.profile?.user)

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (result && result[0] && result[0].uri) {
        setImage(result[0].uri);
        //setProfileImage(result)
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the document picker');
      } else {
        console.error('DocumentPicker Error:', err);
      }
    }
  };

  const saveDetails = async () => {
    console.log({
      firstName,
      lastName,
      email,
      contactNumber,
      currentCity,
      dob,
      gender,
      image,
      id
    });

    console.log(image);
    try {
      const response = await fetch('https://hiringtechb-2.onrender.com/personal-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          name: firstName,
          email: email,
          mobileNumber: contactNumber,
          DOB: dob,
          gender: gender,
          currentLocation: currentCity,
          file: image, // Include the image URI in the request body
        }),
      });
      console.log('Hi');
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        navigation.navigate('Bottomtab');
        Alert.alert('Profile Successfully Updated', 'Welcome');
      } else {
        Alert.alert('Error', data.error);
        //console.error(data.error);

      }
    } catch (error) {
      console.error('Error during save:', error);
    }
  };

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
    console.log(selectedGender);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ backgroundColor: 'red', width: '88%' }}>
          <HeaderWithLogo image={true} text="My Resume" />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Personal Details</Text>
          <View style={styles.inputRow}>
            <View style={styles.NamesContainer}>
              <Text style={styles.label}>First name</Text>
              <TextInput
                style={styles.Nameinput}
                placeholder="First name"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.NamesContainer}>
              <Text style={styles.label}>Last name</Text>
              <TextInput
                style={styles.Nameinput}
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.imageUploadText}>
                Upload a professional picture of yourself (Max file size: 1MB and max resolution: 500px x 500px. File type - jpeg, jpg, png, gif)
              </Text>
            )}
          </TouchableOpacity>
          {image && (
            <TouchableOpacity style={styles.changePictureButton} onPress={pickImage}>
              <Text style={styles.changePictureButtonText}>Change picture</Text>
            </TouchableOpacity>
          )}
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Contact number</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.contactCode}
                placeholder="+91"
                value="+91"
                editable={false}
              />
              <TextInput
                style={styles.contactNumber}
                placeholder="Enter your M. Number"
                keyboardType="numeric"
                value={contactNumber}
                onChangeText={setContactNumber}
              />
            </View>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Current city</Text>
            <TextInput
              style={styles.input}
              placeholder="Current city"
              value={currentCity}
              onChangeText={setCurrentCity}
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={dob}
              onChangeText={setDob}
            />
          </View>
          <Text style={styles.genderLabel}>Gender</Text>
          <View style={styles.genderOptions}>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'Female' && styles.selectedGenderButton]}
              onPress={() => handleGenderSelection('Female')}
            >
              <Text style={styles.genderButtonText}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'Male' && styles.selectedGenderButton]}
              onPress={() => handleGenderSelection('Male')}
            >
              <Text style={styles.genderButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'Others' && styles.selectedGenderButton]}
              onPress={() => handleGenderSelection('Others')}
            >
              <Text style={styles.genderButtonText}>Others</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={saveDetails}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  section: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelContainer: {
    width: '95%',
  },
  NamesContainer: {
    width: '55%',
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
  },
  Nameinput: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
  },
  contactCode: {
    width: '20%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  contactNumber: {
    width: '75%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  imageUpload: {
    backgroundColor: '#e6f7ff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#7abaff',
  },
  imageUploadText: {
    fontSize: 12,
    color: '#666',
  },
  changePictureButton: {
    backgroundColor: '#e6f7ff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#7abaff',
  },
  changePictureButtonText: {
    fontSize: 14,
    color: '#007bff',
  },
  genderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  genderButton: {
    backgroundColor: 'silver',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  selectedGenderButton: {
    backgroundColor: '#007bff',
  },
  genderButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

