import React, { Component } from 'react';
import { StatusBar, Image, ScrollView } from 'react-native';
import {
  Root,
  Text,
  View,
  Spinner,
} from "native-base";
import Colors from '../../constants/Colors';
import styles from "./styles";

export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      userNev: '',
      data: [],
      isLoading: false,
    };
  }

  static navigationOptions = {
    title: 'Profil',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  }

  componentWillMount(){
    const params = this.props.navigation.state.params;
    if (params && params.userId && params.userNev) {
      this.setState({
        userId: params.userId,
        userNev: params.userNev,
      });

      /** Reload Page data every time */
      this.props.navigation.addListener('didFocus', () => this._getData());
      console.log('Forum componentWillMount');
    }
  }

  _getData() {
    this.setState({ isLoading: true });
    return fetch('http://www.klassis.hu/app/json/data_users.php', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: this._search(this.state.userId, responseJson) || []
        }, () => {
            this.setState({ isLoading: false })
        });

        console.log('profil getdata', this.state.data);
        // this.forceUpdate();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _search(users_id, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].users_id === users_id) {
        return myArray[i];
      }
    }
  }

  render() {
    const data = this.state.data || [];

    return (
      <Root>
        <ScrollView>
          <StatusBar barStyle="light-content" />
          <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>{this.state.userNev}</Text>
              
                {this.state.isLoading ? <Spinner color={Colors.tintColor} /> : 

                  <View>
                    {data.uzletkoto_tipus ? <Text style={styles.tipus}>{data.uzletkoto_tipus}</Text> : null}
                    {data.users_email ?<Text style={styles.row}><Text style={styles.bold}>Email:</Text> {data.users_email}</Text> : null}
                    {data.users_kerdes ? <Text style={styles.row}><Text style={styles.bold}>Kérdések száma:</Text> {data.users_kerdes}</Text> : null}
                    {data.users_valasz ? <Text style={styles.row}><Text style={styles.bold}>Válaszok száma:</Text> {data.users_valasz}</Text> : null}
                    {data.uzletkoto_mobil_tel ? <Text style={styles.row}><Text style={styles.bold}>Mobil:</Text> {data.uzletkoto_mobil_tel}</Text> : null}
                    {data.uzletkoto_ceg ? <Text style={styles.row}><Text style={styles.bold}>Cég:</Text> {data.uzletkoto_ceg}</Text> : null}
                    {data.uzletkoto_szekhely ? <Text style={styles.row}><Text style={styles.bold}>Székhely:</Text> {data.uzletkoto_szekhely}</Text> : null}
                    {data.uzletkoto_manager_nev ? <Text style={styles.row}><Text style={styles.bold}>Manager:</Text> {data.uzletkoto_manager_nev}</Text> : null}
                  </View>
                }
                
              </View>
          </View>
        </ScrollView>
      </Root>
    );
  }
}