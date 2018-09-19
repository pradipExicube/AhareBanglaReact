import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import * as firebase from 'firebase';
import StarRating from 'react-native-star-rating';
import { Button } from 'react-native-elements';
var {width,height} = Dimensions.get('window');
export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
            staffName: '',
            staffMob: '',
            staffComment: ''
          }
          
    }
    onStarRatingPress(rating) {
        this.setState({
          starCount: rating,
        });
      }

      reviewSubmit() {
          console.log(this.state.staffName);
          console.log(this.state.staffMob);
          console.log(this.state.starCount);
          console.log(this.state.staffComment);
          if(this.state.staffName == undefined || this.state.staffName =="" || this.state.staffName==null || 
          this.state.staffMob == undefined || this.state.staffMob =="" || this.state.staffMob==null ||  
          this.state.starCount == undefined || this.state.starCount==null || this.state.starCount == 0 ||
          this.state.staffComment == undefined || this.state.staffComment =="" || this.state.staffComment==null)
          {

                if(this.state.staffName == undefined || this.state.staffName =="" || this.state.staffName==null){
                    Alert.alert(
                        'Error',
                        'User Name field can not be blank',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                      )
                }else if(this.state.staffMob == undefined || this.state.staffMob =="" || this.state.staffMob==null){
                    Alert.alert(
                        'Error',
                        'User Contact field can not be blank',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                      )
                }else if(this.state.starCount == undefined || this.state.starCount==null || this.state.starCount == 0){
                    Alert.alert(
                        'Error',
                        'Rating field can not be blank',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                      )
                }else if(this.state.staffComment == undefined || this.state.staffComment =="" || this.state.staffComment==null){
                    Alert.alert(
                        'Error',
                        'User Comment field can not be blank',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                      )
                }
            }
            else {
                if(this.props.Ttype == "res"){
                    // console.log(this.ratingUserrating,this.res_id);
                    firebase.database().ref("rastaurants/" + this.props.id + "/staffrating/").push({
                        username: this.state.staffName,
                        usermobile: this.state.staffMob,
                        userrating: this.state.starCount,
                        usercomment: this.state.staffComment,
                        refUID: (firebase.auth().currentUser.uid)
                    }).then(()=>{

                        this.setState({
                            staffName:'',
                            staffMob:'',
                            starCount:0,
                            staffComment:'',
                          },()=>{
    
                            Alert.alert(
                                'Success',
                                'You Have Successfully Submitted Your Review',
                                [
                                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                                ],
                              )
                          })
                      })
                }
                else if(this.props.Ttype == 'genfeed') {
                firebase.database().ref("generalfeedback").push({
                    username: this.state.staffName,
                    usermobile: this.state.staffMob,
                    userrating: this.state.starCount,
                    usercomment: this.state.staffComment,
                    refUID: (firebase.auth().currentUser.uid)
                  }).then(()=>{

                    this.setState({
                        staffName:'',
                        staffMob:'',
                        starCount:0,
                        staffComment:'',
                      },()=>{

                        Alert.alert(
                            'Success',
                            'You Have Successfully Submitted Your Review',
                            [
                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                          )
                      })
                  })


                }
                else{
                    firebase.database().ref('rastaurants/' + this.props.res_id + "/category/" + this.props.cat_id + "/subcategory/" + this.props.subcat_id + "/menu/" + this.props.foodlistid + "/staffrating/").push({
                        username: this.state.staffName,
                        usermobile: this.state.staffMob,
                        userrating: this.state.starCount,
                        usercomment: this.state.staffComment,
                        refUID: (firebase.auth().currentUser.uid)
                    });
                    this.setState({
                        staffName: "" ,
                        staffMob: "" ,
                        starCount: 0,
                        staffComment:''
                      })
                      Alert.alert(
                        'Success',
                        'You Have Successfully Submitted Your Review',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                      )
                  } 
                  
            }
      }

 render() {
        return (
            <ScrollView style={{
                    backgroundColor: '#b8e1ff', 
                    width: width, 
                    height: height-80,
                    top: 0,
                    position: 'absolute',
                    }}
                    >

                        <View>
                        <Text style={{
                                    color: '#005696',
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    marginTop: 10,
                                    marginLeft: 20
                                }}>Give Us Review</Text>
                        <Text style={{
                                    color: 'rgba(0, 86, 150, 0.9)',
                                    fontWeight: 'normal',
                                    fontSize: 18,
                                    marginTop: 10,
                                    marginLeft: 20
                                }}>Name</Text>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: 'rgba(0, 86, 150, 0.3)',           
                            backgroundColor: 'rgba(0, 86, 150, 0.2)', 
                            marginTop: 10,
                            margin: 20,
                            width: '90%',
                        }}>
                            <TextInput
                                style={{height: 50, padding: 10, fontSize: 15}}
                                placeholder="Please Enter Your Name"
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#000'
                                value={this.state.staffName}
                                onChangeText={(text) => this.setState({staffName: text})}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={{
                                    color: 'rgba(0, 86, 150, 0.9)',
                                    fontWeight: 'normal',
                                    fontSize: 18,
                                    marginTop: 10,
                                    marginLeft: 20
                                }}>Mobile Number</Text>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: 'rgba(0, 86, 150, 0.3)',           
                            backgroundColor: 'rgba(0, 86, 150, 0.2)', 
                            marginTop: 10,
                            margin: 20,
                            width: '90%',
                        }}>
                            <TextInput
                                style={{height: 50, padding: 10, fontSize: 15}}
                                placeholder="Please Enter Your Mobile Number"
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#000'
                                keyboardType='numeric'
                                maxLength={10}
                                value={this.state.staffMob}
                                onChangeText={(text) => this.setState({staffMob: text})}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={{
                                    color: 'rgba(0, 86, 150, 0.9)',
                                    fontWeight: 'normal',
                                    fontSize: 18,
                                    marginTop: 10,
                                    marginLeft: 20
                                }}>Rating</Text>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: 'rgba(0, 86, 150, 0.3)',           
                            backgroundColor: 'rgba(0, 86, 150, 0.2)', 
                            marginTop: 10,
                            margin: 20,
                            width: '90%',
                        }}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={
                                    (rating) => this.onStarRatingPress(rating)
                                }
                                fullStarColor = {'#012f51'}
                                starSize= {38}
                                starStyle= {{ margin: 0 }}
                                emptyStarColor= '#012f51'
                                emptyStarColor= '#ffb400'
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                emptyStar={'ios-star-outline'}
                                iconSet={'Ionicons'}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={{
                                    color: 'rgba(0, 86, 150, 0.9)',
                                    fontWeight: 'normal',
                                    fontSize: 18,
                                    marginTop: 10,
                                    marginLeft: 20
                                }}>Comment</Text>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: 'rgba(0, 86, 150, 0.3)',           
                            backgroundColor: 'rgba(0, 86, 150, 0.2)', 
                            marginTop: 10,
                            margin: 20,
                            width: '90%',
                        }}>
                            <TextInput
                                style={{height: 50, padding: 10, fontSize: 15}}
                                placeholder="Please Enter Your Comment"
                                multiline = {true}
                                numberOfLines = {4}
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#000'
                                value={this.state.staffComment}
                                onChangeText={(text) => this.setState({staffComment: text})}
                            />
                        </View>
                    </View>
                    <View>
                    <Button
                        // small
                        buttonStyle={{width: 140, borderRadius: 8, alignSelf: 'center'}}
                        backgroundColor='#012f51'
                        color='#fff'
                        fontSize={15}
                        textStyle={{fontWeight: 'bold'}}
                        onPress={()=>{this.reviewSubmit()}}
                        title='SUBMIT' />
                    </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  
});
