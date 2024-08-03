import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      date: 8,
      title: 'Interview Cracking Portfolio Free sessions',
      time: '3-6 PM',
    },
    {
      date: 12,
      title: 'Interview Cracking Portfolio Free sessions',
      time: '3-6 PM',
    },
    {
      date: 15,
      title: 'Interview Cracking Portfolio Free sessions',
      time: '3-6 PM',
    },
    {
      date: 16,
      title: 'Interview Cracking Portfolio Free sessions',
      time: '3-6 PM',
    },
  ]);

  const handleCreateEvent = (date) => {
    // Implement your logic to create a new event here
    // For example, you can prompt the user for event details
    // and then add the new event to the events array
    console.log('Create event for date:', date);
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>July</Text>
      {Array.from({ length: 17 }, (_, i) => i + 7).map((date) => (
        <View key={date} style={styles.dayContainer}>
          <Text style={styles.day}>Sun {date}</Text>
          {events.find((event) => event.date === date) ? (
            <TouchableOpacity style={styles.event}>
              <Text style={styles.eventTitle}>
                {events.find((event) => event.date === date).title}
              </Text>
              <Text style={styles.eventTime}>
                {events.find((event) => event.date === date).time}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.createEvent} onPress={() => handleCreateEvent(date)}>
              {/* <Text style={styles.createEventText}>Create an event</Text> */}
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dayContainer: {
    marginBottom: 10,
  },
  day: {
    fontSize: 18,
  },
  event: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 14,
  },
  createEvent: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  createEventText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Calendar;
