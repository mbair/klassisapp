import React, { Component } from 'react';
import {
  AsyncStorage, 
  StatusBar,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {
  Container,
  Content,
  Text,
  Icon,
  View,
} from "native-base";
import FadeInView from '../../components/FadeInView';
import Colors from '../../constants/Colors';
import styles from "./styles";


class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ width: '100%', textAlign: 'center' }}>
        <Text style={{ width: '100%', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Klassis</Text>
        <Text style={{ width: '100%', textAlign: 'center', color: 'white' }}>A biztosítás</Text>
      </View>
    );
  }
}

export default class HomeScreen extends Component {

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      userNev: '',
      menupontok: [
        {id: 1, title: "Profil",        screen: "Profile",  icon: Platform.OS === 'ios' ? 'ios-person'  : 'md-person'},
        {id: 2, title: "Munkatársak",   screen: "Munkatársak",    icon: Platform.OS === 'ios' ? 'ios-people'  : 'md-people'},
        {id: 3, title: "Fórum",         screen: "Fórum",    icon: Platform.OS === 'ios' ? 'ios-compass' : 'md-compass'},
        // {id: 4, title: "Témakör",       screen: "Témakör",    icon: Platform.OS === 'ios' ? 'ios-compass' : 'md-compass'},
        // {id: 5, title: "Beállítások",   screen: "Settings", icon: Platform.OS === 'ios' ? 'ios-options' : 'md-options'},
        {id: 6, title: "Kijelentkezés", screen: "Logout",   icon: Platform.OS === 'ios' ? 'ios-power'   : 'md-power'},
      ]
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

    const { navigate } = this.props.navigation;

    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Content style={styles.content}>
          <FadeInView>

            <FlatList 
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={this.state.menupontok}
              horizontal={false}
              numColumns={2}
              keyExtractor= {(item) => {
                return item.id;
              }}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity 
                    activeOpacity={0.85}
                    style={styles.card} 
                    onPress={item.screen=='Logout' ? () => this._signOutAsync() : () => navigate(item.screen, {userId: this.state.userId, userNev: this.state.userNev})}
                  >
                    <View>
                      <Icon style={styles.cardIcon} name={item.icon} type='Ionicons' active/>
                      <View style={styles.cardHeader}>
                        <View style={{alignItems:"center", justifyContent:"center"}}>
                          <Text style={styles.title}>{item.title}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}/>
          </FadeInView>
        </Content>

      </Container>
    );
  }
}