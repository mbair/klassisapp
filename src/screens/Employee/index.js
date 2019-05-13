import React, { Component } from 'react';
import {
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Root,
  Container,
  Header,
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

class MyListItem extends React.PureComponent {
  render() {
    const item = this.props.item;
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.uzletkoto_nev}</Text>
          <Text style={styles.uzletkoto_tipus}>{item.uzletkoto_tipus}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Email: </Text>{item.users_email}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Kérdések száma: </Text>{item.users_kerdes}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Válaszok száma: </Text>{item.users_valasz}</Text>
          {item.uzletkoto_mobil_tel ? <Text style={styles.info}><Text style={styles.bold}>Mobil: </Text>{item.uzletkoto_mobil_tel}</Text> : null}
          {item.uzletkoto_ceg ? <Text style={styles.info}><Text style={styles.bold}>Cég: </Text>{item.uzletkoto_ceg}</Text> : null}
          {item.uzletkoto_manager_nev ? <Text style={styles.info}><Text style={styles.bold}>Manager: </Text>{item.uzletkoto_manager_nev}</Text> : null}
        </View>
      </TouchableOpacity>
    )
  }
}

export default class MunkatarsakScreen extends React.Component {

  static navigationOptions = {
    title: 'Munkatársak',
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: []
    };

    this.arrayholder = [];
  }

  componentWillMount = async () => {
    /** Reload Page data every time */
    this.props.navigation.addListener('didFocus', () => this._getData());
    console.log('Munkatársak componentWillMount');
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
        // console.log('responseJson', responseJson);

        this.arrayholder = responseJson;

        this.setState({
          isLoading: false,
          data: responseJson
        });

        this.forceUpdate();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.users_nev.toUpperCase()}   
      ${item.users_nev.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ data: newData });  
  };

  _renderItem = ({ item }) => (
    <MyListItem item={item}/>
  );

  render() {
    return (
      <View style={styles.container}>

        <Container>
          <StatusBar barStyle="light-content" />
          
          <Header searchBar rounded style={styles.searchBar}>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Keresés" onChangeText={text => this.searchFilterFunction(text)} />
              <Icon name={"ios-people"} />
            </Item>
            <Button transparent>
              <Text>Keresés</Text>
            </Button>
          </Header>
        
          {this.state.isLoading ? <AppPreLoader /> : 
            <FlatList 
              style={styles.userList}
              data={this.state.data}
              keyExtractor= {(item) => item.users_id}
              renderItem={this._renderItem}
            />}

        </Container>
      </View>
    );
  }
}