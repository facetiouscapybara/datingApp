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
    console.log("Inside the constructor------------------");
  }

  logoutOrPause() {
    geoFire.remove(this.props.profile.id)
  }

  componentWillMount(){

    console.log("inside the componentWillMount-------------------", this.state);
    if(this.props.profile.gender === 'male'){
      navigator.geolocation.watchPosition((loc) => {
        geoFire.set(this.props.profile.id, [loc.coords.latitude, loc.coords.longitude])
      }, (err) => {
        console.log('error getting location:', err)
      })
    }

    const firebaseUserRef = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.currentUser.id)
    
    firebaseUserRef.on('child_added', (req) => {
      console.log("inside the match Marlon is current user", req.val());
      let reqObj = req.val()
      let reqKey = req.key()
      console.log("Marlon is current User, what is this key from added request", reqKey);
      reqObj['key'] = reqKey
      let oldReq = this.state.requestList
      oldReq.push(reqObj)
      this.setState({requestList: oldReq})
    }).bind(this)
    
    firebaseUserRef.on('child_changed', (request) => {
      console.log('anything?', this.state);
      let newReq = request.val()
      console.log("this is a changed request", newReq)
      if(newReq.accepted === true){
        let currentUserFirebase = new Firebase('http://rawdog.firebaseio.com/users/' + newReq.id + '/' + newReq.otherUserKey)
        currentUserFirebase.update({accepted: true});
        
        console.log("if accepted is true", this.state)
        let newProps = {
          first_name: this.state.currentUser.first_name, 
          roomNumber: newReq.room, 
          navigator: this.props.navigator,
          picture: this.state.currentUser.picture
        }

        let removeFromState = this.state.requestList
        console.log("what is this newReq key", request.key());
        console.log("what is this ///////////", newReq.otherUserKey);
        for(var i = 0; i < removeFromState.length; i++){
          if( removeFromState[i].key === request.key() ){
            removeFromState.splice(i, 1)
          }
        }  

        this.setState({requestList: removeFromState})
        currentUserFirebase.remove();
        let testFirebase = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.currentUser.id + '/' + request.key());
        testFirebase.remove()


        this.props.navigator.push({
          component: ChatRoom,
          passProps: newProps,
          navigationBarHidden: true
        })
      }
    }).bind(this);

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

  handleReject(key, otherUserId, otherUserKey) {
    console.log("inside the handleReject??????????????????????");
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

  }

  handleAccept(roomKey, reqKey, otherUserId, otherUserKey) {
    
    let acceptFirebase = new Firebase('http://rawdog.firebaseio.com/users/' + otherUserId + '/' + otherUserKey)
    acceptFirebase.update({accepted: true});
    console.log("WTFFFFFFFFFFF", this.state.currentUser);
    let acceptProps = {
      first_name: this.state.currentUser.first_name, 
      roomNumber: roomKey, 
      navigator: this.props.navigator,
      picture: this.state.currentUser.picture
    }


    let removeFromState = this.state.requestList
    for(var i = 0; i < removeFromState.length; i++){
      if( removeFromState[i].key === reqKey ){
        removeFromState.splice(i, 1)
      }
    }
    this.setState({requestList: removeFromState})

    let currentFirebase = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.currentUser.id + '/' + reqKey);
    currentFirebase.remove()


    this.props.navigator.push({
      component: ChatRoom,
      passProps: acceptProps,
      navigationBarHidden: true
    })

  }

  requests = () => {

    let requestUsers = this.state.requestList.map((user) => {
      let key = user.key
      return <MatchesItem profile={this.props.profile} accept={this.handleAccept.bind(this)} reject={this.handleReject.bind(this)} user={user} key={user.id}/>
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