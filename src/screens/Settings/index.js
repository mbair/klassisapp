var Color = require("color");
import React, { Component } from "react";
import { StatusBar, Image, Switch, TouchableOpacity, Platform } from "react-native";

import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Thumbnail,
  Item,
  Input,
  View,
  Left,
  Right,
  Body
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import Colors from '../../constants/Colors';
import styles from "./styles";

const primary = require("../../theme/variables/commonColor").brandPrimary;
const light = Color(primary).alpha(0.3);

export default class SettingsScreen extends Component {
  constructor() {
    super(props);
    this.state = {
      monSwitch: true,
      tueSwitch: false,
      wedSwitch: false,
      thuSwitch: false,
      friSwitch: false,
      satSwitch: false,
      sunSwitch: false,
      Username: "",
      email: "",
      password: "",
      offset: {
        x: 0,
        y: 0
      }
    };
  }

  static navigationOptions = {
    // header: null,  
    title: 'Beállítások',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#715f75',
    },
  }
   
   render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Content showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.profileButtons}>
              <Button transparent style={styles.roundedButton}>
                <Icon
                  name="cloud-upload"
                  style={
                    Platform.OS === "android"
                      ? { color: "#FFF", width: 23 }
                      : { color: "#FFF", width: 22 }
                  }
                />
              </Button>
              <TouchableOpacity style={{ alignSelf: "center" }}>
                <Thumbnail
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
                  style={styles.profilePic}
                />
              </TouchableOpacity>
              <Button transparent style={styles.roundedButton}>
                <Icon
                  name="cloud-download"
                  style={
                    Platform.OS === "android"
                      ? { color: "#FFF", width: 23 }
                      : { lineHeight: 0, color: "#FFF", width: 22 }
                  }
                />
              </Button>
            </View>
          </View>

          <View style={styles.bg}>
            <View style={styles.signupContainer}>
              <Item rounded style={styles.inputGrp}>
                <Icon name="person" style={{ color: "#fff" }}/>
                <Input
                  placeholder="Felhasználónév"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="mail" style={{ color: "#fff" }}/>
                <Input
                  placeholder="Email"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="unlock" style={{ color: "#fff" }}/>
                <Input
                  placeholder="Jelszó"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  secureTextEntry
                  style={styles.input}
                />
              </Item>
            </View>
          </View>
          <View style={styles.notificationSwitchContainer}>
            <Text style={styles.notificationHeader}>EMAIL ÉRTESÍTÉSEK</Text>
            <View>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Hétfő
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ monSwitch: value })}
                    style={styles.switch}
                    value={this.state.monSwitch}
                  />
                </Col>
              </Grid>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Kedd
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ tueSwitch: value })}
                    style={styles.switch}
                    value={this.state.tueSwitch}
                  />
                </Col>
              </Grid>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Szerda
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ wedSwitch: value })}
                    style={styles.switch}
                    value={this.state.wedSwitch}
                  />
                </Col>
              </Grid>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Csütörtök
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ thuSwitch: value })}
                    style={styles.switch}
                    value={this.state.thuSwitch}
                  />
                </Col>
              </Grid>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Péntek
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ friSwitch: value })}
                    style={styles.switch}
                    value={this.state.friSwitch}
                  />
                </Col>
              </Grid>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Szombat
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ satSwitch: value })}
                    style={styles.switch}
                    value={this.state.satSwitch}
                  />
                </Col>
              </Grid>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Vasárnap
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ sunSwitch: value })}
                    style={styles.switch}
                    value={this.state.sunSwitch}
                  />
                </Col>
              </Grid>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}