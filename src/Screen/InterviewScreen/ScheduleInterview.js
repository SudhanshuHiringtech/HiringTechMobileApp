import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const formatDate = (date) => {
  if (!date) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const ScheduleInterview = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [guests, setGuests] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [notificationTime, setNotificationTime] = useState(10);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSave = () => {
    console.log('Event data:', {
      date: selectedDate,
      time: `${selectedTime.getHours()}:${selectedTime.getMinutes()}`,
      title: eventTitle,
      guests: guests,
      location: location,
      description: description,
      notificationTime: notificationTime,
    });
    navigation.navigate('AllInterview');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    setIsTimePickerVisible(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>HIRING TECH</Text>
          <View style={styles.headerIcons}>
            <Icon name="calendar" size={30} color="#999" />
            <Icon name="bell" size={30} color="#999" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Connect your calendar</Text>
        <Text style={styles.description}>
          Automatically prevent double-bookings and get new events added as they're scheduled.
        </Text>
        <TouchableOpacity style={styles.connectButton}>
          <Icon name="calendar" size={20} color="#999" />
          <Text style={styles.buttonText}>Connect your calendar</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Event Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Event Title"
            value={eventTitle}
            onChangeText={setEventTitle}
          />

          <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
            <Text style={styles.FindTime}>Find a Time</Text>
          </TouchableOpacity>

          {showCalendar && (
            <View style={styles.calendarContainer}>
              <CalendarPicker
                onDateChange={handleDateChange}
                startFromMonday={true}
                allowRangeSelection={true}
                weekdays={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
              />
              <Button title="Select Time" onPress={() => setIsTimePickerVisible(true)} />
              <Text style={styles.selectedTime}>
                Selected Time: {selectedTime.getHours().toString().padStart(2, '0')}:{selectedTime.getMinutes().toString().padStart(2, '0')}
              </Text>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={() => setIsTimePickerVisible(false)}
              />
              
            </View>
          )}

          <TextInput
            style={styles.input}
            placeholder="Add guests"
            value={guests}
            onChangeText={setGuests}
          />

          <TextInput
            style={styles.input}
            placeholder="Add location"
            value={location}
            onChangeText={setLocation}
          />

          <TouchableOpacity style={styles.meetButton}>
            <Icon name="video" size={20} color="black" />
            <Text style={styles.buttonText}>Join with Google Meet</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Add Description"
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.formField}>
            <Icon name="calendar" size={20} color="#999" />
            <View style={styles.notificationContainer}>
              <Text style={styles.Notification}>Notification</Text>
              <Text style={styles.timeText}>{notificationTime} minutes before meet</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.FindTime} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#175574',
    borderWidth: 0.5,
    borderColor: '#ABE0F8',
    padding: 20,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  FindTime: {
    width: 120,
    padding: 10,
    marginLeft: 20,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#D79442',
    borderRadius: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    marginBottom: 10,
    color: '#175574',
  },
  connectButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#D79442',
    padding: 10,
    width: 260,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: '#175574',
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  calendarContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  selectedTime: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  meetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  notificationContainer: {
    marginLeft: 3,
    fontWeight: 'bold',
    color: '#175574',
    borderWidth: 0.5,
    borderColor: '#ABE0F8',
    padding: 20,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  Notification: {
    color: 'black',
  },
  timeText: {
    fontSize: 16,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ScheduleInterview;
