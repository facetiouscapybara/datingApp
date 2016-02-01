//this will be the page the females see when they first log in showing them who is around them
import React, { Component, View, Text, StyleSheet, Separator, ListView, Image, ScrollView, TouchableHighlight} from 'react-native';
import ListItem from './listItem';
import Bio from './bio.js';
import Swipeout from 'react-native-swipeout';

const dudes = [
	{
		name: 'Brian Sweeney',
		age: 24,
		description: 'Moustache Rides Anyone?',
		preference: 'female',
		gender: 'male',
		imageUrl:'http://images-cdn.moviepilot.com/images/c_fill,h_331,w_500/t_mp_quality/xel5asph5jw8z2fw6xmc/super-troopers-2-crowd-funded-in-24-hours-324417.jpg',
		fbID: 1234,
		dist: '500ft'
	},
	{
		name: 'Eric Geneisse',
		age: 28,
		description: 'Need some woodworking done?',
		preference: 'female',
		gender: 'male',
		imageUrl:'http://media4.popsugar-assets.com/files/2010/02/08/2/192/1922283/cop-slide9/i/Rabbit-Thorny-Super-Troopers.jpg',
		fbID: 12345,
		dist: '800ft'
	},
	{
		name: 'Dan Frehner',
		age: 29,
		description: 'Sup Nerds?!?!?',
		preference: 'female',
		gender: 'male',
		imageUrl:'http://cache.boston.com/bonzai-fba/Original_Photo/2006/09/12/1158092070_4142.jpg',
		fbID: 123456,
		dist: '1000ft'
	},
	{
		name: 'Zelong Ma',
		age: 23,
		description: 'My name is Marlon and I\'m here to party',
		preference: 'female',
		gender: 'male',
		imageUrl:'http://content.internetvideoarchive.com/content/photos/583/620523_013.jpg',
		fbID: 1234567,
		dist: '1100ft'
	},
	{
		name: 'Brian Sweeney',
		age: 24,
		description: 'Moustache Rides Anyone?',
		preference: 'female',
		gender: 'male',
		imageUrl:'http://images-cdn.moviepilot.com/images/c_fill,h_331,w_500/t_mp_quality/xel5asph5jw8z2fw6xmc/super-troopers-2-crowd-funded-in-24-hours-324417.jpg',
		fbID: 1233244,
		dist: '1200ft'
	},
	{
		name: 'Eric Geneisse',
		age: 28,
		description: 'Need some woodworking done?',
		preference: 'female',
		gender: 'male',
		imageUrl:'http://media4.popsugar-assets.com/files/2010/02/08/2/192/1922283/cop-slide9/i/Rabbit-Thorny-Super-Troopers.jpg',
		fbID: 1234512342142,
		dist: '.8 miles'
	},
	{
		name: 'Dan Frehner',
		age: 29,
		description: 'Sup Nerds?!?!?',
		preference: 'female',
		gender: 'male',
		imageUrl:'http://cache.boston.com/bonzai-fba/Original_Photo/2006/09/12/1158092070_4142.jpg',
		fbID: 123456123412432143,
		dist: 'right behind you!'
	},
	{
		name: 'Zelong Ma',
		age: 23,
		description: 'My name is Marlon and I\'m here to party',
		preference: 'female',
		gender: 'male',
		imageUrl:'http://content.internetvideoarchive.com/content/photos/583/620523_013.jpg',
		fbID: 123452354367,
		dist: '800 miles'
	}
];


//var datasource;

export default class List extends Component {

	constructor(props) {
	  super(props);
		console.log(this.state, "??????????????");
		//this.passData();

	}

	// passData() {
	// 	var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	// 	//console.log(ds);
	// 	datasource=ds.cloneWithRows(dudes);
	// 	console.log(datasource, "!!!!!!!!!!!");
	// }

	// renderRow(rowData) {
	// 	console.log('herhekdangagaiuurak');
	// 	console.log(rowData);
	// 	return (
	// 		<TouchableHighlight
	// 		  underlayColor='rgba(192,192,192,1,0.6)'
	// 		  onPress={this.viewNote.bind(this, rowData)} >
	// 		  <View>
	// 		    <View>
	// 		      <Text> {rowData} </Text>
	// 		      <Separator />
	// 		    </View>
	// 		  </View>
	// 		</TouchableHighlight>
	// 	)
	// }

	viewNote(rowData) {
	  this.props.navigator.push({
	    title: 'The Note',
	    component: Bio
	  });
	}

	users() {
		var userList = dudes.map(function(user){
			return (
	  		<Swipeout right={swipeBtns}
	  			autoClose='true'
	  			backgroundColor= 'transparent'>
	  			  <TouchableHighlight
	  			    underlayColor='rgba(192,192,192,1,0.6)'
	  			    onPress={this.viewNote.bind(this)} >
	  			    <View>
	  			      <View style={styles.rowContainer}>
									<ListItem user={user} key={user.fbID} style={styles.listItem}/>
	  			      </View>
	  			      <Separator />
	  			    </View>
	  			  </TouchableHighlight>
				</Swipeout>

			)
		})
		return userList
	}

	render() {
		//console.log("kalladka", datasource);
		let swipeBtns = [
		  {
		    text: 'Delete',
		    backgroundColor: 'red',
		    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
		    onPress: () => { this.deleteNote(rowData) }
		 },
		  {
		    text: 'Duplicate',
		    backgroundColor: 'blue',
		    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
		    onPress: () => { this.duplicateNote(rowData) }
		 }
		];
		return (
			<View style={styles.container}>
				<View style={styles.statusBar} />
				<View style={styles.header}>
					<Text> 
	      		Dude's nearby{/*refactor to be dynamic text so if the dudeList.length = 0, this says "Sorry, no dudes nearby". Also, very much not commited to "dudes", this is jsut comment text, don't overthink it*/}
	      	</Text>
	      </View>
				<ScrollView
	        automaticallyAdjustContentInsets={true}
	        style={styles.scrollView}>
	      	{this.users()}
      	</ScrollView>
      </View>
   		// <View style={styles.container}>
	   	// 	<ListView
	   	// 	  dataSource={datasource}
	   	// 	  renderRow={this.renderRow.bind(this)} />
   		// </View>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: 'green'
	},
	header: {
		paddingTop: 5,
		flexDirection:'row',
		justifyContent: 'center',
	},
	statusBar:{
		height:20,
		backgroundColor:'pink'
	},
	scrollView: {
		height: 300
	}
})


//to be abstracted out into the constructor function in here
