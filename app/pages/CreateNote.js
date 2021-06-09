import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { Alert, View, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import {  TextInput, Button } from 'react-native-paper';
import * as FUNCTION from '../service/addNote';

const CreateNote = (props) => {

  const [loading, setLoading] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [body, setBody] = React.useState("")
  const [colourBox, setColourBox] = React.useState(["#b7fae5", "#f8d892", "#80a5f6", "#f4c45b", "#497ef3", "#ffae4e", "#a5f9de", "#b7fae5", "#aa71cd", "#eef1d7", "#80a5f6"])

  React.useEffect(() => {
    return () => {
      setTitle("")
      setBody("")
    }
  }, [])

  const SetNoteInStorage = (noteData) => {
    console.log(`here wokring`)
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
          if (result.length === 0) {
            const colour = colourBox[0];
            const trimedTitle = title.trim();
            const trimedBody = body.trim();
            const date = FUNCTION.getCurrentDate();
            const time = FUNCTION.getCurrentTime();
            const noteData = [{
              id: 0,
              title: trimedTitle === "" ? "Note Title" : trimedTitle,
              body: trimedBody,
              colour: colour,
              date: date,
              time: time
            }]
            SetNoteInStorage(noteData)
          } else {
            const ele = result[result.length - 1] // last object of array
            console.log(`ele`, ele)
            const id = ele.id;
            const newid = id + 1;
            const colour = colourBox[newid % 10];
            const trimedTitle = title.trim();
            const trimedBody = body.trim();
            const date = FUNCTION.getCurrentDate();
            const time = FUNCTION.getCurrentTime();
            const noteData = {
              id: newid,
              title: trimedTitle === "" ? "Note Title" : trimedTitle,
              body: trimedBody,
              date: date,
              time: time,
              colour: colour
            }
            result.push(noteData)
            SetNoteInStorage(result)
          }
        } else {
          const colour = colourBox[0];
          const trimedTitle = title.trim();
          const trimedBody = body.trim();
          const date = FUNCTION.getCurrentDate();
          const time = FUNCTION.getCurrentTime();
          const noteData = [{
            id: 0,
            title: trimedTitle,
            body: trimedBody,
            date: date,
            time: time,
            colour: colour
          }]
          SetNoteInStorage(noteData)
        }
      }).catch(err => {
        setLoading(false)
        console.log(`error`, err)
      })
    }
  }

  return (
    <SafeAreaView style={styles.main}>
        <View style={styles.savebtn}>
        {
          loading ?
            <View style={{ marginBottom: 4 }}>
              <ActivityIndicator size="large" color="blue" />
            </View>
            :
            <Button
              mode="outlined"
              disabled={loading}
              onPress={() => SaveNote()}
            >
              Save
            </Button>
        }
      </View>
      <View style={styles.box}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
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
              onChangeText={text => {
                setTitle(text)
              }}
            />
          </View>
          <TextInput
            style={{ backgroundColor: "white", marginTop: 14, fontSize: 19, textAlign: "justify" }}
            label="Note"
            mode="outlined"
            value={body}
            multiline={true}
            numberOfLines={23}
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
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  headerTop: {
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center"
  },
  inputBody: {
    borderWidth: 1,
    borderColor: "black",
    margin: 4,
    fontSize: 18,
    fontFamily: "Poppins-Mediumasd"
  },
  bottom: {
    height: 100,
    borderWidth: 1,
    borderColor: "black",
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
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginBottom: 4
  },
  title: {
    marginVertical: 4,
  }
})

export default CreateNote;
