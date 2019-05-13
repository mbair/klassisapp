import React, { Component } from 'react';
import { AsyncStorage, Button, View, Text } from 'react-native';
import Colors from '../../constants/Colors';
import styles from "./styles";

export default class SignUpScreen extends Component {

    constructor(props) {
        super(props)
    }
    
    static navigationOptions = {
      title: 'Regisztráció',
    };

    render() {
      return (
        <View style={styles.container}>
            <Text>Regisztráció</Text>
            <Button title="Regisztráció!" onPress={this._signInAsync} />
        </View>
      );
    }
  
    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('App');
    };
}