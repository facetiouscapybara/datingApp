//this will be the screen where both sexes can see who theyve matched with and/or if the other person has accepted or denied the request
import React, { 
  Component, 
  View, 
  Text,
  AlertIOS, 
  StyleSheet,
  ScrollView
} from 'react-native';
import Firebase from 'firebase/';
import Geofire from 'geofire/';
import MatchesItem from './matchesItem';
import ChatRoom from './chatRoom';
const firebaseRef = new Firebase("https://rawdog.firebaseio.com/geofire");
const geoFire = new Geofire(firebaseRef);

export default class Matches extends Component {
  constructor(props){
    super(props);
    this.state = {
      counter: 0,
      requestList: [],
      womenInArea: 0,
      womenIds : {},
      currentUser: props.profile,
      chattingCount: props.chattingCount,
      trackingCount: props.chattingCount
    };
  that = this;
  }

  logoutOrPause() {
    geoFire.remove(this.props.profile.id);
  }

  addWomanToArea(key){
    if(key[0] === 'f'){
      let id = key.slice(1);
      if(!that.state.womenIds[id]){
        let count = that.state.womenInArea + 1;
        let womenIds = that.state.womenIds;
        womenIds[id] = true;
        that.setState({
          womenInArea : count,
          womenIds : womenIds
        });
        
      }
    }
  }

  removeWomanFromArea(key){
    if(key[0] === 'f'){  
      let id = key.slice(1);
      if(!that.state.womenIds[id]){
        let count = that.state.womenInArea - 1;
        let womenIds = that.state.womenIds;
        delete womenIds[id];
        that.setState({
          womenInArea : count,
          womenIds : womenIds
        });
      }
    }
  }
  componentWillMount() {

    if(this.props.profile.gender === 'male'){
      navigator.geolocation.watchPosition((loc) => {
        geoFire.set(this.props.profile.id, [loc.coords.latitude, loc.coords.longitude]);
        const geoQuery = geoFire.query({
          center: [loc.coords.latitude, loc.coords.longitude],
          radius: 1.0 //kilometers
        });
        geoQuery.on("key_entered", function(key) {
          that.addWomanToArea(key);
        });
        geoQuery.on("key_exited", function(key) {
          that.removeWomanFromArea(key);
        });
      }, (err) => {
        console.log('error getting location:', err)
      });
    }

    const firebaseUserRef = new Firebase('http://rawdog.firebaseio.com/users/' + this.state.currentUser.id);
    
    firebaseUserRef.on('child_added', (req) => {
      let reqObj = req.val();
      let reqKey = req.key();
      reqObj['key'] = reqKey;
      for(var i = 0; i < this.state.requestList.length; i++){
        if(this.state.requestList[i].id === reqObj.id){
          return this.handleReject(reqKey, reqObj.id, reqObj.otherUserKey)
        }
      }
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

        var chatroom = new Firebase('https://rawdog.firebaseio.com/chatroom/' + newReq.room);
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
                  "Are you going to message with " + newReq.name + " now?",
                  "Press Cancel if you want to stay!",
                  [{text: 'OK', onPress: () => {
                    that.props.navigator.replace({
                      component: ChatRoom,
                      passProps: newProps,
                      navigationBarHidden: true
                    });  
                  }}, 
                  {text: 'Cancel', onPress: () => {
                    var message = {
                      text: that.state.currentUser.first_name + " has rejected the chat.",
                      name: 'TOLO',
                      //put TOLO logo in here eventually
                      image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}
                    };
                   chatroom.push(message);
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
      let womenInArea = '';
      if (this.state.womenInArea === 0){
        womenInArea = 'There are no women looking in your area.';
      } else if (this.state.womenInArea === 1){
        womenInArea = 'There is 1 woman looking in your area.';
      } else {
        womenInArea = 'There are currently ' + this.state.womenInArea + ' women looking in your area.';
      }

      return (
        <View style={styles.container}>
          <View style={styles.noMatches}>
            <View style={styles.currentlyInArea}>
              <Text style={styles.noMatchText}>
                Hang out here and wait for someone to message you, we'll let you know when you've got one!
              </Text>
            </View>
            <View style={styles.currentlyInArea}>
              <Text style={styles.noMatchTextCount}>
                {womenInArea}
              </Text>
            </View>
          </View>    
        </View>
      )
    } else if ( this.props.profile.gender === 'female' && this.state.requestList.length === 0){
      return (
        <View style={styles.container}>
          <Text style={styles.noMatchText}>
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
      let counter = Math.random();
      return (
              <View key={counter} style={styles.matchContainer}>
                <MatchesItem profile={this.props.profile} accept={this.handleAccept.bind(this)} reject={this.handleReject.bind(this)} user={user} key={user.id}/>
              </View> 
            ) 
    });
    
    return <View>{requestUsers}</View>
  };

};

const styles = StyleSheet.create({
	container: {
		flex: 1,
    alignItems: 'center',
    paddingTop: 40
	},
  noMatches: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentlyInArea: {
    margin: 40,
  },
  noMatchText: {
    textAlign: 'center',
    fontSize: 18
  },
  noMatchTextCount: {
    textAlign: 'center',
    fontSize: 22,
    color: 'red'
  }
});



