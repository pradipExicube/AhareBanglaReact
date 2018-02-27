import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TextInput
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
          }
          
    }
    onStarRatingPress(rating) {
        this.setState({
          starCount: rating,
        });
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
                                onChangeText={(text) => this.setState({searchName: text})}
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
                                onChangeText={(text) => this.setState({searchName: text})}
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
                                starSize= {35}
                                starStyle= {{ margin: 0 }}
                                emptyStarColor= '#012f51'
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
                                onChangeText={(text) => this.setState({searchName: text})}
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
                        onPress={()=>{alert('you subit it')}}
                        title='SUBMIT' />
                    </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  
});
