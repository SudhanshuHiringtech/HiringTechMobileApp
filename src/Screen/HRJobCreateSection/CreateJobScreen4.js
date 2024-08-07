import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import HeaderWithLogo from '../../Component/HeaderWithLogo';



const CreateJobScreen4 = ({navigation, route}) => {
  const [skillsRequired, setskillsRequired] = useState([]);
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [jobDetails, setJobDetails] = useState({});
  const [customSkill, setCustomSkill] = useState('');
  const [skillsList, setSkillsList] = useState([
    'Figma', 'UX Design', 'HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js'
  ]);

  const toggleSkill = (skill) => {
    setskillsRequired((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((item) => item !== skill)
        : [...prevSkills, skill]
    );
  };
  const jobData = route.params.jobDetails;
  console.log("data laya hai🥳", jobData)

  const handleCustomSkillsSubmit = () => {
    if (customSkill) {
      setskillsRequired([...skillsRequired, customSkill]);
      setSkillsList([...skillsList, customSkill]);
      setCustomSkill('');
    }
    console.log(skillsRequired)
  };

  const handleSubmit = () => {
      console.log(skillsRequired)
      console.log(email)
      console.log(isChecked)
      setJobDetails({...jobData, skillsRequired, email, isChecked})
      
  }

  useEffect(() => {
    if (Object.keys(jobDetails).length > 0) {
      console.log("Updated jobDetails: ", jobDetails);
      navigation.navigate('CreateJobScreen5', { jobDetails });
    }
  }, [jobDetails]);

  return (
    <View style={{felx:1,  backgroundColor: "#ffffff" }}>
        <View style={{ height: '8%', marginTop: 5 , marginLeft:30}}>
        <HeaderWithLogo
          imageSource={require("../../Assets/dashboard/Logo.png")}
          image={false}
        />
      </View>
      <ScrollView>
      <View style={styles.header}>
      <Text style={{color:'orange', fontWeight:'500'}}>Create JOB Post</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Key Skills & Preferences</Text>
        <Text style={styles.subtitle}>
          Find the best candidates by telling us which skills are a must-have.
          Let us know how important they are so that we can reach the right job seekers.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Add skills"
          value={skillsRequired}
          // Add functionality for adding skills
        />

        <View style={styles.skillsContainer}>
          {skillsList.map((skill) => (
            <TouchableOpacity
              key={skill}
              style={[
                styles.skillItem,
                skillsRequired.includes(skill) && styles.selectedSkillItem
              ]}
              onPress={() => toggleSkill(skill)}
            >
              <Text style={[
                styles.skillText,
                skillsRequired.includes(skill) && styles.selectedSkillText
              ]}> + {skill}</Text>
            </TouchableOpacity>
          ))}
           <TextInput
                 style={{padding: 3,
                  borderWidth: 1,
                  borderColor: 'skyblue',
                  borderRadius: 20,
                  margin: 5,}}
                 placeholder="Enter your Skills"     
               value={customSkill}
               onChangeText={setCustomSkill}
               onBlur={handleCustomSkillsSubmit}
        />
        </View>

        <Text style={styles.sectionTitle}>Communication Preferences</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <View style={styles.checkboxItem}>
          <Checkbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(!isChecked)}
            color={'orange'}
          />
          <Text style={styles.checkboxLabel}>
            Plus, send an individual email update each time someone applies.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText2}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginLeft:17
  },
  headerTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color:'black',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: 'skyblue',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  skillItem: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'skyblue',
    alignItems: 'center',
    margin: 4,
  },
  selectedSkillItem: {
    backgroundColor: 'orange',
    borderColor:'orange'
  },
  skillText: {
    color: 'skyblue',
  },
  selectedSkillText: {
    color: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'orange',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  continueButton: {
    backgroundColor: 'orange',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButtonText: {
    color: 'black',
  },
});

export default CreateJobScreen4;
