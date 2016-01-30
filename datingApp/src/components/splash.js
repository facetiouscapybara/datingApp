import React, { Component, View, Text, StyleSheet } from 'react-native'
import FBSDKCore, { FBSDKAccessToken } from 'react-native-fbsdkcore/';
import Firebase from 'firebase/'
import Geofire from 'geofire'

export default class Splash extends Component {

  componentWillMount = () => {
    navigator.geolocation.getCurrentPosition((loc, err) => {
      if(!err){
        this.setState({longitude: loc.coords.longitude, latitude: loc.coords.latitude})
        console.log(loc)
      } else {
        console.log(err)
      } 
    })
  };

  componentDidMount = () => {
    FBSDKAccessToken.getCurrentAccessToken((token) => {
      if(token){
        tolkien = token.tokenString
      } else {
        console.log('no token present, please sign in')
        this.props.navigator.push({name: 'signin'})
      }
    })
    console.log('token:', tolkien)
  };

  render(){
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text style={styles.logo}>TOLO</Text></View>
  }
}

let tolkien
const styles = StyleSheet.create ({
  logo: {
    fontSize: 75
  }
})