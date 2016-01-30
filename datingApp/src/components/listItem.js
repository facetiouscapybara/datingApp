import React, { Component, View, Text, StyleSheet, Image, ScrollView} from 'react-native';

export default class ListItem extends Component {
	render () {
		return (
			
			<View style={styles.container}>
				<Image 
					source={{uri: this.props.user.imageUrl}}
        	style={styles.image} />
        <View style={styles.textBody}>
		      <Text>
		      	{this.props.user.name}, {this.props.user.age}
		      </Text>
		      <Text>
		      	{this.props.user.description}
		      </Text>
		  	</View>
		  	<View style={styles.distance}>
		  	  <Text>
		      	{this.props.user.dist}
		      </Text>
		  	</View>
	    </View>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 10,
		borderWidth: 2,
		borderColor: 'black',
		marginTop: 10,
		marginLeft: 5,
		marginRight: 5,
		padding: 5,
		backgroundColor: 'blue'
	},
	image : {
		flex: 4,
		borderWidth: 1,
		borderRadius: 50,
		height: 150
	},
	textBody:{
		paddingLeft: 5,
		flex: 5,
		width: 195
	}, 
	distance: {
		flex: 1,
		minWidth: 50
	}
})
