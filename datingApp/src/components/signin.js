//the sign in screen, facebook button, post mvp the user should not see this screen if a token is found on thier device
import React, {
  Component,
  StyleSheet,
  Text, 
  View,
  TouchableHighlight,
} from 'react-native';

// import FBSDKLogin from 'react-native-fbsdklogin';


export default class SignIn extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Sign In:
        </Text>
        <TouchableHighlight 
          underlayColor='green'
          onPress={this.buttonPress}
          style={[styles.button]}
        >
          <Text style={styles.text}>Facebook</Text>
        </TouchableHighlight>
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