import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../Assets/dashboard/Logo";
import { useSelector } from "react-redux";
import { selectProfile } from "../Reduxtoolkit/profileSlice";

const HeaderWithLogo = ({ imageSource, text, image }) => {
    const navigation = useNavigation();
    const profile = useSelector(selectProfile);
    const imagepro = profile?.profile?.user?.profileImage;
    console.log("Profile Image Object:", imagepro);

    const profileimage = imagepro ? `http://192.168.29.188:5000/${imagepro.path}` : null;
    console.log("Profile Image URL:", profileimage);

    return (
        <View style={styles.header}>
            {image === false ? (
                <Logo />
            ) : (
                <View>
                    <Text style={styles.fontStyle}>{text}</Text>
                </View>
            )}
            <View style={styles.headerIcons}>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                <Image
                    source={require("../Assets/dashboard/bellIcon.png")}
                    style={styles.bellIcon}
                />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => {
                        navigation.openDrawer();
                    }}>
                    {profileimage === null ? (
                        <Image
                            source={require("../Assets/dashboard/Profile.png")}
                            style={styles.profileImage}
                            resizeMode="contain"
                        />
                    ) : (
                        <Image
                            style={styles.profileImage}
                            resizeMode="contain"
                            source={{ uri: profileimage }}
                            onError={(error) => console.log("Image load error:", error.nativeEvent.error)}
                        />
                    )}
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
        backgroundColor: "#fff",
        borderBottomColor: "#ccc",
    },
    fontStyle: {
        fontSize: 28,
        color: "black",
        fontWeight: "500",
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
        color: "#333",
    },
};
