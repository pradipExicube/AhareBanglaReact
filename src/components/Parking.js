import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';

const Parking = () => {
 var {width,height} = Dimensions.get('window');
  return (
      <ScrollView>
        <ScrollView horizontal>
        <Image
            style={{ width: 1682, height: 693 }}
            source={require('../assets/images/Parking.jpg')}
        />
        </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Parking;