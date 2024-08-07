import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomToggle = ({ section, setSection, leftSideTitle, rightSideTitle }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, section === 'open' && styles.activeButton]}
        onPress={() => setSection('open')}
      >
        <Text style={[styles.text, section === 'open' && styles.activeText]}>{leftSideTitle}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonRight, section === 'closed' && styles.activeButton]}
        onPress={() => setSection('closed')}
      >
        <Text style={[styles.text, section === 'closed' && styles.activeText]}>{rightSideTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 25,
    width:'90%',
    borderWidth:1,
    borderColor:'skyblue',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    //borderRadius: 25,
    borderTopLeftRadius:25,
    borderBottomLeftRadius :25,
    alignItems: 'center',
  },
  buttonRight: {
    flex: 1,
    paddingVertical: 10,
    //borderRadius: 25,
    borderTopRightRadius:25,
    borderBottomRightRadius :25,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: 'skyblue',
  },
  text: {
    color: '#000',
  },
  activeText: {
    color: '#175574',
    fontWeight:'600'
  },
});

export default CustomToggle;
