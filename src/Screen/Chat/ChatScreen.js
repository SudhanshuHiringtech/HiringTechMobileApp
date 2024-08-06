// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity , Image} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// // import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// const ChatScreen = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([
//     {
//       sender: 'bot',
//       text: 'Welcome to LiveChat! How can I help you?',
//     },
//   ]);

//   const sendMessage = () => {
//     if (message.trim() !== '') {
//       setMessages([...messages, { sender: 'user', text: message }]);
//       setMessage('');
//     }
//   };

//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileSelection = async () => {
//     try {
//       const result = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });

//       setSelectedFile(result);
//     } catch (err) {
//       console.warn(err);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Chat with us!</Text>
//       <View style={styles.messages}>
//         {messages.map((item, index) => (
//           <View
//             key={index}
//             style={[
//               styles.message,
//               item.sender === 'bot' ? styles.botMessage : styles.userMessage,
//             ]}
//           >
//             <Text style={styles.messageText}>{item.text}</Text>
//           </View>
//         ))}
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Write a message"
//           value={message}
//           onChangeText={setMessage}
//         />
//          <TouchableOpacity style={styles.attachmentButton}  onPress={handleFileSelection}>
//          {selectedFile && <Text>Selected File: {selectedFile.name}</Text>}
//           <Icon name="paperclip" size={24} color="#333" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={sendMessage}>
//           <Icon name="send" size={30}/>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//     padding: 16,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign:'center',
//   },
//   messages: {
//     flex: 1,
//     marginTop:20,
//   },
//   message: {
//     padding: 12,
//     borderRadius: 16,
//     marginBottom: 8,
//     maxWidth: '80%',
//   },
//   botMessage: {
//     backgroundColor: '#f0f0f0',
//     alignSelf: 'flex-start',
//   },
//   userMessage: {
//     backgroundColor: '#0080ff',
//     alignSelf: 'flex-end',
//     color: '#fff',
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: '#fff',
//     borderRadius: 24,
//     marginBottom: 16,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     paddingHorizontal: 16,
//   },
//   attachmentButton: {
//     padding: 8,
//     marginRight: 8,
//   },
//   sendButton: {
//     padding: 8,
//     backgroundColor: '#0080ff',
//     borderRadius: 16,
//   },

// });

// export default ChatScreen;


// const receiverId = '6679360f2808d75e19ff6715'
//   const senderId = '669a448ec75a03fc981be651'



import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
import io from 'socket.io-client';
import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, selectProfile } from "../../Reduxtoolkit/profileSlice";


const socket = io('https://hiringtechb-1.onrender.com');

const ChatScreen = ({route}) => {

  const profile = useSelector(selectProfile);
  const receiverId = '6679360f2808d75e19ff6715';
  const senderId = profile?.profile?.user?._id;

  const inviteMessage = route?.params?.inviteMessage;
  const InviteAPI = route?.params?.InviteAPI;
  console.log("suna o APP", route?.params?.candidateData?.candidateId)
  const candidateDetails = route?.parmas?.candidateData?.candidateId;
  console.log("dsv", candidateDetails)

  const [message, setMessage] = useState(inviteMessage || '');
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const scrollViewRef = useRef();



  const createInvitedPerson = async () => {
    const data = {
      ownId: senderId,
      invitedPersonId: route?.params?.candidateData?.candidateId,
      invitedPersonName: route?.params?.candidateData?.candidateName,
      invitedPersonEmail: route?.params?.candidateData?.candidateEmail,
      invitedPersonProfileStatus: route?.params?.candidateData?.candidateProfileStatus,
    };
    console.log("dekho ", data)
  if(InviteAPI == true){
    try {
      const response = await fetch('http://192.168.29.188:5000/invited-people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  };
  

  useEffect(() => {
    if (!receiverId) {
      console.error('Receiver ID is not defined');
      return;
    }

    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`https://hiringtechb-1.onrender.com/chat/history/${senderId}/${receiverId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    fetchChatHistory();

    socket.emit('joinRoom', receiverId, { senderId, receiverId });

    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on('loadChatHistory', (chatHistory) => {
      setMessages(chatHistory);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('loadChatHistory');
    };
  }, [receiverId, senderId]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
      createInvitedPerson()

    if (!senderId || !receiverId) {
      console.error('Sender ID or Receiver ID is not defined');
      return;
    }

    if (message.trim() !== '') {
      const newMessage = { senderId: senderId, receiverId: receiverId, message, createdAt: new Date() };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit('sendMessage', newMessage);
      setMessage('');
      scrollViewRef.current?.scrollToEnd({ animated: true }); // Scroll to end after sending message
    } else {
      console.error('Message is empty');
    }
  };

  const handleFileSelection = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFile(result);
    } catch (err) {
      console.warn(err);
    }
  };

  const renderMessage = (item, index) => {
    const isSender = item.sender === senderId;
    const messageStyle = isSender ? styles.userMessage : styles.botMessage;
    const containerStyle = isSender ? styles.userMessageContainer : styles.botMessageContainer;

    return (
      <View key={index} style={containerStyle}>
        <View style={messageStyle}>
          <Text style={styles.messageText}>{item.message || 'Message content missing'}</Text>
          <Text style={styles.timestamp}>{moment(item.createdAt).format('h:mm A')}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Chat with us!</Text>
          <ScrollView
            style={styles.messages}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map(renderMessage)}
          </ScrollView>
          <View style={{alignItems:'center'}}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Write a message"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <TouchableOpacity style={styles.attachmentButton} onPress={handleFileSelection}>
              {selectedFile && <Text>Selected File: {selectedFile.name}</Text>}
              <Icon name="paperclip" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Icon name="send" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  messages: {

    marginBottom: 2,
    paddingLeft:16,
    paddingRight:16,
    //padding :16,
  },
  message: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    elevation:2,
    width: '55%',
    borderRadius: 10,
  },
  userMessage: {
    //backgroundColor: '#4CAF50',
    backgroundColor: '#f0f0f0',
    elevation:2,
    width: '55%',
    borderRadius: 10,
  },
  botMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
    marginLeft: 17,
    marginRight:17,
    marginTop: 10,
    color: 'grey',
  },
  timestamp: {
    fontSize: 10,
    color: '#ccc',
    textAlign: 'right',
    marginTop: 6,
    marginRight: 15,
    marginBottom: 5,
  },
  inputContainer: {
    height:90,
    width:'100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
   paddingHorizontal: 13,
   paddingVertical: 12,
   // backgroundColor: 'red',
    borderRadius: 24,
    borderColor: '#ddd',
     borderWidth: 1,
     shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 24,
    marginRight: 8,
    maxHeight: 120,
  },
  attachmentButton: {
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
