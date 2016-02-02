//edit user Profile
import React, { Component, View, Text, StyleSheet, TextInput} from 'react-native';
import host from './../../constants.js'
export default class Matches extends Component {

		constructor(props){
			super(props)

			this.state = {
				text: ""
			}
		}

	// constructor () {
	// 	super();

	// 	this.onInputChange = this.onInputChange.bind(this);

	// 	return {
	// 			text: ""
	// 		}
	// }

	componentWillMount (props) {
		let urlPath = host.SERVER_URL + '/api/users/' + this.props.profile.id
		console.log(urlPath)
		//need to set authorization header
		let accessToken = JSON.stringify(this.props.access_token)
		let queryObject = {
			method: "GET",
			headers: {
				'Accept': 'application/json',
        'Content-Type': 'application/json',
				'Authorization': 'CAAOXApvBWf4BADK8rwcr4LB7oFtZBPvIKUOSB1aaSUNxDTHdOiNzCb9xkqi8nWxsNhoaCkEy42QI8C95KbZChrGbmZCK12K2T9vbNmyUhnNt0a9Wvw3BYEpac4tXj7eW70kyXqDFrGMKloc7py7xmzwKhWfgogGQHykpHQcMEiRouJFmkteNF1BRhhkZCHdbZCHIuwUJOtpHtdHzbuQ9fwPwfyGizsewZD'
			}
		}
		fetch(urlPath, queryObject)
			.then(function(res){
				console.log(res)
				this.setState({
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
	}

	onInputChange (event) {
		this.setState({
			text: event.target.value
		})
	}

	render () {
		return (
      <View style={styles.container}>
      	<Text> Headline: </Text>
      	<TextInput
    			style={styles.textInput}
    			onChangeText={(text) => this.setState({text})}//also must be changed to reset headline
    			value={this.state.text}//eventualy this.state.headline
  			/>
  			<Text></Text>
  			<Text></Text>

  			<Text> Bio: </Text>
      	<TextInput
    			style={styles.textInput}
    			onChangeText={(text) => this.setState({text})}//changed to reset bio
    			value={this.state.text}//this.state.bio
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
	textInput: {
		height: 40, 
		borderColor: 'gray', 
		borderWidth: 1,
		marginRight: 50,
		marginLeft: 30
	}
})