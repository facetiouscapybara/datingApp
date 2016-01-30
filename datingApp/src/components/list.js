//this will be the page the females see when they first log in showing them who is around them
import React, { Component, View, Text, StyleSheet, ListView} from 'react-native';
import ListItem from './listItem'


export default class List extends Component {


	render () {
		console.log("I'm trying")
		return (
      <View style={styles.container}>
      	<Text> 
      		Dude's nearby
      	</Text>
      	<ListItem user={users[0]} />
      </View>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		flex:1,
		backgroundColor: 'green'
	}
})

const users = [
	{
		name: 'brian',
		age: 24,
		description: 'Moustache Rides Anyone?',
		preference: 'female',
		gender: 'male',
		imageUrl:'http://images-cdn.moviepilot.com/images/c_fill,h_331,w_500/t_mp_quality/xel5asph5jw8z2fw6xmc/super-troopers-2-crowd-funded-in-24-hours-324417.jpg'
	},
	{
		name: 'Eric Geneisse',
		age: 28,
		description: 'Need some woodworking done?',
		preference: 'female',
		gender: 'male',
		imageUrl:'https://www.google.com/search?q=google+images&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjT_7qZndLKAhVP0GMKHexpAgoQ_AUIBygB&biw=1274&bih=778#tbm=isch&q=super+troopers&imgrc=m1xF8_5_7tLPAM%3A'
	},
	{
		name: 'Zelong Ma',
		age: 23,
		description: 'My name is Marlon and I\'m here to party',
		preference: 'female',
		gender: 'male',
		imageUrl:'http://content.internetvideoarchive.com/content/photos/583/620523_013.jpg'
	},
	{
		name: 'Lucky Lady',
		age: 26,
		description: 'Moustache Rides Anyone?',
		preference: 'male',
		gender: 'female',
		imageUrl:'http://www.psdgraphics.com/file/female-silhouette.jpg'
	}
]