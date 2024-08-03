import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity , Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Welcome to LiveChat! How can I help you?',
    },
  ]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { sender: 'user', text: message }]);
      setMessage('');
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with us!</Text>
      <View style={styles.messages}>
        {messages.map((item, index) => (
          <View
            key={index}
            style={[
              styles.message,
              item.sender === 'bot' ? styles.botMessage : styles.userMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a message"
          value={message}
          onChangeText={setMessage}
        />
         <TouchableOpacity style={styles.attachmentButton}  onPress={handleFileSelection}>
         {selectedFile && <Text>Selected File: {selectedFile.name}</Text>}
          <Icon name="paperclip" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={sendMessage}>
          <Icon  name="send" size={30}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign:'center',
  },
  messages: {
    flex: 1,
    marginTop:20,
  },
  message: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    maxWidth: '80%',
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#25D366',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  attachmentButton: {
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    padding: 8,
    backgroundColor: '#0080ff',
    borderRadius: 16,
  },

});

export default ChatScreen;