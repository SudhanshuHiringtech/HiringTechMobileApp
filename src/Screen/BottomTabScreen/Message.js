import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderWithLogo from '../../Component/HeaderWithLogo';
import { selectProfile } from "../../Reduxtoolkit/profileSlice";

const Messages = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [allButtonColor, setAllButtonColor] = useState('#D79442');
  const [unreadButtonColor, setUnreadButtonColor] = useState('#fff');
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const profile = useSelector(selectProfile);
  const ownId = profile?.profile?.user?._id;

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await fetch(`https://hiringtechb-1.onrender.com/Invited-people?ownId=${ownId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setMessages(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchInvitations();
  }, [ownId]);

  useEffect(() => {
    if (messages.length > 0) {
      setUnreadCount(messages.filter((msg) => msg.unread).length);
    }
  }, [messages]);

  const filteredMessages = filter === 'all' ? messages : messages.filter((message) => message.unread);

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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageContainer}
      onPress={() => navigation.navigate('ChatScreen')}
    >
      <View style={styles.senderInfo}>
        <Image source={require("../../Assets/dashboard/Mask.png")} style={styles.senderImage} />
        <Text style={styles.senderName}>{item.invitedPersonName}</Text>
      </View>
      <Text style={styles.timestamp}>{item.invitedPersonEmail}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
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
      <FlatList
        data={filteredMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
      />
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
    padding: 16,
    marginBottom: 10,
    borderWidth:0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  senderImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  senderName: {
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
  },
});

export default Messages;
