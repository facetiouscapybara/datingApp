//edit user Profile
import React, { Component, View, Text, StyleSheet, TextInput, Image} from 'react-native';
import host from './../../constants.js'
import GameChanger from '../../ios/somehowFixesEverything.gif';

let that;

export default class Matches extends Component {

		constructor(props){
			super(props)

			that = this;

			this.state = {
				text: ""
			}
		}

	componentDidMount (props) {
		let urlPath = host.SERVER_URL + '/api/users/' + this.props.profile.id
		console.log(urlPath)
		//need to set authorization header
		let accessToken = JSON.stringify(this.props.access_token)
		let queryObject = {
			method: "GET",
			headers: {
				'Accept': 'application/json',
        'Content-Type': 'application/json',
				'Authorization': 'Bearer CAAOXApvBWf4BADK8rwcr4LB7oFtZBPvIKUOSB1aaSUNxDTHdOiNzCb9xkqi8nWxsNhoaCkEy42QI8C95KbZChrGbmZCK12K2T9vbNmyUhnNt0a9Wvw3BYEpac4tXj7eW70kyXqDFrGMKloc7py7xmzwKhWfgogGQHykpHQcMEiRouJFmkteNF1BRhhkZCHdbZCHIuwUJOtpHtdHzbuQ9fwPwfyGizsewZD'
			}
		}
		fetch(urlPath, queryObject)
			.then(function(res){
				result = JSON.parse(res._bodyText)
				that.setState({
					id: result.id,
          access_token: result.access_token,
          first_name : result.first_name,
          name: result.name,
          age: result.age || 'null',
          picture: result.picture,
          gender: result.gender,
          preference: result.preference,
          bio: result.bio,
          headline: result.headline 
				})
			})
			.catch(function(error){
				console.log(typeof this.state.picture)
			})
			.then(function(res){
				console.log(res);
			})
	}

	render () {
		return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: this.state.picture}} />
      	<Text> Headline: </Text>
      	<TextInput
    			style={styles.headline}
    			onChangeText={(text) => this.setState({text})}//also must be changed to reset headline
    			value={this.state.text}//eventualy this.state.headline
    			maxLength={100}
  			/>
  			<Text></Text>
  			<Text></Text>

  			<Text> Bio: </Text>
      	<TextInput
    			style={styles.bio}
    			onChangeText={(text) => this.setState({text})}//changed to reset bio
    			value={this.state.text}//this.state.bio
    			multiline= {true}
    			maxLength={500}
  			/>
      </View>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		marginTop: 65,
		flex:1
	},
	headline: {
		paddingLeft: 5,
		height: 40, 
		borderColor: 'gray', 
		borderWidth: 1,
		marginRight: 50,
		marginLeft: 30,
		borderRadius: 5
	},
	bio: {
		paddingLeft: 5,
		height: 200, 
		borderColor: 'gray', 
		borderWidth: 1,
		marginRight: 50,
		marginLeft: 30,
		borderRadius: 5

	},
	image: {
		height: 125,
		width: 125,
		borderRadius: 65,
		marginTop: 50,
		alignSelf: 'center'
	},
})