// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity, ImageBackground, AsyncStorage } from "react-native";

import { NavigationActions, StackActions } from "react-navigation";
import {
  Container,
  Content,
  Text,
  Icon,
  ListItem,
  Thumbnail,
  View
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import Colors from '../../constants/Colors';
import styles from "./style";

const logo100px = require("../../../assets/images/klassis-logo-100px.png");

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      userNev: '',
    };
  }

  componentWillMount = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userNev = await AsyncStorage.getItem('userNev');
      if (userId !== null && userNev !== null) {
        console.log('Logged In User: ', userId, userNev);
        this.setState({
          userId: userId,
          userNev: userNev
        })
      } else {
        this._signOutAsync();
      }
    } catch (error) {
      console.log('Hiba a bejelentkezett User adatainak lekérése során!');
    }
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={styles.container}>
      <ImageBackground source={require("../../../assets/images/sidebar-transparent.png")} style={styles.background}>

        <Image source={logo100px} style={styles.logo} />
          <Content style={styles.drawerContent}>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Kezdőlap");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-home" style={styles.icon}/>
              <Text style={styles.linkText}>Kezdőlap</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Profile");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-person" style={styles.icon}/>
              <Text style={styles.linkText}>Profil</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Munkatársak");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-people" style={styles.icon}/>
              <Text style={styles.linkText}>Munkatársak</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Fórum");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-compass" style={styles.icon}/>
              <Text style={styles.linkText}>Fórum</Text>
            </ListItem>
            {/* <ListItem
              button
              onPress={() => {
                navigation.navigate("Settings");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-options" style={styles.icon}/>
              <Text style={styles.linkText}>Beállítások</Text>
            </ListItem> */}
          </Content>
          <View style={styles.logoutContainer}>
            <View style={styles.logoutbtn} foregroundColor={"white"}>
              <Grid>
                <Col>
                  <TouchableOpacity
                    onPress={() => {
                      this._signOutAsync();
                    }}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "transparent"
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      Kijelentkezés
                    </Text>
                    <Text note style={{ color: "#fff" }}>
                      {this.state.userNev}
                    </Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => {
                      navigation.navigate("Profile");
                    }}
                  >
                    <Thumbnail
                      source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
                      style={styles.profilePic}
                    />
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
          </View>
          </ImageBackground>
      </Container>
    );
  }
}

export default SideBar;
