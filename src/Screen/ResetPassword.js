import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ResetPasswordScreen = ({ navigation, route }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [ShowPassword, SetShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    // Function to handle the password reset process
    const handleResetPassword = async () => {
        // Check if the passwords match
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match. Please re-enter your password.');
            return;
        }

        // Validate the new password
        if (!validatePassword(newPassword)) {
            return;
        }

        try {
            const response = await fetch('https://hiringtechb-1.onrender.com/forget-password-verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: route.params.email,  // Email passed via route parameters
                    otp: route.params.otp,  // OTP passed via route parameters
                    password: newPassword,  // New password
                }),
            });

            const data = await response.json();

            // Check response and handle accordingly
            if (response.ok) {
                Alert.alert('Success', 'Password has been reset successfully.');
                navigation.navigate('Login');  // Navigate to the login screen
            } else {
                Alert.alert('Error', data.message || 'Failed to reset password.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while resetting the password.');
        }
    };

    // Function to validate the password based on specific criteria
    const validatePassword = (password) => {
        let errors = [];
        if (password.length < 8) {
            errors.push('* Password must be at least 8 characters long.');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('* Password must contain at least one uppercase letter (A-Z).');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('* Password must contain at least one lowercase letter (a-z).');
        }
        if (!/[0-9]/.test(password)) {
            errors.push('* Password must contain at least one number (0-9).');
        }
        if (!/[!@#\$%\^\&*\)\(+=._-]/.test(password)) {
            errors.push('* Password must contain at least one special character (e.g., !, @, #, $)');
        }
        if (errors.length > 0) {
            setPasswordError(errors.join('\n'));
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome To</Text>
            <Text style={styles.companyName}>Hiring Tech</Text>
            <Text style={styles.subtitle}>Reset Password</Text>

            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordContainer}>
                
                <TextInput
                    value={newPassword}
                    onChangeText={(text) => {
                        setNewPassword(text);
                        validatePassword(text);  // Validate password on change
                    }}
                    style={styles.input}
                    placeholder="New Password"
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Text> {showPassword?  <Icon name="eye" size={20} color="#175574" /> :   <Icon name="eye-off" size={20} color="#175574" />}</Text>
                    </TouchableOpacity>
            </View>
            {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

            <Text style={styles.label}>Retype New Password</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                    placeholder="Retype New Password"
                    secureTextEntry={!ShowPassword}
                />
                    <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => SetShowPassword(!ShowPassword)}
                >
               
                    <Text> {ShowPassword?  <Icon name="eye" size={20} color="#175574" /> :   <Icon name="eye-off" size={20} color="#175574" />}</Text>
                </TouchableOpacity>
            </View>
            {newPassword !== confirmPassword && confirmPassword !== '' && (
                <Text style={styles.errorText}>* Passwords do not match. Please re-enter your password.</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAF3F3',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
    },
    companyName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'blue',
        textAlign: 'center',
        marginBottom: 30,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 40,
        color: '#004d4d',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        flex: 1,
    },
    passwordContainer: {
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    eyeIcon: {
        marginLeft: 10,
    },
    errorText: {
        color: 'orange',
        fontSize: 12,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#ff9933',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ResetPasswordScreen;
