
import React, { AppRegistry, Component } from 'react-native';

import Main from './src/main'

class datingApp extends Component {
  render() {
    return (
      <Main />
    );
  }
}


AppRegistry.registerComponent('datingApp', () => datingApp);
