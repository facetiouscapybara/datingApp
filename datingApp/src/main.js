//main page, abstracted out of index.ios.js so that we can port it to android as well if we want to.
import React, {
  Component,
  StyleSheet,
  Text, 
  View,
  Navigator
} from 'react-native';
import SignIn from './components/signin'
import SignUp from './components/signup'

const ROUTES = {
  signin: SignIn
  signup: SignUp
}
export default class Main extends Component {
  render() {
    return (
      <Navigator
       style={}
       intitialRoute={{name: 'signin'}}
       renderScene={}
       configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }} />
    );
  }
}