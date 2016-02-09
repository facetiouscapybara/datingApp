import React, { 
  Component, 
  StyleSheet, 
  TabBarIOS 
} from 'react-native'; 
import Firebase from 'firebase/';
import List from './list';
import Match from './matches';
import EditProfile from './editProfile';
//var Icon = require('react-native-vector-icons/Ionicons/');

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
    if (this.props.profile.gender==="male") {
      this.handleWatch("List");
    } else {
      this.handleWatch("Match");
    }
  }

  handleWatch(tab) {
    const firebaseUserRef = new Firebase('http://rawdog.firebaseio.com/users/' + this.props.profile.id)
    firebaseUserRef.on('child_added', (req) => {
      if (this.state.selectedTab !== tab) {
        this.setState({notifCount: this.state.notifCount+1, isHereYet: false })
      }
    }).bind(this);

    firebaseUserRef.on('child_removed', (removed) => {
      if (this.state.selectedTab !== tab) {
        this.setState({isHereYet: false })
      }
    }).bind(this);
  }

  handleBadge(tab) {
    return this.state.notifCount===0? 
      undefined : this.state.selectedTab === tab?
        undefined : !this.state.isHereYet?
          this.state.notifCount : undefined
  }

  handleMatch(tab) {
    var component = (
      <TabBarIOS.Item
        icon={require('../styles/iheart.png')}
        title="MATCH"
        badge={this.handleBadge(tab)}
        selected={this.state.selectedTab === tab}
        onPress={() => {
          this.setState({
            selectedTab: tab,
            isHereYet: true,
            notifCount: 0
          });
        }}>
        <Match locationLat={this.props.locationLat} locationLon={this.props.locationLon} profile={this.props.profile} navigator={this.props.navigator}/>
      </TabBarIOS.Item>
    );
    return component;
  }

  render() {
    this.props.profile.gender = 'female'

    var settingsComponent = (
      <TabBarIOS.Item
        icon={require('../styles/igear.png')}
        title="YOU"
        selected={this.state.selectedTab === 'Settings'}
        onPress={() => {
          this.setState({
            selectedTab: 'Settings'
          });
        }}>
        <EditProfile profile={this.props.profile} navigator={this.props.navigator}/>
      </TabBarIOS.Item>
    ); 
    
    if (this.props.profile.gender==="male") {
      return (
        <TabBarIOS
        tintColor="white"
        barTintColor="#3CAE8E">
          {this.handleMatch('List')}
          {settingsComponent}
        </TabBarIOS>
      )
    } else {
      return (
        <TabBarIOS
        tintColor="white"
        barTintColor="#0C8362">
          <TabBarIOS.Item
            icon={require('../styles/ipeople.png')}
            title="FIND"
            selected={this.state.selectedTab === 'List'}
            onPress={() => {
              this.setState({
                selectedTab: 'List'
              });
            }}>
            <List locationLat={this.props.locationLat} locationLon={this.props.locationLon} profile={this.props.profile} navigator={this.props.navigator}/>
          </TabBarIOS.Item>
          {this.handleMatch('Match')}
          {settingsComponent}
        </TabBarIOS>
      )
    }
  }

}; 

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#48BBEC',
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});



