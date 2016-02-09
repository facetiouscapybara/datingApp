//this will be the screen where both sexes can see who theyve matched with and/or if the other person has accepted or denied the request
import React, { 
  Component, 
  View, 
  Text,
  AlertIOS, 
  StyleSheet
} from 'react-native';
import Firebase from 'firebase/';
import Geofire from 'geofire/';
import MatchesItem from './matchesItem';
import ChatRoom from './chatRoom';
const firebaseRef = new Firebase("https://rawdog.firebaseio.com/geofire");
const geoFire = new Geofire(firebaseRef);

export default class Matches extends Component {
  constructor(props){
    console.log("in the matches");
    super(props);
    this.state = {
      requestList: [],
      currentUser: props.profile,
      chattingCount: props.chattingCount,
      trackingCount: props.chattingCount
    };
  }

  logoutOrPause() {
    geoFire.remove(this.props.profile.id);
  }

  componentWillMount() {
    if(this.props.profile.gender === 'male'){
      navigator.geolocation.watchPosition((loc) => {
        geoFire.set(this.props.profile.id, [loc.coords.latitude, loc.coords.longitude]);
      }, (err) => {
        console.log('error getting location:', err)
      });
    }

    const firebaseUserRef = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.currentUser.id);
    
    firebaseUserRef.on('child_added', (req) => {
      let reqObj = req.val();
      let reqKey = req.key();
      reqObj['key'] = reqKey;
      let oldReq = this.state.requestList;
      oldReq.push(reqObj);
      this.setState({requestList: oldReq});
    }).bind(this);
    
    firebaseUserRef.on('child_changed', (request) => {
      let newReq = request.val();

      if(newReq.accepted === true){
        console.log(newReq);
        let currentUserFirebase = new Firebase('http://rawdog.firebaseio.com/users/' + newReq.id + '/' + newReq.otherUserKey);
        currentUserFirebase.update({accepted: true});
        
        var newProps = {
          first_name: this.state.currentUser.first_name, 
          roomNumber: newReq.room, 
          navigator: this.props.navigator,
          picture: this.state.currentUser.picture,
          profile: this.state.currentUser
        };

        let removeFromState = this.state.requestList;
        for(var i = 0; i < removeFromState.length; i++){
          if( removeFromState[i].key === request.key() ){
            removeFromState.splice(i, 1);
          }
        };  

        this.setState({requestList: removeFromState});
        currentUserFirebase.remove();
        let requestedUserFirebase = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.currentUser.id + '/' + request.key());
        requestedUserFirebase.remove();

        if(this.state.chattingCount === this.state.trackingCount){
          this.state.chattingCount = this.state.chattingCount + 1;
          newProps["chattingCount"] = this.state.chattingCount;
          this.props.navigator.push({
            component: ChatRoom,
            passProps: newProps,
            navigationBarHidden: true
          });
        } else {
          AlertIOS.alert(
            "Looks Like " + newReq.name + " has accepted your request",
            "Do you want to chat with him right now or wait a moment?",
            [{text: 'OK', onPress: () => {
              this.props.navigator.replace({
                component: ChatRoom,
                passProps: newProps,
                navigationBarHidden: true
              });
            }}, 
            {text: 'Wait a moment', onPress: () => {
              var that = this;
              setTimeout(() => {
                AlertIOS.alert(
                  "You are going to message with " + newReq.name + " right now!",
                  null,
                  [{text: 'OK', onPress: () => {
                    that.props.navigator.replace({
                      component: ChatRoom,
                      passProps: newProps,
                      navigationBarHidden: true
                    });  
                  }}],
                  null
                );
              }, 6000);
            }}],
            null
          );
        }
      }
    }).bind(this);

    firebaseUserRef.on('child_removed', (removed) => {
      let remKey = removed.key();
      let removeList = this.state.requestList;
      for(var i = 0; i < removeList.length; i++){
        if( removeList[i].key === remKey ){
          removeList.splice(i, 1)
        }
      }
      this.setState({requestList: removeList});
    }).bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chattingCount === this.state.chattingCount) {
      this.setState({trackingCount: nextProps.chattingCount});
    }
  }


  render() {
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
    let firebaseUserRefRemove = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.currentUser.id + '/' + key);
    let firebaseOtherUserRemove = new Firebase('http://rawdog.firebaseio.com/users/' + otherUserId + '/' + otherUserKey);
    firebaseOtherUserRemove.remove();
    let removeFromState = this.state.requestList;
    for(var i = 0; i < removeFromState.length; i++){
      if( removeFromState[i].key === key ){
        removeFromState.splice(i, 1);
      }
    }
    this.setState({requestList: removeFromState});
    firebaseUserRefRemove.remove();

  }

  handleAccept(roomKey, reqKey, otherUserId, otherUserKey) {
    
    let acceptFirebase = new Firebase('http://rawdog.firebaseio.com/users/' + otherUserId + '/' + otherUserKey)
    acceptFirebase.update({accepted: true});

    let acceptProps = {
      first_name: this.state.currentUser.first_name, 
      roomNumber: roomKey, 
      navigator: this.props.navigator,
      picture: this.state.currentUser.picture,
      profile: this.props.profile,
      chattingCount: this.state.chattingCount
    };

    let removeFromState = this.state.requestList;
    for(var i = 0; i < removeFromState.length; i++){
      if( removeFromState[i].key === reqKey ){
        removeFromState.splice(i, 1);
      }
    }
    this.setState({requestList: removeFromState});

    let currentFirebase = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.currentUser.id + '/' + reqKey);
    currentFirebase.remove();

    this.props.navigator.push({
      component: ChatRoom,
      passProps: acceptProps,
      navigationBarHidden: true
    });

  }

  requests = () => {

    let requestUsers = this.state.requestList.map((user) => {
      let key = user.key;
      return <MatchesItem profile={this.props.profile} accept={this.handleAccept.bind(this)} reject={this.handleReject.bind(this)} user={user} key={user.id}/>
    });
    
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
});



