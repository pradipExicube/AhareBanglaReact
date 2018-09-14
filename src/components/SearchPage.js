import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  Picker,
  TextInput,
  Button,
  ActivityIndicator,
  Alert   
} from 'react-native';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
// import Button from './common/Button';

var {width,height} = Dimensions.get('window');
export default class SearchPage extends Component {

 constructor(props) {
    super(props);
    this.state = {
        seachtype : 'restaurant',
        searchName: '',
        restaurantDetails: [],
        menufound: false,
        newArr: [],
        restaurantName: '---Select---',
        restaurantIndex: null,
        showloading: true,
    };
}

componentWillMount() {
    let ref = firebase.database().ref('rastaurants');
    ref.on('value',(snap)=>{
      if(snap.val()){
        this.setState({restaurantDetails: snap.val(), showloading: false});
      }
    })
  }

foodSearch(reskey) {
    if(this.state.seachtype == 'restaurant') {
        console.log(this.state.seachtype);
        console.log(this.state.restaurantName);
        console.log(this.state.restaurantIndex);
        if(this.state.restaurantName=='---Select---') {
            Alert.alert(
                'Error',
                'Please Select A Restaurant',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
              )
        }else{
            Actions.replace('foodmenu',({id: reskey, resName: this.state.restaurantName}));
        }
    }
    else{
        console.log(this.state.seachtype);
        console.log(this.state.searchName);

    //start
      if(this.state.restaurantDetails){
          var newArr=[];
    
        for(let i=0; i<this.state.restaurantDetails.length; i++){
            this.setState({menufound: false});
          if(this.state.restaurantDetails[i].category){
            let catagory = this.state.restaurantDetails[i].category
            
            for(let j=0; j<catagory.length;j++){
            if(catagory[j].subcategory){
                let subcategory = catagory[j].subcategory;
                    for(let k=0; k<subcategory.length; k++){
                    if(subcategory[k].menu){
                        let menu = subcategory[k].menu;
                            for(let m=0; m<menu.length; m++){
                            let menudetails = menu[m].name.toLowerCase();
                                let res = menudetails.includes(this.state.searchName.toLowerCase());
                                if(res){
                                newArr.push(this.state.restaurantDetails[i]);
                                this.setState({menufound:true})
                                break;
                                }
                            }
                            if(this.state.menufound=true){break;}

                        }
                    }
                    if(this.state.menufound=true){break;}

                }
            }
        }
    }

        // console.log("menu found......!!");
        // console.log(newArr);
        // console.log("end..!!"); 
        let searchtype=this.state.seachtype; 

        this.goRestaurant(searchtype,newArr)
      }     
        //end

        }   
    }

goRestaurant(restype,resdata) {
    // Actions.replace('restaurant',{restaurantType: restype, data: resdata},'tabs') 
    Actions.restaurant({restaurantType: restype, data: resdata}) 
    
}

setData(value){
    this.setState({seachtype: value})
}
reloadData(){
    if(this.state.seachtype == 'restaurant'){
        if(this.state.showloading){
            return (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
          }else{
        
        return (       
        <View>
            <Text style={{color: 'rgba(0, 86, 150, 0.9)',fontWeight: 'normal',fontSize: 18,marginTop: 20,marginLeft: 20}}>Search Restaurant</Text>   
            <View style={{borderBottomWidth: 1,borderBottomColor: 'rgba(0, 86, 150, 0.3)',backgroundColor: 'rgba(0, 86, 150, 0.2)',marginTop: 10,margin: 20
            }}>
            
                <Picker
                    selectedValue={this.state.restaurantName}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({restaurantName: itemValue})
                        if(itemIndex>0){
                            this.setState({restaurantIndex: (itemIndex-1)})
                        }
                    }}
                    mode='dropdown'
                >
                <Picker.Item label="---Select---" value="" />
            {
                this.state.restaurantDetails?
                
                this.state.restaurantDetails.map((restaurants,key)=>{
                // console.log('restaurantSearchData');
                // console.log(restaurants.restaurants_name);

            return (
                <Picker.Item key={key} label={restaurants.restaurants_name} value={restaurants.restaurants_name} />
                )            
                })
                :null

                }   
                </Picker>
         
            </View> 
        </View>
        )
    }
       
    }else{
        return (
        <View>
            <Text style={{color: 'rgba(0, 86, 150, 0.9)',fontWeight: 'normal',fontSize: 18,marginTop: 20,marginLeft: 20}}>Search Food Menu</Text>
            <View style={{borderBottomWidth: 1,borderBottomColor: 'rgba(0, 86, 150, 0.3)',backgroundColor: 'rgba(0, 86, 150, 0.2)',marginTop: 10,margin: 20}}>
                <TextInput
                    style={{height: 50, padding: 10, fontSize: 15}}
                    placeholder="Please Enter Food Name"
                    underlineColorAndroid='transparent'
                    placeholderTextColor='#000'
                    onChangeText={(text) => this.setState({searchName: text})}
                />
            </View>
        </View>
        )
    }

}

 render() {
        return (
            <View>
                <Text style={{color: 'rgba(0, 86, 150, 0.9)',fontWeight: 'normal',fontSize: 18,marginTop: 20,marginLeft: 20}}>Search Type</Text>
                <View style={{borderBottomWidth: 1,borderBottomColor: 'rgba(0, 86, 150, 0.3)',backgroundColor: 'rgba(0, 86, 150, 0.2)',marginTop: 10,margin: 20}}>
                    <Picker
                        selectedValue={this.state.seachtype}
                        onValueChange={(itemValue, itemIndex) => this.setData(itemValue)}
                        mode='dropdown'
                    >
                        <Picker.Item label="Restaurant" value="restaurant" />
                        <Picker.Item label="Food menu" value="foodmenu" />
                    </Picker>
                </View>
                    {
                        this.reloadData()
                    }
                <View style={{width: 140, alignSelf:'center'}}>
                    <Button
                        onPress={()=>{this.foodSearch(this.state.restaurantIndex)}}
                        title="Search"
                        color="#012f51"
                    />
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
    containerStyle: {
        position: 'absolute',
        width: width,
        height: '100%',
    },
    backgroundImage: {
        width: width-50, 
        height: 220, 
        top: 30, 
        alignSelf: 'center'
    }, 
});