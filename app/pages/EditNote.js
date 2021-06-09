import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { Alert, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import * as FUNCTION from '../service/addNote';

const EditNote = (props) => {
    const [loading, setLoading] = React.useState(false)
    const [title, setTitle] = React.useState("")
    const [body, setBody] = React.useState("")

    React.useEffect(() => {
        setTitle(props.route.params.data ? props.route.params.data.title : title)
        setBody(props.route.params.data ? props.route.params.data.body : body)
        return () => { }
    }, [])

    const SetNoteInStorage = (noteData) => {
        AsyncStorage.setItem("noteData", JSON.stringify(noteData)).then(result => {
            setTitle("");
            setBody("");
            setLoading(false);
            props.navigation.navigate("Notes")
        }).catch(err => {
            setTitle("");
            setBody("");
            setLoading(false);
        })
    }

    const DeleteNote = () => {
        setLoading(true)
        AsyncStorage.getItem("noteData").then((value) => {
            if (value) {
                const result = JSON.parse(value)
                result.splice(props.route.params.index, 1)
                SetNoteInStorage(result)
            } else {
                // SetNoteInStorage(noteData)
            }
        }).catch(err => {
            setLoading(false)
        })
    }

    const DeleteNoteClick = () => {
        Alert.alert(
            "You want to delete this note ?",
            "",
            [
                {
                    text: "No",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => { DeleteNote() },
                    // style: "cancel"
                }
            ]
        );
    }

    const SaveNote = () => {
        if (body === "") {
            Alert.alert(
                "Note field is empty !",
                "",
                [
                    {
                        text: "Ok",
                        onPress: () => { },
                        style: "cancel"
                    }
                ]
            );
        } else {
            setLoading(true)
            AsyncStorage.getItem("noteData").then((value) => {
                if (value) {
                    const result = JSON.parse(value)
                    const ele = result[props.route.params.index] // element at that index
                    const trimedTitle = title.trim();
                    const trimedBody = body.trim();
                    const date = FUNCTION.getCurrentDate();
                    const time = FUNCTION.getCurrentTime();
                    ele.time = time;
                    ele.date = date;
                    ele.body = trimedBody;
                    ele.title = trimedTitle === "" ? "Note Title" : trimedTitle;
                    SetNoteInStorage(result)
                } else {
                    // SetNoteInStorage(noteData)
                }
            }).catch(err => {
                setLoading(false)
            })
        }
    }

    if (loading) {
        return <LottieView style={{ backgroundColor: "white" }} source={require('../../assets/animations/mainNotesLoading.json')} autoPlay loop />
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.savebtn}>
                <Button
                    mode="outlined"
                    color="red"
                    disabled={loading}
                    onPress={() => DeleteNoteClick()}
                >
                    Delete
                </Button>
                <Button
                    mode="outlined"
                    disabled={loading}
                    onPress={() => SaveNote()}
                >
                    Save
                </Button>
            </View>
            <View style={styles.box}>
                <ScrollView
                    keyboardShouldPersistTaps="always"
                // style={{ borderColor: "yellow" }}
                >
                    <View style={styles.title}>
                        <TextInput
                            style={{ backgroundColor: "white", fontSize: 20 }}
                            label="Title"
                            mode="outlined"
                            value={title}
                            theme={{
                                colors: {
                                    placeholder: 'grey', text: 'black', primary: 'grey',
                                    underlineColor: 'transparent',
                                }
                            }}
                            onChangeText={text => setTitle(text)}
                        />
                    </View>
                    <TextInput
                        style={{ backgroundColor: "white", marginTop: 8, fontSize: 19, textAlign: "justify" }}
                        label="Note"
                        mode="outlined"
                        value={body}
                        multiline={true}
                        numberOfLines={25}
                        theme={{
                            colors: {
                                placeholder: 'grey', text: 'black', primary: 'grey',
                                underlineColor: 'transparent',
                            }
                        }}
                        onChangeText={text => setBody(text)}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "white",
        padding: 10
    },
    box: {
        padding: 10,
        marginTop: 8,
        marginHorizontal: 8,
        marginBottom: 8,
        backgroundColor: "white",
        elevation: 4,
        flex: 1,
        borderRadius: 10
    },
    savebtn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginHorizontal: 10,
        marginBottom: 4,
    },
    title: {
        // borderWidth: 2,
        // borderColor: "red",
    }
});

export default EditNote
