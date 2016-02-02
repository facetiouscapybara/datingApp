import React, { Component, View, StyleSheet, Text, ScrollView, TabBarIOS } from 'react-native'; 
import ScrollableTabView from 'react-native-scrollable-tab-view';
//var Icon = require('react-native-vector-icons/Ionicons/');
import TabIcon from './tabicon';
import List from './list';
import Bio from './bio';
import Match from './matches';


export default class Tab extends Component {

  render() {
    console.log("..........jdajkdhajhjqiuiehuqiuhfi", this.props);
    if (this.props.profile.gender==="female") {
      return (
          <ScrollableTabView style={styles.container}>
            <Match tabLabel="Match" locationLat={this.props.locationLat} locationLon={this.props.locationLon} profile={this.props.profile}/>
            <Bio tabLabel="Setting" profile={this.props.profile}/>
          </ScrollableTabView>
      )
    } else {
      return (
          <ScrollableTabView style={styles.container}>
            <List tabLabel="List" locationLat={this.props.locationLat} locationLon={this.props.locationLon} profile={this.props.profile}/>
            <Match tabLabel="Match" locationLat={this.props.locationLat} locationLon={this.props.locationLon} profile={this.props.profile}/>
            <Bio tabLabel="Setting" profile={this.props.profile}/>
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