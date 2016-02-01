//this will be the screen where, upon signing up the user is taken to write a short bio of themselves
import React, { Component, View, Text, Image, StyleSheet} from 'react-native';

export default class Bio extends Component {
	constructor(props) {
	  super(props);
	  console.log(this.props, "in the bio page");
	  this.state = {
	  	id: props.profile.id,
	  	age: props.profile.age_range,
	  	first_name: props.profile.first_name,
	  	gender: props.profile.gender,
	  	picture: props.profile.picture.data.url
	  };
	}

	render () {
		return (
      <View style={styles.container}>
      	<Image style={styles.image} source={{uri: this.state.picture}} />
      	<Text style={styles.name}>{this.state.first_name}</Text>

      </View>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: '#48BBEC',
		paddingBottom: 10
	},
	image: {
		height: 125,
		width: 125,
		borderRadius: 65,
		marginTop: 50,
		alignSelf: 'center'
	},
	name: {
		alignSelf: 'center',
		fontSize: 30,
		marginTop: 30,
		marginBottom: 20,
		color: 'white'
	}
})