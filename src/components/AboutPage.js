import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import * as firebase from 'firebase';
var {width,height} = Dimensions.get('window');
export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutData: []
          }
          let ref= firebase.database().ref('about');
          console.log("about page")
          ref.once('value',(snapshot)=>{
            if(snapshot.val()){
                this.setState({aboutData: snapshot.val()});
              console.log(this.state.aboutData);
            }
          })
    }

 render() {
        return (
            <ScrollView style={{
                    backgroundColor: '#b8e1ff', 
                    width: width, 
                    height: height-80,
                    top: 0,
                    position: 'absolute',
                    }}
                    contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems:'center',}}>
            {/* {
                this.state.aboutData ? 
            // this.state.aboutData.map((about,key)=>{
            return ( */}

            <View>
                    <Image
                        style={{
                            width: 160 ,
                            height: 160,
                            borderRadius: 80,
                            borderWidth: 5,
                            borderColor: '#005696',
                            top: 20,
                            alignSelf: 'center'
                        }}
                        source={{uri: this.state.aboutData.image}}
                        />
                 
            
              
                    <View style={{marginTop: 30}}>
                        <Text style={{
                            color: '#005696',
                            fontSize: 20,
                            fontWeight: 'bold',  
                            // marginTop: 10,
                            textAlign: 'center'
                            }}>{this.state.aboutData.heading}
                        </Text>
                        <Text style={{
                            color: '#236ca3',
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 15,
                            textAlign: 'center',
                            lineHeight: 20
                        }}>{this.state.aboutData.subheading}</Text>
                        <Text style={{
                            color: '#012f51',
                            fontSize: 14,
                            margin: 15,
                            textAlign: 'justify',
                            lineHeight: 25
                        }}>{this.state.aboutData.description}</Text>
                </View>
              </View>

            {/* )
            // })
            : null
            } */}
            </ScrollView>
        );
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
});
