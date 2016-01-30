import React, { Component, View, Text, StyleSheet} from 'react-native';

export default class ListItem extends Component {
	render () {
		return (
      <Text>
      	{this.props.user.name}
      </Text>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		flex:1
	}
})
