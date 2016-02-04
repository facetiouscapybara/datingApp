//this will be the screen where both sexes can see who theyve matched with and/or if the other person has accepted or denied the request
import React, { Component, View, Text, StyleSheet} from 'react-native';
import Firebase from 'firebase/';
import Geofire from 'geofire/'

const firebaseRef = new Firebase("https://rawdog.firebaseio.com/geofire");
const geoFire = new Geofire(firebaseRef);

export default class Matches extends Component {
  constructor(props){
    super(props);
    this.state = {
      requestList: [],
      currentUser: props.profile
    }
  }

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

    const firebaseUserRef = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.currentUser.id)
    firebaseUserRef.on('child_added', (key) => {
      let oldReq = this.state.requestList
      oldReq.push(key.val())
      console.log(key.val())
      this.setState({requestList: oldReq})
    }).bind(this)
    // firebaseUserRef.on('child_removed')
  }

  render () {
    if(this.props.profile.gender === 'male' && this.state.requestList.length === 0) {
      return (
        <View style={styles.container}>
          <Text>
            Thats it! Just hang out and when someone wants to message you it will appear on this screen!
          </Text>
        </View>
  		)
    } else if( this.props.profile.gender === 'male' ) {
      return (<View style={styles.container}><Text>Something else here</Text></View>)
    } else if ( this.props.profile.gender === 'female' && this.state.requestList.length === 0){
      return (
        <View style={styles.container}>
          <Text>
            This is where your pending requests go! Go out there and find someone!
          </Text>
        </View>
      )
    }
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
	}
})