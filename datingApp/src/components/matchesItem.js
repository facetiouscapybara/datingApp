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
        <Text style={styles.name}>Reject</Text>
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
        <View key={this.props.key}>
          <Image 
            source={{uri: this.props.user.photo}}
            style={styles.image}/>
          <View >
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
              <Text style={styles.name}>Reject</Text>
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
    justifyContent: 'space-between'
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






