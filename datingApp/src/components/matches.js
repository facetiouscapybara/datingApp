//this will be the screen where both sexes can see who theyve matched with and/or if the other person has accepted or denied the request
import React, { Component, View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import Firebase from 'firebase/';
import Geofire from 'geofire/'
import MatchesItem from './matchesItem'
import ChatRoom from './chatRoom'
var BackgroundGeolocation = require('react-native-background-geolocation');
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
      navigator.geolocation.watchPosition((loc) => {
        geoFire.set(this.props.profile.id, [loc.coords.latitude, loc.coords.longitude])
      }, (err) => {
        console.log('error getting location:', err)
      })
    }

    const firebaseUserRef = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.currentUser.id)
    
    firebaseUserRef.on('child_added', (req) => {
      let reqObj = req.val()
      let reqKey = req.key()
      reqObj['key'] = reqKey
      let oldReq = this.state.requestList
      oldReq.push(reqObj)
      this.setState({requestList: oldReq})
      console.log(this.state)
    }).bind(this)

    firebaseUserRef.on('child_removed', (removed) => {
      let remKey = removed.key()
      let removeList = this.state.requestList
      for(var i = 0; i < removeList.length; i++){
        if( removeList[i].key === remKey ){
          removeList.splice(i, 1)
        }
      }
      this.setState({requestList: removeList})
    }).bind(this)

  }

  render () {
    if(this.props.profile.gender === 'male' && this.state.requestList.length === 0) {
      return (
        <View style={styles.container}>
          <Text>
            Thats it! Just hang out and when someone wants to message you, it will appear on this screen!
          </Text>
        </View>
  		)
    } else if ( this.props.profile.gender === 'female' && this.state.requestList.length === 0){
      return (
        <View style={styles.container}>
          <Text>
            This is where your pending requests go! Go out there and find someone!
          </Text>
        </View>
      )
    } else {
      return (<View style={styles.container}>{this.requests()}</View>)
    }
	}

  requests = () => {

    reject = (key, otherUserId, otherUserKey) => {
      let firebaseUserRefRemove = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.currentUser.id + '/' + key)
      let firebaseOtherUserRemove = new Firebase('http://rawdog.firebaseio.com/users/' + otherUserId + '/' + otherUserKey)
      firebaseOtherUserRemove.remove()
      let removeFromState = this.state.requestList
      for(var i = 0; i < removeFromState.length; i++){
        if( removeFromState[i].key === key ){
          removeFromState.splice(i, 1)
        }
      }
      this.setState({requestList: removeFromState})
      firebaseUserRefRemove.remove()
    };
    accept = (roomKey, reqKey, otherUserId, otherUserKey) => {
      let acceptProps = {
        first_name: this.state.currentUser.first_name, 
        roomNumber: roomKey, 
        navigator: this.props.navigator
      }

      this.props.navigator.push({
        component: ChatRoom,
        passProps: acceptProps,
        navigationBarHidden: true
      })
      reject(reqKey)
    };
    let requestUsers = this.state.requestList.map((user) => {
      let key = user.key
      return <MatchesItem user={user} matchesState={this.state} key={user.id}/>
    })
    return <View>{requestUsers}</View>
  };

};

const styles = StyleSheet.create({
	container: {
		flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 40,
    backgroundColor: '#48BBEC'
	},
  name: {
    fontSize: 20
  },
  image : {
    flex: 4,
    borderRadius: 10,
    height: 100,
    width: 100
  },
  acceptButton: {
    borderRadius: 5,
    height: 20,
    width: 100,
    backgroundColor: 'green'
  },
  rejectButton: {
    borderRadius: 5,
    height: 20,
    width: 100,
    backgroundColor: 'red'
  }
})