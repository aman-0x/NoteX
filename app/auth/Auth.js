import React, { useRef, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import auth from "@react-native-firebase/auth";
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

const Auth = () => {
    
    let animationRef = useRef();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        animationRef.play();
        return () => { }
    }, [])

    removeTokenFromAsyncStorage = () => {
        AsyncStorage.removeItem("token").then(() => {
        }).catch(err => {});
    }

    onGoogleButtonPress = async () => {
        setLoading(true)
        try { // Get the usersInfo
            let userInfo = await GoogleSignin.signIn();
            let token = {
                userid: userInfo.user.id,
                username: userInfo.user.name,
                photoURL: userInfo.user.photo
            }
            // Create a Google credential with the token
            let googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            // Sign-in the user with the credential
            AsyncStorage.setItem("token", JSON.stringify(token))
                .then(async () => {
                    await auth().signInWithCredential(googleCredential);
                    setLoading(false)
                }).catch(() => {
                    //if any error occured, removing token that we have saved.
                    removeTokenFromAsyncStorage();
                    setLoading(false)
                })

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                // console.log('Error SIGN_IN_CANCELLED: ', error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                // console.log('Error IN_PROGRESS: ', error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                // console.log('Error PLAY_SERVICES_NOT_AVAILABLE: ', error)
            } else {
                // console.log('Some other Error : ', error.code, error)
            }
            setLoading(false)
        }
    }

    if (loading) {
        return <LottieView style={{ backgroundColor: "white" }} source={require('../../assets/animations/handLoading.json')} autoPlay loop />
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.container}>
                    <Text style={styles.header}>
                        Welcome to NoteX
                    </Text>
                    <LottieView
                        ref={(animation) => {
                            animationRef = animation;
                        }}
                        style={{
                            width: 200,
                            height: 300,
                        }}
                        source={require('../../assets/animations/mainScreenLoader.json')}
                        autoPlay
                        loop
                    />
                </View>
                <TouchableOpacity
                    onPress={() => onGoogleButtonPress()}
                    style={styles.appButtonContainer}
                >
                    <View style={styles.googleContainer}>
                        <Image style={styles.googleImage} source={require('../../assets/images/google.png')} />
                        <Text style={styles.textBottom}> Login with Google</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        padding: 16,
        height: "70%",
    },
    header: {
        paddingVertical: 15,
        fontSize: 24,
        fontFamily: "Montserrat-Regular",
        textAlign: 'center',
    },
    smallText: {
        fontSize: 17,
        textAlign: 'center',
    },
    appButtonContainer: {
        marginHorizontal: 40,
        elevation: 2,
        borderRadius: 14,
    },
    googleContainer: {
        backgroundColor: "#f9f9f9",
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 18,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "black",
    },
    googleImage: {
        width: 25,
        height: 25,
        marginRight: 8,
    },
    textBottom: {
        fontSize: 16,
        color: "black",
        fontFamily: "Montserrat-Regular",
    }
});

export default Auth;
