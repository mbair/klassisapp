import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Container } from 'native-base';

/**
 * - AppSwitchNavigator
 *    - AuthLoading (default)
 *    - AuthStack
 *      - SignIn
 *      - SignUp (currently disabled)
 *    - Drawer
 *          - Dashboard - DashboardStackNavigator(needed for header and to change the header based on the tab)
 *            - DashboardTabNavigator
 *              - Tab 1 - FeedStack
 *              - Tab 2 - ProfileStack
 *              - Tab 3 - SettingsStack
 *            - Any files you don't want to be a part of the Tab Navigator can go here.
 */

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import {Button, Icon} from "native-base";

import AuthLoadingScreen from './src/screens/AuthLoading';

import SignInScreen from './src/screens/SignIn';
import SignUpScreen from './src/screens/SignUp';
import HomeScreen from './src/screens/Home';
import ProfileScreen from './src/screens/Profile';
import MunkatarsakScreen from './src/screens/Employee';
import SettingsScreen from './src/screens/Settings';
import ForumScreen from './src/screens/Forum';
import TemakorScreen from './src/screens/Topic';
import QuestionScreen from './src/screens/Question';
import Sidebar from "./src/screens/Sidebar";

class App extends Component {
  
  state = {
    isLoadingComplete: false,
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isLoadingComplete: true });
  }

  render() {
      return (
        <Container>
        {
          this.state.isLoadingComplete ? (
              <AppContainer />
           ) : null
        }
       </Container>
       )
  }
}
export default App;

const HomeStackNavigator = createStackNavigator(
  {
    HomeScreen: HomeScreen
  },
  {
    navigationOptions: {
      header: {
        style: {
          marginTop: (Platform.OS === 'ios') ? 0 : 20/*Constants.statusBarHeight */
        }
      }
    }
  }
);

const MunkatarsakStackNavigator = createStackNavigator(
  {
    MunkatarsakScreen: MunkatarsakScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Button transparent onPress={() => navigation.navigate('Kezdőlap')} style={{marginTop: 5}}>
            <Icon name='arrow-back' style={{color: "white"}}/>
          </Button>
        ),
        headerRight: (
          <Button transparent onPress={() => navigation.openDrawer()} style={{marginTop: 5}}>
            <Icon name='menu' style={{color: "white"}}/>
          </Button>
        )
      };
    },
    navigationOptions: {
      header: {
          style: {
              elevation: 0,       //remove shadow on Android
              shadowOpacity: 0,   //remove shadow on iOS
          }
      }
    }
  }
);

const ProfileStackNavigator = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Button transparent onPress={() => navigation.navigate('Kezdőlap')} style={{marginTop: 5}}>
            <Icon name='arrow-back' style={{color: "white"}}/>
          </Button>
        ),
        headerRight: (
          <Button transparent onPress={() => navigation.openDrawer()} style={{marginTop: 5}}>
            <Icon name='menu' style={{color: "white"}}/>
          </Button>
        )
      };
    },
    navigationOptions: {
      header: {
          style: {
              elevation: 0,       //remove shadow on Android
              shadowOpacity: 0,   //remove shadow on iOS
          }
      }
    }
  }
);

const SettingsStackNavigator = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Button transparent onPress={() => navigation.navigate('Kezdőlap')} style={{marginTop: 5}}>
            <Icon name='arrow-back' style={{color: "white"}}/>
          </Button>
        ),
        headerRight: (
          <Button transparent onPress={() => navigation.openDrawer()} style={{marginTop: 5}}>
            <Icon name='menu' style={{color: "white"}}/>
          </Button>
        )
      };
    },
    navigationOptions: {
      header: {
          style: {
              elevation: 0,       //remove shadow on Android
              shadowOpacity: 0,   //remove shadow on iOS
          }
      }
    }
  }
);

const ForumStackNavigator = createStackNavigator(
  {
    Forum: ForumScreen,
    // Temakor: TemakorScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Button transparent onPress={() => navigation.navigate('Kezdőlap')} style={{marginTop: 5}}>
            <Icon name='arrow-back' style={{color: "white"}}/>
          </Button>
        ),
        headerRight: (
          <Button transparent onPress={() => navigation.openDrawer()} style={{marginTop: 5}}>
            <Icon name='menu' style={{color: "white"}}/>
          </Button>
        )
      };
    },
    navigationOptions: {
      header: {
          style: {
              elevation: 0,       //remove shadow on Android
              shadowOpacity: 0,   //remove shadow on iOS
          }
      }
    }
  }
);

const TemakorStackNavigator = createStackNavigator(
  {
    Temakor: TemakorScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Button transparent onPress={() => navigation.navigate('Fórum')} style={{marginTop: 5}}>
            <Icon name='arrow-back' style={{color: "white"}}/>
          </Button>
        ),
        headerRight: (
          <Button transparent onPress={() => navigation.openDrawer()} style={{marginTop: 5}}>
            <Icon name='menu' style={{color: "white"}}/>
          </Button>
        )
      };
    },
    navigationOptions: {
      header: {
          style: {
              elevation: 0,       //remove shadow on Android
              shadowOpacity: 0,   //remove shadow on iOS
          }
      }
    }
  }
);

const QuestionStackNavigator = createStackNavigator(
  {
    Question: QuestionScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Button transparent onPress={() => navigation.navigate('Témakör')} style={{marginTop: 5}}>
            <Icon name='arrow-back' style={{color: "white"}}/>
          </Button>
        ),
        headerRight: (
          <Button transparent onPress={() => navigation.openDrawer()} style={{marginTop: 5}}>
            <Icon name='menu' style={{color: "white"}}/>
          </Button>
        )
      };
    },
    navigationOptions: {
      header: {
          style: {
              elevation: 0,       //remove shadow on Android
              shadowOpacity: 0,   //remove shadow on iOS
          }
      }
    }
  }
);

/** Beúszó menü */
const Drawer = createDrawerNavigator(
  {
    Kezdőlap: { screen: HomeStackNavigator},
    Profil: ProfileStackNavigator,
    Munkatársak: MunkatarsakStackNavigator,
    Fórum: ForumStackNavigator,
    Témakör: TemakorStackNavigator,
    Kérdés: QuestionStackNavigator,
    Beállítások: SettingsStackNavigator,
  }, 
  { 
    initialRouteName: "Kezdőlap",
    drawerPosition: 'right',
    contentComponent: props => <Sidebar {...props} />
  }
);

/** Bejelentkezés, regisztráció (Authentikáció) */
const AuthStack = createStackNavigator(
  { 
    SignIn: SignInScreen, 
    SignUp: SignUpScreen 
  }
);

/** Alapértelmezett útvonal (Authentikáció) */
const AppSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: Drawer
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);