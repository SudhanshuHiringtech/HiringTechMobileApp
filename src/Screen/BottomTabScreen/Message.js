// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
// import { useSelector } from 'react-redux';
// import HeaderWithLogo from '../../Component/HeaderWithLogo';
// import { selectProfile } from "../../Reduxtoolkit/profileSlice";

// const truncateMessage = (message, wordLimit) => {
//   const words = message.split(' ');
//   if (words.length <= wordLimit) return message;
//   return words.slice(0, wordLimit).join(' ') + '...';
// };

// const Messages = ({ navigation }) => {
//   const [messages, setMessages] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [allButtonColor, setAllButtonColor] = useState('#D79442');
//   const [unreadButtonColor, setUnreadButtonColor] = useState('#fff');
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const profile = useSelector(selectProfile);
//   const userId = profile?.profile?.user?._id;

//   const fetchMessages = async (url) => {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setMessages(data);
//     } catch (error) {
//       setError(error.message);
//       console.error('Error fetching messages:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       const url = filter === 'all'
//         ? `http://192.168.29.188:5000/unique-messagers/${userId}`
//         : `http://192.168.29.188:5000/unread-messages/${userId}`;

//       fetchMessages(url);
//     }
//   }, [userId, filter]);

//   useEffect(() => {
//     if (messages.length > 0) {
//       setUnreadCount(messages.filter((msg) => msg.latestMessage.unread).length);
//     }
//   }, [messages]);

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//     if (newFilter === 'all') {
//       setAllButtonColor('#D79442');
//       setUnreadButtonColor('#fff');
//     } else {
//       setAllButtonColor('#fff');
//       setUnreadButtonColor('#D79442');
//     }
//   };

//   const renderItem = ({ item }) => {
//     const isUnread = item.latestMessage.unread;
//     return (
//       <TouchableOpacity
//         style={[styles.messageContainer, isUnread && styles.unreadMessageContainer]}
//         onPress={() => navigation.navigate('ChatScreen', { userId: item.user._id })}
//       >
//         <View style={styles.senderInfo}>
//           <Image source={require("../../Assets/dashboard/Mask.png")} style={styles.senderImage} />
//           <Text style={styles.senderName}>{item.user.name}</Text>
//         </View>
//         <Text style={[styles.message, isUnread && styles.unreadMessage]}>{truncateMessage(item.latestMessage.message, 3)}</Text>
//         <Text style={styles.timestamp}>{new Date(item.latestMessage.timestamp).toLocaleString()}</Text>
//       </TouchableOpacity>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#D79442" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={{ height: '8%' }}>
//         <HeaderWithLogo
//           imageSource={require("../../Assets/dashboard/Logo.png")}
//           image={false}
//         />
//       </View>
//       <Text style={styles.header}>Messages</Text>
//       <View style={styles.filterContainer}>
//         <TouchableOpacity style={[styles.filterButton, { backgroundColor: allButtonColor }]} onPress={() => handleFilterChange('all')}>
//           <Text style={styles.filterButtonText}>All</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.filterButton, { backgroundColor: unreadButtonColor }]} onPress={() => handleFilterChange('unread')}>
//           <Text style={styles.filterButtonText}>Unread({unreadCount})</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.latestMessage._id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   filterButtonText: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   filterButton: {
//     padding: 10,
//     width: 100,
//     borderRadius: 15,
//     marginBottom: 30,
//   },
//   messageContainer: {
//     backgroundColor: '#fff',
//     padding: 16,
//     marginBottom: 10,
//     borderWidth: 0.5,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.5,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   unreadMessageContainer: {
//     backgroundColor: '#f9f9f9', // Change background color for unread messages
//   },
//   senderInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   senderImage: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     marginRight: 8,
//   },
//   senderName: {
//     fontWeight: 'bold',
//   },
//   message: {
//     marginVertical: 5,
//   },
//   unreadMessage: {
//     fontWeight: 'bold', // Make unread message text bold
//   },
//   timestamp: {
//     color: '#888',
//     fontSize: 12,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
// });

// export default Messages;


import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderWithLogo from '../../Component/HeaderWithLogo';
import { selectProfile } from "../../Reduxtoolkit/profileSlice";

