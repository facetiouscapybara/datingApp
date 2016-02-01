//this will be the screen where both sexes can see who theyve matched with and/or if the other person has accepted or denied the request
import React, { Component, View, Text, StyleSheet} from 'react-native';
import Firebase from 'firebase/';
import Geofire from 'geofire/'

export default class Matches extends Component {
  componentWillMount(){
    if(this.props.profile.gender === 'male'){
      const firebaseRef = new Firebase("https://rawdog.firebaseio.com/geofire");
      const geoFire = new Geofire(firebaseRef);
      geoFire.set(this.props.profile.id, [this.props.locationLat, this.props.locationLon])
        .then(function(key){console.log('guys location set')})
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>
          Thats it! Just hang out and when someone wants to message you it will appear on this screen!
        </Text>
      </View>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
	}
})