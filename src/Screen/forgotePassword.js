import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';

const ForgotPassword = ({ navigation }) => {  // Accept navigation prop
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const handleSendOtp = async () => {
        if (!email) {  // Check if email is empty
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }

        try {
            const response = await fetch('https://hiringtechb-1.onrender.com/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            console.log(data);
            if (data) {
                Alert.alert('Success', 'OTP sent to your email.');
                setOtpSent(true);
                
                
            } else {
                Alert.alert('Failed', 'Could not send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to send OTP.');
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {  // Check if email is empty
            Alert.alert('Error', 'Please enter valid OTP .');
            return;
        }

        try {
            const response = await fetch('https://hiringtechb-1.onrender.com/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();
            if (data) {
                Alert.alert('Success', 'OTP verified');
                navigation.navigate('ResetPassword'); // Navigate to the ResetPassword screen
            } else {
                Alert.alert('Error', data.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Invalid OTP');
        }
    };
 
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>

            <Text style={styles.label}>Email Address</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            {otpSent ? (
                <>
                    <Text style={styles.label}>Enter OTP</Text>
                    <OTPTextInput 
                        handleTextChange={setOtp} 
                        inputCount={6} 
                        containerStyle={styles.otpContainer} 
                        textInputStyle={styles.otpInput}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                        <Text style={styles.buttonText}>Verify OTP</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
                    <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        color: '#333',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    otpContainer: {
        marginBottom: 20,
    },
    otpInput: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: 'orange',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ForgotPassword;
