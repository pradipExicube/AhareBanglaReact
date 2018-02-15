import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene,Tabs } from 'react-native-router-flux';
import HomeScreen from './src/components/HomeScreen';
import MapScreen from './src/components/MapScreen';
import RestaurantScreen from './src/components/RestaurantScreen';
import NewsScreen from './src/components/NewsScreen';
import * as firebase from 'firebase';
import LoginPage from './src/components/LoginPage'

export default class App extends Component {
  state = { loggedIn: true };
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
      }else{
          this.setState({ loggedIn: false });
      }
    });
  }

  authenticateUser() {
    if (this.state.loggedIn == true) {
      console.log("We are authenticated now!");
      return (
        <Router>
            <Tabs key="root" tabs={true} tabBarPosition="bottom" tabBarStyle={styles.tabBar}>
                <Scene key="tab1" initial={true} title="Home" component={HomeScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} style={{color:'red'}}/>
                <Scene key="tab2" title="Map" component={MapScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}}/>
                <Scene key="tab3"  title="Restaurant" component={RestaurantScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}}/>
                <Scene key="tab4"  title="News" component={NewsScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}}/>
            </Tabs>
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
  },
  tabBar: {
    backgroundColor: '#005696',
  },
});
