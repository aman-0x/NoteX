import 'react-native-gesture-handler';
import * as React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import auth from "@react-native-firebase/auth";

import LottieView from 'lottie-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Notes from './app/pages/Notes';
import CreateNote from './app/pages/CreateNote';
import ThirdPage from './app/pages/ThirdPage';
import About from './app/pages/About';
import EditNote from './app/pages/EditNote';
import CustomSidebarMenu from './app/components/CustomSidebarMenu';
import Auth from './app/auth/Auth';
import * as CONFIG from "./app-config";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

GoogleSignin.configure({
  webClientId: CONFIG.googleWebClientId
});

const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Image
          source={require("./assets/images/toggle.png")}
          style={{ width: 45, height: 45, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

function firstScreenStack(props) {
  return (
    <Stack.Navigator initialRouteName="Notes">
      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{
          title: 'Notes', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={props.navigation} />
          ),
          headerStyle: {
            backgroundColor: 'white', //Set Header color
          },
          headerTintColor: 'black', //Set Header text color
          headerTitleStyle: {
            fontFamily: "Poppins-Medium",
          },
        }}
      />
      <Stack.Screen
        name="EditNote"
        component={EditNote}
        options={{
          title: 'Edit Note', //Set Header Title
          headerStyle: {
            backgroundColor: 'white', //Set Header color
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontFamily: "Poppins-Medium",
          }
        }}
      />
    </Stack.Navigator>
  );
}

function secondScreenStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="CreateNote"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={props.navigation} />
        ),
      }}
      >
      <Stack.Screen
        name="CreateNote"
        component={CreateNote}
        options={{
          title: 'Create Note', //Set Header Title
        }}
      />
      <Stack.Screen
        name="ThirdPage"
        component={ThirdPage}
        options={{
          title: 'Third Page', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function aboutScreenStack(props) {
  return (
    <Stack.Navigator initialRouteName="Notes">
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: 'About', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={props.navigation} />
          ),
          headerStyle: {
            backgroundColor: 'white', //Set Header color
          },
          headerTintColor: 'black', //Set Header text color
          headerTitleStyle: {
            fontFamily: "Poppins-Medium",
          },
        }}
      />
    </Stack.Navigator>
  );
}

const DrawerNavigation = (propsD) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        // activeTintColor: '#1d55b6',
        activeTintColor: 'blue',
        // inactiveTintColor: "black",
        itemStyle: {
          marginVertical: 6,
          marginHorizontal: 15,
          borderRadius: 10,
          fontFamily: "Poppins-Medium",
        },
      }}
      drawerContent={(props) => <CustomSidebarMenu
        {...props}
        data={propsD.route.params.userData}
      />} >
      <Drawer.Screen
        name="Notes"
        options={{
          drawerLabel: 'All Notes',
        }}
        component={firstScreenStack}
      />
      <Drawer.Screen
        name="CreateNote"
        options={{ drawerLabel: 'Create Note' }}
        component={secondScreenStack}
      />
      <Drawer.Screen
        name="About"
        options={{ drawerLabel: 'About' }}
        component={aboutScreenStack}
      />
    </Drawer.Navigator>
  )
}

const App = () => {

  const [userStatus, setUserstatus] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState([])
  _checkUser = () => {
    setLoading(true)
    AsyncStorage.getItem("token").then((value) => {
      if (value) {
        setData(JSON.parse(value))
        setUserstatus(true)
        setLoading(false)
      } else {
        setUserstatus(false)
        setLoading(false)
      }
    }).catch((error) => {
      setLoading(false)
    });
  }

  React.useEffect(() => {
    setLoading(true)
    auth().onAuthStateChanged((user) => {
      if (user) {
        _checkUser()
      } else {
        setUserstatus(false)
      }
    })
    _checkUser()
    return () => { }
  }, [])

  if (loading) {
    return <LottieView style={{ backgroundColor: "white" }} source={require('./assets/animations/handLoading.json')} autoPlay loop />
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          !userStatus ?
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{ headerShown: false }}
            />
            :
            <Stack.Screen
              name="Drawer"
              component={DrawerNavigation}
              initialParams={{ userData: data }}
              options={{ headerShown: false }}
            />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;