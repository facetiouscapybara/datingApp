import React, { Component, View, Text, StyleSheet, Image, ScrollView} from 'react-native';

export default class ListItem extends Component {
	render () {
		return (
			
			<View style={styles.container}>
				<Image 
					source={{uri: this.props.user.picture}}
        	style={styles.image} />
        <View style={styles.textBody}>
		      <Text>
		      	{this.props.user.name}
		      </Text>
		  	</View>
		  	<View style={styles.distance}>
		  	  <Text>
		      	distance
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
		marginTop: 10,
		marginLeft: 5,
		marginRight: 5,
		padding: 5,
    backgroundColor: '#48BBEC'
	},
	image : {
		flex: 4,
		borderRadius: 25,
		height: 100,
		width: 100
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
