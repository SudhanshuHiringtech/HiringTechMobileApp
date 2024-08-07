import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const HrRegistration = () => {
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [designation, setDesignation] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const userdesignation = "recuriter";

  const  handleRegister = async () => {
    console.log(name);
    console.log(email);
    console.log(companyName);
    console.log(designation);
    console.log(mobileNumber);
    console.log(password);
    console.log(confirmPassword);

    if(password !== confirmPassword){
       Alert.alert('Incorrect', `Your password not match`);
    }
   //  if(password.length <= 6){
   //     Alert.alert('Invaild Password', `Your password incorrect formate`);
   //  }

    try {
       const response = await fetch('https://hiringtechb-1.onrender.com/register-recruiter', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           name:name,
           email: email,
           password: password,
           mobileNumber:mobileNumber,
           userdesignation: userdesignation,
           designation : designation,
           companyName : companyName,
         }),
       });
       console.log('Hi');
       const data = await response.json();
       console.log(data);
       if (response.ok) {
        // dispatch(setProfile(data));
   //     await AsyncStorage.setItem("token", data.token);
   //     await AsyncStorage.setItem('isLoggedIn',  JSON.stringify(true));
   //    await AsyncStorage.setItem('Profile', JSON.stringify(data));
        navigation.navigate('Otp', {email : email});
         Alert.alert('Successfully Register', `Welcome`);
       } else {
         console.error('registeration failed:', data.error);
       }
     } catch (error) {
       console.error('Error during login:', error);
     }
}



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerViewStyle}>
          <Text style={styles.headerFirstText}>Welcome Back To</Text>
          <Text style={styles.headerSecondText}>Hiring Tech</Text>
        </View>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>SIGN IN</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup", { item: 2 })}>
            <Text style={styles.createAccountText}>Create an account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Your Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.textInput}
          />
        </View>

        <View style={styles.doubleInputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Company Name</Text>
            <TextInput
              placeholder="Your company name"
              value={companyName}
              onChangeText={(text) => setCompanyName(text)}
              style={styles.textInput}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Designation</Text>
            <TextInput
              placeholder="Your Designation"
              value={designation}
              onChangeText={(text) => setDesignation(text)}
              style={styles.textInput}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Mobile Number</Text>
            {/* <View style={styles.whatsappContainer}>
              <Image
                source={require("../Assets/box.png")}
                style={styles.icon}
              />
              <Text style={styles.whatsappText}>Whatsapp</Text>
            </View> */}
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="Enter your Mobile Number"
              value={mobileNumber}
              onChangeText={(text) => setMobileNumber(text)}
              style={styles.textInput}
            />
            <Image
              source={require("../Assets/eyeoff.png")}
              style={styles.icon}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            {/* <View style={styles.whatsappContainer}>
              <Image
                source={require("../Assets/box.png")}
                style={styles.icon}
              />
              <Text style={styles.whatsappText}>Don’t have work email</Text>
            </View> */}
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="Enter your email Id"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.textInput}
            />
            <Image
              source={require("../Assets/eyeoff.png")}
              style={styles.icon}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Password</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="Enter your password must  be 6 digit or more"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.textInput}
            />
            <Image
              source={require("../Assets/eyeoff.png")}
              style={styles.icon}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              style={styles.textInput}
            />
            <Image
              source={require("../Assets/eyeoff.png")}
              style={styles.icon}
            />
          </View>
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By Signing up you are agreeing to Hiring Tech's
          </Text>
          <Text style={styles.termsText}>Terms and Conditions</Text>
        </View>
         <View style={{width:'100%', alignItems:'center'}}>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleRegister}
        >
          <Text style={styles.createAccountText}>Sign Up</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup", { item: 2 })}>
            <Text style={styles.loginLinkText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  headerViewStyle: {
    marginTop: 60,
    alignItems: 'center',
  },
  headerFirstText: {
    fontSize: 24,
    fontWeight: '400',
    color: 'orange',
  },
  headerSecondText: {
    fontSize: 36,
    fontWeight: '600',
    color: 'orange',
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  createAccountText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  doubleInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  textInput: {
    height: 50,
    width:'100%',
    borderWidth: 1,
    borderColor: '#9E9E9E',
    borderRadius: 15,
    paddingLeft: 10,
  },
  textInputWrapper: {
    height: 50,
    width:'90%',
    borderRadius: 15,
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#060606',
  },
  whatsappContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatsappText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#444444',
    marginLeft: 10,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  termsContainer: {
    marginHorizontal: 20,
    marginTop: 40,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9E9E9E',
    textAlign: 'center',
  },
  createAccountButton: {
    height: 50,
    width:'60%',
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 20,
  },
  loginContainer: {
    marginBottom: 20,
    marginLeft :90,
    flexDirection: 'row',
    marginTop: 12,
  },
  loginText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
  },
  loginLinkText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'orange',
    marginLeft: 10,
  },
});

export default HrRegistration;
