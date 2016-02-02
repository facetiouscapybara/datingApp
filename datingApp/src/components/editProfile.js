//edit user Profile
import React, { Component, View, Text, StyleSheet, TextInput, Image, TouchableHighlight} from 'react-native';
import host from './../../constants.js'

let that;

export default class Matches extends Component {

	constructor(props){
		super(props)

		that = this;

		let urlPath;

		this.state = {
			text: "",
			bio:""
		}
	}



	componentWillMount (props) {
		urlPath = host.SERVER_URL + '/api/users/' + this.props.profile.id
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
				console.log(err, "error")
			})
			.then(function(res){
				console.log(res);
			})
	}

	postData() {
		let queryObject = {  
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer CAAOXApvBWf4BAHae88R2hTkbE0kZBnPYioZBrzQUi50ZCZCitgpSSXJktnszhDCGyycdV3inwmij89ka3eLtZCZBx2u0SxlydJjY5zMSdG10ns28ivu8qVUPRpkJV7mYSpVRf1Gxt6EQBbpV6UJuHZA3LY5QFopG4723lFtQ0ThsPZAVM0abKFeTLv7ipRkGlI5tGkfCfGQgDR3ZC1JwqY5KgzXUzDnEBlDAZD'
      },
      body: JSON.stringify({
      	bio:that.state.bio
      })
    }

    fetch(urlPath, queryObject)
    	.then(function(res){
    		console.log(res)
    		styles.saved.color = 'gray'
    		that.onSavePress()
    	})
    	.catch(function(err){
    		console.log(res)
    	})
	}

	onSavePress(){
		this.setState({
			text:"Saved"
		})
	}

	render () {
		return (
      <View style={styles.container}>
      	<View style={styles.imageBox}>
	        <Image style={styles.image} source={{uri:this.state.picture}}/>
      	</View>
  			{this.header()}
      	<TextInput
    			style={styles.bio}
    			onChangeText={(bio) => this.setState({bio})}
    			value={this.state.bio}
    			maxLength={255}
    			multiline={true}
  			/>
  			{this.wordCount()}
  			<View style={styles.buttonBox}>
  				<Text style={styles.saved}>{this.state.text}</Text>
	  			{this.button()}
  			</View>
      </View>
		)
	}
	header () {
		return (
			<View style={styles.header}>
		  	<Text style={styles.headerText}> Bio: </Text>
	  	</View>
	  )
	}

	button () {
		return (
			<TouchableHighlight underlayColor='gray' onPress={this.postData}>
				<Text style={styles.button}>
					Save
				</Text>
			</TouchableHighlight>)
	}

	wordCount () {
		return (
			<View style={styles.wordCount}>
				<Text>{255 - this.state.bio.length} characters remaining</Text>
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
		flex: 2,
		paddingLeft: 5,
		height: 200, 
		borderColor: 'gray', 
		borderWidth: 2,
		marginRight: 50,
		marginLeft: 30,
		borderRadius: 5,
		fontSize: 15,
		fontFamily: "HelveticaNeue-Light"	,
		backgroundColor: 'white'
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
		marginLeft: 2,
	},
	headerText: {
		fontFamily: "HelveticaNeue-Medium"
	},
	buttonBox:{
		flexDirection: 'row',
		flex:2,
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		padding:20,
		marginRight: 30
	},
	button: {
		borderRadius:10,
		borderWidth:1,
		borderColor: 'black',
		padding: 2
	},
	saved: {
		padding: 3,
		color: 'white',
		fontStyle: 'italic',
		paddingRight: 10
	},
	highlight: {
		borderRadius:10,
		borderWidth:1,
	}
})