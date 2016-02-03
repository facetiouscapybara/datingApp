//as the name implies the screen that hold the messages between the two, this will reference the firebase chat room
import React, { Component, View, Text, StyleSheet, TextInput, ScrollView, TouchableHighlight, Dimensions} from 'react-native';
import host from './../../constants.js';
import Firebase from 'firebase/';
import Geofire from 'geofire/';
import Message from './message';
import GiftedMessenger from 'react-native-gifted-messenger/';
import Button from 'react-native-button';

	export default class Chatroom extends Component {
	  constructor(props){
	  	super(props);

	  	this.state = {
	  		bio : "",
	  		firstName : this.props.first_name || 'Julianne'
	  	};
	  }
	  componentWillMount(){

	  	let roomNumber = this.props.roomNumber || '-K9ZSVb3HQucsVrBJ9Kj';
	  	that = this;
	  	chatroom = new Firebase('https://rawdog.firebaseio.com/chatroom/' + roomNumber);
	  	chatroom.on('child_added', function(child) {
	  		if(child.val().name !== that.state.firstName || child.val().isFirstMessage){
	  			that.handleReceive(child.val());
	  		}
	  	});
	  };
	  render() {
	    return (
	    	<View>
	    		<View style = {styles.buttonBox}>
	    			{this.button(null, 'Share Location', 'sendLocation')}
	    			{this.button(null, 'Block User', 'blockUser')}
	    		</View>
	      <GiftedMessenger
	        ref={(c) => this._GiftedMessenger = c}
   	      forceRenderImage= {true} 
   	      senderImage = {{image : {uri: 'https://facebook.github.io/react/img/logo_og.png'}}}
	        handleSend={this.handleSend}
	        maxHeight={Dimensions.get('window').height - 124}
	        loadEarlierMessagesButton = {true}
	        onImagePress={this.changeState}
	        styles={{
	          bubbleLeft: {
	            backgroundColor: '#e6e6eb',
	            marginRight: 70,
	          },
	          bubbleRight: {
	            backgroundColor: '#007aff',
	            marginLeft: 70,
	          },
	        }}
	      />
	      </View>
	    );
	  }
	handleSend(message = {}, rowID = null) {
			// message.name = that.state.firstName;
			// message.image = that.state.url || {uri: 'https://facebook.github.io/react/img/logo_og.png'};
	  //   chatroom.push(message)
	  }
	 changeState(rowData, rowId) {
	 	console.log(rowData)
	 }
	  handleReceive(message) {
	    this._GiftedMessenger.appendMessage({
	      text: message.text, 
	      name: message.name,
	      image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
	      position: message.position
	    });
	  }

	 handleRedirect () {

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
	button (callback, text, style) {
		return (
			<TouchableHighlight style = {styles[style]} underlayColor='gray' onPress={callback}>
				<Text style = {styles.buttonFont}>
					{text}
				</Text>
			</TouchableHighlight>)
	}

}
const styles = StyleSheet.create({
	buttonBox:{
		marginTop: 40,
		flexDirection: 'row',
		flex:2,
		justifyContent: 'center'
	},
	sendLocation: {
		width: 160,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 7,
		paddingBottom: 7,
		borderRadius: 15,
		alignSelf: 'center',
		marginLeft: 10,
		marginRight: 10,
		borderWidth:0,
		borderColor: '#007aff',
		backgroundColor: '#3abb3a'
		
	},
	blockUser: {
		width: 160,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 7,
		paddingBottom: 7,
		borderRadius: 15,
		alignSelf: 'center',
		marginLeft: 10,
		marginRight: 10,
		borderWidth:0,
		borderColor: '#007aff',
		backgroundColor: '#bb3a3a'
		
	},

	buttonFont: {
		color : 'white',
		fontSize : 17,
		textAlign: 'center'
	},
	container: {
		marginTop: 60,
		flex:1
	},
	textBox : {
		height: 70,
		flex:1,
		backgroundColor : "#999"
	}
})
