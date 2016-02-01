import React, { Component, View, Text, StyleSheet } from 'react-native'
import FBSDKCore, { FBSDKAccessToken } from 'react-native-fbsdkcore/';
//import Geofire from 'geofire/'
import Bio from './bio';
import Firebase from 'firebase/'
import Geofire from 'geofire/'


export default class Splash extends Component {

  componentWillMount = () => {
    navigator.geolocation.getCurrentPosition((loc, err) => {
      if(!err){
        this.setState({longitude: loc.coords.longitude, latitude: loc.coords.latitude})
        console.log(loc);
      } else {
        console.log(err);
      } 
    })
  };

  componentDidMount = () => {
    FBSDKAccessToken.getCurrentAccessToken((token) => {
      if(token){
        tolkien = token.tokenString
        console.log(this.props.navigator);
        this.props.navigator.push({name: 'bio'});
      } else {
        console.log('no token present, please sign in')
        this.props.navigator.push({name: 'signin'})
      }
    })
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



















