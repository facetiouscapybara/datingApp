import React, { 
  Component, 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableHighlight,
  Dimensions
} from 'react-native';
import Bio from './bio';

const deviceWidth = Dimensions.get('window').width;
export default class ListItem extends Component {

	render () {
    console.log(this.props.user)
		return (
		<View style={[ { width: deviceWidth / 2, height: 250 } ]}>	
				<View style={[ { flex:1, marginLeft:10, marginRight: 10, marginTop:10, marginBottom:10 }]}>
				<TouchableHighlight
		      activeOpacity={0.5}
				  underlayColor={'#93E1CB'}
				  onPress={(e) => this.buttonPress()}
				  style={[ { backgroundColor: 'white', flex:1, borderRadius: 3, padding:10  }, styles.shadow ]}>
					<View key={this.props.key}>
						<Image 
							source={{uri: this.props.user.picture}} 
							style={styles.photo}/>
		        <View >
				      <Text style={[ {fontSize: 24, fontFamily: 'verdana'} ]}>
				      	{this.props.user.first_name}, {this.props.user.age}
				      </Text>
				  	</View>
				  	<View>
				  	  <Text>
				      	{this.props.user.distance} ft away
				      </Text>
				  	</View>
			    </View>
			  </TouchableHighlight>
			</View>  
		</View>  
		)
	}

	buttonPress() {
		const props = { 
			profile: this.props.user, 
			navgation: this.props.navigator, 
			currentUser: this.props.currentUser
		};
		this.props.navigator.push({
	    component: Bio,
	    title: this.props.user.first_name + "'s About Me",
	    passProps: props,
	    barTintColor: '#fff',
	    translucent: true,
	    tintColor: '#3cae8e',
	    shadowHidden: true,
	    titleTextColor: '#3cae8e'
    }); 
	}

};

const styles = StyleSheet.create({
	photo: {
    height: 170
	},
	shadow: {
		shadowColor: "#3cae8e",
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2
    }
	}
});
