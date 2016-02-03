//as the name implies the screen that hold the messages between the two, this will reference the firebase chat room
import React, { Component, View, Text, StyleSheet} from 'react-native';
import host from './../../constants.js';
import Firebase from 'firebase/';
import Geofire from 'geofire/';
import Message from './message'

export default class Chatroom extends Component {
	constructor(props){
		super(props);

		this.state = {
			messages : []
		};
	}
	componentWillMount(){
		let that = this;
		var chatroom = new Firebase('https://rawdog.firebaseio.com/chatroom/-K9ZSVb3HQucsVrBJ9Kj');

		chatroom.on('child_added', function(child) {
			let messages = that.state.messages;
			messages.push(child.val());
			that.setState({
				messages: messages
			});
		});

	};
	render () {
		let messages = this.state.messages.map((message, index)=> {
			return <Message data={message} key={index}/>
		})
		return (
      <View style={styles.container}>
	  		{messages}
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
		marginTop: 60,
		flex:1
	}
})
