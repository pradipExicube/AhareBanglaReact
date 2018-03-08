import React,{ Component } from 'react';
import { StyleSheet, Text, View, ScrollView,ActivityIndicator } from 'react-native';
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
import { MenuProvider } from 'react-native-popup-menu';

export default class App extends Component {
  state = { loggedIn: true, logintype:'', showloading:true };
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
          // firebase.auth().signOut();
          // this.setState({ loggedIn: true });
          this.setState({showloading:false});
          Actions.reset('tabs');
      }else{
          this.setState({showloading:false});
          // this.setState({ loggedIn: false });
          // Actions.reset('Login');
      }
    });

    

  }
  
  authenticateUser() {
    // if (this.state.loggedIn == true) {
    //   console.log("We are authenticated now!");
      return (
        <MenuProvider>
        <Router>
          <Scene key='root'>
          <Scene key="Login" title="Login Page" hideNavBar={true}  component={LoginPage} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Tabs key="tabs" lazy={true} tabs={true} animationEnabled={false} tabStyle={{borderWidth: 1, borderColor: 'rgba(0, 86, 150, 0.3)'}} activeBackgroundColor={'#005696'} labelStyle={{color: '#fff', paddingBottom: 12, fontSize: 15}} tabBarPosition="bottom" tabBarStyle={styles.tabBar}>
                <Scene key="home" initial={true} hideNavBar={true} title="Home" component={HomeScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} style={{color:'red'}} headerTintColor='#fff'/>
                <Scene key="map" hideNavBar={true} title="Map" component={MapScreen} navigationBarStyle={{backgroundColor:'#005696',}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
                <Scene key="restaurant"  hideNavBar={true} title="Restaurant" component={RestaurantScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
                <Scene key="news"  hideNavBar={true} title="News" component={NewsScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            </Tabs>
            
            <Scene key="programmeSchedule" title="Programme Schedule"  component={ProgrammeSchedule} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="parking" title="Parking"  component={Parking} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="foodmenu" hideNavBar={true} title="Food Menu"  component={FoodMenu} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="subcategory" hideNavBar={true} title="Sub Category"  component={SubCategory} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="foodlist" hideNavBar={true} title="Food Menu List"  component={FoodMenuList} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="about" title="About"  component={AboutPage} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="search" title="Search"  component={SearchPage} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="comment" hideNavBar={true} title="Comment"  component={CommentPage} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
            <Scene key="feedback" title="Staff Review"  component={Feedback} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} headerTintColor='#fff'/>
          </Scene>    
        </Router>
        </MenuProvider>
      );
    // }
    // else {
    //   console.log("loginpage");
    //   return (
    //     <LoginPage />
    //   );
    // }
  }

  render() {
    if(this.state.showloading){
      return (
          <View style={[styles.loadingcontainer, styles.loadinghorizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
          </View>
      )
    }else{
      return (
        <View style={styles.container}>
          {this.authenticateUser()}
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  loadingcontainer: {
    flex: 1,
    justifyContent: 'center'
  },
  loadinghorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  container: {
    flex: 1,
    top: 23,
  },
  tabBar: {
    backgroundColor: '#008bf2',
    marginBottom: 23
  },
});
