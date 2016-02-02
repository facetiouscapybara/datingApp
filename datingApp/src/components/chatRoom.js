//as the name implies the screen that hold the messages between the two, this will reference the firebase chat room
import React, { Component, View, Text, StyleSheet} from 'react-native';
import host from './../../constants.js';
import Firebase from 'firebase/';
import Geofire from 'geofire/';

export default class Chatroom extends Component {
	constructor(props){
		super(props);

		this.state = {
			text: ""
		};
	}

	render () {
		console.log('Im here')
		let text = "This is the chat room"
		return (
      <View style={styles.container}>
	  <Text>
	    and red
	</Text>
      </View>
		)
	}

	block () {
		let urlPath = host.SERVER_URL + '/api/relationship/' + this.props.profile.id;
		let accessToken = JSON.stringify(this.props.access_token);
		let queryObject = {
			method: "POST",
			headers: {
				'Accept': 'application/json',
	      'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.props.accessToken
			},
			body : {
				userId : this.props.userId,
				targetId : 'target'
			}
		};
		fetch(urlPath, queryObject)
			.then(function(res){
				result = JSON.parse(res._bodyText);
				console.log(result);
			});
	}
}
const styles = StyleSheet.create({
	container: {
		flex:1
	}
})
