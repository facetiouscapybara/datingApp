//the sign in screen, facebook button, post mvp the user should not see this screen if a token is found on thier device
import React, {
  Component,
  StyleSheet,
  Text, 
  View,
  TouchableHighlight,
} from 'react-native';
import FBSDKCore , { FBSDKGraphRequest } from 'react-native-fbsdkcore/';
import FBSDKShare from 'react-native-fbsdkshare/';
import FBSDKLogin, { FBSDKLoginButton } from 'react-native-fbsdklogin';



export default class SignIn extends Component {

    
  handleLogin() {

    // Create a graph request asking for friends with a callback to handle the response.
    var fetchFriendsRequest = new FBSDKGraphRequest((error, result) => {
      if (error) {
        alert('Error making request.');
      } else {
        // Data from request is in result
        console.log("ooooooooooo", result);
      }
    }, '/me');
    // Start the graph request.
    fetchFriendsRequest.start();



  }


  render(){
    console.log("???????",FBSDKLoginButton)

    return (
      <View>
        <FBSDKLoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
              console.log(">>>>>>>>>",result);
              if (result.isCancelled) {
                alert('Login cancelled.');
              } else {
                alert('Logged in.');
                this.handleLogin();
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={[]}
          publishPermissions={['publish_actions']}/>
      </View>
    )
  }
  buttonPress(){
    console.log('button pressed!')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFC555',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 50,
    color: 'white',
    padding: 5,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1}
  },
  button: {
    borderWidth: 2,
    backgroundColor: 'blue',
    borderColor: 'black',
    borderRadius: 5
  }
})


/*         <TouchableHighlight 
          underlayColor='green'
          onPress={this.buttonPress}
          style={[styles.button]}
        >
          <Text style={styles.text}>Facebook</Text>
        </TouchableHighlight>
        */