import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection';
import StarRating from 'react-native-star-rating';
import { Icon } from 'react-native-elements'

export default class RestaurantScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }
      
      onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
      }
      render() {
    return (
      <View>
        <Card>
          <CardSection>
            <TouchableWithoutFeedback onPress={()=>{alert('food_menu')}}>
              <Image
                  style={styles.IconStyle}
                  source={require('../assets/images/wowmomo.png')}
              />
            </TouchableWithoutFeedback>
            <View style={{ marginTop: 10, marginLeft: 10, }}>
              <TouchableWithoutFeedback onPress={()=>{alert('food_menu')}}>
                <View>
                  <Text style={{ color: '#005696' }}>KAVIAR</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=>{alert('food_menu')}}>
                <View>
                  <Text style={{ color: '#012f51', marginTop: 12 }}>Hanger A</Text>
                </View>
                </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=>{alert('food_menu')}}>
                <View>  
                  <Text style={{ color: '#b1b1b1', marginTop: 12 }}>Stall No: 43</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={{ flexDirection: 'row' }}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                  starColor= '#ddc600'
                  starSize= {18}
                  starStyle= {{ marginTop: 18, margin: 2 }}
                  emptyStarColor= '#ddc600'
                />
                <Icon
                  name='md-chatbubbles'
                  type='ionicon'
                  color='#005696'
                  size= {28}
                  containerStyle = {{marginLeft: 35, marginTop: 10}}
                  onPress={() => alert('comment')} 
                />
                <Icon
                  name='md-share'
                  type='ionicon'
                  color='#005696'
                  size= {28}
                  containerStyle = {{marginLeft: 17, marginTop: 10}}
                  onPress={() => alert('share')} 
                />
              </View>
            </View>
          </CardSection>
        </Card>
        <Card>
            <CardSection>
              <Image
                  style={styles.IconStyle}
                  source={require('../assets/images/wowmomo.png')}
              />
            </CardSection>
        </Card>
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
});

