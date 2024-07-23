// App.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button, Alert,TouchableOpacity,Image } from 'react-native';

const ForgotPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    // Perform password change logic here
    Alert.alert('Success', 'Password changed successfully');
  };

  return (
    <SafeAreaView style={styles.container}>
           <View style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginTop:20
            }}>
            <View style={{
                flexDirection:'row',
                alignItems:'center'
            }}>
                <Image
                source={require("../../Assets/arrow-left.png")}
                />
                  <Text style={{
                fontSize:25,
                fontWeight:'500',
                color:'#000000',
                marginLeft:12
            }}>
            Change password
            </Text>
            </View>
            
          
          
           <View style={{
            flexDirection:'row',
            alignItems:'center',
            
           }}>
       
                <Image 
                source={require("../../Assets/notification.png")}
                style={{
                    width:25,
                    height:25,
                    resizeMode:'contain'
                }}
                />
                <Image 
                source={require("../../Assets/tv.png")}
                style={{
                    width:30,
                    height:30,
                    resizeMode:'contain',
                    marginLeft:8
                }}
                />
            
            
           </View>
            </View>

            <View style={{
                marginTop:'30%'
            }}>

     
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
             </View>
        <TouchableOpacity
      style={{
        backgroundColor:'#000959',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:47,
        marginTop:32,
        borderRadius:15
      }}
      
      >
        <Text style={{
            fontSize:18,
            fontWeight:'700',
            color:'#FFFFFF'
        }}>
            Update
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#EDEDED',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export default ForgotPassword;
