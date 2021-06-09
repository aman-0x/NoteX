import * as React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const WelcomeScreen = (props) => {
    return (
        <>
            <View style={styles.main}>
                <View style={styles.top}>
                    <View style={styles.topCenter}>
                        <Text style={styles.text}>You don't have any Notes yet !!</Text>
                        <Text style={styles.text}>Click below to create your first note..📝</Text>
                    </View>
                </View>
                <View style={styles.bottom}>
                    {
                        props ?
                            props.arrowLoad ?
                                <LottieView style={{
                                    width: 100,
                                    transform: [{ rotate: '165deg' }],
                                    height: 200,
                                    backgroundColor: "white"
                                }} source={require('../../assets/animations/clickHereArrow.json')} autoPlay loop /> :
                                <View></View> :
                            <LottieView style={{
                                width: 100,
                                transform: [{ rotate: '165deg' }],
                                height: 200,
                                backgroundColor: "white"
                            }} source={require('../../assets/animations/clickHereArrow.json')} autoPlay loop />
                    }
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        display: "flex",
        flex: 1,
        height: Dimensions.get('window').height / 1.2,
        margin: 4
    },
    top: {
        display: "flex",
        flex: 2,
        margin: 8,
        padding: 20,
        alignItems: 'center',
        justifyContent: "center"
    },
    topCenter:{
        display: "flex",
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        elevation: 3,
        padding: 10,
        margin: 2,
        height: 250,
        backgroundColor: "#36c4c4",
        alignItems: 'center',
        justifyContent: "center"
    },
    bottom: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flex: 1
    },
    text: {
        fontSize: 16,
        color: "white",
        fontFamily: "Montserrat-Regular",
        textAlign: 'center'
    }
})

export default WelcomeScreen;