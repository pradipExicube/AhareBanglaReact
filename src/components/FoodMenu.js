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
import * as firebase from 'firebase';

export default class FoodMenu extends Component {
    // console.log(props.data.restaurants_name);
    constructor(props) {
        super(props);
        // console.log(this.props.data)
        // console.log(this.props.data.restaurants_name);
        console.log(this.props.id);
        this.state = {
            notfoundimage: "https://firebasestorage.googleapis.com/v0/b/aharebangla-6f646.appspot.com/o/nanMenu.png?alt=media&token=764f9fe8-b2f8-4c82-858e-6e01cab1e8c3",
            notFound: false,
            restaurantName: '',
            cat: []
            }
        }
        componentWillMount() {
    
        // this.res_id=this.navParams.get('res_id');
    
       if(this.props.id >=0){
    
            let reff = firebase.database().ref('/rastaurants/'+ this.props.id );
            reff.once('value', (snap1)=>{
              if(snap1.val()){
                this.setState({restaurantName: snap1.val().restaurants_name});
              }
            })
        }   
    
        var ref = firebase.database().ref('rastaurants/' + this.props.id + "/category" );
        
        ref.once("value",(snapshot)=>{
          if(snapshot.val()){
            this.setState({cat: snapshot.val()});
            console.log(this.state.cat.length);
            // if(this.state.cat.length == 0){
                this.setState({notFound: false})
            // }else{
            //     this.setState({notFound: false})
            // }
          }else{
            this.setState({notFound: true})
          }
    
        }); 



    }
    goSubCategory(data,key,res_id) {
        Actions.subcategory({data: data, id: key,res_id: res_id});
    }
    render() {
  return (
    <View style={styles.containerStyle}>


    {
        (this.state.notFound==true) ?
    (
        <Image
            style={styles.cardImage}
            source={{uri: this.state.notfoundimage}}
        /> 
    )
    :
    (

        
            this.state.cat ? 
            this.state.cat.map((category,key)=>{
        
        return(
        <View key={key} style= {{marginTop: 3, width: width}}>
            <TouchableWithoutFeedback onPress={()=>{this.goSubCategory(category,key,this.props.id)}}>
                <View>
        
                    <Image
                        style={styles.cardImage}
                        source={{uri: category.foodmenu_img}}
                    />

                    <View style={styles.cardTextContainer}>
                        <Text style={styles.textStyle}>{category.name}</Text>
                        <Icon
                            name='md-arrow-dropright-circle'
                            type='ionicon'
                            color='#a3d2f5'
                            size= {30}
                            containerStyle = {{ margin: 5,
                            }}
                        />
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </View>
        )
        })
          : null
    )
        }
    

        <Image
            style={styles.backgroundImage}
            resizeMode='contain'
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
