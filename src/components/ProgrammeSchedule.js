import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';

const ProgrammeSchedule = () => {
 var {width,height} = Dimensions.get('window');
  return (
      <ScrollView>
        <ScrollView horizontal>
        <Image
            style={{ width: 525, height: 778 }}
            source={require('../assets/images/Ahare-Bangla-Schedule-2017.png')}
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

export default ProgrammeSchedule;