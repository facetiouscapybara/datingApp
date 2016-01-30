import React, { Component, View, Text, StyleSheet, Image, ScrollView} from 'react-native';

export default class ListItem extends Component {
	render () {
		return (
			
			<View style={styles.container}>
				<Image 
					source={{uri: this.props.user.imageUrl}}
        	style={styles.image} />
        <View>
		      <Text>
		      	{this.props.user.name}, {this.props.user.age}
		      </Text>
		      <Text>
		      	{this.props.user.description}
		      </Text>
		  	</View>
	    </View>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: 'black',
		marginTop: 10,
		padding: 5
	},
	image : {
		width: 150, 
		height: 150
	},
	textBody:{
	
	}
})
