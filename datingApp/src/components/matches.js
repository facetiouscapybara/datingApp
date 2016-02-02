//this will be the screen where both sexes can see who theyve matched with and/or if the other person has accepted or denied the request
import React, { Component, View, Text, StyleSheet} from 'react-native';
import Firebase from 'firebase/';
import Geofire from 'geofire/'

const firebaseRef = new Firebase("https://rawdog.firebaseio.com/geofire");
const geoFire = new Geofire(firebaseRef);

export default class Matches extends Component {
  logoutOrPause() {
    geoFire.remove(this.props.profile.id)
  }
  componentWillMount(){
    if(this.props.profile.gender === 'male'){
      geoFire.set(this.props.profile.id, [this.props.locationLat, this.props.locationLon])
        .then(function(key){console.log('guys location set')})

      navigator.geolocation.watchPosition((loc) => {
        geoFire.set(this.props.profile.id, [loc.coords.latitude, loc.coords.longitude])
        console.log('watching:', loc)
      }, (err) => {
        console.log('error getting location:', err)
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>
          Thats it! Just hang out and when someone wants to message you it will appear on this screen!
        </Text>
      </View>
      <View><TouchableHighlist</View>
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