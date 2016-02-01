import React, { Component, View, Text, StyleSheet } from 'react-native'
import FBSDKCore, { FBSDKAccessToken } from 'react-native-fbsdkcore/';
import Bio from './bio';
import SignIn from './signin';
import Firebase from 'firebase/';
import fbApi from '../helpers/fbsdk';
//import Geofire from 'geofire/'


export default class Splash extends Component {

  componentWillMount = () => {
    navigator.geolocation.getCurrentPosition((loc, err) => {
      if(!err){
        this.setState({longitude: loc.coords.longitude, latitude: loc.coords.latitude})
        console.log(loc);
      } else {
        console.log(err);
      } 
    });

  };

  handleRedirect(component) {
    if (component === 'bio') {
      this.props.navigator.push({
        component: Bio,
        title: 'Profile',
        passProps: {profile: this.state.profile}
      });
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
      this.handleRedirect('bio');
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


let tolkien
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



















