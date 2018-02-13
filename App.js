import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene,Tabs } from 'react-native-router-flux';
import HomeScreen from './src/components/HomeScreen';
import MapScreen from './src/components/MapScreen';
import RestaurantScreen from './src/components/RestaurantScreen';
import NewsScreen from './src/components/NewsScreen';


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Router>
            <Tabs key="root" tabs={true} tabBarPosition="bottom" tabBarStyle={styles.tabBar}>
                <Scene key="tab1" initial={true} title="Home" component={HomeScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}} style={{color:'red'}}/>
                <Scene key="tab2" title="Map" component={MapScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}}/>
                <Scene key="tab3"  title="Restaurant" component={RestaurantScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}}/>
                <Scene key="tab4"  title="News" component={NewsScreen} navigationBarStyle={{backgroundColor:'#005696'}} titleStyle={{color:'white'}}/>
            </Tabs>
        </Router>
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
