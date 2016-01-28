
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Main from './src/main.js'

class datingApp extends Component {
  render() {
    return (
      <Main />
    );
  }
}


AppRegistry.registerComponent('datingApp', () => datingApp);
