import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
var {width,height} = Dimensions.get('window');
export default class AboutPage extends Component {
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

                    <Image
                        style={{
                            width: 160 ,
                            height: 160,
                            borderRadius: 80,
                            borderWidth: 5,
                            borderColor: '#005696',
                            top: 20
                        }}
                        source={require('../assets/images/aboutImg.jpg')}
                        />
                    <View style={{marginTop: 30}}>
                        <Text style={{
                            color: '#005696',
                            fontSize: 20,
                            fontWeight: 'bold',  
                            // marginTop: 10,
                            textAlign: 'center'
                            }}>AHARE BANGLA
                        </Text>
                        <Text style={{
                            color: '#236ca3',
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 15,
                            textAlign: 'center',
                            lineHeight: 20
                        }}>- An Innovative venture by Government of West Bengal in the form of a Fabulous Food Festival.
                        </Text>
                        <Text style={{
                            color: '#012f51',
                            fontSize: 14,
                            margin: 15,
                            textAlign: 'justify',
                            lineHeight: 25
                        }}>Once again, it's a noble albeit a novel venture by the Government of West Bengal to serve the people with age-old as well as modern delicacies of Bengal-food with an aim to create awareness about the irresistible taste and the convenient source of the food products along with the promotion of the food industry in the state. This pro-people endeavor would also boost up the production and sale of the raw ingredients of the food products resulting in an enhanced remuneration to the farming community of Bengal. 
                        </Text>
                </View>
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
