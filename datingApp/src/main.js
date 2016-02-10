import React, {
  StyleSheet, 
  Navigator, 
  NavigatorIOS, 
  Component 
} from 'react-native';
import Splash from './components/splash';

export default class Main extends Component {

  render() {
    return (
      <NavigatorIOS 
        style={styles.container} 
        initialRoute={{
          title: 'TOLO',
          component: Splash,
          navigationBarHidden: true
        }} />
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})