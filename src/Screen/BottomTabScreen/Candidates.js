import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
// import ScheduleInterview from '../InterviewScreen/ScheduleInterview'

const candidates = [
{
    name: 'Jatin Kumar',
    title: 'UX/UI Intern',
    experience: '3 Months Exp',
    skills: '8 of 10 skills matching',
    downloade:'Download resume'
  },
  {
    name: 'Jatin Kumar',
    title: 'UX/UI Intern',
    experience: '3 Months Exp',
    skills: '8 of 10 skills matching',
    downloade:'Download resume'
  },{
    name: 'Jatin Kumar',
    title: 'UX/UI Intern',
    experience: '3 Months Exp',
    skills: '8 of 10 skills matching',
    downloade:'Download resume'
  },
];

const Candidate = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Applied');
  const tabs = ['Applied', 'Reviewed', 'Contacting', 'Shortlist'];
    const handleTabPress = (tab) => {
      setActiveTab(tab);
    };
// start here......................................card

const CandidateCard = ({ name, title, experience, skills, downloade, onPress }) => {

  async function requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  
  async function downloadPdf() {
    requestStoragePermission()

    try {
      const { config, fs } = RNFetchBlob;
      const downloads = fs.dirs.DownloadDir;
      const response = await fetch('https://example.com/document.pdf');
      const blob = await response.blob();
      const filePath = `${downloads}/document.pdf`;
      const exists = await fs.exists(filePath);
      if (exists) {
        await fs.unlink(filePath);
      }
      const result = await config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading PDF document', 
          mediaScannable: true,
        },
      }).fetch('GET', blob.uri);
      console.log('PDF document downloaded successfully', result.path());
    } catch (err) {
      console.warn(err);
    }
  }

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
     <View style={styles.head}>
      <View style={styles.profile}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

{/* Droupdown here start */}

  <View style={styles.ContainerDrop}>
      <TouchableOpacity onPress={handleDropdown} style={styles.threeDots}>
        <Icon style={styles.dots} name="dots-vertical" color="#999" />
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdown} >
          <Text style={styles.dropdownItem}  onPress={() => navigation.navigate('ScheduleInterview') }>Schedule Interview</Text>
          <Text style={styles.dropdownItem}>Shortlisting</Text>
          <Text style={styles.dropdownItem}>Hired</Text>
          <Text style={styles.dropdownItem}>Reject</Text>
        </View>
      )}
    </View>

    {/* Dropdown end here */}

     </View>
      <View style={styles.details}>
        <View style={styles.detail}>
          <Icon name="calendar-month-outline" size={16} color="#999" />
          <Text style={styles.detailText}>{experience}</Text>
        </View>
        <View style={styles.detail}>
          <Icon name="file-outline" size={16} color="#999" />
          <Text style={styles.detailText}>{skills}</Text>
        </View>
        <View style={styles.detail}>
          <Icon name="download" size={16} color="#999" />
          <Text style={styles.detailText} onPress={() => downloadPdf()}>{downloade}</Text>

        </View>
      </View>
    </TouchableOpacity> 
  );
};








  return (
    <View style={styles.appContainer}>
       <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'lightgray' }}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                {
                  flex: 1,
                  padding: 10,
                  borderBottomWidth: 2,
                  borderBottomColor: activeTab === tab ? '#D79442' : 'transparent',
                },
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
              onPress={() => handleTabPress(tab)}
            >
              <Text style={{ color: activeTab === tab ? '#D79442' : 'gray' }}>{tab}</Text>
            </TouchableOpacity>
          ))}

    </View>
      {candidates.map((candidate, index) => (
        <CandidateCard
          key={index}
          name={candidate.name}
          title={candidate.title}
          experience={candidate.experience}
          skills={candidate.skills}
          downloade={candidate.downloade}
          onPress={() => console.log('Candidate selected:', candidate.name)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 16,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  head:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  profile: {
    marginBottom: 8,
  },
right:{
  flexDirection:'row',
  alignItems:'center',
  width:100,
  justifyContent:'space-around',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color:'#175574',

  },
  title: {
    fontSize: 14,
    color: '#999',
    color:'#175574',
  },
  details: {
    justifyContent: 'space-between',
    
  },
  detail: {
    flexDirection: 'row',
  },
  detailText: {
    fontSize: 14,
    marginLeft: 4,
    color:'#175574',
  },

  ContainerDrop: {
    // flex: 1,
    justifyContent: 'right',
    alignItems: 'center',
  },
  threeDots: {
    backgroundColor: '#fff',
    borderRadius:20,
    borderWidth:1,
    borderColor:'#ABE0F8',
    // elevation: 5,
    padding:2,
  },
  dots: {
    fontSize: 20,
  },
  dropdown: {
    position: 'absolute',
    zIndex:1,
    right: 32,
    width:150,
    top:-10,
    backgroundColor: '#fff',
    padding: 5,
    elevation: 3,
    borderRadius:10,
  },
  dropdownItem: {
    padding: 5,
    color:'#175574',
  },

});

export default Candidate;
