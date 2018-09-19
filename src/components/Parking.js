import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import CustomHeader from './common/CustomHeader';

const Parking = () => {
 var {width,height} = Dimensions.get('window');
  return (
    <View>
    <CustomHeader Headershow={true} showFeedbackButton={false} onPressFeedback={()=>{this.goFeedback()}} headerName='Parking' showSearchButton={false} showLogoutButton={false} showBackbutton= {true}/>
      <ScrollView style={{height:height-85}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <Image
              style={{ width: 1682, height: 693 }}
              source={require('../assets/images/Parking.jpg')}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Parking;