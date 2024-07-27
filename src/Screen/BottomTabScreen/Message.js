import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Inbox from '../Chat/Inbox';

const Messages = ({ navigation }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Sruti from Accenture in india',
      message: 'Hi J, We are currently looking for a skilled Full Stack... ',
      timestamp: '03/06/24',
    },
    {
      id: 1,
      sender: 'Sruti from Accenture in india',
      message: 'Hi J, We are currently looking for a skilled Full Stack... ',
      timestamp: '03/06/24',
    },
    {
      id: 1,
      sender: 'Sruti from Accenture in india',
      message: 'Hi J, We are currently looking for a skilled Full Stack... ',
      timestamp: '03/06/24',
    },
  ]);
 
  const [filter, setFilter] = useState('all');
  const [allButtonColor, setAllButtonColor] = useState('#fff');
  const [unreadButtonColor, setUnreadButtonColor] = useState('#fff');
  const [unread, unreadCount] = useState(0)
  // const [filter, setFilter] = useState('all');
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
     style={[styles.messageContainer]}onPress={() => navigation.navigate('Inbox')} >
      <View style={styles.senderInfo}>
        <Image source={require("../../Assets/dashboard/Mask.png")} style={styles.senderImage} />
        <Text style={styles.senderName}>{item.sender}</Text>
      </View>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButtonAll, { backgroundColor: allButtonColor }]} onPress={() => handleFilterChange('all')}>
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButtonunread, { backgroundColor: unreadButtonColor }, unreadCount >= 0 && styles.unread]} onPress={() => handleFilterChange('unread')}>
          <Text style={styles.filterButtonText}>Unread({unread})</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} 
      />
 </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterContainer:{
    flexDirection:'row',
    
  },
  filterButtonText:{
    fontSize: 13,
    fontWeight: 'bold',
    textAlign:'center',
  },
  filterButtonAll:{
    padding: 10,
    width:100,
    marginBottom:30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  filterButtonunread:{
    padding: 10,
    width:100,
    marginBottom:30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  unread: {
    width:70, 
  },
  messageContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
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
  message: {
    marginBottom: 8,
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
  },
});

export default Messages;