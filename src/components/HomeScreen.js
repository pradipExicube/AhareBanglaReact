import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import CustomHeader from './common/CustomHeader';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';

var {width,height} = Dimensions.get('window');
export default class HomeScreen extends Component {
 constructor(props) {
     super(props);
     this.state = {
        restaurantData: [],
        logintype: '',
        isVisible: false,
        buttonRect: {},
        showloading: false
     }
 }

 componentWillMount() {
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            let self = firebase.auth().currentUser.uid;
            let checkref = firebase.database().ref('users/' + self);
            checkref.once('value',(snap1)=>{
            if(snap1.val()){
              let data = snap1.val();
              if(data.usertype){
                this.setState({logintype: data.usertype},()=>{console.log(this.state.logintype)});
              }
            }
          })
        }
    });
 }
 
 openAbout() {
    Actions.about();
 };
 openMap() {
    Actions.map();
 };
 openRestaurant() {
   // Actions.restaurant();


   let ref = firebase.database().ref('rastaurants');
   ref.on('value',(snap)=>{
     if(snap.val()){
      // this.setState({restaurantData: snap.val()},()=>{
          var resData = snap.val();
         var dSSdata=[];

         for(let i=0;i<resData.length;i++) {
           if(resData[i].ratings){
               let obj = resData[i].ratings;
               let rating = 0;
               let count = 0;
               for(let key in obj){
                   rating = rating + parseInt(obj[key].rate);
                   count++;
               }
               resData[i].user_rating = rating/count;
               dSSdata.push(resData[i]);
           }else{
            resData[i].user_rating = 0;
             dSSdata.push(resData[i])
           }
     
       }
       this.setState({showloading: false});
       Actions.restaurant({mapdata: dSSdata});

     }
   })





 };
 openSearch() {
    Actions.search();
 };
 openNews() {
    Actions.news();
 };
 openParking() {
    Actions.parking();
 };
 openSchedule() {
    Actions.programmeSchedule();
 };
 goFeedback() {
    Actions.feedback({Ttype: 'genfeed'});
 }
render() {
    if(this.state.showloading) {
        return (
            <View style={[styles.loadingcontainer, styles.loadinghorizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    else {

  return (
    <View>
        {
        (this.state.logintype == "staff") ?
        <CustomHeader Headershow={true} showFeedbackButton={true} onPressFeedback={()=>{this.goFeedback()}} headerName="Home" showSearchButton={false} showLogoutButton={true} showBackbutton= {false}/>
        :
        <CustomHeader Headershow={true} showFeedbackButton={false} onPressFeedback={()=>{this.goFeedback()}} headerName="Home" showSearchButton={false} showLogoutButton={true} showBackbutton= {false}/>
        }
        <View>
        
    </View>
    <View style={styles.container}>
    
        <Image
            style={{width: width ,height: 200, top: 28}}
            source={require('../assets/images/homeBanner.jpg')}
        />
        <ScrollView style={{height:(height-330), width: width, top: 28}}>
            <TouchableOpacity onPress={()=>{this.openAbout()}}>
                <View style={styles.ListStyle}>
                    <Image
                    style={styles.IconStyle}
                    source={require('../assets/images/homeListIcon1.png')}
                    />
                    <Text style={styles.textStyle}>About Ahare Bangla</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.openMap()}}>
                <View style={styles.ListStyle}>
                    <Image
                    style={styles.IconStyle}
                    source={require('../assets/images/homeListIcon2.png')}
                    />
                    <Text style={styles.textStyle}>Map</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({showloading: true},()=>{this.openRestaurant()});this.render()}}>
                <View style={styles.ListStyle}>
                    <Image
                    style={styles.IconStyle}
                    source={require('../assets/images/homeListIcon3.png')}
                    />
                    <Text style={styles.textStyle}>Restaurant</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.openSearch()}}>
                <View style={styles.ListStyle}>
                    <Image
                    style={styles.IconStyle}
                    source={require('../assets/images/homeListIcon4.png')}
                    />
                    <Text style={styles.textStyle}>Search</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.openNews()}}>
                <View style={styles.ListStyle}>
                    <Image
                    style={styles.IconStyle}
                    source={require('../assets/images/homeListIcon5.png')}
                    />
                    <Text style={styles.textStyle}>News</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.openParking()}}>
                    <View style={styles.ListStyle}>
                        <Image
                        style={styles.IconStyle}
                        source={require('../assets/images/homeListIcon6.png')}
                        />
                        <Text style={styles.textStyle}>Parking</Text> 
                    </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.openSchedule()}}>
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
    </View>
  );
}
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
  },
  loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  loadinghorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'transparent'
  },
});
