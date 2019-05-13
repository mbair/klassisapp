import React from 'react';
import {
  AsyncStorage,
  View,
  StatusBar,
} from 'react-native';
import AppPreLoader from '../../components/AppPreLoader';
import Colors from '../../constants/Colors';
import styles from "./styles";

export default class AuthLoadingScreen extends React.Component {
    
    constructor() {
        super();
        this._bootstrapAsync();
      }
    
      // Fetch the token from storage then navigate to our appropriate place
      _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userId');
    
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
      };
    
      // Render any loading content that you like here
      render() {
        return (
          <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <AppPreLoader/>
          </View>
        );
      }
}