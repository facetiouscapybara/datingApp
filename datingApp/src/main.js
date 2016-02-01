import React, { StyleSheet, Navigator, NavigatorIOS, Component } from 'react-native';
import FBSDKCore , { FBSDKGraphRequest, FBSDKAccessToken } from 'react-native-fbsdkcore/';
import Firebase from 'firebase/'
//import Geofire from 'geofire/'
import SignIn from './components/signin'
import SignUp from './components/signup'
import Bio from './components/bio'
import Chatroom from './components/chatRoom'
import List from './components/list';
import Matches from './components/matches';
import Splash from './components/splash';


const ROUTES = {
  splash: Splash,
  signin: SignIn,
  signup: SignUp,
  bio: Bio,
  chatRoom: Chatroom,
  list: List,
  matches: Matches
};

export default class Main extends Component {
  renderScene = (route, navigator) => {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />
  };

  render() {
    // return (
    //   <Navigator
    //     style={styles.container}
    //     initialRoute={{ name: 'signin'}}
    //     renderScene={this.renderScene}
    //     configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }} />
    // );
    return (
      <NavigatorIOS 
        style={styles.container} 
        initialRoute={{
          title: 'TOLO',
          component: SignIn
        }} />
    )
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})