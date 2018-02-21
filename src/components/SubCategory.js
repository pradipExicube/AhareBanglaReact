import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import Card from './common/Card';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
var {width,height} = Dimensions.get('window');
export default class SubCategory extends Component {
    constructor(props) {
        super(props);
        
    }
    componentWillMount() {
        console.log(this.props.res_id);
        console.log(this.props.data);
        console.log(this.props.id);
    }

    goFoodList() {
        Actions.foodlist();
    }
    render() {
        return (
            <View
            style={styles.containerStyle}>

                <View style= {{marginTop: 3, width: width}}>
                    <TouchableWithoutFeedback onPress={this.goFoodList}>
                        <View>
                        
                            <Image
                                style={styles.cardImage}
                                source={{uri: "https://firebasestorage.googleapis.com/v0/b/aharebangla-6f646.appspot.com/o/food%20menu%2FupdatedMenu%2Ffoodmenunew.jpg?alt=media&token=13c9b2e7-c0cf-487a-86ca-00673997e377"}}
                            />

                            <View style={styles.cardTextContainer}>
                                <Text style={styles.textStyle}>{this.props.data.name}</Text>
                                <Icon
                                    name='md-arrow-dropright-circle'
                                    type='ionicon'
                                    color='#a3d2f5'
                                    size= {30}
                                    containerStyle = {{ 
                                        margin: 5,
                                    }}
                                />
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <Image
                    style={styles.backgroundImage}
                    source={require('../assets/images/innerPlate2.png')}
                />  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: width-50, 
        height: 220, 
        top: 30, 
        alignSelf: 'center'
    },
    cardImage: {
        width: width, 
        height: 120, 
        position: 'relative', 
        backgroundColor: 'transparent'
    },
    containerStyle: {
        position: 'absolute',
        width: width,
        height: '100%',
    },
    textStyle: {
        color: '#fff', 
        fontSize: 18, 
        fontWeight: 'bold', 
        maxWidth: '90%', 
        margin: 5 
    },
    cardTextContainer: {
        width: width,
        position: 'absolute', 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
        top: 80 
    }
});
