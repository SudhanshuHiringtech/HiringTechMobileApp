import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Alert, Text, TouchableOpacity } from 'react-native';

const Otp = ({ navigation, route }) => {
  const { email} = route.params;
  const [otp, setOTP] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  console.log(email)

  const handleInput = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Automatically switch focus to the next input box
    if (value !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const combineOTP = () => otp.join('');

  const handleAPICall = async () => {
    const otpString = combineOTP();
    console.log(otpString)
    const otp = Number(otpString);

    try {
      const response = await fetch(
        'https://hiringtechb-2.onrender.com/verify-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
          }),
        }
      );
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTimeout(() => {
          navigation.navigate('Bottomtab');
        }, 100);
      } else {
        throw new Error('Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to verify OTP');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.TextTitle}>Enter Verfication Code</Text>
      </View>
      <View style={styles.inputContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={styles.inputBox}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={value => handleInput(index, value)}
            value={value}
            ref={ref => (inputRefs.current[index] = ref)}
          />
        ))}
      </View>

      <TouchableOpacity
                    style={styles.saveButton}
                   onPress={handleAPICall}
                >
                    <Text style={styles.saveButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton : { 
    height: '8%',
    width:'50%',
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  saveButtonText : {
    fontSize:25,
    color: '#fff',
    fontWeight:'400'
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 80,
    justifyContent: 'space-between',
    height: '60%',
  },
  TextTitle: {
    fontSize :30,
    color:'black',
    fontWeight:'700'
  },
  inputBox: {
    borderWidth: 5,
    borderColor: 'orange',
    width: 50,
    height: 60,
    borderRadius: 15,
    marginHorizontal: 5,
    textAlign: 'center',
  },
});

export default Otp;
// import React, {useState, useRef, useContext} from 'react';
// import {View, TextInput, StyleSheet, ScrollView, Alert} from 'react-native';


// const Otp = ({navigation}) => {
//   const [otp, setOTP] = useState(['', '', '', '', '', '']);
//   const inputRefs = useRef([]);
//   // const route = useRoute();
//   // const {email, game_Organizer} = route.params;

//   const handleInput = (index, value) => {
//     const newOTP = [...otp];
//     newOTP[index] = value;
//     setOTP(newOTP);

//     // Automatically switch focus to the next input box
//     if (value !== '' && index < otp.length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const combineOTP = () => {
//     return otp.join('');
//   };
//   // console.log(email);
//   // console.log(game_Organizer);

//   const handleAPICall = async () => {
//     const otpString = combineOTP();

//     try {
//       const response = await fetch(
//         'https://anti-cheat-be.onrender.com/api/user/verify-otp/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: email,
//             otp: otpString,
//           }),
//         },
//       );

//       if (response) {
//         const data = await response.json();
//         console.log(data);
//         setTimeout(() => {
//           navigation.navigate(
//             game_Organizer ? 'MainScreen' : 'ConnectingScreen',
//           );
//         }, 100);
//       } else {
//         throw new Error('Failed to verify OTP');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert('Error', 'Failed to verify OTP');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.inputContainer}>
//         {[0, 1, 2, 3, 4, 5].map(index => (
//           <TextInput
//             key={index}
//             style={styles.inputBox}
//             keyboardType="numeric"
//             maxLength={1}
//             onChangeText={value => handleInput(index, value)}
//             value={otp[index]}
//             ref={ref => (inputRefs.current[index] = ref)}
//           />
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     marginTop: 80,
//     justifyContent: 'space-between',
//     height: '60%',
//   },
//   inputBox: {
//     borderWidth: 5,
//     borderColor: 'orange',
//     width: 50,
//     height: 60,
//     borderRadius: 15,
//     marginHorizontal: 5,
//     textAlign: 'center',
//   },
// });

// export default Otp;
