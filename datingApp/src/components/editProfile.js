//edit user Profile
import React, { Component, View, Text, StyleSheet, TextInput} from 'react-native';

export default class Matches extends Component {
	render () {
		return (
      <View style={styles.container}>
      	<TextInput
    			style={styles.textInput}
    			onChangeText={(text) => this.setState({text})}
    			value=""
  />


      	
      </View>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		marginTop: 65,
		flex:1
	},
	textInput: {
		height: 40, 
		borderColor: 'gray', 
		borderWidth: 1
	}
})