import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList
} from 'react-native';
import * as firebase from 'firebase';
import CustomHeader from './common/CustomHeader';
var {width,height} = Dimensions.get('window');
export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutData: [],
            showloading: true,
          }
          let ref= firebase.database().ref('about');
          console.log("about page")
          let about = []
          ref.once('value',(snapshot)=>{
            if(snapshot.val()){
                about.push(snapshot.val())
                this.setState({aboutData: about, showloading: false},()=>{console.log(this.state.aboutData)});
            }
          })
    }

    aboutPageData = ({item, index}) => {
        return (
            <View>
                <Image
                    style={{width: 160 ,height: 160,borderRadius: 80,borderWidth: 5,borderColor: '#005696',top: 20,alignSelf: 'center'}}
                    source={{uri: item.image}}
                />
            
        
        
                <View style={{marginTop: 30}}>
                    <Text style={{color: '#005696',fontSize: 20,fontWeight: 'bold',textAlign: 'center'}}>{item.heading}
                    </Text>
                    <Text style={{color: '#236ca3',fontSize: 16,fontWeight: 'bold',marginTop: 15,textAlign: 'center',lineHeight: 20}}>{item.subheading}</Text>
                    <Text style={{color: '#012f51',fontSize: 14,margin: 15,textAlign: 'justify',lineHeight: 25}}>{item.description}</Text>
                </View>
            </View>
        )
    }

 render() {
    return(
        <View style={{width: width, height: height, backgroundColor: '#b8e1ff'}}>
            <CustomHeader Headershow={true} showFeedbackButton={false} onPressFeedback={()=>{this.goFeedback()}} headerName='About' showSearchButton={false} showLogoutButton={false} showBackbutton= {true}/>
        {   
        (this.state.showloading) ? 
            (
                <View style={[styles.loadingcontainer, styles.loadinghorizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
            :
            (
                <FlatList
                data={this.state.aboutData}
                extraData={this.state}
                renderItem={this.aboutPageData}
                keyExtractor={(item, index) => index.toString()}
                />
            )
        }
        </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loadinghorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
});
