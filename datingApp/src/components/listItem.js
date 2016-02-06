import React, { 
  Component, 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableHighlight
} from 'react-native';
import Bio from './bio'

export default class ListItem extends Component {
	
	render() {
		return (
			<TouchableHighlight
	      activeOpacity={0.3}
			  underlayColor={'#48BBEC'}
			  onPress={(e) => this.buttonPress()}>
				<View style={styles.container} key={this.props.key}>
					<Image 
						source={{uri: this.props.user.picture}}
	        	style={styles.image} />
	        <View style={styles.textBody}>
			      <Text style={styles.text}>
			      	{this.props.user.first_name}
			      </Text>
			  	</View>
			  	<View style={styles.distance}>
			  	  <Text>
			      	{this.props.user.distance} ft away
			      </Text>
			  	</View>
		    </View>
		  </TouchableHighlight>
		);
	}
	buttonPress() {
		console.log("this is inside list item currentUser is", this.props.currentUser);
		const props = { 
			profile: this.props.user, 
			navgation: this.props.navigator, 
			currentUser: this.props.currentUser
		};
		this.props.navigator.push({
	    component: Bio,
	    title: this.props.user.first_name + "'s About Me",
	    passProps: props,
	    barTintColor: 'rgba(72,187,236,0)',
	    translucent: true,
	    tintColor: 'rgb(0,0,0)'
    }); 
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
});
