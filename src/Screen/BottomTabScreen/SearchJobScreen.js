// import React, { useState, useCallback } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import HeaderWithLogo from '../../Component/HeaderWithLogo';
// import debounce from 'lodash/debounce';

// const SearchJobScreen = ({navigation}) => {
//   const [query, setQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('open');
//   const [results, setResults] = useState([]);

//   const fetchResults = async (searchQuery, jobStatus) => {
//     if (searchQuery === '') {
//       setResults([]);
//       return;
//     }
//     try {
//       const response = await fetch(`http://192.168.29.188:5000/search?query=${searchQuery}&status=${jobStatus}`);
//       const data = await response.json();
//       setResults(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const debouncedFetchResults = useCallback(debounce(fetchResults, 300), []);

//   const handleSearch = (text) => {
//     setQuery(text);
//     debouncedFetchResults(text, statusFilter);
//   };

//   const handleStatusChange = (newStatus) => {
//     setStatusFilter(newStatus);
//     debouncedFetchResults(query, newStatus);
//   };

//   return (
//     <View style={styles.container}>
//       <HeaderWithLogo
//         imageSource={require("../../Assets/dashboard/Logo.png")}
//         image={false}
//       />
//       <Text style={styles.title}>Search Job</Text>
//       <View style={styles.searchContainer}>
//         <Icon name="search" size={24} color="gray" style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           value={query}
//           onChangeText={handleSearch}
//           placeholder="Search... jobs"
//         />
//       </View>
//       <View style={styles.filterContainer}>
//         <TouchableOpacity
//           style={[styles.filterButton, statusFilter === 'open' && styles.activeFilter]}
//           onPress={() => handleStatusChange('open')}
//         >
//           <Text style={styles.filterText}>Open ⨯</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.filterButton, statusFilter === 'closed' && styles.activeFilter]}
//           onPress={() => handleStatusChange('closed')}
//         >
//           <Text style={styles.filterText}>Closed +</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={results}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.jobCard} onPress={()=>{navigation.navigate('Candidate', {jobId : item._id})}}>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//               <View>
//                 <Text style={styles.jobTitle}>{item.jobTitle}</Text>
//                 <Text style={{ fontSize: 16 }}>{item.company}</Text>
//                 <Text style={{ fontSize: 14 }}>{item.location}</Text>
//                 <Text style={{ fontSize: 14 }}>{item._id}</Text>
//                 <Text style={styles.jobDetails}>Open. Remote. {item.date}{item.duration && ` . ${item.duration}`}</Text>
//               </View>
//               <View style={{ justifyContent: 'flex-end' }}>
//                 <Text> JobStatus : {item.jobStatus}</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 16,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'skyblue',
//     borderRadius: 30,
//     paddingHorizontal: 8,
//     marginBottom: 10,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     height: 55,
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     height: 39,
//     width:250,
//   },
//   filterButton: {
//     flex: 1,
//     alignItems: 'center',
//     marginRight:15,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'skyblue',
//     justifyContent:'center',
//   },
//   activeFilter: {
//     backgroundColor: '#ADD8E6',
//   },
//   filterText: {
//     fontSize: 16,
//   },
//   jobCard: {
//     padding: 16,
//     backgroundColor: '#FFF',
//     borderRadius: 8,
//     marginBottom: 8,
//     elevation: 2,
//     borderColor: '#CCC',
//     borderWidth: 1,
//   },
//   jobTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   jobDetails: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 4,
//   },
// });

// export default SearchJobScreen;


import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderWithLogo from '../../Component/HeaderWithLogo';
import debounce from 'lodash/debounce';

const SearchJobScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('open');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchResults = async (searchQuery, jobStatus) => {
    if (searchQuery === '') {
      setResults([]);
      setIsSearching(false);
      return;
    }
    try {
      const response = await fetch(`https://hiringtechb-1.onrender.com/search?query=${searchQuery}&status=${jobStatus}`);
      const data = await response.json();
      setResults(data);
      setIsSearching(true);
    } catch (error) {
      console.error(error);
      setIsSearching(false);
    }
  };

  const debouncedFetchResults = useCallback(debounce(fetchResults, 300), []);

  const handleSearch = (text) => {
    setQuery(text);
    debouncedFetchResults(text, statusFilter);
  };

  const handleStatusChange = (newStatus) => {
    setStatusFilter(newStatus);
    debouncedFetchResults(query, newStatus);
  };

  return (
    <View style={styles.container}>
      <HeaderWithLogo
        imageSource={require("../../Assets/dashboard/Logo.png")}
        image={false}
      />
      <Text style={styles.title}>Search Job</Text>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={handleSearch}
          placeholder="Search... jobs"
        />
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, statusFilter === 'open' && styles.activeFilter]}
          onPress={() => handleStatusChange('open')}
        >
          <Text style={styles.filterText}>Open ⨯</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, statusFilter === 'closed' && styles.activeFilter]}
          onPress={() => handleStatusChange('closed')}
        >
          <Text style={styles.filterText}>Closed +</Text>
        </TouchableOpacity>
      </View>
      {!isSearching ? (
        <Image
          source={require("../../Assets/girlImage.jpg")}
          style={styles.placeholderImage}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.jobCard} onPress={() => { navigation.navigate('Candidate', { item: item}) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                  <Text style={{ fontSize: 16 }}>{item.company}</Text>
                  <Text style={{ fontSize: 14 }}>{item.location}</Text>
                  <Text style={{ fontSize: 14 }}>{item._id}</Text>
                  <Text style={styles.jobDetails}>Open. Remote. {item.date}{item.duration && ` . ${item.duration}`}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                  <Text> JobStatus : {item.jobStatus}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
    fontWeight: 'bold',
    marginVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'skyblue',
    borderRadius: 30,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 55,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    height: 39,
    width: 250,
  },
  filterButton: {
    flex: 1,
    alignItems: 'center',
    marginRight: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'skyblue',
    justifyContent: 'center',
  },
  activeFilter: {
    backgroundColor: '#ADD8E6',
  },
  filterText: {
    fontSize: 16,
  },
  placeholderImage: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  jobCard: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobDetails: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default SearchJobScreen;
