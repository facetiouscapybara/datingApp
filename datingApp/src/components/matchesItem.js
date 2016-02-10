import React, {
  Component, 
  Text, 
  View, 
  Image, 
  TouchableHighlight, 
  StyleSheet
} from 'react-native';

export default class MatchesItem extends Component {

  render() {

    var maleComponent = (
      <View>
      <TouchableHighlight
        onPress={(e) => {
          this.props.accept(this.props.user.room, this.props.user.key, this.props.user.id, this.props.user.otherUserKey)}
        }
        underlayColor={'green'}
        style={styles.acceptButton}>
        <Text style={styles.name}>ACCEPT</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={(e) => this.props.reject(this.props.user.key, this.props.user.id, this.props.user.otherUserKey)}
        underlayColor={'red'}
        style={styles.rejectButton}>
        <Text style={styles.name}>Cancel Request</Text>
      </TouchableHighlight>
      </View>
    );

    var femaleComponent = (
      <View>
      <Text>Waiting For Response</Text>
      </View>  
    ); 

    if (this.props.profile.gender === "male") {
      return (
        <View key={this.props.key} style={styles.container}>
          <View style={styles.leftBox}>
            <Text>Tap on Photo for more info</Text>
            <TouchableHighlight>
              <Image 
                source={{uri: this.props.user.photo}}
                style={styles.image}/>
            </TouchableHighlight>
          </View>
          <View style={styles.rightBox}>
            <Text style={styles.name}>
              {this.props.user.name}, {this.props.user.age}
            </Text>
            {maleComponent}
          </View>
        </View>
      );
    } else {
      return (
        <View key={this.props.key}>
          <Image 
            source={{uri: this.props.user.photo}}
            style={styles.image}/>
          <View >
            <Text style={styles.name}>
              {this.props.user.name}, {this.props.user.age}
            </Text>
            <TouchableHighlight
              onPress={(e) => this.props.reject(this.props.user.key, this.props.user.id, this.props.user.otherUserKey)}
              underlayColor={'red'}
              style={styles.rejectButton}>
              <Text style={styles.name}>Cancel Request</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }

  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 5,
    shadowColor: "#3cae8e",
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2
    }
  },
  leftBox: {
    flex: 1
  },
  rightBox: {
    flex: 1,
    paddingLeft: 20,
    paddingTop : 10
  },
  name: {
    fontSize: 20
  },
  image : {
    flex: 4,
    borderRadius: 10,
    height: 200,
    width: 200
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






