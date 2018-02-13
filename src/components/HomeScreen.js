import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

const HomeScreen = () => {
 var {width,height} = Dimensions.get('window');
  return (
    <View style={styles.container}>
        <Image
    style={{width: width ,height: 200}}
    source={require('../assets/images/homeBanner.jpg')}
  />
  <ScrollView style={{height:(height-200), width: width}}>
    <View style={{flex:1}}>
        <Image
        style={{width: 50, height: 50, flex:2}}
        source={require('../assets/images/homeListIcon1.png')}
        />
        <Text style={{flex:1}}>About Ahare Bangla</Text> 
    </View>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>
      <Text>dfjlk</Text>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;