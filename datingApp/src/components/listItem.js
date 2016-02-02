import React, { Component, View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';

export default class ListItem extends Component {
	render () {
		return (
		<TouchableHighlight
		  onPress={console.log('pressed')}>
			<View style={styles.container} key={this.props.key}>
				<Image 
					source={{uri: this.props.user.picture}}
        	style={styles.image} />
        <View style={styles.textBody}>
		      <Text style={styles.text}>
		      	{this.props.user.name}
		      </Text>
		  	</View>
		  	<View style={styles.distance}>
		  	  <Text>
		      	{this.props.user.distance} ft away
		      </Text>
		  	</View>
	    </View>
	  </TouchableHighlight>  
		)
	}
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		marginLeft: 0,
		marginRight: 5,
		padding: 5,
    backgroundColor: '#48BBEC'
	},
	image : {
		flex: 4,
		borderRadius: 10,
		height: 100,
		width: 100
	},
	textBody:{
		paddingLeft: 5,
		flex: 5,
		width: 195
	}, 
	text: {
		fontSize: 20
	},
	distance: {
		marginRight: 10,
		flex: 1,
		minWidth: 50
	}
})
