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

const ProgrammeSchedule = () => {
 var {width,height} = Dimensions.get('window');
  return (
    <View>
    <CustomHeader Headershow={true} showFeedbackButton={false} onPressFeedback={()=>{this.goFeedback()}} headerName='Programme Schedule' showSearchButton={false} showLogoutButton={false} showBackbutton= {true}/>
      <ScrollView style={{height:height-85}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Image
            style={{ width: 525, height: 778 }}
            source={require('../assets/images/Ahare-Bangla-Schedule-2017.png')}
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

export default ProgrammeSchedule;