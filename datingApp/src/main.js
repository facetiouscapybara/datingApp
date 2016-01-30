
import React, { StyleSheet, Navigator, Component } from 'react-native';
import Firebase from 'firebase/'
import Geofire from 'geofire'
import SignIn from './components/signin'
import SignUp from './components/signup'
import Bio from './components/bio'
import Chatroom from './components/chatRoom'
import List from './components/list'
import Matches from './components/matches'

const ROUTES = {
  signin: SignIn,
  signup: SignUp,
  bio: Bio,
  chatRoom: Chatroom,
  list: List,
  matches: Matches
}
export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      token: 'hammertime!BLAZEIT',
      longitude: null,
      latitude: null
    }
  }
  
  componentWillMount = () => {
    firebase = new Firebase("https://rawdog.firebaseio.com/geofire");
    geoFire = new Geofire(firebase);
    if ("geolocation" in navigator) {
      console.log("available");
    } else {
      console.log("not available llll");
    }
    navigator.geolocation.getCurrentPosition((loc) => 
      {this.setState({longitude: loc.coords.longitude, latitude: loc.coords.latitude})
        console.log(loc)
        geoFire.set(this.state.token, [this.state.latitude, this.state.longitude]).then(function() {
          console.log("Provided key has been added to GeoFire");
          }, function(error) {
          console.log("Error: " + error);
        });
        let geoQuery = geoFire.query({
          center: [this.state.latitude, this.state.longitude],
          radius: 0.5
        });
        console.log(geoQuery)
      }
    )
  };

  renderScene = (route, navigator) => {
    console.log(".............",route);
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