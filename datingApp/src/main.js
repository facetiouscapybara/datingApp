import React, { StyleSheet, Navigator, NavigatorIOS, Component } from 'react-native';
import FBSDKCore , { FBSDKGraphRequest, FBSDKAccessToken } from 'react-native-fbsdkcore/';
import Firebase from 'firebase/'
import SignIn from './components/signin'
import Bio from './components/bio'
import Chatroom from './components/chatRoom'
import List from './components/list';
import Matches from './components/matches';
import Splash from './components/splash';

export default class Main extends Component {

  render() {
    return (
      <NavigatorIOS 
        style={styles.container} 
        initialRoute={{
          title: 'TOLO',
          component: Splash
        }} />
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})