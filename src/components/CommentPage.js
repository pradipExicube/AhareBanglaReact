import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  Button
} from 'react-native';

var {width,height} = Dimensions.get('window');

export default class CommentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }
    render() {
        return (
            <View style={{height: height-80, 
            flexDirection: 'column', 
            justifyContent: 'space-between'
            }}>
                <ScrollView>
                    <View style={styles.ListStyle}>
                        <Image
                        style={styles.ImageStyle}
                        source={require('../assets/images/homeListIcon1.png')}
                        />
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            marginRight: 10,
                        }}>
                            <Text style={{
                                color: '#005696',
                                fontWeight: 'bold',
                                marginBottom: 5,
                                marginTop: 15
                            }}>
                                Arghyadeep Sinha
                            </Text> 
                            <Text style={styles.textStyle}>
                                That is Amazing Food.That is Amazing Food.That is Amazing Food.That is Amazing Food.That is Amazing Food.
                            </Text>
                        </View> 
                    </View>
                </ScrollView>
                <View style={{flexDirection: 'row',marginLeft: 10}}>
                    <TextInput
                        style={{height: 50, padding: 10, fontSize: 15, width: '78%', backgroundColor: 'rgba(0, 86, 150, 0.2)'}}
                        placeholder="Add a Message..."
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#000'
                        onChangeText={(text) => this.setState({text})}
                    />
                    <View style={{width: 68, alignSelf:'flex-end'}}>
                        <Button
                            onPress={()=>{alert('Add Message')}}
                            title="Submit"
                            color="#012f51"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ListStyle:{
        flexDirection:'row',
        alignItems:'center', 
        borderBottomColor:'rgba(0, 86, 150, 0.3)', 
        borderBottomWidth: 1
      },
      ImageStyle: {
        width: 50,
        height: 50, 
        marginLeft:15, 
        marginRight:10, 
        marginTop:10, 
        marginBottom:10 
      },
      textStyle: {
        lineHeight: 22,
        color: '#012f51',
        fontSize: 15,
        marginBottom: 15
      }
});
