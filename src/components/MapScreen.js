import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

var {width,height} = Dimensions.get('window');
export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resPosition: ''
    }
  }
  goRestaurant(event) {
    var x = event.nativeEvent.locationX;
    var y = event.nativeEvent.locationY
    console.log(x,y);
    if(x>=1000 && x<1280 && y>=85 && y<300) {
      console.log('Hanger A');
      // Actions.restaurant({resPos: 'Hanger A', Ttype: 'map'});
      // this.setState({ resPosition: 'Hanger A' });
      this.calculateData('Hanger A')
    }
    else if(x>=1300 && x<1550 && y>=85 && y<300) {
      console.log('Hanger B');
      //Actions.restaurant({resPos: 'Hanger B', Ttype: 'map'});
      this.calculateData('Hanger B')
      // this.setState({ resPosition: 'Hanger B' })
    }
    else if(x>=1560 && x<1830 && y>=85 && y<300) {
      console.log('Hanger C');
      // Actions.restaurant({resPos: 'Hanger C', Ttype: 'map'});
      this.calculateData('Hanger C')
    }
    else if(x>=1845 && x<2115 && y>=85 && y<300) {
      console.log('Hanger D');
      // Actions.restaurant({resPos: 'Hanger D', Ttype: 'map'});
      this.calculateData('Hanger D')
    }
    else if(x>=1880 && x<2100 && y>=350 && y<535) {
      console.log('Non Veg Zone');
      // Actions.restaurant({resPos: 'Non Veg Zone', Ttype: 'map'});
      this.calculateData('Non Veg Zone')
    }
    else if(x>=1576 && x<1725 && y>=330 && y<529) {
      console.log('Veg Zone');
      // Actions.restaurant({resPos: 'Veg Zone', Ttype: 'map'});
      this.calculateData('Veg Zone')
    }
    else if(x>=900 && x<1024 && y>=253 && y<484) {
      console.log('Snacks');
      // Actions.restaurant({resPos: 'Snacks', Ttype: 'map'});
      this.calculateData('Snacks')
    }
    else if(x>=465 && x<747 && y>=50 && y<491) {
      console.log('Misti Bangla');
      // Actions.restaurant({resPos: 'Misti Bangla', Ttype: 'map'});
      this.calculateData('Misti Bangla')
    }
    else if(x>=170 && x<345 && y>=137 && y<365) {
      console.log('Exhibi Hanger');
      // Actions.restaurant({resPos: 'Exhibi Hanger', Ttype: 'map'});
      this.calculateData('Exhibi Hanger')
    }
    
  }

  //calculate data
  calculateData(resname){
    var mapdata = [] ;
    var newArr = [];
    var resArray = [];

    // let resname = this.props.resPos;
    let reff = firebase.database().ref('rastaurants');
    reff.once('value',(snapshot)=>{

        if(snapshot.val()) {
              mapdata = snapshot.val();

              for(let i=0;i<mapdata.length;i++){

                if(mapdata[i].ratings){
                    let obj = mapdata[i].ratings;
                    let rating = 0;
                    let count = 0;
                    for(let key in obj){
                        rating = rating + parseInt(obj[key].rate);
                        count++;
                    }
                    mapdata[i].user_rating = rating/count;
                    resArray.push(mapdata[i]);

                }else{
                  mapdata[i].user_rating = 0;
                  resArray.push(mapdata[i]);

                }

            }
            for(let j=0; j<resArray.length; j++){

              if(resArray[j].positions){

                let resPosition = resArray[j].positions;
                for(let k=0; k<resPosition.length; k++){

                  if(resPosition[k]==resname){
                    newArr.push(resArray[j]);
                    break;
                  }

                }

              }

            }
            Actions.restaurant({mapdata: newArr, Ttype: 'map'});

            // console.log("position checking..!!");
            // console.log(newArr);
            // console.log("checking end..!!")

        }


    })
  }
  render() { 
    return (
        <ScrollView>
          <ScrollView horizontal>
          <TouchableOpacity onPress={(event)=>{this.goRestaurant(event)}}>
            <Image
              style={{width: 2616 ,height: 628,}}
              source={require('../assets/images/map.jpg')}
            />
          </TouchableOpacity>
          </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});
