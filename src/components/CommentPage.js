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
import * as firebase from 'firebase';

var {width,height} = Dimensions.get('window');

export default class CommentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            comments: []
        };
        console.log(this.props.id);
        // if(this.props.Ttype == "res"){
        //     this.showRestaurantComments(); 
        //  }
    }
    componentWillMount(){
        var allDataa=[];
        var reff = firebase.database().ref('rastaurants/' + this.props.id +'/comments/' );  
        reff.on('value',(snapshot)=>{
            console.log('snapshot');
            console.log(snapshot.val());
            var cData = snapshot.val();

           try {
                for(let key in cData){
                    cData[key].commentUid = key;
                    allDataa.push(cData[key]);
                }
                console.log(allDataa)
           //this.setState({comments:allDataa});
                this.setState({comments: allDataa},
                    ()=> {console.log('callback......');
                        console.log(this.state.comments)
                    console.log('callback end')
                    });
            }
            catch(e){
                console.log("error : " + e);
            }

            console.log("checking data");
            console.log(this.state.comments)
        });
    }

    render() {
        return (
            <View style={{height: height-80, 
            flexDirection: 'column', 
            justifyContent: 'space-between'
            }}>
            <ScrollView>
            {
                this.state.comments ? 
                this.state.comments.map((comment,key)=>{
                    return (

                
                    <View style={styles.ListStyle}>
                        <Image
                        style={styles.ImageStyle}
                        source={{uri: comment.image}}
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
                                {comment.name}
                            </Text> 
                            <Text style={styles.textStyle}>
                                {comment.messege}
                            </Text>
                        </View> 
                    </View>
                

                )
                })
                : null
                }
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
        borderRadius: 25,
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
