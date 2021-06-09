import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const BoxComponent = (props) => {

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={props.onPress}
            style={[styles.box, props.style]}
            key={props.id}
        >
            <View
                style={{
                    display: "flex",
                    flex: 1,
                    height: '100%'
                }}>
                <View style={styles.title}>
                    {
                        props.data.title.length < 30 ?
                            <Text style={{ 
                                fontFamily: "Poppins-Medium",
                                fontSize: 15,  }}>
                                {
                                    props.data.title
                                }
                            </Text>
                            :
                            <Text style={{ 
                                fontFamily: "Poppins-Medium",
                                fontSize: 15,  }}>
                                {
                                    props.data.title.slice(0, 30)
                                } ...
                            </Text>
                    }
                </View>
                <View style={styles.underline}></View>
                <View style={{ 
                    flex: 1,
                    marginTop: 4, 
                    textAlign: "justify" }}>
                    {
                        props.data.body.length < 138 ?
                            <Text style={styles.body}>{props.data.body}</Text>
                            :
                            <Text style={styles.body}>{props.data.body.slice(0, 138)} ...</Text>
                    }
                </View>
                <View style={{padding: 4}}>
                    <Text style={{fontSize: 8,
                    fontFamily: "Poppins-Regular",
                    }}>{props.data.date}, {props.data.time}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    box: {
        elevation: 5,
        padding: 4,
        borderRadius: 10,
        height: 200,
        width: Dimensions.get('window').width > 350 ? Dimensions.get('window').width / 3 + 30 : 150,
        marginBottom: 20
    },
    title: {
        marginBottom: 4
    },
    underline: {
        borderColor: "white",
        borderWidth: 0.5,
    },
    body: {
        fontFamily: "Poppins-Regular",
    }
});

export default BoxComponent