import React, {useState, useEffect} from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../Assets/dashboard/Logo";
import { useSelector, useDispatch } from "react-redux";
import { clearProfile, selectProfile } from "../Reduxtoolkit/profileSlice";

const HeaderWithLogo = ({ imageSource, text, image }) => {
    const navigation = useNavigation();
    const profile = useSelector(selectProfile);

    const [images, setImages] = useState(profile?.profile?.user?.profileImage?.data ? `data:${profile.profile.user.profileImage.contentType};base64,${profile.profile.user.profileImage.data}` : null);


    useEffect(() => {
        if (profile?.profile?.user?.profileImage?.data) {
          setImages(`data:${profile.profile.user.profileImage.contentType};base64,${profile.profile.user.profileImage.data}`);
        }
      }, []);



    return (
        <View style={styles.header}>
            {image == false ? (
                <Logo />
            ) : (
                <View>
                    <Text style={styles.fontStyle}>{text}</Text>
                </View>
            )}
            <View style={styles.headerIcons}>
                <Image
                    source={require("../Assets/dashboard/bellIcon.png")}
                    style={styles.bellIcon}
                />
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => {
                        navigation.openDrawer();
                    }}>
                     {images ? (<Image

                        source={require("../Assets/dashboard/Profile.png")}
                        style={styles.profileImage}
                        resizeMode="contain"
                    />) :(
                    <Image
                    style={styles.profileImage}
                    resizeMode="contain"
                    source={{
                    uri: images,
                    }}
                    />)}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HeaderWithLogo;

const styles = {
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff", // Adjust background color as needed
        borderBottomColor: "#ccc", // Adjust border color as needed
    },
    fontStyle: {
        fontSize: 28,
        color: "black",
        fontWeight: 500,
    },
    logo: {
        width: 100,
        height: 30,
        resizeMode: "contain",
    },
    headerIcons: {
        flexDirection: "row",
        alignItems: "center",
    },
    bellIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
        marginRight: 10,
    },
    profileButton: {
        padding: 5,
        borderRadius: 20,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: "cover",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333", // Adjust text color as needed
    },
};
