import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Text, StatusBar, Image } from 'react-native';
// import Touchable from 'react-native-platform-touchable';
import { onSignIn } from "../auth";

export default class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);

        state = {
            email   : '',
            password: '',
        }

        this._onFocus = this._onFocus.bind(this);
        this._onPress = this._onPress.bind(this);
    }
        
    state = {
        styles: {
            container: {
                padding: 20
            },
            inputContainer: {
                borderBottomColor: '#F5FCFF',
                backgroundColor: '#FFFFFF',
                borderRadius:30,
                borderBottomWidth: 1,
                width:250,
                height:45,
                marginBottom:20,
                flexDirection: 'row',
                alignItems:'center'
            },
            inputs:{
                height:45,
                marginLeft:16,
                borderBottomColor: '#FFFFFF',
                flex:1,
            },
            inputIcon:{
              width:30,
              height:30,
              marginLeft:15,
              justifyContent: 'center'
            },
             input: {
                 height: 40,
                 backgroundColor: 'rgba(255,255,255,0.2)',
                 marginBottom: 20,
                 color: '#FFF',
                 paddingHorizontal: 10
             },
             buttonContainer: {
                 backgroundColor: 'purple',
                 paddingVertical: 10,
                 marginRight:40,
                 marginLeft:40,
                 paddingTop:20,
                 paddingBottom:20,
                 backgroundColor:'#715f75',
                 borderRadius:10,
                 borderWidth: 2,
                 borderColor: '#fff'
             },
             buttonText: {
                 textAlign: 'center',
                 color: '#FFFFFF'
             }
        }
    };

    _onFocus(){
        // this.setState(prevState => ({
        //     ...prevState,
        //     styles: {
        //         ...prevState.styles,
        //         input: {
        //             ...prevState.styles.input, 
        //             borderWidth: 2,
        //             borderColor = '#d4b768',
        //         }
        //     }
        // }))
    }

    _onPress(){
        console.log('bejelentkezés');
        onSignIn().then(() => navigation.navigate("HomeScreen")); // NEW LOGIC
        // this.props._setIsLoggedin(true);
    }

    render() {

        const styles = this.state.styles;

        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                    <TextInput
                        placeholder="Felhasználónév vagy email"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.inputs}
                        selectionColor={'#d4b768'}
                        onFocus={this._onFocus()}
                        onSubmitEditing={() => this.passwordInput.focus()}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                    <TextInput
                        placeholder="Jelszó"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        returnKeyType="go"
                        secureTextEntry
                        style={styles.input}
                        ref={(input) => this.passwordInput = input}
                    />
                </View>

                {/* <Touchable 
                    onPress={this._onPress()}
                    activeOpacity={0.7}
                    style={styles.buttonContainer}
                    background={Touchable.Ripple('#d4b768')}>
                        <Text style={styles.buttonText}>
                            Bejelentkezés
                        </Text>
                </Touchable> */}
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//        padding: 20
//     },
//     input: {
//         height: 40,
//         backgroundColor: 'rgba(255,255,255,0.2)',
//         marginBottom: 20,
//         color: '#FFF',
//         paddingHorizontal: 10
//     },
//     buttonContainer: {
//         backgroundColor: 'purple',
//         paddingVertical: 10,
//         marginRight:40,
//         marginLeft:40,
//         paddingTop:20,
//         paddingBottom:20,
//         backgroundColor:'#715f75',
//         borderRadius:10,
//         borderWidth: 2,
//         borderColor: '#fff'
//     },
//     buttonText: {
//         textAlign: 'center',
//         color: '#FFFFFF'
//     }
// });