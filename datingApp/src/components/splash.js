import React, { Component, View, Text, StyleSheet } from 'react-native'
import FBSDKCore, { FBSDKAccessToken } from 'react-native-fbsdkcore/';
import Bio from './bio';
import List from './list';
import SignIn from './signin';
import fbApi from '../helpers/fbsdk';
import Matches from './matches';
import EditProfile from './editProfile';


export default class Splash extends Component {
  componentWillMount = () => {
    navigator.geolocation.getCurrentPosition((loc, err) => {
      if(!err){
        this.setState({longitude: loc.coords.longitude, latitude: loc.coords.latitude})
      } else {
        console.log(err);
      }
    }); 
  };

  handleRedirect(component) {
    const props = { profile: this.state.profile, locationLat: this.state.latitude, locationLon: this.state.longitude }

    if (component === 'matches') {
      this.props.navigator.push({
        component: Matches,
        title: 'Matches',
        passProps: props      
      });
    } else if ( component === 'list' ) {
      this.props.navigator.push({
        component: List,
        title: "Guys In Your Area",
        passProps: props
      })
    }
    else {
     this.props.navigator.push({
       component: SignIn,
       title: 'Log In'
     }); 
    }
  }  

  handleFBProfile() {
    fbApi.fbProfile((result) => {
      this.setState({
        profile: result
      });
      if(this.state.profile.gender === 'female' || this.state.profile.name === 'Daniel Frehner') {
        this.handleRedirect('list')
      } else if(this.state.profile.gender === 'male'){
        this.handleRedirect('matches');
      }
    });
  }

  componentDidMount = () => {
    fbApi.fbToken((token) => {
      if (token) {
        this.handleFBProfile();
      } else {
        this.handleRedirect('signin');
      }
    });
  };

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>TOLO</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  logo: {
    fontSize: 75
  },
  container: {
    flex: 1,
    backgroundColor: '#48BBEC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginTop: 65
  }
})



















