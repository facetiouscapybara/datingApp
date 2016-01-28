//main page, abstracted out of index.ios.js so that we can port it to android as well if we want to.
import React, {
  Component,
  StyleSheet
} from 'react-native';

export default class Main extends Component {
  const ROUTES = {

  }
  render() {
    return (
      <View style={styles.container}>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})