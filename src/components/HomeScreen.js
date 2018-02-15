import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const HomeScreen = () => {
 var {width,height} = Dimensions.get('window');
 const { container, ListStyle, IconStyle, textStyle } = styles;

 openAbout = ()=>{
    alert('About');
 };
 openMap = ()=>{
    Actions.map();
 };
 openRestaurant = ()=>{
    Actions.restaurant();
 };
 openSearch = ()=>{
    alert('Search');
 };
 openNews = ()=>{
    Actions.news();
 };
 openParking = ()=>{
    Actions.parking();
 };
 openSchedule = ()=>{
    Actions.programmeSchedule();
 };

  return (
    <View style={container}>
        <Image
            style={{width: width ,height: 200,}}
            source={require('../assets/images/homeBanner.jpg')}
        />
        <ScrollView style={{height:(height-300), width: width}}>
            <TouchableOpacity onPress={this.openAbout}>
                <View style={ListStyle}>
                    <Image
                    style={IconStyle}
                    source={require('../assets/images/homeListIcon1.png')}
                    />
                    <Text style={textStyle}>About Ahare Bangla</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openMap}>
                <View style={ListStyle}>
                    <Image
                    style={IconStyle}
                    source={require('../assets/images/homeListIcon2.png')}
                    />
                    <Text style={textStyle}>Map</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openRestaurant}>
                <View style={ListStyle}>
                    <Image
                    style={IconStyle}
                    source={require('../assets/images/homeListIcon3.png')}
                    />
                    <Text style={textStyle}>Restaurant</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openSearch}>
                <View style={ListStyle}>
                    <Image
                    style={IconStyle}
                    source={require('../assets/images/homeListIcon4.png')}
                    />
                    <Text style={textStyle}>Search</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openNews}>
                <View style={ListStyle}>
                    <Image
                    style={IconStyle}
                    source={require('../assets/images/homeListIcon5.png')}
                    />
                    <Text style={textStyle}>News</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openParking}>
                    <View style={ListStyle}>
                        <Image
                        style={IconStyle}
                        source={require('../assets/images/homeListIcon6.png')}
                        />
                        <Text style={textStyle}>Parking</Text> 
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openSchedule}>
                <View style={ListStyle}>
                    <Image
                    style={IconStyle}
                    source={require('../assets/images/homeListIcon7.png')}
                    />
                    <Text style={textStyle}>Program Schedule</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListStyle:{
    flexDirection:'row',
    alignItems:'center', 
    borderBottomColor:'#005696', 
    borderBottomWidth:0.3
  },
  IconStyle: {
    width: 50,
    height: 50, 
    marginLeft:20, 
    marginRight:20, 
    marginTop:10, 
    marginBottom:10 
  },
  textStyle: {
    fontSize: 20,
    color: "#005696", 
    fontWeight: 'bold'
  }
});

export default HomeScreen;