//the sign in screen, facebook button, post mvp the user should not see this screen if a token is found on thier device
import React, {
  Component,
  StyleSheet,
  Text, 
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import FBSDKCore , { FBSDKGraphRequest, FBSDKAccessToken } from 'react-native-fbsdkcore/';
import FBSDKShare from 'react-native-fbsdkshare/';
import FBSDKLogin, { FBSDKLoginButton } from 'react-native-fbsdklogin/';
import fbApi from '../helpers/fbsdk';
import GameChanger from '../../ios/somehowFixesEverything.gif';
import Bio from './bio';
import host from './../../constants.js'

export default class SignIn extends Component {

    
  handleRedirect() {
    this.props.navigator.push({
      component: SignIn,
      title: 'Log In',
      passProps: {profile: this.state.profile}
    });

  }

  handleFBProfile() {
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
          preference: "null",
          bio: "null"   
        })
      };
      fetch(urlPath, queryObject)
        .then(function(res){
          let result = JSON.parse(res._bodyText);
          this.setState({
            profile: result
          });
          this.handleRedirect();
        });
    });

  }


  render(){
    return (
      <View style={styles.container}>
        <Image source={GameChanger} />
        <Text style={styles.text}>"Use Facebook to Sign In or Sign Up"</Text>
        <FBSDKLoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCancelled) {
                alert('Login cancelled.');
              } else {
                alert('Logged in.');
                this.handleFBProfile()
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={['public_profile','user_friends', 'email']}
          publishPermissions={['publish_actions']}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48BBEC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginTop: 65
  },
  text: {
    fontSize: 30,
    color: 'white',
    padding: 5,
    textAlign: 'center',
    marginBottom:20,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1}
  }
})


















