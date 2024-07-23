import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity,ScrollView} from "react-native";
const Preferences = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
      }}
    >
        <ScrollView>

      
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Image
              source={require("../Assets/pre.png")}
              style={{
                width: 18,
                height: 18,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "500",
              color: "#000000",
              marginLeft: 12,
            }}
          >
            Preferences
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../Assets/notification.png")}
            style={{
              width: 18,
              height: 18,
              resizeMode: "contain",
            }}
          />
          <Image
            source={require("../Assets/tv.png")}
            style={{
              width: 18,
              height: 18,
              resizeMode: "contain",
              marginLeft: 8,
            }}
          />
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "500",
            color: "#000000",
          }}
        >
          Your preferences
        </Text>
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: "#060606",
          }}
        >
          Area(s) of interest
        </Text>
        <View
          style={{
            borderWidth: 1,
            marginTop: 4,
            borderRadius: 15,
            borderColor: "#9E9E9E",
          }}
        >
          <TextInput
            placeholder="Frontend"
            style={{
              marginLeft: 10,
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#0038FF",
          padding: 10,
          borderRadius: 23,
          width: 138,
          marginTop: 24,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "400",
            color: "#FFFFFF",
          }}
        >
          + {"Add your interest"}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: "#000000",
          }}
        >
          Also select the following to get more opportunities
        </Text>
        <TouchableOpacity
          style={{
            // backgroundColor:'#0038FF',
            padding: 10,
            borderRadius: 23,
            width: 73,
            marginTop: 12,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#9E9E9E",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#020202",
            }}
          >
            {"+ Add"}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: "#060606",
          }}
        >
          Add Your Skills
        </Text>
        <View
          style={{
            borderWidth: 1,
            marginTop: 4,
            borderRadius: 15,
            borderColor: "#9E9E9E",
          }}
        >
          <TextInput
            placeholder="Type skills"
            style={{
              marginLeft: 10,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            // backgroundColor:'#0038FF',
            padding: 5,
            borderRadius: 23,
            // width:105,
            marginTop: 24,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ABE0F8",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <Image
            source={require("../Assets/html.png")}
            style={{
              width: 15,
              height: 15,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#175574",
              marginLeft: 4,
            }}
          >
            {"HTML"}
            {" ×"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // backgroundColor:'#0038FF',
            padding: 5,
            borderRadius: 23,
            // width:105,
            marginTop: 24,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ABE0F8",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 10,
            paddingHorizontal: 10,
          }}
        >
          <Image
            source={require("../Assets/html.png")}
            style={{
              width: 15,
              height: 15,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#175574",
              marginLeft: 4,
            }}
          >
            {"CSS"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 10,
            marginTop: 24,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "#17557480",
              opacity: 0.5,
            }}
          >
            Select Skills
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: "#000000",
          }}
        >
          Currently looking for
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#0038FF",
            padding: 10,
            borderRadius: 23,
            width: 85,
            marginTop: 24,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#FFFFFF",
            }}
          >
            + {"Jobs"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#0038FF",
            padding: 10,
            borderRadius: 23,
            width: 117,
            marginTop: 24,
            alignItems: "center",
            marginLeft: 12,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#FFFFFF",
            }}
          >
            {"+ Internship"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{
                marginTop:20
            }}>
                <Text style={{
                    fontSize:16,
                    fontWeight:'500',
                    color:'#000000'
                }}>
                Work mode
                </Text>
            </View>

        <View style={{
            flexDirection:'row',
            alignItems:'center'
        }}>
        <TouchableOpacity style={{
                backgroundColor:'#0038FF',
                padding:10,
                borderRadius:23,
                width:85,
                marginTop:24,
                alignItems:'center'
            }}>
                <Text style={{
                    fontSize:12,
                    fontWeight:'400',
                    color:'#FFFFFF'
                }}>
                    {"+ Remote"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor:'#0038FF',
                padding:10,
                borderRadius:23,
                width:85,
                marginTop:24,
                alignItems:'center',
                marginLeft:12
            }}>
                <Text style={{
                    fontSize:12,
                    fontWeight:'400',
                    color:'#FFFFFF'
                }}>
                    {"+ In office"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor:'#0038FF',
                padding:10,
                borderRadius:23,
                width:75,
                marginTop:24,
                alignItems:'center',
                marginLeft:12
            }}>
                <Text style={{
                    fontSize:12,
                    fontWeight:'400',
                    color:'#FFFFFF'
                }}>
                    {"+ Hybrid"}
                </Text>
            </TouchableOpacity>
        </View>

       
            <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: "#060606",
          }}
        >
            Work experience
        </Text>
        <View
          style={{
            borderWidth: 1,
            marginTop: 4,
            borderRadius: 15,
            borderColor: "#9E9E9E",
          }}
        >
          <TextInput
            placeholder="First City"
            style={{
              marginLeft: 10,
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View style={{
                    flexDirection:'row',
                    alignItems:'center'
                }}>
                <Text style={{
                    fontSize:14,
                    fontWeight:'500',
                    color:'#060606'

                }}>
                Preferred city
                </Text>
                <Text style={{
                    fontSize:14,
                    fontWeight:'500',
                    color:'#9F9F9F'

                }}>
                (Top 3 cities)
                </Text>

                </View>
        <View
          style={{
            borderWidth: 1,
            marginTop: 4,
            borderRadius: 15,
            borderColor: "#9E9E9E",
          }}
        >
          <TextInput
            placeholder="First City"
            style={{
              marginLeft: 10,
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#000959",
          height: 56,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 32,
          borderRadius: 16,
        }}
        onPress={() => {
          navigation.navigate("Addskill");
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#A2CEF4",
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default Preferences;
