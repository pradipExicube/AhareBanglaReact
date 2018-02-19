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
  Button   
} from 'react-native';
// import Button from './common/Button';

var {width,height} = Dimensions.get('window');
export default class SearchPage extends Component {

 constructor(props) {
    super(props);
    this.state = {
        seachtype : 'restaurant',
        text: ''
    };
}

setData(value){
    this.setState({seachtype: value})
}
reloadData(){
    if(this.state.seachtype == 'restaurant'){
        return ( 
        <View>
            <Text style={{
                        color: 'rgba(0, 86, 150, 0.9)',
                        fontWeight: 'normal',
                        fontSize: 18,
                        marginTop: 20,
                        marginLeft: 20
                    }}>Search Restaurant</Text>   
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0, 86, 150, 0.3)',           
                backgroundColor: 'rgba(0, 86, 150, 0.2)', 
                marginTop: 10,
                margin: 20
            }}>
                <Picker
                    selectedValue={this.state.seachtype}
                    onValueChange={(itemValue, itemIndex) => this.setState({seachtype: itemValue})}
                    mode='dropdown'
                >
                    <Picker.Item label="Restaurant" value="restaurant" />
                    <Picker.Item label="Food menu" value="foodmenu" />
                </Picker>
            </View> 
        </View>
        )
    }else{
        return (
        <View>
            <Text style={{
                        color: 'rgba(0, 86, 150, 0.9)',
                        fontWeight: 'normal',
                        fontSize: 18,
                        marginTop: 20,
                        marginLeft: 20
                    }}>Search Food Menu</Text>
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0, 86, 150, 0.3)',           
                backgroundColor: 'rgba(0, 86, 150, 0.2)', 
                marginTop: 10,
                margin: 20
            }}>
                <TextInput
                    style={{height: 50, padding: 10, fontSize: 15}}
                    placeholder="Please Enter Food Name"
                    underlineColorAndroid='transparent'
                    placeholderTextColor='#000'
                    onChangeText={(text) => this.setState({text})}
                />
            </View>
        </View>
        )
    }

}

 render() {
        return (
            <View>
                <Text style={{
                        color: 'rgba(0, 86, 150, 0.9)',
                        fontWeight: 'normal',
                        fontSize: 18,
                        marginTop: 20,
                        marginLeft: 20
                    }}>Search Type</Text>
                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(0, 86, 150, 0.3)',           
                    backgroundColor: 'rgba(0, 86, 150, 0.2)', 
                    marginTop: 10,
                    margin: 20
                }}>
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
                        onPress={()=>{alert('Search')}}
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