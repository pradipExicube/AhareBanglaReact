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

var {width,height} = Dimensions.get('window');
export default class HomeScreen extends Component {
 
 openAbout = ()=>{
    Actions.about();
 };
 openMap = ()=>{
    Actions.map();
 };
 openRestaurant = ()=>{
    Actions.restaurant();
 };
 openSearch = ()=>{
    Actions.search();
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
render() {
  return (
    <View style={styles.container}>

        <Image
            style={{width: width ,height: 200, top: 20}}
            source={require('../assets/images/homeBanner.jpg')}
        />
        <ScrollView style={{height:(height-300), width: width, top: 20}}>
            <TouchableOpacity onPress={this.openAbout}>
                <View style={styles.ListStyle}>
                    <Image
                    style={styles.IconStyle}
                    source={require('../assets/images/homeListIcon1.png')}
                    />
                    <Text style={styles.textStyle}>About Ahare Bangla</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openMap}>
                <View style={styles.ListStyle}>
                    <Image
                    style={styles.IconStyle}
                    source={require('../assets/images/homeListIcon2.png')}
                    />
                    <Text style={styles.textStyle}>Map</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openRestaurant}>
                <View style={styles.ListStyle}>
                    <Image
                    style={styles.IconStyle}
                    source={require('../assets/images/homeListIcon3.png')}
                    />
                    <Text style={styles.textStyle}>Restaurant</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openSearch}>
                <View style={styles.ListStyle}>
                    <Image
                    style={styles.IconStyle}
                    source={require('../assets/images/homeListIcon4.png')}
                    />
                    <Text style={styles.textStyle}>Search</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openNews}>
                <View style={styles.ListStyle}>
                    <Image
                    style={styles.IconStyle}
                    source={require('../assets/images/homeListIcon5.png')}
                    />
                    <Text style={styles.textStyle}>News</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openParking}>
                    <View style={styles.ListStyle}>
                        <Image
                        style={styles.IconStyle}
                        source={require('../assets/images/homeListIcon6.png')}
                        />
                        <Text style={styles.textStyle}>Parking</Text> 
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openSchedule}>
                <View style={styles.ListStyle}>
                    <Image
                    style={styles.IconStyle}
                    source={require('../assets/images/homeListIcon7.png')}
                    />
                    <Text style={styles.textStyle}>Programme Schedule</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 28
  },
  ListStyle:{
    flexDirection:'row',
    alignItems:'center', 
    borderBottomColor:'#005696', 
    borderBottomWidth:0.3,
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
