import React, { Component, View, StyleSheet, Text, ScrollView, TabBarIOS } from 'react-native'; 
import ScrollableTabView from 'react-native-scrollable-tab-view';
//var Icon = require('react-native-vector-icons/Ionicons/');
import Firebase from 'firebase/';
import TabIcon from './tabicon';
import List from './list';
import Bio from './bio';
import Match from './matches';
import EditProfile from './editProfile';


export default class Tab extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'List',
      notifCount: 0,
      isHereYet: false
    }
  }


  componentWillMount() {
    const firebaseUserRef = new Firebase('http://rawdog.firebaseio.com/users/' + this.props.profile.id)
    if (this.props.profile.gender==="female") {
      
      firebaseUserRef.on('child_added', (req) => {
        if (this.state.selectedTab !== "List") {
          this.setState({notifCount: this.state.notifCount+1, isHereYet: false })
        }
      }).bind(this)

      firebaseUserRef.on('child_removed', (removed) => {
        if (this.state.selectedTab !== "List") {
          this.setState({notifCount: this.state.notifCount-1, isHereYet: false })
        }
      }).bind(this)
    } else {
      firebaseUserRef.on('child_added', (req) => {
        if (this.state.selectedTab !== "Match") {
          this.setState({notifCount: this.state.notifCount+1, isHereYet: false })
        }
      }).bind(this)

      firebaseUserRef.on('child_removed', (removed) => {
        if (this.state.selectedTab !== "Match") {
          this.setState({notifCount: this.state.notifCount-1, isHereYet: false })
        }
      }).bind(this)
    }
  }

  handleMaleNotif() {
    return this.state.notifCount===0? 
      undefined : this.state.selectedTab === 'List'?
        undefined : !this.state.isHereYet?
          this.state.notifCount : undefined
  }

  handleFemaleNotif() {
    return this.state.notifCount===0? 
      undefined : this.state.selectedTab === 'Match'?
        undefined : !this.state.isHereYet?
          this.state.notifCount : undefined
  }

  render() {
    if (this.props.profile.gender==="female") {
      return (
        <TabBarIOS
        tintColor="white"
        barTintColor="#48BBEC">
          <TabBarIOS.Item
            title="Match"
            systemIcon="favorites"
            badge={this.handleMaleNotif()}
            selected={this.state.selectedTab === 'List'}
            onPress={() => {
              this.setState({
                selectedTab: 'List',
                isHereYet: true,
                notifCount: 0
              });
            }}>
            <Match tabLabel="Matches" locationLat={this.props.locationLat} locationLon={this.props.locationLon} profile={this.props.profile} navigator={this.props.navigator}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Settings"
            systemIcon="more"
            selected={this.state.selectedTab === 'Settings'}
            onPress={() => {
              this.setState({
                selectedTab: 'Settings'
              });
            }}>
            <EditProfile tabLabel="Settings" profile={this.props.profile} navigator={this.props.navigator}/>
          </TabBarIOS.Item>
        </TabBarIOS>
      )
    } else {
      return (
        <TabBarIOS
        tintColor="white"
        barTintColor="#48BBEC">
          <TabBarIOS.Item
            title="List"
            systemIcon="contacts"
            selected={this.state.selectedTab === 'List'}
            onPress={() => {
              this.setState({
                selectedTab: 'List'
              });
            }}>
            <List tabLabel="List" locationLat={this.props.locationLat} locationLon={this.props.locationLon} profile={this.props.profile} navigator={this.props.navigator}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Match"
            systemIcon="favorites"
            badge={this.handleFemaleNotif()}
            selected={this.state.selectedTab === 'Match'}
            onPress={() => {
              this.setState({
                selectedTab: 'Match',
                isHereYet: true,
                notifCount: 0
              });
            }}>
            <Match tabLabel="Matches" locationLat={this.props.locationLat} locationLon={this.props.locationLon} profile={this.props.profile} navigator={this.props.navigator}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Settings"
            systemIcon="more"
            selected={this.state.selectedTab === 'Settings'}
            onPress={() => {
              this.setState({
                selectedTab: 'Settings'
              });
            }}>
            <EditProfile tabLabel="Settings" profile={this.props.profile} navigator={this.props.navigator}/>
          </TabBarIOS.Item>
        </TabBarIOS>
      )
    }
  }

} 

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#48BBEC',
    paddingTop: 20
  }
});