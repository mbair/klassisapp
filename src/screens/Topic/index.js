import React, { Component } from 'react';
import {
  AsyncStorage,
  StatusBar,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal
} from 'react-native';
import { Root, Container, Header, Content, Form, Textarea, Body, Title, Right, Button, Icon, Text, Fab, Spinner, Toast } from 'native-base';
import AppPreLoader from '../../components/AppPreLoader';
import Colors from '../../constants/Colors';
import styles from './styles';

export default class TemakorScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: () => null,
      title: navigation.getParam('title', 'NO-TITLE'),
      headerTintColor: Colors.headerTintColor,
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      userNev: '',
      isLoading: true,
      isSubmitting: false,
      modalVisible: false,
      showToast: false,
      data: [],
      newData: "",
    };
  }

  componentWillMount = async () => {
    /** Reload Page data every time */
    this.props.navigation.addListener('didFocus', () => this._getData());
    console.log('Kérdés componentWillMount');

    try {
      const userId = await AsyncStorage.getItem('userId');
      const userNev = await AsyncStorage.getItem('userNev');
      if (userId !== null && userNev !== null) {
        console.log('Logged In User: ', userId, userNev);
        this.setState({
          userId: userId,
          userNev: userNev,
        });
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
  }

  componentWillReceiveProps(nextProps) {
    console.log('Kérdés componentWillReceiveProps');
    if (nextProps.navigation.state.params.itemId !== this.props.navigation.state.params.itemId){
      this._getData(nextProps.navigation.state.params.itemId);
    }
  }

  _getData(itemId = this.props.navigation.getParam('itemId')){
    console.log('Kérdés itemId', itemId);
    this.setState({ isLoading: true });
    return fetch('http://www.klassis.hu/app/json/data_kerdes.php?temakor_id=' + itemId, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log('responseJson', responseJson);

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

  _onPress(item) {
    console.log('onPress', item);
    this.props.navigation.navigate('Question', {
      itemId: item.id,
      title: item.title,
    });
  }

  _setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    if (!visible) this._getData();
  }

  _toggleModal(){
    this._setModalVisible(!this.state.modalVisible)
  }

  _submit(){
    this.setState({
      isSubmitting: true
    });

    let data = {
      "temakor_id": this.props.navigation.getParam('itemId'),
      "user_id": this.state.userId,
      "title": this.state.newData
    }

    return fetch('http://www.klassis.hu/app/json/add_kerdes.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data)
      })
      .then(response => {

        this.setState({
          isSubmitting: false,
        });

        // set response code - 201 created
        if (response.status == 201){
          response.json().then(responseJson => {
            this.setState({ newData: "" });

            Toast.show({
              text: responseJson.message,
              textStyle: { textAlign: "center" },
              type: "success",
              duration: 2000,
              onClose: this._toggleModal.bind(this)
            });
          });
        
        // set response code - 503 service unavailable
        } else if (response.status == 503){
          response.json().then(responseJson => {
            Toast.show({
              text: responseJson.message,
              textStyle: { textAlign: "center" },
              type: "danger",
              duration: 3000,
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
        
        // set response code - 500 Server Error
        } else if (response.status == 500) {
          Toast.show({
            text: "Server Error",
            textStyle: { textAlign: "center" },
            type: "danger",
            duration: 3000,
          });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <AppPreLoader />
      );
    }

      return (
        <Container style={styles.container}>
          <StatusBar barStyle="light-content" />
          <FlatList
            style={styles.questionList} 
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const datum = item.utoljara_modositva ? item.utoljara_modositva.substr(0, 10).replace(/-/g, ".") : "";
              return (
                <TouchableOpacity key={item.id} onPress={() => this._onPress(item)}>
                  <View style={styles.questionBox}>
                    <View style={styles.content}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.users_nev}>
                        {item.valaszok_szama} válasz -  {item.users_nev} - {datum}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          <Fab
            style={{ backgroundColor: '#715f75' }}
            position="bottomRight"
            onPress={() => this._setModalVisible(true)}>
            <Icon name="add" />
          </Fab>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <Root>
            <Container>
              <Header style={styles.modalHeader}>
                <Body>
                  <Title>Kérdés hozzáadása</Title>
                </Body>
                <Right>
                  <Button transparent onPress={() => this._setModalVisible(!this.state.modalVisible)}>
                    <Icon name='close' />
                  </Button>
                </Right>
              </Header>
              <Content padder>
                <Form>
                  <Textarea rowSpan={5} bordered placeholder="Kérdés" onChangeText={(text) => this.setState({ newData: text })} />
                  <Button 
                    disabled={this.state.newData == ""}
                    block 
                    iconLeft 
                    style={this.state.newData == "" ? { backgroundColor: "silver", marginTop: 10 } : { backgroundColor: "#715f75", marginTop: 10 }} 
                    onPress={() => this._submit()}>
                      {this.state.isSubmitting ? <Spinner color="white" /> : <Icon name="add" />}
                      <Text>Kérdés hozzáadása</Text>
                  </Button>
                </Form>
              </Content>
            </Container>
            </Root>
          </Modal>
 
        </Container>
        
      );
  }
}