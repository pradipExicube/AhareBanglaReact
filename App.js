import React,{ Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Router, Scene, Tabs, Stack, Actions } from 'react-native-router-flux';
import HomeScreen from './src/components/HomeScreen';
import MapScreen from './src/components/MapScreen';
import RestaurantScreen from './src/components/RestaurantScreen';
import NewsScreen from './src/components/NewsScreen';
import * as firebase from 'firebase';
import LoginPage from './src/components/LoginPage'
import ProgrammeSchedule from './src/components/ProgrammeSchedule';
import Parking from './src/components/Parking';
import FoodMenu from './src/components/FoodMenu';
import SubCategory from './src/components/SubCategory';
import FoodMenuList from './src/components/FoodMenuList';
import AboutPage from './src/components/AboutPage';
import SearchPage from './src/components/SearchPage';
import CommentPage from './src/components/CommentPage';
import Feedback from './src/components/Feedback';

export default class App extends Component {
  state = { loggedIn: true, logintype:'' };
  componentWillMount() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA-4WOPx34prBUrgTKTR9aTQvSaixkFyTM",
      authDomain: "aharebanglareact.firebaseapp.com",
      databaseURL: "https://aharebanglareact.firebaseio.com",
      projectId: "aharebanglareact",
      storageBucket: "aharebanglareact.appspot.com",
      messagingSenderId: "818648944845"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
          this.setState({ loggedIn: true });
          let self = firebase.auth().currentUser.uid;
          let checkref = firebase.database().ref('users/' + self);
          checkref.on('value',(snap1)=>{
          if(snap1.val()){
            let data = snap1.val();
            if(data.usertype){
              this.setState({logintype: data.usertype},()=>{console.log(this.state.logintype)});
            }
          }
        })
      }else{
          this.setState({ loggedIn: false });
      }
    });

    

  }
  onPress() {
    Actions.feedback({Ttype: 'genfeed'});
  }

  authenticateUser() {
    if (this.state.loggedIn == true) {
      console.log("We are authenticated now!");
      return (
        <Router>
          <Scene key='root'>
            <Tabs key="root" tabs={true} tabBarPosition="bottom" tabBarStyle={styles.tabBar}>
                {
                (this.state.logintype == "staff") ?
               
                <Scene key="home" initial={true} title="Home" onRight={ ()=> {this.onPress()} } rightTitle={'FEEDBACK'} component={HomeScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} style={{color:'red'}} headerTintColor='#fff'/>
                : 
                <Scene key="home" initial={true} title="Home" component={HomeScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} style={{color:'red'}} headerTintColor='#fff'/>
              }
                <Scene key="map" title="Map" component={MapScreen} navigationBarStyle={{backgroundColor:'#005696',}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
                <Scene key="restaurant"  title="Restaurant" component={RestaurantScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
                <Scene key="news"  title="News" component={NewsScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            </Tabs>
            <Scene key="programmeSchedule" title="Programme Schedule"  component={ProgrammeSchedule} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="parking" title="Parking"  component={Parking} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="foodmenu" title="Food Menu"  component={FoodMenu} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="subcategory" title="Sub Category"  component={SubCategory} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="foodlist" title="Food Menu List"  component={FoodMenuList} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="about" title="About"  component={AboutPage} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="search" title="Search"  component={SearchPage} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="comment" title="Comment"  component={CommentPage} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="feedback" title="Staff Review"  component={Feedback} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
          </Scene>    
        </Router>
      );
    }
    else {
      console.log("loginpage");
      return (
        <LoginPage />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.authenticateUser()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 23,
  },
  tabBar: {
    backgroundColor: '#005696',
    marginBottom: 23
  },
});
