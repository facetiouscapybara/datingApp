//edit user Profile
import React, { Component, View, Text, StyleSheet, TextInput, Image, TouchableHighlight} from 'react-native';
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
				'Authorization': 'Bearer CAAOXApvBWf4BAHae88R2hTkbE0kZBnPYioZBrzQUi50ZCZCitgpSSXJktnszhDCGyycdV3inwmij89ka3eLtZCZBx2u0SxlydJjY5zMSdG10ns28ivu8qVUPRpkJV7mYSpVRf1Gxt6EQBbpV6UJuHZA3LY5QFopG4723lFtQ0ThsPZAVM0abKFeTLv7ipRkGlI5tGkfCfGQgDR3ZC1JwqY5KgzXUzDnEBlDAZD'
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

	test() {
		console.log("Submitted")
	}

	render () {
		return (
      <View style={styles.container}>
      	<View style={styles.imageBox}>
	        <Image style={styles.image} source={{uri: this.state.picture}} />
      	</View>
  			<Text></Text>
  			<View style={styles.header}>
	  			<Text> Bio: </Text>
  			</View>
      	<TextInput
    			style={styles.bio}
    			onChangeText={(bio) => this.setState({bio})}//changed to reset bio
    			value={this.state.bio}//this.state.bio
    			maxLength={500}
  			/>
  			<View style={styles.buttonBox}>
	  			{this.button()}
  			</View>
      </View>
		)
	}

	button () {
		return (
			<TouchableHighlight underlayColor='gray' onSubmit={this.test}>
				<Text style={styles.button}>
					Save
				</Text>
			</TouchableHighlight>)
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
		flex: 2,
		paddingLeft: 5,
		height: 200, 
		borderColor: 'gray', 
		borderWidth: 1,
		marginRight: 50,
		marginLeft: 30,
		borderRadius: 5
	},
	imageBox: {
		flex:2,
	},
	image: {
		height: 125,
		width: 125,
		borderRadius: 50,
		marginTop: 50,
		alignSelf: 'center'
	},
	header: {
		marginBottom: 10,
		marginLeft: 2
	},
	buttonBox:{
		flexDirection: 'row',
		flex:2,
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		padding:20,
		marginRight: 30,
	},
	button: {
		borderRadius:10,
		borderWidth:1,
		borderColor: 'black',
		padding: 2
	},
	highlight: {
		borderRadius:10,
		borderWidth:1,
	}
})