const truncateMessage = (message, wordLimit) => {
  const words = message.split(' ');
  if (words.length <= wordLimit) return message;
  return words.slice(0, wordLimit).join(' ') + '...';
};

const Messages = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [allButtonColor, setAllButtonColor] = useState('#D79442');
  const [unreadButtonColor, setUnreadButtonColor] = useState('#fff');
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // New state for refreshing
  const [error, setError] = useState(null);
  const profile = useSelector(selectProfile);
  const userId = profile?.profile?.user?._id;

  const fetchMessages = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing when done
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    const url = filter === 'all'
      ? `http://192.168.29.188:5000/unique-messagers/${userId}`
      : `http://192.168.29.188:5000/unread-messages/${userId}`;

    fetchMessages(url);
  }, [filter, userId]);

  useEffect(() => {
    if (userId) {
      const url = filter === 'all'
        ? `http://192.168.29.188:5000/unique-messagers/${userId}`
        : `http://192.168.29.188:5000/unread-messages/${userId}`;

      fetchMessages(url);
    }
  }, [userId, filter]);

  useEffect(() => {
    if (messages.length > 0) {
      setUnreadCount(messages.filter((msg) => msg.latestMessage.unread).length);
    }
  }, [messages]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (newFilter === 'all') {
      setAllButtonColor('#D79442');
      setUnreadButtonColor('#fff');
    } else {
      setAllButtonColor('#fff');
      setUnreadButtonColor('#D79442');
    }
  };

  const renderItem = ({ item }) => {
    const isUnread = item.latestMessage.unread;
    return (
      <TouchableOpacity
        style={[styles.messageContainer, isUnread && styles.unreadMessageContainer]}
        onPress={() => navigation.navigate('ChatScreen', { userId: item.user._id })}
      >
        <View style={styles.senderInfo}>
          <View>
          <Image source={require("../../Assets/dashboard/Mask.png")} style={styles.senderImage} />
         </View>
         <View>
          <Text style={styles.senderName}>{item.user.name}</Text>
        </View>
        </View>
        <View>
        <Text style={[styles.message, isUnread && styles.unreadMessage]}>{truncateMessage(item.latestMessage.message, 9)}</Text>
        </View>
       <View style={{alignItems:'flex-end',}}>
        <Text style={styles.timestamp}>{new Date(item.latestMessage.timestamp).toLocaleString()}</Text>
       </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#D79442" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ height: '8%' }}>
        <HeaderWithLogo
          imageSource={require("../../Assets/dashboard/Logo.png")}
          image={false}
        />
      </View>
      <Text style={styles.header}>Messages</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: allButtonColor }]} onPress={() => handleFilterChange('all')}>
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: unreadButtonColor }]} onPress={() => handleFilterChange('unread')}>
          <Text style={styles.filterButtonText}>Unread({unreadCount})</Text>
        </TouchableOpacity>
      </View>
      {messages.length === 0 ? (
        <View style={styles.noMessagesContainer}>
          <Text style={styles.noMessagesText}>No messages</Text>
        </View>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.latestMessage._id}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterButton: {
    padding: 10,
    width: 100,
    borderRadius: 15,
    marginBottom: 30,
  },
  messageContainer: {
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
    borderWidth: 0.8,
    borderRadius: 25,
    height:120,
    borderColor:'grey',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  unreadMessageContainer: {
    backgroundColor: '#f9f9f9', // Change background color for unread messages
  },
  senderInfo: {
    flexDirection: 'row',
    //alignItems: 'center',
  },
  senderImage: {
    width: 40,
    height: 40,
    borderRadius: 16,
    marginRight: 8,
  },
  senderName: {
    fontWeight: 'bold',
    marginLeft:10,
    color:'black',
    fontSize: 20
  },
  message: {
    color:'black',
    fontSize:14,
    marginVertical: 5, 
    marginLeft: 70
  },
  unreadMessage: {
    fontWeight: 'bold',
    color:'black',
    marginVertical: 5, 
    marginLeft: 70
     // Make unread message text bold
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
    marginBottom:10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noMessagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMessagesText: {
    fontSize: 16,
    color: '#888',
  },
});

export default Messages;
