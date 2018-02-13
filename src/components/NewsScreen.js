import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const NewsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        News
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

export default NewsScreen;