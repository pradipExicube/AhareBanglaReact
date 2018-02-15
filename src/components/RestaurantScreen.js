import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection';
import StarRating from 'react-native-star-rating';

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
              <Image
                  style={styles.IconStyle}
                  source={require('../assets/images/wowmomo.png')}
              />
              <View style={{ marginTop: 10, marginLeft: 10, }}>
                <Text style={{ color: '#005696' }}>KAVIAR</Text>
                <Text style={{ color: '#012f51', marginTop: 6 }}>Hanger A</Text>
                <Text style={{ color: '#b1b1b1', marginTop: 6, marginBottom: 8 }}>Stall No: 43</Text>
              </View>
              <View>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                starColor= '#ddc600'
                starSize= {20}
              />
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
    width: 80,
    height: 80, 
    marginLeft:10, 
    marginRight:10, 
    marginTop:20, 
    marginBottom:20 
  },
});

