import React, { Component, View, Text, StyleSheet, Image, ScrollView} from 'react-native';

export default class Message extends Component {
	render () {
		return (

			<View style={styles.container}>
				<View style={styles.textBody}>
					<Text>Username</Text>
		      <Text>
						{this.props.data.message}
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
	textBody:{
		paddingLeft: 5,
		flex: 5,
		width: 195
	}
})