import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

const MapScreen = () => {
 var {width,height} = Dimensions.get('window');
  return (
      <ScrollView>
        <ScrollView horizontal>
        <TouchableOpacity onPress={(event)=>{console.log(event.nativeEvent.locationX,event.nativeEvent.locationY)}}>
        <Image
                style={{width: 2616 ,height: 628,}}
                source={require('../assets/images/map.jpg')}
            />
        </TouchableOpacity>
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