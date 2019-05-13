import React from 'react';
import {AsyncStorage, Image, KeyboardAvoidingView, StatusBar, ImageBackground, Platform} from 'react-native';
import {
    Root,
    Container,
    Content,
    Text,
    Item,
    Input,
    Button,
    Icon,
    View,
    Toast,
    Spinner
  } from "native-base";
import AppPreLoader from '../../components/AppPreLoader';
import Colors from '../../constants/Colors';
import styles from "./styles";


const bg = require("../../../assets/images/klassis-login-bg.png");
const logo = require("../../../assets/images/klassis-logo-feher.png");

const required = value => (value ? undefined : "Kötelező");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

// declare type Any = any;

export default class SignInScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          user: '', /*'zoltan.hentes', */
          pass: '', /*'Manci', */
          error: '',
          userId: null,
          userNev: '',
          isSubmitting: false, 
          loading: false, 
          isLoadingComplete: false,
          showToast: false
        };
    }

    static navigationOptions = {
        header: null,
    };

  _submit() {
    this.setState({
      isSubmitting: true
    });

    return fetch('http://www.klassis.hu/app/json/data_login.php?user='+this.state.user+'&pass='+this.state.pass, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      // body: JSON.stringify(data)
    })
      .then(response => {

        this.setState({
          isSubmitting: false,
        });

        // set response code - 200 Successful Login
        if (response.status == 200) {
          response.json().then(responseJson => {
            responseJson = responseJson[0];

            console.log('responseJson', responseJson);

            if (responseJson && responseJson.id && responseJson.nev){
              this.setState({
                userId: responseJson.id,
                userNev: responseJson.nev
              })
            }

            console.log('responseJson.message', responseJson.message);

            Toast.show({
              text: responseJson.message,
              textStyle: { textAlign: "center" },
              type: "success",
              duration: 2000,
              onClose: this._signInAsync.bind(this)
            });
          });

        // set response code - 400 bad request
        } else if (response.status == 400) {
          response.json().then(responseJson => {
            Toast.show({
              text: responseJson.message,
              textStyle: { textAlign: "center" },
              type: "danger",
              duration: 3000,
            });
          });

        } 
      })
      .catch(error => console.error(error));
  }

  _signInAsync = async () => {
      console.log('user: ' + this.state.user, 'pass: ' + this.state.pass);
    try {
      await AsyncStorage.setItem('userId', this.state.userId)
        .then(AsyncStorage.setItem('userNev', this.state.userNev))
        .then(this.props.navigation.navigate('App'));
    } catch (error) {
      console.log('Hiba a bejelentkező user adatainak tárolása során!')
    }
  }
    

    render() {

      if (this.state.isLoading) {
        return (
          <AppPreLoader />
        );
      }

      return (
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
          <Root>
            <Container>
                <StatusBar barStyle="light-content" />
                <ImageBackground source={bg} style={styles.background}>
                    <Content contentContainerStyle={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Image source={logo} style={styles.logo} />
                    </View>
                    <View style={styles.container}>
                        <View style={styles.form}>
                            
                            <View>
                                <Item rounded style={styles.inputGrp}>
                                    <Icon active name="person" style={{ color: "#fff", marginLeft: 10 }}/>
                                    <Input
                                        placeholderTextColor="#FFF"
                                        autoCapitalize = "none"
                                        style={styles.input}
                                        placeholder="Felhasználónév"
                                        secureTextEntry={false}
                                        value={this.state.user}
                                        onChangeText={(text) => this.setState({ user: text })}
                                    />
                                </Item>
                            </View>

                            <View>
                                <Item rounded style={styles.inputGrp}>
                                  <Icon active name="unlock" style={{ color: "#fff", marginLeft: 10 }}/>
                                    <Input
                                        placeholderTextColor="#FFF"
                                        autoCapitalize = "none"
                                        style={styles.input}
                                        placeholder="Jelszó"
                                        secureTextEntry={true}
                                        value={this.state.pass}
                                        onChangeText={(text) => this.setState({ pass: text })}
                                    />
                                </Item>
                            </View>

                            <Button
                              iconLeft 
                              rounded
                              primary
                              block
                              large
                              style={styles.loginBtn}
                              onPress={this._submit.bind(this)}
                            >
                              {
                                this.state.isSubmitting ? <Spinner color="white" /> : null
                              }
                              <Text
                                style={
                                  Platform.OS === "android"
                                    ? { fontSize: 16, textAlign: "center" }
                                    : { fontSize: 16, fontWeight: "900" }
                                }
                              >
                                Bejelentkezés
                              </Text>
                            </Button>

                        </View>
                    </View>

                    </Content>
                </ImageBackground>
            </Container>
          </Root>
        </KeyboardAvoidingView>
      );
    }
}