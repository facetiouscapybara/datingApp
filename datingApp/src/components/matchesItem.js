import React, {Component, Text, View, Image, TouchableHighlight, StyleSheet} from 'react-native'

export default class MatchesItem extends Component {
  render() {
    return (
      <View key={this.props.user.id}>
        <Image 
          source={{uri: this.props.user.photo}}
          style={styles.image}/>
        <View >
          <Text style={styles.name}>
            {this.props.user.name}, {this.props.user.age}
          </Text>
        </View>
        <TouchableHighlight
          onPress={(e) => accept(this.props.user.room)}
          underlayColor={'green'}
          style={styles.acceptButton}>
          <Text style={styles.name}>ACCEPT</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={(e) => reject(this.props.user.key)}
          underlayColor={'red'}
          style={styles.rejectButton}>
          <Text style={styles.name}>Reject</Text>
        </TouchableHighlight>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
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
})