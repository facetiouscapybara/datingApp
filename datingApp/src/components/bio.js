
import React, { 
  Component, 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableHighlight, 
  ScrollView, 
  TextInput,
  Dimensions
} from 'react-native';
import Firebase from 'firebase';
const widthDimensions = (Dimensions.get('window').width) - 20
export default class Bio extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	currentUser: props.currentUser,
	  	facebookId: props.profile.facebookId,
	  	age: props.profile.age,
	  	first_name: props.profile.first_name,
	  	gender: props.profile.gender,
	  	picture: props.profile.picture,
	  	bio: props.profile.bio,
	  	distance: props.profile.distance,
	  	education: props.profile.education,
	  	industry: props.profile.industry,
	  	text: ' Hi! Want to chat?'
	  };
	  this.buttonSubmit = this.buttonSubmit.bind(this);
	}

  buttonSubmit() {
    alert('message sent!');
    const firebase = new Firebase('http://rawdog.firebaseio.com/chatroom/');
    let ref = firebase.push();
    let room = ref.toString();
    const firebaseChat = new Firebase(room);

    const firechatRequestedUser = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.facebookId);

    const firechatCurrentUser = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.currentUser.id);
    
    firebaseChat.push({
      name: this.state.currentUser.first_name, 
      text: this.state.text, 
      isFirstMessage: true, 
      image: {uri: this.state.currentUser.picture}
    });

    let ref1 = firechatRequestedUser.push();

    let ref2 = firechatCurrentUser.push();

    ref1.set({
      room: firebaseChat.key(), 
      id: this.state.currentUser.id,
      photo: this.state.currentUser.picture,
      name: this.state.currentUser.first_name,
      otherUserKey: ref2.key() ,
      accepted: false
    });

    ref2.set({
      room: firebaseChat.key(), 
      id: this.state.facebookId,
      photo: this.state.picture,
      name: this.state.first_name, 
      otherUserKey: ref1.key(),
      accepted: false
    });

    this.props.navigator.pop();
  }

  render() {
		return (
      <View style={styles.container} onMagicTap={this.buttonSubmit}>
      	<View style={styles.bioBox}>
          <View style={styles.mainBox}>
    	      	<Image style={styles.image} source={{uri: this.state.picture}} />
    	      	<Text style={styles.name}>{this.state.first_name}, {this.state.age || "?"}</Text>
          </View>
          <View style={styles.infoBox}>
    	      	{this.header("  Works in: ")}
              <View style={{backgroundColor:'#3cae8e'}}>
    	      	  <Text style={styles.bio}>{this.state.industry}</Text>
              </View>  
    	      	{this.header("  Went to school at: ")}
              <View style={{backgroundColor:'#3cae8e'}}>
    	      	  <Text style={styles.bio}>{this.state.education}</Text>
              </View>  
    	      	{this.header("  About: " + this.state.first_name)}
    	      	<View style={{backgroundColor:'#3cae8e'}}>
                <Text style={styles.bio}>{this.state.bio}</Text>
              </View>
          </View>
        </View>
        <View style={styles.inputView}>
          <TextInput 
            style={styles.inputBox}
            onFocus={() => this.setState({text: ' '})}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}/>
        </View>
        <View style={styles.buttons}>
          <View style={{flex: 1}}></View>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.7}
            underlayColor={'#0C8362'}
            onPress={this.buttonSubmit}>
            <Text style={styles.buttonText}>Send Request!</Text>
          </TouchableHighlight>
          <View style={{flex: 1}}></View>
        </View>
      </View>
		)
	}

	header(text) {
		return (
			<View style={styles.header}>
		  	<Text style={styles.headerText}> {text} </Text>
	  	</View>
	  )
	}
};

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: '#fff',
		marginTop: 70
	},
  mainBox: {
    marginLeft: 20, 
    marginRight: 20,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    shadowColor: "#3cae8e", 
    shadowOpacity: 1, 
    shadowRadius: 5, 
    shadowOffset: {height: 2,width: 2}
  },
	bioBox: {
		flex: 12
	},
	bio: {
		paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 18
	},
	buttons: {
		flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f5fffc'
	},
	button: {
    alignSelf: 'center',
    flex: 4,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#3cae8e'
	},
	buttonText: {
		color: 'white',
		fontSize: 25,
		paddingTop: 5,
		alignSelf: 'center'
	},
	image: {
		height: 300,
    width: 300,
    marginTop: 40,
		borderRadius: 4,
		alignSelf: 'center'
	},
	name: {
		alignSelf: 'center',
		fontSize: 30,
		margin: 10,
		color: '#0c8362'
	},
	inputView: {
		flex: 1,
    backgroundColor: '#f5fffc'
	},
	inputBox: {
    flex: 1,
		alignSelf: 'center',
    marginTop: 5,
    backgroundColor: 'rgba(147,225,203,0.5)',
    borderRadius: 5,
    width: widthDimensions
	},
  header: {
    paddingTop: 5,
    backgroundColor: '#93E1CB'
  },
  headerText: {
    fontSize: 14,
    color: '#0c8362'
  },
  infoBox: {
    marginLeft: 20, 
    marginRight: 20,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    shadowColor: "#3cae8e", 
    shadowOpacity: 1, 
    shadowRadius: 5, 
    shadowOffset: {height: 2,width: 2}
  }
});







