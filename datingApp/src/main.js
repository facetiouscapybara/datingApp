import React, { StyleSheet, Navigator } from 'react-native';
import Firebase from 'firebase'
import ReactFire from 'reactfire'
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
      token: '',
      longitude: null,
      latitude: null
    }
  }
  
  componentWillMount = () => {
    firebaseUser = new Firebase("https://rawdog.firebaseio.com/users");
    navigator.geolocation.getCurrentPosition((loc) => 
      {this.setState({longitude: loc.coords.longitude, latitude: loc.coords.latitude})
        firebaseUser.push({
          sex: 'dude2',
          user: 'dannn',
          location: {
            longitude: this.state.longitude,
            latitude: this.state.latitude
          }
        });
      }
    )
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