import React,{useState,useEffect} from "react";
import {View,Text,FlatList, Image,TouchableOpacity,TextInput} from "react-native"
import { countries } from 'country-data';
import { useNavigation } from "@react-navigation/native";
const Countryname = () =>{
    const [isVisible,setISVisible] = useState(true)
    const [filteredData, setFilteredData] = useState();
    const [data, setData] = useState();
    const [text,setText] = useState("")
    const [selectedItemId, setSelectedItemId] = useState(null);
    const navigation = useNavigation()

    const handlePress = (itemId) => {
        setSelectedItemId(itemId === selectedItemId ? null : itemId);
    };
   useEffect(() => {
    const namesSet = new Set(
        Object.values(countries)
          .map(country => country.name)
          .filter(name => name)
      );
    const namesArray = Array.from(namesSet);
    setData(namesArray)
    setFilteredData(namesArray)
  }, []);
 
    
   const renderItem = ({ item,index }) => {
        const isSelected = index === selectedItemId;

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <TouchableOpacity onPress={() => {
                   handlePress(index)
                   setISVisible(false)
                }
                   
                    }>
                    <Image
                        source={
                            isSelected
                                ? require('../Assets/circleactive.png')
                                : require('../Assets/circleinactive.png')
                        }
                        style={{ width: 24, height: 24, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: '500', color: '#000000', marginLeft: 20 }}>
                    {item}
                </Text>
            </View>
        );
    };

    const searchfilter = (searchText) => { 
        if (!data) {
            console.error("Data is undefined or null");
            return;
        }
        const filteredData1 = filteredData.filter((value) => {
            const searchStr = searchText.toLowerCase();
            const countryname = value.toLowerCase().includes(searchStr);
            return countryname;
        });
        
        setData(filteredData1);
    };
    return(
        <View style={{
            flex:1,
            backgroundColor:'#ffffff'
        }}>
            <View style={{
                marginHorizontal:24,
                flex:1
            }}>
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:40,
                
            }}>
                <TouchableOpacity
                onPress={()=>{
                    navigation.goBack()
                }}
                >
                <Image
                source={require("../Assets/arrow-left.png")}
                style={{
                    width:24,
                    height:24,
                    resizeMode:'contain'
                }}
                />
                </TouchableOpacity>
               
                <Text style={{
                    fontSize:24,
                    fontWeight:'500',
                    color:'#000000',
                    marginLeft:10
                }}>
                Your Country
                </Text>
            </View>

            <View style={{
                marginVertical:32,
                flexDirection:'row',
                backgroundColor:text?'#A2CEF433':'#C9C9C933',
                borderColor:'#D1D1D1',
                borderWidth:1,
                borderRadius:16,
                paddingLeft:10
            }}>
                <Image
                source={require("../Assets/search.png")}
                style={{
                    width:24,
                    height:24,
                    resizeMode:'contain',
                    alignSelf:'center'
                }}
                />
                <TextInput
                placeholder="Search For A Country"
                onChangeText={(inputText) => {
                    setText(inputText);
                    if (inputText !== "") {
                        searchfilter(inputText);
                    } else {
                        setData(filteredData);
                    }
                }}
                style={{marginLeft:10}}
                value={text}
                
                
                />

            </View>
            <View style={{
                flex:1
            }}>
            <FlatList
            data={data}
            renderItem={renderItem}
            // keyExtractor={(item) => item.id.toString()}
            />
            </View>
            <View style={{
                height:108
            }}>
            <TouchableOpacity
            style={{
                backgroundColor:isVisible?'#C9C9C933':'#000959',
                height:56,
                alignItems:'center',
                justifyContent:'center',
                marginTop:12,
                borderRadius:16
            }}
            >
                <Text style={{
                    fontSize:16,
                    fontWeight:'600',
                    color:isVisible?'#000000':'#A2CEF4'
                }}>
                  Next
                </Text>
            </TouchableOpacity>
            </View>
           
            
            </View>
           
           
        </View>
    )
}
export default Countryname