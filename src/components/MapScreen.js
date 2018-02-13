import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';

const MapScreen = () => {
 var {width,height} = Dimensions.get('window');
  return (
      <ScrollView>
        <ScrollView horizontal>
        <Image
                style={{width: 2616 ,height: 628,}}
                source={require('../assets/images/map.jpg')}
            />
        </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default MapScreen;