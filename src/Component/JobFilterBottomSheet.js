import React, { forwardRef } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView, Keyboard } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Slider from '@react-native-community/slider';

const JobFilterBottomSheet = forwardRef(({ filterData, setFilterData, onApply, onClear, call }, ref) => {
  const addSkill = (skill) => {
    if (skill) {
      setFilterData(prevData => ({
        ...prevData,
        skillsList: [...prevData.skillsList, skill],
        skills: '',  // Clear the input field after adding the skill
      }));
    }
  };

  const handleApply = () => {
    onApply(filterData);
    ref.current.close();
  };

  const levels = ['Beginner', 'Intermediate', 'Expert'];
  const experience = ['0-1 years', '1-2 years', '3-4 years', '5+ years'];

  return (
    <RBSheet
      ref={ref}
      height={700}
      openDuration={250}
      customStyles={{
        container: {
          borderRadius: 10,
        }
      }}
    >
      <ScrollView contentContainerStyle={styles.sheetContent}>
        <Text style={styles.title}>Apply Filters</Text>

        <Text style={styles.subtitle}>Internship Mode</Text>
        <View style={styles.buttonGroup}>
          {['Remote', 'On-site', 'Hybrid'].map(mode => (
            <TouchableOpacity
              key={mode}
              style={[styles.modeDesign, { backgroundColor: filterData.jobMode === mode ? 'skyblue' : 'white' }]}
              onPress={() => setFilterData(prevData => ({ ...prevData, jobMode: mode }))}
            >
              <Text style={{ color: filterData.jobMode === mode ? 'white' : 'black' }}>{mode}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subtitle}>Starlight Internships</Text>
        <TouchableOpacity style={styles.button}>
          <Text>Starlight Internships</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Work Experience</Text>
        <View style={styles.buttonGroup}>
          {(call === 'Internship' ? levels : experience).map(level => (
            <TouchableOpacity
              key={level}
              style={[styles.modeDesign, { backgroundColor: filterData.experience === level ? 'skyblue' : 'white' }]}
              onPress={() => setFilterData(prevData => ({ ...prevData, experience: level }))}
            >
              <Text style={{ color: filterData.experience === level ? 'white' : 'black' }}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {call !== 'jobs' && (
          <>
            <Text style={styles.subtitle}>Job offer attached</Text>
            <Switch
              value={filterData.isJobOfferAttached}
              onValueChange={(value) => setFilterData(prevData => ({ ...prevData, isJobOfferAttached: value }))}
            />
          </>
        )}

        {call === 'Internship' ? (
          <>
            <Text style={styles.subtitle}>Min. Stipend</Text>
            <View style={styles.sliderLabels}>
              <Text>0</Text>
              <Text>10K</Text>
              <Text>20K</Text>
              <Text>30K</Text>
              <Text>40K</Text>
              <Text>50K</Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>Min. Salary</Text>
            <View style={styles.sliderLabels}>
              <Text>3 LPA</Text>
              <Text>5 LPA</Text>
              <Text>9 LPA</Text>
              <Text>14 LPA</Text>
              <Text>18 LPA</Text>
              <Text>25 LPA</Text>
            </View>
          </>
        )}

        <Slider
          value={filterData.minStipend}
          onValueChange={(value) => setFilterData(prevData => ({ ...prevData, minStipend: Math.round(value) }))}
          maximumValue={50000}
          minimumValue={0}
          step={1000}
          thumbTintColor="#FFA500"
          minimumTrackTintColor="#FFA500"
        />
        <Text>{filterData.minStipend}K</Text>

        {call !== 'jobs' && (
          <>
            <Text style={styles.subtitle}>Max Duration (in Months)</Text>
            <View style={styles.sliderLabels}>
              <Text>1M</Text>
              <Text>2M</Text>
              <Text>3M</Text>
              <Text>6M</Text>
              <Text>12M</Text>
            </View>
            <Slider
              value={filterData.maxDuration}
              onValueChange={(value) => setFilterData(prevData => ({ ...prevData, maxDuration: Math.round(value) }))}
              maximumValue={12}
              minimumValue={1}
              step={1}
              thumbTintColor="#FFA500"
              minimumTrackTintColor="#FFA500"
            />
            <Text>{filterData.maxDuration}M</Text>
          </>
        )}

        <Text style={styles.subtitle}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={filterData.location}
          onChangeText={(text) => setFilterData(prevData => ({ ...prevData, location: text }))}
        />

        <Text style={styles.subtitle}>Job Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter job title"
          value={filterData.jobTitle}
          onChangeText={(text) => setFilterData(prevData => ({ ...prevData, jobTitle: text }))}
        />

        <Text style={styles.subtitle}>Company</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter company"
          value={filterData.company}
          onChangeText={(text) => setFilterData(prevData => ({ ...prevData, company: text }))}
        />

        <Text style={styles.subtitle}>Skills</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a skill"
          value={filterData.skills}
          onChangeText={(text) => setFilterData(prevData => ({ ...prevData, skills: text }))}
          onSubmitEditing={() => {
            addSkill(filterData.skills);
            Keyboard.dismiss(); // Hide the keyboard on submit
          }}
        />
        <TouchableOpacity style={styles.button} onPress={() => {
          addSkill(filterData.skills);
          Keyboard.dismiss(); // Hide the keyboard on press
        }}>
          <Text>Add Skill</Text>
        </TouchableOpacity>
        <FlatList
          data={filterData.skillsList}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.skillChipContainer}>
              <View style={styles.skillChip}>
                <Text>{item}</Text>
              </View>
            </View>
          )}
        />

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.clearButton} onPress={onClear}>
            <Text>Clear filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  sheetContent: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modeDesign: {
    width: '30%',
    marginTop: 2,
    borderWidth: 1,
    borderColor: 'skyblue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  skillChipContainer: {
    flexDirection: 'row', // Arrange chips in a row
    flexWrap: 'wrap',     // Allow wrapping to the next line
  },
  skillChip: {
    margin: 5,
    borderWidth: 1,
    borderColor: 'skyblue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  applyButton: {
    backgroundColor: '#FFA500',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default JobFilterBottomSheet;
