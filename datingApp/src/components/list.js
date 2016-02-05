//this will be the page the females see when they first log in showing them who is around them
import React, { Component, View, Text, StyleSheet, TouchableHighlight, ListView, Image, ScrollView} from 'react-native';
import ListItem from './listItem';
import Swipeout from 'react-native-swipeout/';
import Separator from '../helpers/separator';
import Firebase from 'firebase/';
import Geofire from 'geofire/';
import host from './../../constants.js'

let that;

export default class List extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		currentList: [],
      isRefreshing: false
  	};
  	that = this
  }

  removeUser = (key) => {
    let list = that.state.currentList;
    list.forEach(function(item, index){
      if(item.facebookId === key){
      	list.splice(index, 1)
      }
    })
    that.setState({
    	currentList: list
    })
  };

  getUserData = (key, distance) => { 
  	let userObj;
    distance = Math.floor(distance * 3280.84)
  	const queryObject = {
		  method: "GET",
		  headers: {
			  'Accept': 'application/json',
        'Content-Type': 'application/json',
			  'Authorization': 'Bearer ' +  this.props.profile.access_token
			}
		};

		let url = host.SERVER_URL + '/api/users/?id=' + this.props.profile.id + '&userInArea=' + key;

  	fetch(url, queryObject)
  	  .then(function(res){
        userObj = JSON.parse(res._bodyText);
        userObj['distance'] = distance
		    let newList = that.state.currentList.concat([userObj])
	      that.setState({
	        currentList: newList
	      })	    	
      })
  };

  componentWillMount(){
  	 navigator.geolocation.getCurrentPosition((loc, err) => {
      if(!err){
		    const firebaseRef = new Firebase("https://rawdog.firebaseio.com/geofire");
		    const geoFire = new Geofire(firebaseRef);
		    const geoQuery = geoFire.query({
		      center: [loc.coords.latitude, loc.coords.longitude],
		      radius: 1.0 //kilometers
		    })
		      
		    navigator.geolocation.watchPosition((loc) => {
		    	geoQuery.updateCriteria({
		    		center: [loc.coords.latitude, loc.coords.longitude]
		    	})
		    }, (err) => {console.log('error:', err)})
		    
		    geoQuery.on("key_entered", function(key, location, distance) {
			  	that.getUserData(key, distance)
		    })
		    geoQuery.on("key_exited", function(key, location, distance) {
		      that.removeUser(key)
		    });
      } else {
        console.log(err);
      }
    }); 

  }

	render () {
		return (
			<View style={styles.container}>
				<ScrollView
	        automaticallyAdjustContentInsets={true}
	        style={styles.scrollView}>
	      	{this.users()}
      	</ScrollView>
      </View>
		)
	}

	users () {
    let currentUser = this.props.profile
    let nav = this.props.navigator
		var userList = this.state.currentList.map(function(user){
			return (
				<ListItem 
					navigator={nav} 
					user={user} 
					key={user.facebookId} 
					style={styles.listItem} 
					currentUser={currentUser}/>
				)	
		})
		return userList
	}
};

const styles = StyleSheet.create({
	container: {
		flex:1,
    backgroundColor: '#48BBEC'
	},
	scrollView: {
		height: 300
	}
})
