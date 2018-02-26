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
import { Actions } from 'react-native-router-flux';

var {width,height} = Dimensions.get('window');

export default class FoodMenuList extends Component {

constructor(props) {
 super(props);
    this.state = {
        starCount: 3.5,
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

{
         
        this.props.data.menu ? 
        this.props.data.menu.map((foodlist,key)=>{
          // console.log('newsData');
          // console.log(news.desc);             
      return(

            <View key={key} style={styles.ListStyle}>
                <View style={{flexDirection:'column', width: width}}>
                    <Text style={styles.foodMenuHeader}>{foodlist.name}</Text>
                    <View style={{flexDirection: 'row',justifyContent:'space-between'}}> 
                        <Text style={styles.foodMenuQuantity}>{foodlist.description}</Text>
                    <View style={{marginRight: 10}}>
                        <Text style={styles.foodMenuRate}>₹{foodlist.rate}</Text>
                    </View>
                    </View>
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
                        onPress={() => {Actions.comment({
                            foodlistdata: foodlist.comments,
                            foodlistid: key, 
                            Ttype: 'foodlist', 
                            cat_id: this.props.cat_id, 
                            subcat_id: this.props.id,
                            res_id: this.props.res_id
                            })}} 
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
                                fullStarColor = {'#ffb400'}
                                starSize= {26}
                                starStyle= {{ margin: 4 }}
                                emptyStarColor= '#ffb400'
                            />
                        </View>
                    </View>
                </View>
                {/* <View style={{marginRight: 10}}>
                    <Text style={styles.foodMenuRate}>₹{foodlist.rate}</Text>
                </View> */}
            </View>
            )
        })
            : null
        }
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

