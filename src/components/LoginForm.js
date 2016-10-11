import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input } from './common';
import firebase from 'firebase';

class LoginForm extends Component {
  state = { email: '', password: '', error: '' };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '' })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(() => {
          this.setState({ error: 'Authentication Failed.' });
        });
      });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder="user@email.com"
          />
        </CardSection>
        <CardSection>
          <Input
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder="password"
            secureTextEntry
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Log in
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;
