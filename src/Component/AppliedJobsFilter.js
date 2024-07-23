import React, { forwardRef, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

const AppliedJobsFilter = forwardRef((props, ref) => {
  const [checked, setChecked] = React.useState({
    applied: false,
    shortlisted: false,
    closed: false,
    rejected: false,
  });

  const toggleCheckbox = (name) => {
    setChecked((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <RBSheet
      ref={ref}
      height={350}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <View style={styles.sheetContent}>
        <Text style={styles.title}>Apply Filters</Text>
        <Text style={styles.subtitle}>Select Status</Text>
        <View style={styles.checkboxContainer}>
          {Object.keys(checked).map((key) => (
            <View key={key} style={styles.checkboxRow}>
              <Checkbox
                status={checked[key] ? 'checked' : 'unchecked'}
                onPress={() => toggleCheckbox(key)}
              />
              <Text style={styles.checkboxLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.clearButton} onPress={() => setChecked({
            applied: false,
            shortlisted: false,
            open: false,
            downloaded: false,
            closed: false,
            rejected: false,
          })}>
            <Text style={styles.clearButtonText}>Clear filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f0a500',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sheetContent: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  checkboxContainer: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clearButton: {
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  clearButtonText: {
    color: '#000',
  },
  applyButton: {
    backgroundColor: '#FFA500',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  applyButtonText: {
    color: '#fff',
  },
});

export default AppliedJobsFilter;
