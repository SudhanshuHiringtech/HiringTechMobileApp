// import React, { useState, useContext } from 'react';
// import { Button, View, ActivityIndicator } from 'react-native';
// import { WebView,  WebViewNavigation } from 'react-native-webview';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { AuthContext } from '../../AuthContext';

// const GoogleAuth = ({ navigation, authType }) => {
//     const { setUser } = useContext(AuthContext);
//     const [showWebView, setShowWebView] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const handleGoogleAuth = () => {
//         setShowWebView(true);
//     };

//     const onNavigationStateChange = async (navigationState: WebViewNavigation) => {
//       //  console.log("Navigated URL:", navState.url);
//         const url = navigationState.url;
//         const params = parseURLParams(url);
//         try {
//             if (params.token.includes('auth/google/callback')) {
//                 const urlParams = new URLSearchParams(navState.url.split('?')[1]);
//                 const authCode = urlParams.get('code');
//                 setLoading(true);
    
//                 const endpoint = 'http://192.168.29.188:5000/auth/google/callback';
//                 const response = await axios.post(endpoint, { code: authCode });
    
//                 if (response.data.token) {
//                     await AsyncStorage.setItem('token', response.data.token);
//                     setUser(response.data.user);
//                     setLoading(false);
//                     setShowWebView(false);
//                     navigation.navigate('Bottomtap');
//                 }
//             } else if (navState.url.includes('/success')) {
//                 console.log("Authentication successful");
//             } else if (navState.url.includes('/failure')) {
//                 console.log("Authentication failed");
//             } else {
//                 console.log("Untrusted or unhandled URL:", navState.url);
//             }
//         } catch (error) {
//             console.error('Error during navigation state change:', error);
//         }
//     };
    

//     return (
//         <View style={{ flex: 1 }}>
//             {loading && <ActivityIndicator size="large" color="#0000ff" />}
//             {showWebView ? (
//                 <WebView
//                 source={{ uri: 'http://192.168.29.188:5000/auth/google' }}
//                 onNavigationStateChange={onNavigationStateChange}
//                 onError={(error) => console.error('WebView Error:', error)}
//                 onHttpError={(syntheticEvent) => {
//                     const { nativeEvent } = syntheticEvent;
//                     console.warn('WebView received error status code:', nativeEvent.statusCode);
//                 }}
//                 javaScriptEnabled={true}
//                 domStorageEnabled={true}
//                 startInLoadingState={true}
//                 thirdPartyCookiesEnabled={true}
//                 cacheEnabled={false}
//                 incognito={true}
//                 style={{ flex: 1 }}
//             />
            
//             ) : (
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                     <Button
//                         title={authType === 'login' ? 'Login with Google' : 'Sign Up with Google'}
//                         onPress={handleGoogleAuth}
//                     />
//                 </View>
//             )}
//         </View>
//     );
// };

// export default GoogleAuth;
