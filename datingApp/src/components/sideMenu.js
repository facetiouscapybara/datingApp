import React, { Component, View, Text, StyleSheet, TabBarIOS} from 'react-native';
import SideMenu from 'react-native-side-menu';

export default class Menu extends Component {
	render () {
		return (
     	<SideMenu>
     		<Text>Butts</Text>
     	</SideMenu>
		)
	}
};

const styles = StyleSheet.create({
	tab: {
		flex:1,
		backgroundColor: 'red'
	}
})


//to be abstracted outinto constructor
const notifications = {
	requests: 0
}