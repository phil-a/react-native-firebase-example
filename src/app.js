import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import Config from 'react-native-config'

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
    apiKey: Config.FIREBASE_API_KEY,
    authDomain: `${Config.FIREBASE_HOST_URL}.firebaseapp.com`,
    databaseURL: `https://${Config.FIREBASE_HOST_URL}.firebaseio.com`,
    storageBucket: `${Config.FIREBASE_HOST_URL}.appspot.com`,
    messagingSenderId: `${Config.FIREBASE_MESSAGE_ID}`
    });
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        <Text>An App</Text>
      </View>
    );
  }
}

export default App;
