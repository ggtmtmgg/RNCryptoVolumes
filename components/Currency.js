import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 32,
    color: 'rgb(95, 177, 237)',
  },
});

const Currency = () => (
  <View style={styles.container}>
    <TouchableOpacity onPress={Actions.pop()}>
      <Text style={styles.linkText}>Home</Text>
    </TouchableOpacity>
  </View>
);
export default Currency;
