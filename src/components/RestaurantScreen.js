import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection';

const RestaurantScreen = () => {
    const { IconStyle } = styles;
  return (
    <View>
      <Card>
          <CardSection>
            <Image
                style={IconStyle}
                source={require('../assets/images/wowmomo.png')}
            />
            <Text></Text>
          </CardSection>
      </Card>
      <Card>
          <CardSection>
            <Image
                style={IconStyle}
                source={require('../assets/images/wowmomo.png')}
            />
          </CardSection>
      </Card>
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
  IconStyle: {
    width: 80,
    height: 80, 
    marginLeft:10, 
    marginRight:10, 
    marginTop:20, 
    marginBottom:20 
  },
});

export default RestaurantScreen;