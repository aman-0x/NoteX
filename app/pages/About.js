import * as React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';

const About = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ flex: 1, padding: 14 }}>
          <View
            style={styles.main}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Montserrat-Regular",
                  color: "white",
                  textAlign: 'justify',
                  padding: 10,
                }}>
                Currently app is in the beta version.
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "MavenPro-Regular",
                  textAlign: 'justify',
                  paddingHorizontal: 10,
                }}>
                We are going to roll out the updates soon..! Which includes new features for you.</Text>
              <View style={{
                margin: 15,
                borderRadius: 10,
                elevation: 3,
                backgroundColor: "#87adff",                
                padding: 4,
                paddingVertical: 10
              }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'justify',
                    paddingHorizontal: 10,
                    fontFamily: "MavenPro-Regular",
                    color: "white",
                  }}>
                  <Text style={{ fontFamily: "MavenPro-Regular", fontStyle: "italic", color: "white" }}>Disclaimer:</Text><Text> The data of your notes are stored in your phone. We have no access of your data nor we want to, as it's your notes. If you uninstall the app your notes will be deleted too. So, be cautious we don't want you to lose your Notes <Text>😀.</Text></Text>
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    textAlign: 'justify',
                    fontFamily: "MavenPro-Regular",
                    paddingHorizontal: 10,
                  }}>
                  Your privacy is our priority.
              </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'justify',
                  padding: 10,
                  color: "white",
                  fontFamily: "MavenPro-Regular",
                }}>
                Thankyou for using the NoteX.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    display: "flex",
    padding: 10,
    margin: 4,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "#5a8efe"
  }
})

export default About;
