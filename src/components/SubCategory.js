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
    // componentWillMount() {
    //     console.log(this.props.res_id);
    //     console.log(this.props.data);
    //     console.log(this.props.id);
    // }

    goFoodList(data,key) {
        Actions.foodlist({data: data, id: key, cat_id: this.props.id, res_id: this.props.res_id});
    }
    render() {
        return (
            <ScrollView style={{ height:(height-100), width: width }}>
            {      
                    this.props.data.subcategory ? 
                    this.props.data.subcategory.map((subcat,key)=>{
                      // console.log('newsData');
                      // console.log(news.desc);             
                  return(

                <View key={key} style= {{marginTop: 3, width: width}}>
                    <TouchableWithoutFeedback onPress={()=>{this.goFoodList(subcat,key)}}>
                        <View>
                        
                            <Image
                                style={styles.cardImage}
                                source={{uri: subcat.img}}
                            />

                            <View style={styles.cardTextContainer}>
                                <Text style={styles.textStyle}>{subcat.name}</Text>
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
                )
            })
                : null
            }

                <Image
                    style={styles.backgroundImage}
                    resizeMode='contain'
                    source={require('../assets/images/innerPlate2.png')}
                />  
            </ScrollView>
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
