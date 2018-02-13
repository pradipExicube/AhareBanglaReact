import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Map
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13A2CE',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default MapScreen;