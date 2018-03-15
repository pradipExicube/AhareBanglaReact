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
  Share,
  ActivityIndicator
} from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection';
import StarRating from 'react-native-star-rating';
import { Icon, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import CustomHeader from './common/CustomHeader';

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
          res_id: '',
          logintype: '',
          showloading: true
      };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
      let checkref = firebase.database().ref('users/' + (firebase.auth().currentUser.uid));
      checkref.once('value',(snap1)=>{
      if(snap1.val()){
        let data = snap1.val();
        if(data.usertype){
        this.setState({logintype: data.usertype},()=>{console.log(this.state.logintype);this.setState({showloading: false})});
         }
        }
      })
    }
    else {
      this.setState({showloading: true})
    }
  });

    if(this.props.restaurantType) {
      console.log('from search page')
      var data = this.props.data;
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
      this.setState({allvar: dSSdata, showloading:false});

      }else {
        console.log('not found');
        this.setState({notFound: true, showloading:false});
      }
    }

   else if(this.props.Ttype){
     console.log("Ttype found...");
   }
    else {
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
          this.setState({allvar: dSSdata, showloading:false});
  
          })
        }
      })
      
      console.log('restaurent_end');
    }

  }

  componentWillUnmount() {
    console.log('component will unmount .....')
  }
  
  renderMapData(arr) {
    this.setState({allvar: arr});
  }

  goFoodmenu(data,key) {
    // console.log(key);
    Actions.foodmenu({data: data,id: key});
  }
      
  onStarRatingPress(rating) {
    firebase.database().ref("rastaurants/" + this.state.res_id + "/ratings/" + (firebase.auth().currentUser.uid) ).set({rate: rating});
    this.setState({
      starCount: 0,
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

  shareIt(data,key) {
    console.log('clicked.....');
    Share.share(
      {title: 'Ahare Bangla', message: "Come and Taste Your Favourite menu @"+" "+data.restaurants_name +" "+ "at Ahare Bangla's,"+ " "+data.positions+". For More Details Visit  http://www.wbfestivals.gov.in/"},
      {dialogTitle: 'Share Using'}
    )
    console.log('click end.....');
  }

  render() {
    console.log("hello "); 
    console.log(this.props.Ttype);
      return (
      <View>
        <CustomHeader Headershow={true} showFeedbackButton={false} headerName="Restaurant List" showSearchButton={true} showLogoutButton={true} showBackbutton= {false} onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{alert("back icon Clicked")}}/>
      {
        this.state.showloading ?
        (
          <View style={{position:'absolute', alignSelf:'center',top:((height-100)/2)}}>
          <View style={[styles.loadingcontainer, styles.loadinghorizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        </View>
        )
        :
    (
      <ScrollView style={{width: width, height: height-135}}>

      {
        this.props.mapdata ? 
        this.props.mapdata.map((restaurants, key)=>{

        return(
          
          <Card key={key}>
            <CardSection>
              <TouchableWithoutFeedback onPress={()=>{this.goFoodmenu(restaurants,key)}}>
                <Image
                    style={styles.IconStyle}
                    resizeMode='stretch'
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
                  <View style={{ width: width-150  }}>
                    <Text style={{ color: '#012f51', marginTop: 12 }}>{restaurants.positions}</Text>
                  </View>
                  </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>{this.goFoodmenu(restaurants,key)}}>
                  <View>  
                    <Text style={{ color: '#b1b1b1', marginTop: 12 }}>Stall No: {restaurants.stall_no}</Text>
                  </View>
                </TouchableWithoutFeedback>
  
                {
                    (this.state.logintype == "staff") ?
                
                <View style={{ flexDirection: 'row' }}>
  
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={restaurants.user_rating}
                    selectedStar={
                      () => {this.openModal(key)}
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
                    onPress={() => Actions.feedback({data: restaurants, id: key, Ttype: 'res'})} 
                  />
                  <Icon
                    name='md-share'
                    type='ionicon'
                    color='#005696'
                    size= {28}
                    containerStyle = {{marginLeft: 17, marginTop: 8}}
                    onPress={() => this.shareIt(restaurants,key)} 
                  />
                </View>
                :
                <View style={{ flexDirection: 'row' }}>
  
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={restaurants.user_rating}
                  selectedStar={
                    () => {this.openModal(key)}
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
                  onPress={() => this.shareIt(restaurants,key)} 
                />
              </View>    
              }
              </View>
            </CardSection>
          </Card>
          
  
                )
      }) :
            (
               this.state.allvar ? 
               this.state.allvar.map((restaurants,key)=>{
           
            return(
      
        <Card key={key}>
          <CardSection>
            <TouchableWithoutFeedback onPress={()=>{this.goFoodmenu(restaurants,key)}}>
              <Image
                  style={styles.IconStyle}
                  resizeMode='stretch'
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
                <View style={{ width: width-150  }}>
                  <Text style={{ color: '#012f51', marginTop: 12 }}>{restaurants.positions}</Text>
                </View>
                </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=>{this.goFoodmenu(restaurants,key)}}>
                <View>  
                  <Text style={{ color: '#b1b1b1', marginTop: 12 }}>Stall No: {restaurants.stall_no}</Text>
                </View>
              </TouchableWithoutFeedback>

              {
                  (this.state.logintype == "staff") ?
              
              <View style={{ flexDirection: 'row' }}>

                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={restaurants.user_rating}
                  selectedStar={
                    () => {this.openModal(key)}
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
                  onPress={() => Actions.feedback({data: restaurants, id: key, Ttype: 'res'})} 
                />
                <Icon
                  name='md-share'
                  type='ionicon'
                  color='#005696'
                  size= {28}
                  containerStyle = {{marginLeft: 17, marginTop: 8}}
                  onPress={() => this.shareIt(restaurants,key)} 
                />
              </View>
              :
              <View style={{ flexDirection: 'row' }}>

              <StarRating
                disabled={false}
                maxStars={5}
                rating={restaurants.user_rating}
                selectedStar={
                  () => {this.openModal(key)}
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
                onPress={() => this.shareIt(restaurants,key)} 
              />
            </View>    
            }
            </View>
          </CardSection>
        </Card>

              )
            })
              : null)
            }

        <Modal
            visible={this.state.modalVisible}
            animationType={'slide'}
            transparent={true}
            onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
                <View style={{alignContent: 'flex-end', marginLeft: 220}}>
                    <Button
                        small
                        buttonStyle={{width: 40,height: 10,}}
                        backgroundColor='transparent'
                        color='#000'
                        fontSize={20}
                        textStyle={{fontWeight: 'bold'}}
                        onPress={()=>{this.closeModal()}}
                        title='x' 
                    />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'space-around'}}>
                    <Text style={{
                        color: '#f6341a',
                        fontSize: 24,
                        alignSelf: 'center'
                    }}>Give Us Feedback</Text>
                    
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.state.starCount}
                        selectedStar={
                            (rating) => this.onStarRatingPress(rating)
                        }
                        fullStarColor = {'#ddc600'}
                        starSize= {26}
                        starStyle= {{ margin: 6, }}
                        emptyStarColor= '#ddc600'
                    />
                  </View>              
              </View>
          </View>
        </Modal>

      </ScrollView>
    )
      }
      </View>
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
    backgroundColor: '#fff',
    width: '75%',
    borderRadius: 5,
    height: 120
  },
  loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loadinghorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
});

