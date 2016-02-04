import React, { Component, View, StyleSheet, Text, ScrollView, TabBarIOS } from 'react-native'; 
import ScrollableTabView from 'react-native-scrollable-tab-view';
//var Icon = require('react-native-vector-icons/Ionicons/');
import TabIcon from './tabicon';
import List from './list';
import Bio from './bio';
import Match from './matches';
import EditProfile from './editProfile';


export default class Tab extends Component {
  render() {
    if (this.props.profile.gender==="female") {
      return (
          <ScrollableTabView style={styles.container}>
            <Match tabLabel="Matches" locationLat={this.props.locationLat} locationLon={this.props.locationLon} profile={this.props.profile}/>
            <EditProfile tabLabel="Settings" profile={this.props.profile}/>
          </ScrollableTabView>
      )
    } else {
      return (
          <ScrollableTabView style={styles.container}>
            <List tabLabel="List" locationLat={this.props.locationLat} locationLon={this.props.locationLon} profile={this.props.profile} navigator={this.props.navigator}/>
            <Match tabLabel="Matches" locationLat={this.props.locationLat} locationLon={this.props.locationLon} profile={this.props.profile}/>
            <EditProfile tabLabel="Settings" profile={this.props.profile}/>
          </ScrollableTabView>
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