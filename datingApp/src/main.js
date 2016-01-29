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
import Bio from './components/bio'
import Chatroom from './components/chatRoom'
import List from './components/list'
import Matches from './components/matches'
import EditProfile from './components/editProfile'



const ROUTES = {
  signin: SignIn,
  signup: SignUp,
  bio: Bio,
  chatRoom: Chatroom,
  list: List,
  matches: Matches,
  editProfile: EditProfile
}
export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      token: ''
    }
  }

  componentWillMount = () => {

  };

  renderScene = (route, navigator) => {
    console.log(route);
    var Component = ROUTES[route.name]
    return <Component />
  };

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: 'signin' }}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }} />
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})