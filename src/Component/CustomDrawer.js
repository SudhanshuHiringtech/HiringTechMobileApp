import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { clearProfile, selectProfile } from "../Reduxtoolkit/profileSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const profile = useSelector(selectProfile);

    // Local state for profile image URL
    const [profileImage, setProfileImage] = useState(null);

    // Handle logout
    const handleLogout = async () => {
        try {
            const response = await fetch(
                "https://hiringtechb-2.onrender.com/logout",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Logout failed");
            }

            console.log("Logout successful");
            dispatch(clearProfile());
            await AsyncStorage.clear();
            console.log("AsyncStorage cleared successfully");
            navigation.navigate("Choosejob");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // Update profile image URL when profile changes
    useEffect(() => {
        if (profile?.profile?.user?.profileImage) {
            const imagePath = profile.profile.user.profileImage.path;
            setProfileImage(`http://192.168.29.188:5000/${imagePath}`);
        }
    }, [profile]);

    const name = profile?.profile?.user?.name;
    const email = profile?.profile?.user?.email;
    const role = profile?.profile?.user?.userdesignation;

    const drawerItems = [
        { label: "My Profile", screen: "Profile" },
        { label: "Manage Account", screen: null },
        { label: "Change Password", screen: "ChangePasswordScreen" },
        { label: "Report a complaint", screen: "AddComplaintScreen" },
        { label: "Safety Tips", screen: null },
        { label: "About Hiring tech", screen: null },
        { label: "Delete Account", screen: 'DeleteAcoount' },
        { label: "Logout", action: handleLogout },
    ];

    if (role === "recuriter") {
        drawerItems.splice(1, 0, {
            label: "Create Job",
            screen: "CreateJobScreen1",
        });
    }

    return (
        <DrawerContentScrollView
            contentContainerStyle={{
                justifyContent: "space-between",
                flexDirection: "column",
                flex: 1,
            }}
            {...props}>
            <View>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.closeDrawer();
                    }}>
                    <Image
                        source={require("../Assets/dashboard/cross.png")}
                        style={styles.closeIcon}
                    />
                </TouchableOpacity>

                <View style={styles.profileContainer}>
                    {profileImage ? (
                        <Image
                            style={styles.profileImage}
                            resizeMode="contain"
                            source={{ uri: profileImage }}
                        />
                    ) : (
                        <Image
                            source={require("../Assets/dashboard/Profile.png")}
                            style={styles.profileImage}
                            resizeMode="contain"
                        />
                    )}
                    <Text style={styles.profileName}>{name}</Text>
                    <Text style={styles.profileEmail}>{email}</Text>
                </View>

                <View style={styles.divider} />
                <View style={styles.drawerItemsContainer}>
                    {drawerItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.drawerItem}
                            onPress={() => {
                                if (item.action) {
                                    item.action();
                                } else if (item.screen) {
                                    navigation.navigate(item.screen);
                                }
                            }}>
                            <Text style={styles.textStyle}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.footer}>
                {[
                    "Privacy Policy",
                    "Terms & Conditions",
                    "Copyright © 2020 Hiring Tech",
                ].map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.drawerItem}
                        onPress={() => {
                            navigation.navigate(item);
                        }}>
                        <Text style={styles.footerText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    profileImage: {
        width: 70,
        height: 70,
        marginBottom: 10,
        borderRadius: 50,
    },
    profileName: {
        fontSize: 20,
        fontWeight: "600",
        color: "#062B43",
    },
    profileEmail: {
        fontSize: 14,
        color: "#17557480",
        fontWeight: "500",
    },
    divider: {
        backgroundColor: "#ABE0F8",
        height: 1,
        marginHorizontal: 40,
        marginVertical: 16,
    },
    closeIcon: {
        width: 18,
        height: 18,
        resizeMode: "contain",
        alignSelf: "flex-end",
        marginRight: 20,
        marginTop: 20,
    },
    drawerItemsContainer: {
        marginTop: 20,
        paddingHorizontal: 40,
        gap: 20,
    },
    drawerItem: {},
    textStyle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#175574",
    },
    touchableStyle: {
        // Define additional styles for the touchable area if needed
    },
    footer: {
        gap: 7,
        paddingHorizontal: 40,
        paddingBottom: 80,
    },
    footerText: {
        fontSize: 10,
        textAlign: "right",
        fontWeight: "500",
        color: "#175574",
    },
});

export default CustomDrawer;
