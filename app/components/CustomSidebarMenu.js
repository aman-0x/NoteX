import React from 'react';
import {
    Alert,
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from "@react-native-firebase/auth";
import AsyncStorage from '@react-native-community/async-storage';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {

    const Logout = () => {
        Alert.alert(
            "Are you sure !! ",
            "You want to Logout ?",
            [
                {
                    text: "No",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        AsyncStorage.removeItem("token").then(() => {
                            GoogleSignin.revokeAccess()
                            GoogleSignin.signOut()
                            auth().signOut();
                        }).catch(err => {
                        })
                    }
                }
            ]
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.head}>
                <View style={styles.container}>
                    <View style={styles.headAvatar}>
                        <View style={styles.avatar}>
                            {
                                props.data ?
                                    <Image source={{ uri: props.data.photoURL }} style={{ width: 100, height: 100, borderRadius: 100 * 0.5, }} /> :
                                    <Text style={{ fontSize: 22 }}>Hii !</Text>
                            }
                        </View>
                    </View>
                    <View style={styles.headText}>
                        <Text style={{
                            textAlign: "center",
                            fontFamily: "Poppins-Medium",
                            color: "white", fontSize: 16
                        }}>{props.data ? props.data.username : "Hello User !!"}</Text>
                    </View>
                </View>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    style={{
                        backgroundColor: "white",
                        borderRadius: 15,
                        marginHorizontal: 15,
                        fontFamily: "Poppins-Medium",
                        // borderRadius: 15, borderColor: "silver", borderWidth: 1.5
                    }}
                    // labelStyle={{ color: "black" }}
                    label="Logout"
                    onPress={() => Logout()}
                />
                {/* <DrawerItem
                    label="Share"
                    onPress={() => Linking.openURL('https://aboutreact.com/')}
                /> */}
                {/* <View style={styles.customItem}>
                    <Text
                        onPress={() => {
                            Linking.openURL('https://aboutreact.com/');
                        }}>
                        Rate Us
                    </Text>
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" }}
                        style={styles.iconStyle}
                    />
                </View> */}
            </DrawerContentScrollView>
            <Text
                style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'black',
                    marginBottom: 2,
                    backgroundColor: "white",
                    fontFamily: "MavenPro-Regular",
                }}>
                © NoteX
            </Text>
            <Text
                style={{
                    backgroundColor: "white",
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'black',
                    marginBottom: 4
                }}>
                {new Date().getFullYear()} - {new Date().getFullYear() + 1}
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    head: {
        backgroundColor: "white",
        elevation: 2,
        padding: 10,
    },
    container: {
        elevation: 2,
        borderRadius: 10,
        backgroundColor: "#5b8bf4",
        padding: 8,
        margin: 4,
    },
    headAvatar: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
    },
    headText: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 8
    },
    avatar: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "white",
        width: 100,
        height: 100,
        borderRadius: 100 * 0.5,
        elevation: 2,
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignSelf: 'center',
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginHorizontal: 5,
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomSidebarMenu;