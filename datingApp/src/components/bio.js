//this will be the screen where, upon signing up the user is taken to write a short bio of themselves
import React, { Component, View, Text, Image, StyleSheet, TouchableHighlight, ScrollView, TextInput} from 'react-native';
import Firebase from 'firebase'
export default class Bio extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	currentUser: props.currentUser,
	  	facebookId: props.profile.facebookId,
	  	age: props.profile.age_range,
	  	first_name: props.profile.first_name,
	  	gender: props.profile.gender,
	  	picture: props.profile.picture,
	  	text: ' Hi! Want to meet up?'
	  };
	  this.buttonSubmit = this.buttonSubmit.bind(this)
	  console.log('inbio:',props)
	}

  buttonSubmit = () => {
    alert('message sent!')
  	const firebase = new Firebase('http://rawdog.firebaseio.com/chatroom/')
    let ref = firebase.push()
    let room = ref.toString()
    const firebaseChat = new Firebase(room)
  	const firechatRequestedUser = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.facebookId)
  	const firechatCurrentUser = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.currentUser.id)
    firebaseChat.push({name: this.state.currentUser.first_name, text: this.state.text, isFirstMessage: true, image: this.state.currentUser.picture})
    firechatRequestedUser.push({room: room, userOne: this.state.currentUser.id})
    firechatCurrentUser.push({room: room, userOne: this.state.facebookId})
    this.props.navigator.pop()
  };
	render () {
		return (
      <View style={styles.container}>
      	<ScrollView style={styles.bio}>
	      	<Image style={styles.image} source={{uri: this.state.picture}} />
	      	<Text style={styles.name}>{this.state.first_name}</Text>
        </ScrollView>
        <View style={styles.inputView}>
          <TextInput 
            style={styles.inputBox}
            onFocus={() => this.setState({text: ' '})}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}/>
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.7}
            underlayColor={'#3ABB3A'}
            onPress={this.buttonSubmit}>
            <Text style={styles.buttonText}>Send Request!</Text>
          </TouchableHighlight>
        </View>
      </View>
		)
	}
};
const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: '#48BBEC',
		marginTop: 40,
		paddingBottom: 10
	},
	bio: {
		flex: 12
	},
	buttons: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
    width: 200,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'green'
	},
	buttonText: {
		color: 'white',
		fontSize: 25,
		paddingTop: 5,
		alignSelf: 'center'
	},
	image: {
		height: 125,
		width: 125,
		borderRadius: 65,
		alignSelf: 'center'
	},
	name: {
		alignSelf: 'center',
		fontSize: 30,
		margin: 10,
		color: 'white'
	},
	inputView: {
		flex: 1
	},
	inputBox: {
		flex: 1,
		alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 400,

    borderRadius: 5
	}
})