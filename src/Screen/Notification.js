import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useSocket from '../Component/NotificationsocketService';
import { useSelector } from 'react-redux';
import { selectProfile } from '../Reduxtoolkit/profileSlice';
import HeaderWithLogo from '../Component/HeaderWithLogo';

const Notifications = () => {
  const { notificationSocket } = useSocket();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications when the component mounts
    notificationSocket.emit('fetchNotifications');

    // Listen for notifications from the server
    notificationSocket.on('notifications', (data) => {
      // Store the notifications in correct order (latest first)
      setNotifications(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    });

    // Cleanup listener on component unmount
    return () => {
      notificationSocket.off('notifications');
    };
  }, [notificationSocket]);

  const profile = useSelector(selectProfile);
  const userId = profile?.profile?.user?._id; // Get user ID from Redux store

  const handleCreateJob = () => {
    // Assume `candidateIds` is an array of user IDs fetched based on the job requirements
    const candidateIds = [userId];

    // Emit the event to create the job and then send notifications
    notificationSocket.emit('sendNotification', {
      userIds: candidateIds,
      message: `A new job has been posted. Check it out!`,
    });
  };

  // Function to determine the date or time display for notifications
  const formatNotificationDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    return isToday ? date.toLocaleTimeString() : date.toLocaleDateString();
  };

  // Render item function for FlatList
  const renderNotificationItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timestamp}>{formatNotificationDate(item.createdAt)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ height: '10%', width: '95%' }}>
        <HeaderWithLogo
          imageSource={require("../Assets/dashboard/Logo.png")}
          image={false}
        />
      </View>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={renderNotificationItem}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateJob}>
        <Text style={styles.buttonText}>Create Job</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color:'black',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  message: {
    fontSize: 16,
    marginBottom: 8,
    color:'black'
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right', // Align the date/time to the right
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Notifications;
