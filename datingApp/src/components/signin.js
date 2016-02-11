//the sign in screen, facebook button, post mvp the user should not see this screen if a token is found on thier device
import React, {
  Component,
  StyleSheet,
  Text, 
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import FBSDKLogin, { FBSDKLoginButton } from 'react-native-fbsdklogin/';
import fbApi from '../helpers/fbsdk';
import host from './../../constants.js';
import Splash from './splash';
import GameChanger from '../../ios/somehowFixesEverything.gif';

export default class SignIn extends Component {

  handleFBProfile() {
    let that = this;

    fbApi.fbProfile((result) => {

      let urlPath = host.SERVER_URL + '/api/login';
      let queryObject = {  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: result.id,
          access_token: result.access_token,
          first_name : result.first_name,
          name: result.name,
          age: result.age || 'null',
          picture: result.picture,
          gender: result.gender,
          preference: "",
          education : "",
          industry : "",
          bio: ""
        })
      };

      fetch(urlPath, queryObject)
        .then(function(res){
          that.handleRedirect();
        }).catch((err) => {
          console.log("Error When Fetch User Profile", err);
        })
    });

  }

  handleRedirect() {
    this.props.navigator.replace({
      component: Splash
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <Image source={GameChanger} />
        <Text style={styles.text}>"Log In With facebook"</Text>
        <FBSDKLoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCancelled) {
                alert('Login cancelled.');
              } else {
                this.handleFBProfile()
              }
            }
          }}

          onLogoutFinished={() => {
            alert("Logged out.");
          }}

          readPermissions={['public_profile','user_friends', 'email']}
          publishPermissions={['publish_actions']}/>
      </View>
    )
  }

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  text: {
    fontSize: 30,
    color: '#3cae8e',
    padding: 5,
    textAlign: 'center',
    marginBottom:20,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1}
  }
})


















