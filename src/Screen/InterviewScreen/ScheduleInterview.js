import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Modal } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
// import { useGoogleCalendar } from './useGoogleCalendar'; // Custom hook to integrate with Google Calendar API

const ScheduleInterview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [showGuestsModal, setShowGuestsModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [guests, setGuests] = useState([]);
  const [location, setLocation] = useState(null);
  const [notificationTime, setNotificationTime] = useState(10);

  // const { createGoogleMeetLink } = useGoogleCalendar();

  const handleDatePress = (date) => {
    setSelectedDate(date);
    setShowCalendarDropdown(false);
  };

  const handleTimeSlotPress = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setShowCalendarDropdown(false);
  };

  const handleReset = () => {
    setSelectedDate(new Date());
    setSelectedTimeSlot(null);
  };

  const handleAddGuest = (guest) => {
    setGuests((prevGuests) => [...prevGuests, guest]);
  };

  const handleRemoveGuest = (guest) => {
    setGuests((prevGuests) => prevGuests.filter((g) => g !== guest));
  };

  const handleLocationPress = () => {
    setShowMapModal(true);
  };

  const handleSave = () => {
    if (selectedDate && selectedTimeSlot) {
      const startTime = new Date(selectedDate);
      const [startHour, startMinute] = selectedTimeSlot.time.split(' - ')[0].split(':');
      startTime.setHours(startHour, startMinute);

      const endTime = new Date(startTime);
      const [endHour, endMinute] = selectedTimeSlot.time.split(' - ')[1].split(':');
      endTime.setHours(endHour, endMinute);

      // createGoogleMeetLink({
      //   summary: 'Interview',
      //   location: location ? `${location.latitude}, ${location.longitude}` : '',
      //   description: 'Interview scheduled via app',
      //   start: startTime.toISOString(),
      //   end: endTime.toISOString(),
      //   attendees: guests,
      // }).then((meetLink) => {
      //   // Handle meet link
      //   console.log('Google Meet link:', meetLink);
      // });
    }
  };

  const renderCalendarDropdown = () => {
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      calendarDays.push(
        <TouchableOpacity
          key={i}
          style={styles.calendarDay}
          onPress={() => handleDatePress(date)}
        >
          <Text style={styles.calendarDayText}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.calendarDropdown}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
          >
            <Icon name="chevron-left" style={styles.calendarButtonIcon} />
          </TouchableOpacity>
          <Text style={styles.calendarMonth}>
            {new Date(selectedDate).toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
          </Text>
          <TouchableOpacity
            onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
          >
            <Icon name="chevron-right" style={styles.calendarButtonIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.calendarWeek}>
          <Text style={styles.calendarWeekDay}>Sun</Text>
          <Text style={styles.calendarWeekDay}>Mon</Text>
          <Text style={styles.calendarWeekDay}>Tue</Text>
          <Text style={styles.calendarWeekDay}>Wed</Text>
          <Text style={styles.calendarWeekDay}>Thu</Text>
          <Text style={styles.calendarWeekDay}>Fri</Text>
          <Text style={styles.calendarWeekDay}>Sat</Text>
        </View>
        <View style={styles.calendarDays}>{calendarDays}</View>

        <View style={styles.calendarButtons}>
          <TouchableOpacity style={styles.calendarControlButton} onPress={() => setShowCalendarDropdown(false)}>
            <Text style={styles.calendarControlButtonText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calendarControlButton} onPress={handleReset}>
            <Text style={styles.calendarControlButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderGuestsModal = () => {
    const allGuests = [
      'Guest 1',
      'Guest 2',
      'Guest 3',
      'Guest 4',
      'Guest 5',
    ];

    return (
      <Modal visible={showGuestsModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Guests</Text>
            <FlatList
              data={allGuests}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.guestItem}
                  onPress={() => handleAddGuest(item)}
                >
                  <Text style={styles.guestItemText}>{item}</Text>
                  <Icon name="check" size={20} color="#175574" />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowGuestsModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderMapModal = () => {
    return (
      <Modal visible={showMapModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location ? location.latitude : 37.78825,
                longitude: location ? location.longitude : -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {location && <Marker coordinate={location} />}
            </MapView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowMapModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.connectCalendar}>Connect your calendar</Text>
      <Text style={styles.connectText}>Automatically prevent double-bookings and get new events added as they're scheduled</Text>
      <TouchableOpacity style={styles.calendarButton}>
        <Text style={styles.buttonText}>Connect your calendar</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.sectionTitle}>Event Title</Text>
        
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedDate}>
            {selectedDate.toLocaleDateString('default', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          {selectedTimeSlot && (
            <Text style={styles.selectedTimeSlot}>
              {selectedTimeSlot.time}
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setShowCalendarDropdown(!showCalendarDropdown)}
        >
          <Text style={styles.selectButtonText}>Find a time</Text>
        </TouchableOpacity>
        {showCalendarDropdown && renderCalendarDropdown()}
      </View>

      <View style={styles.formContainer}>
        {guests.map((guest, index) => (
          <View key={index} style={styles.formField}>
            <Text style={styles.guestName}>{guest}</Text>
            <TouchableOpacity onPress={() => handleRemoveGuest(guest)}>
              <Icon name="close-circle" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}
        
        <TouchableOpacity style={styles.meetButton} onPress={() => setShowGuestsModal(true)}>
          <Icon name="account-multiple-plus" size={20} color="#175574" />
          <Text style={styles.buttonText}>Add Guests</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.meetButton} onPress={handleLocationPress}>
          <Icon name="map-marker-plus" size={20} color="#175574" />
          <Text style={styles.buttonText}>Add Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.meetButton} onPress={handleSave}>
          <Icon name="video" size={20} color="#175574" />
          <Text style={styles.buttonText}>Join with Google Meet</Text>
        </TouchableOpacity>
        
        <TouchableOpacity >
        <Text style={styles.sectionTitle}>Add Description</Text>
        </TouchableOpacity>
        <TouchableOpacity >
        <Text style={styles.sectionTitle}>Notification 10 minutes before meet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.findTime} onPress={handleSave}>
          <Text style={styles.findTimeText}>Save</Text>
        </TouchableOpacity>
      </View>

      {renderGuestsModal()}
      {renderMapModal()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  connectCalendar: {
    color: '#175574',
    fontSize: 16,
    fontWeight: 'bold',
  },
  connectText: {
    color: '#175574',
    marginTop: 4,
  },
  calendarButton: {
    borderWidth: 1,
    borderColor: '#175574',
    padding: 6,
    width: 250,
    marginTop: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  selectedInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedDate: {
    fontSize: 18,
    color: '#175574',
    padding: 20,
  },
  selectedTimeSlot: {
    fontSize: 18,
    color: '#175574',
    padding: 20,
  },
  selectButton: {
    backgroundColor: '#D79442',
    padding: 10,
    width: 140,
    borderRadius: 25,
    marginLeft: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  calendarDropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    zIndex: 1000,
    width: 290,
    height: 290,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  calendarButtonIcon: {
    fontSize: 24,
    color: '#175574',
  },
  calendarMonth: {
    fontSize: 18,
    color: '#175574',
  },
  calendarWeek: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  calendarWeekDay: {
    width: 32,
    textAlign: 'center',
    fontSize: 12,
    color: '#175574',
  },
  calendarDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  calendarDayText: {
    color: '#175574',
  },
  timeSlotsDropdown: {
    marginTop: 20,
  },
  timeSlotsDropdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeSlotOption: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  availableTimeSlot: {
    backgroundColor: '#d0f0c0',
  },
  unavailableTimeSlot: {
    backgroundColor: '#f0d0d0',
  },
  timeSlotOptionText: {
    color: '#175574',
  },
  calendarButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  calendarControlButton: {
    backgroundColor: '#D79442',
    padding: 5,
    width:60,
    borderRadius: 5,
    alignItems: 'center',
  },
  calendarControlButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  formContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#175574',
    borderWidth: 1,
    borderColor: '#175574',
    padding: 15,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#175574',
  },
  meetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderWidth:1, borderColor: '#175574',
  },
  buttonText: {
    color: '#175574',
    marginLeft: 10,
    fontSize: 16,
  },
  formField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  notification: {
    fontSize: 16,
    color: '#175574',
  },
  timeText: {
    fontSize: 14,
    color: '#999',
  },
  findTime: {
    backgroundColor: '#D79442',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  findTimeText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#175574',
  },
  guestItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guestItemText: {
    color: '#175574',
  },
  closeButton: {
    backgroundColor: '#D79442',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  guestName: {
    fontSize: 16,
    color: '#175574',
    marginBottom: 5,
  },
  mapContainer: {
    width: '90%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default ScheduleInterview;