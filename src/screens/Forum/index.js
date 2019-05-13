import React, { Component } from 'react';
import {
  AsyncStorage,
  StatusBar,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { Root, Container, Header, Content, Form, Textarea, Body, Title, Right, Button, Icon, Text, Fab, Spinner, Toast } from 'native-base';
import AppPreLoader from '../../components/AppPreLoader';
import Colors from '../../constants/Colors';
import styles from "./styles";

export default class ForumScreen extends Component {

  static navigationOptions = {
    title: 'Fórum',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
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
    }
  }

  componentWillMount = async () => {
    /** Reload Page data every time */
    this.props.navigation.addListener('didFocus', () => this._getData());
    console.log('Forum componentWillMount');
  }

  _getData(){
    this.setState({ isLoading: true });
    return fetch('http://www.klassis.hu/app/json/data_temakor.php', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson', responseJson);
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
    this.props.navigation.navigate('Temakor', {
      itemId: item.id,
      title: item.title,
    });
  }

  _setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    if (!visible) this._getData();
  }

  _toggleModal() {
    this._setModalVisible(!this.state.modalVisible)
  }

  _submit() {
    this.setState({
      isSubmitting: true
    });

    let data = {
      "title": this.state.newData
    }

    return fetch('http://www.klassis.hu/app/json/add_temakor.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
      })
      .then(response => {

        console.log('response', response);

        this.setState({
          isSubmitting: false,
        });

        // set response code - 201 created
        if (response.status == 201) {
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
        } else if (response.status == 503) {
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
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <FlatList
          style={styles.root}
          data={this.state.data}
          extraData={this.state}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          keyExtractor={item => item.id}
          renderItem={(item) => {
            // console.log('item', item);
            const Group = item.item;
            let mainContentStyle;
            if(Group.attachment) {
              mainContentStyle = styles.mainContent;
            }
            return(
              <TouchableOpacity onPress={() => this._onPress(Group)}>
                <View style={styles.container}>
                  <View style={styles.content}>
                    <View style={mainContentStyle}>
                      <View style={styles.text}>
                        <Text style={styles.groupName}>{Group.title}</Text>
                      </View>
                      <Text style={styles.countMembers}>
                        {Group.kerdesek_szama} kérdés
                      </Text>
                      {Group.utoljara_modositva ?
                      <Text style={styles.timeAgo}>
                        Utoljára módosítva: {Group.utoljara_modositva.substring(0, 10).replace(/-/g, ".")}
                      </Text>: null}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}/>

        <Fab
          style={styles.fab}
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
                  <Title style={{ width: '90%' }}>Témakör hozzáadása</Title>
                </Body>
                <Right>
                  <Button transparent onPress={() => this._setModalVisible(!this.state.modalVisible)}>
                    <Icon name='close' />
                  </Button>
                </Right>
              </Header>
              <Content padder>
                <Form>
                  <Textarea rowSpan={5} bordered placeholder="Témakör" onChangeText={(text) => this.setState({ newData: text })} />
                  <Button
                    disabled={this.state.newData == ""}
                    block
                    iconLeft
                    style={this.state.newData == "" ? styles.inactiveButton : styles.activeButton}
                    onPress={() => this._submit()}>
                    {this.state.isSubmitting ? <Spinner color="white" /> : <Icon name="add" />}
                    <Text>Témakör hozzáadása</Text>
                  </Button>
                </Form>
              </Content>
            </Container>
          </Root>
        </Modal>

      </View>
    );
  }
}