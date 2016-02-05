import React, { Component, View, Text, StyleSheet, Image } from 'react-native'
import FBSDKCore, { FBSDKAccessToken } from 'react-native-fbsdkcore/';
import Bio from './bio';
import List from './list';
import SignIn from './signin';
import fbApi from '../helpers/fbsdk';
import Matches from './matches';
import EditProfile from './editProfile';
import Tab from './tabs';
import logo from '../styles/LogoPerch2.png';

export default class Splash extends Component {
  
  handleRedirect(component) {
    if ( component === 'tab' ) {
      const props = { profile: this.state.profile, locationLat: this.state.latitude, locationLon: this.state.longitude }
      this.props.navigator.push({
        component: Tab,
        passProps: props,
        navigationBarHidden: true
      })
    } else {
      this.props.navigator.push({
        component: SignIn,
        title: 'Log In',
        navigationBarHidden: true,
        passProps: {navigator: this.props.navigator}
      }); 
    }
  }  

  handleFBProfile() {
    fbApi.fbProfile((result) => {
      this.setState({
        profile: result
      });
      this.handleRedirect('tab');
    });
  }

  componentWillMount = () => {
    navigator.geolocation.getCurrentPosition((loc, err) => {
      if(!err){
        this.setState({longitude: loc.coords.longitude, latitude: loc.coords.latitude})
      } else {
        console.log(err);
      }
    }); 
  };


  componentDidMount = () => {
    fbApi.fbToken((token) => {
      if (token) {
        this.handleFBProfile();
      } else {
        this.handleRedirect('signin');
        console.log("no tokennnnnnnnn");
      }
    });
  };

  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  logo: {
    
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})



















