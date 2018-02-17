import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

var {width,height} = Dimensions.get('window');

export default class FoodMenuList extends Component {

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
        <ScrollView style={{ height:(height-100), width: width }}>
            <View style={styles.ListStyle}>
                <View style={{flexDirection:'column'}}>
                    <Text style={styles.foodMenuHeader}>Food Menu List</Text> 
                    <Text style={styles.foodMenuQuantity}>500 Gm</Text>
                    <View style={{flexDirection: 'row'}}>
                    <Icon
                        name='md-chatbubbles'
                        type='ionicon'
                        color='#005696'
                        size= {28}
                        containerStyle = {{
                            marginTop: 10,
                            marginLeft: 20, 
                            marginBottom: 5}}
                        onPress={() => alert('comment')} 
                    />
                        <View style={{
                            marginTop: 10, 
                            marginLeft: 20, 
                            marginBottom: 10}}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                starColor= '#ffb400'
                                starSize= {26}
                                starStyle= {{ margin: 4 }}
                                emptyStarColor= '#ffb400'
                            />
                        </View>
                    </View>
                </View>
                <View style={{marginRight: 10}}>
                    <Text style={styles.foodMenuRate}>₹100</Text>
                </View>
            </View>
        </ScrollView>
        );      
    }
}

const styles = StyleSheet.create({
    ListStyle:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        borderBottomColor:'rgba(0, 86, 150, 0.3)', 
        borderBottomWidth: 1,
    },
      foodMenuHeader: {
        fontSize: 20,
        color: "rgba(0, 86, 150, 0.9)",
        marginTop: 10, 
        marginLeft: 20, 
        marginBottom: 5
    },
      foodMenuQuantity: {
        lineHeight: 22,
        color: '#012f51',
        fontSize: 15,
        paddingTop: 6,
        marginTop: 5,
        marginLeft: 20,
        marginBottom: 5
    },
    foodMenuRate: {
        fontWeight: 'bold',
        color: 'rgba(0, 86, 150, 0.9)',
        fontSize: 22,
        minWidth: '20%',
        textAlign: 'center'
    }
});

