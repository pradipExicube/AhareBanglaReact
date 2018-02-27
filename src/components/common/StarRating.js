import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import StarRating from 'react-native-star-rating';

export default class StarRate extends Component {
    constructor(props) {
    super(props);
    this.state = {
        starCount: 3.5,
        }
    }
    onStarRatingPress(rating) {
        // firebase.database().ref('rastaurants/' + this.props.res_id + "/category/" + this.props.cat_id + "/subcategory/" + this.props.id + "/menu/" + this.menu_id + "/ratings/" +  + this.user_id).set({user:this.user_id,rate:this.rating});
        this.setState({
          starCount: rating
        });
    }
    render() {
        return (
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
        )
    }
}
const styles = {
    innerContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
      },
}


