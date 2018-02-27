import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Modal,
  Button
} from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection';
import StarRating from 'react-native-star-rating';
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

var {width,height} = Dimensions.get('window');

export default class RestaurantScreen extends Component {
  constructor(props) {
    super(props);
    console.log('restaurent_start');
    this.state = {
      starCount: 0,
      restaurantData: [],
      notFound: false,
      modalVisible: false,
      allvar: [],
      res_id: ''
    };
  }
  componentWillMount() {
    // console.log(this.props.restaurantType);
    if(this.props.restaurantType) {
      var data = this.props.data;
      // console.log(data);
      if(data){
        var dSSdata=[];

        for(let i=0;i<data.length;i++) {
          if(data[i].ratings) {
              let obj = data[i].ratings;
              let rating = 0;
              let count = 0;
              for(let key in obj) {
                  rating = rating + parseInt(obj[key].rate);
                  count++;
              }
              data[i].user_rating = rating/count;
              dSSdata.push(data[i])
              console.log(data[i]);
          }else {
            data[i].user_rating = 0;
            dSSdata.push(data[i])
          }
    
      }
      this.setState({allvar: dSSdata});

        // this.setState({restaurantData: data, notFound: false});
      }else {
        console.log('not found');
        this.setState({notFound: true});
      }
    }else {
      console.log('firebase');
      let ref = firebase.database().ref('rastaurants');
      ref.on('value',(snap)=>{
        if(snap.val()){
          this.setState({restaurantData: snap.val()},()=>{
            var dSSdata=[];

            for(let i=0;i<this.state.restaurantData.length;i++) {
              if(this.state.restaurantData[i].ratings){
                  let obj = this.state.restaurantData[i].ratings;
                  let rating = 0;
                  let count = 0;
                  for(let key in obj){
                      rating = rating + parseInt(obj[key].rate);
                      count++;
                  }
                  this.state.restaurantData[i].user_rating = rating/count;
                  dSSdata.push(this.state.restaurantData[i]);
              }else{
                this.state.restaurantData[i].user_rating = 0;
                dSSdata.push(this.state.restaurantData[i])
              }
        
          }
          this.setState({allvar: dSSdata});
  
          })
        }
      })
      
  console.log('restaurent_end');
} 
  }
  goFoodmenu(data,key) {
    // console.log(key);
    Actions.foodmenu({data: data,id: key});
  }
      
  onStarRatingPress(rating) {
    firebase.database().ref("rastaurants/" + this.state.res_id + "/ratings/" + (firebase.auth().currentUser.uid) ).set({rate: rating});
    this.setState({
      starCount: rating,
      modalVisible: false
    });
  }

  openModal(key) {
    this.setState({
      modalVisible:true,
      res_id: key
    });
  }

  closeModal() {
    this.setState({modalVisible:false});
  }




  render() {
    return (
      <ScrollView style={{width: width, height: height-135}}>


      {
                this.state.allvar ? 
                this.state.allvar.map((restaurants,key)=>{
                  // console.log('restaurantData');
                  // console.log(restaurants.restaurants_name);
           
              return(
      
        <Card key={key}>
          <CardSection>
            <TouchableWithoutFeedback onPress={()=>{this.goFoodmenu(restaurants,key)}}>
              <Image
                  style={styles.IconStyle}
                  source={{uri: restaurants.logo}}
              />
            </TouchableWithoutFeedback>
            <View style={{ marginTop: 10, marginLeft: 10, }}>
              <TouchableWithoutFeedback onPress={()=>{this.goFoodmenu(restaurants,key)}}>
                <View style={{ width: width-150  }}>
                  <Text style={{ color: '#005696', marginRight: 12 }}>{restaurants.restaurants_name}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=>{this.goFoodmenu(restaurants,key)}}>
                <View>
                  <Text style={{ color: '#012f51', marginTop: 12 }}>{restaurants.positions}</Text>
                </View>
                </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=>{this.goFoodmenu(restaurants,key)}}>
                <View>  
                  <Text style={{ color: '#b1b1b1', marginTop: 12 }}>Stall No: {restaurants.stall_no}</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={{ flexDirection: 'row' }}>

                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={restaurants.user_rating}
                  selectedStar={
                    () => {this.openModal(key)}
                    // (rating) => this.onStarRatingPress(rating)
                  }
                  fullStarColor = {'#ddc600'}
                  starSize= {18}
                  starStyle= {{ marginTop: 16, margin: 2 }}
                  emptyStarColor= '#ddc600'
                />
                  
                <Icon
                  name='md-chatbubbles'
                  type='ionicon'
                  color='#005696'
                  size= {28}
                  containerStyle = {{marginLeft: 35, marginTop: 8}}
                  onPress={() => Actions.comment({data: restaurants, id: key, Ttype: 'res'})} 
                />
                <Icon
                  name='md-share'
                  type='ionicon'
                  color='#005696'
                  size= {28}
                  containerStyle = {{marginLeft: 17, marginTop: 8}}
                  onPress={() => alert('share')} 
                />
              </View>
            </View>
          </CardSection>
        </Card>

              )
            })
              : null
            }
            
            <Modal
                  visible={this.state.modalVisible}
                  animationType={'slide'}
                  transparent={true}
                  onRequestClose={() => this.closeModal()}
              >
                <View style={styles.modalContainer}>
                {/* <StarRate /> */}
                  <View style={styles.innerContainer}>
                      <View style={{
                          flexDirection: 'row'
                      }}>
                      <Text style={{
                          color: '#f6341a',
                          fontSize: 24
                      }}>Give Us Feedback</Text>
                      <Button
                          onPress={() => this.closeModal()}
                          title="x"
                          color='#ddd'
                      >
                      </Button>
                      </View>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={this.state.starCount}
                      selectedStar={
                          // () => this.openModal()
                          (rating) => this.onStarRatingPress(rating)
                      }
                      fullStarColor = {'#ddc600'}
                      starSize= {26}
                      starStyle= {{ margin: 4 }}
                      emptyStarColor= '#ddc600'
                  />
                    
                  </View>
                </View>
              </Modal>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13A2CE',
  },
  IconStyle: {
    width: 90,
    height: 90, 
    marginLeft:10, 
    marginRight:10, 
    marginTop:25, 
    marginBottom:25 
  },
  modalContainer: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

