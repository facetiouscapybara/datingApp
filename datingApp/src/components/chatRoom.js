//as the name implies the screen that hold the messages between the two, this will reference the firebase chat room
import React, { 
	Component, 
	AlertIOS, 
	View, 
	Text, 
	StyleSheet,
	TextInput, 
	ScrollView, 
	TouchableHighlight, 
	Dimensions
} from 'react-native';
import host from './../../constants.js';
import Firebase from 'firebase/';
import Geofire from 'geofire/';
import Match from './matches';
import Tabs from './tabs';

import GiftedMessenger from 'react-native-gifted-messenger';

  export default class Chatroom extends Component {
	  constructor(props){
	  	super(props);
	  	this.state = {
	  		bio : "",
	  		firstName : this.props.first_name || 'Julianne',
	  		url: this.props.picture
	  	};
	  }

	  addMessage = (child) => {
			if(child.val().name !== that.state.firstName || child.val().isFirstMessage){
				let message = child.val();
				message.position = message.isFirstMessage ? "right" : "left";
				that.handleReceive(message);
			}
	  }; 

	  componentWillMount(){
	  	let roomNumber = this.props.roomNumber || '-K9ZSVb3HQucsVrBJ9Kj';
	  	that = this;
	  	chatroom = new Firebase('https://rawdog.firebaseio.com/chatroom/' + roomNumber);
	  	chatroom.on('child_added', this.addMessage)
	  };

	  render() {
	    return (
	    	<View>
	    		<View style = {styles.buttonBox}>
	    			{this.button(this.leavingAlert, 'Leave Chat', 'leaveChat')}
		    		</View>
		      <GiftedMessenger
		        ref={(c) => this._GiftedMessenger = c}
		 	      forceRenderImage= {true} 
		        handleSend={this.handleSend}
		        maxHeight={Dimensions.get('window').height - 124}
		        loadEarlierMessagesButton = {true}
		        onImagePress={this.changeState}
		        styles={{
		          bubbleLeft: {
		            backgroundColor: '#e6e6eb',
		            marginRight: 70
		          },
		          bubbleRight: {
		            backgroundColor: '#007aff',
		            marginLeft: 70
		          },
		        }}/>
	      </View>
	    );
	  }

	  handleSend(message = {}, rowID = null) {
	  	console.log(that.props)
			message.name = that.state.firstName;
			message.image = {uri :that.state.url};
	    chatroom.push(message)
	  }

	  handleReceive(message) {
	    this._GiftedMessenger.appendMessage({
	      text: message.text, 
	      name: message.name,
	      image: {uri: message.image ? message.image.uri : 'https://facebook.github.io/react/img/logo_og.png'},
	      position: message.position
	    });
	  }

		leavingAlert () {
		 	AlertIOS.alert(
		 		"You can't come back.",
		 	  'Are you sure you want to leave?',
		 	  [{text: 'Leave', onPress: that.leaveChat}, {text: 'Stay'}],
		 	  null
		 	)
		}

  addMessage = (child) => {
		if(child.val().name !== that.state.firstName || child.val().isFirstMessage){
			let message = child.val();
			message.position = message.isFirstMessage ? "right" : "left";
			that.handleReceive(message);
		}
  }; 

  componentWillMount(){
  	let roomNumber = this.props.roomNumber || '-K9ZSVb3HQucsVrBJ9Kj';
  	that = this;
  	chatroom = new Firebase('https://rawdog.firebaseio.com/chatroom/' + roomNumber);
  	chatroom.on('child_added', this.addMessage)
  };

  render() {
    return (
    	<View>
    		<View style = {styles.buttonBox}>
    			{this.button(this.leavingAlert, 'Leave Chat', 'leaveChat')}
	    		</View>
	      <GiftedMessenger
	        ref={(c) => this._GiftedMessenger = c}
	 	      forceRenderImage= {true} 
	        handleSend={this.handleSend}
	        maxHeight={Dimensions.get('window').height - 124}
	        loadEarlierMessagesButton = {true}
	        onImagePress={this.changeState}
	        styles={{
	          bubbleLeft: {
	            backgroundColor: '#e6e6eb',
	            marginRight: 70
	          },
	          bubbleRight: {
	            backgroundColor: '#007aff',
	            marginLeft: 70
	          },
	        }}/>
      </View>
    );
  }

  handleSend(message = {}, rowID = null) {
		message.name = that.state.firstName;
		message.image = {uri: that.state.url} || 'https://facebook.github.io/react/img/logo_og.png';
    chatroom.push(message);
  }

  handleReceive(message) {
    this._GiftedMessenger.appendMessage({
      text: message.text, 
      name: message.name,
      image: {uri: message.image.uri},
      position: message.position
    });
  }

	leavingAlert () {
	 	AlertIOS.alert(
	 		"You can't come back.",
	 	  'Are you sure you want to leave?',
	 	  [{text: 'Leave', onPress: that.leaveChat}, {text: 'Stay'}],
	 	  null
	 	);
	}

	leaveChat () {

	 	var message = {
	 		text: that.state.firstName + " has left the chat.",
	 		name: 'TOLO',
	 		//put TOLO logo in here eventually
	 		image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}
	 	};
	 	chatroom.push(message);
	 	chatroom.off('child_added', this.addMessage);
		that.props.navigator.replacePreviousAndPop({
      component: Tabs,
      passProps: {
        profile: that.props.profile,
        chattingCount: that.state.chattingCount
      },
      navigationBarHidden: true,
    });
	}

	button (callback, text, style) {
		return (
			<TouchableHighlight style = {styles[style]} underlayColor='#ffeeee' onPress={callback}>
				<Text style = {styles.buttonFont}>
					{text}
				</Text>
			</TouchableHighlight>
		);
	}

};

const styles = StyleSheet.create({
	buttonBox:{
		marginTop: 40,
		flexDirection: 'row',
		flex:2,
	},
	leaveChat: {
		width: 160,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 7,
		paddingBottom: 7,
		borderRadius: 15,
		alignSelf: 'center',
		marginLeft: 10,
		marginRight: 10,
		borderWidth:1,
		borderColor: '#ff7777',
		backgroundColor: '#fff'
		
	},
	buttonFont: {
		color : '#ff7777',
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
});








