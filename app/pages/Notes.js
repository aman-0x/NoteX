import * as React from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import BoxComponent from '../components/BoxComponent';
import WelcomeScreen from './WelcomeScreen';

const Notes = (props) => {

  const [loading, setLoading] = React.useState()
  const [state, setState] = React.useState({ open: false });
  const [notesData, setNotesData] = React.useState([]);
  const [arrowLoad, setArrowLoad] = React.useState(true)
  
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <></>
        // <View style={{ marginRight: 10 }}>
        //   <Icon
        //     size={22}
        //     name="sort"
        //     color="#4e4e50"
        //     // backgroundColor="#3b5998"
        //     onPress={showAlert}
        //   >
        //     {
        //       showView ?
        //         <View style={{height: 100, width: 100, backgroundColor: "red"}}>
        //           <Text>Hello</Text>
        //         </View> :
        //         <>
        //         </>
        //     }
        //   </Icon>
        // </View>
      ),
    });
  }, [props.navigation]);
  
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setLoading(true)
      setArrowLoad(true)
      _getUserNotes()
    });

    return () => {
      unsubscribe();
    }
  }, [])

  const _getUserNotes = () => {
    AsyncStorage.getItem("noteData").then((value) => {
      if (value) {
        const notes = JSON.parse(value);
        setNotesData(notes);
        setLoading(false)
      } else {
        setLoading(false)
      }
    }).catch((error) => {
      setLoading(false)
    });
  }

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const BoxClick = (val, index) => {
    props.navigation.navigate("EditNote", {
      "data": val,
      "index": index
    })
  }

  if (loading) {
    return <LottieView style={{ backgroundColor: "white" }} source={require('../../assets/animations/mainNotesLoading.json')} autoPlay loop />
  }

  return (
    <SafeAreaView style={styles.main}>
      <>
        <ScrollView
          keyboardShouldPersistTaps="always"
        >
          {
            notesData.length > 0 ?
              <View style={styles.mainpageview}>
                {
                  notesData.map((value, index) => (
                    <BoxComponent
                      onPress={() => BoxClick(value, index)}
                      id={index}
                      data={value}
                      key={index}
                      style={{ backgroundColor: value.colour }}
                    />
                  ))
                }
              </View>
              :
              <WelcomeScreen arrowLoad={arrowLoad} />
          }

        </ScrollView>
        <Provider>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? (props) => <Image source={require("../../assets/images/closeFab.png")} style={{ width: 25, height: 25 }} {...props} /> : (props) => <Image source={require("../../assets/images/openFab.png")} style={{ width: 25, height: 25 }} {...props} />}
              actions={[
                {
                  icon: (props) => <Image source={require("../../assets/images/createNote.png")} style={{ width: 25, height: 25 }} {...props} />,
                  label: 'Create Note',
                  onPress: () => {
                    props.navigation.navigate("CreateNote")
                  },
                  small: false,
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                setArrowLoad(load => !load)
                if (open) {}
              }}
            />
          </Portal>
        </Provider>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white"
  },
  box: {
    padding: 10,
    margin: 20,
    backgroundColor: "white",
    elevation: 4,
    height: 200,
    borderRadius: 10
  },
  mainpageview: {
    display: "flex",
    paddingVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-around',
  }
})

export default Notes;