import { useNavigation } from "@react-navigation/native";
import React,{useEffect} from "react";
import { View, Text } from "react-native";
const Success = () => {
  const navigation = useNavigation()
  useEffect(() => {

    setTimeout(() => {
      navigation.navigate("Bottomtab")
    }, 1000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: "#000000",
          lineHeight: 36,
        }}
      >
        SUCCESSFULLY VERIFIED...
      </Text>
    </View>
  );
};
export default Success;
