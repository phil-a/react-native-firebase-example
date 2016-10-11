import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import Config from 'react-native-config'
import LoginForm from './components/LoginForm';
class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
    apiKey: Config.FIREBASE_API_KEY,
    authDomain: `${Config.FIREBASE_HOST_URL}.firebaseapp.com`,
    databaseURL: `https://${Config.FIREBASE_HOST_URL}.firebaseio.com`,
    storageBucket: `${Config.FIREBASE_HOST_URL}.appspot.com`,
    messagingSenderId: `${Config.FIREBASE_MESSAGE_ID}`
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
        case true:
          return (
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          );
        case false:
          return <LoginForm />;
        default:
          return (
            <View style={styles.spinnerStyle}>
              <Spinner />
            </View>
          );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  spinnerStyle: {
    marginVertical: 200
  }
};

export default App;
