import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import CustomHeader from './common/CustomHeader';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

var {width,height} = Dimensions.get('window');

export default class CommentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newComment: '',
            comments: [],
            user_id: '',
            fullname: '',
            c_image: '',
            showloading: false,
        };
        console.log(this.props.id);
    }
    componentDidMount(){
        this.setState({user_id : firebase.auth().currentUser.uid});
        var ref = firebase.database().ref('/users/' + (firebase.auth().currentUser.uid) + '/');
        ref.once('value', (_snapshot) => {
            console.log(_snapshot.val())
          if(_snapshot.val()){
            if(_snapshot.val().username){
              this.setState({fullname : _snapshot.val().username});
            }else{
                this.setState({fullname : " "}); ;
            }
            if(_snapshot.val().userimage){
                this.setState({c_image : _snapshot.val().userimage});  
            }else{
              this.setState({c_image : " "});
            }
          }
          })




        if(this.props.Ttype == "res") {
        
        var reff = firebase.database().ref('rastaurants/' + this.props.id +'/comments/' );  
        reff.on('value',(snapshot)=>{
            var allDataa=[];
            console.log('snapshot');
            console.log(snapshot.val());
            this.setState({comments: []})
            var cData = snapshot.val();

           try {
                for(let key in cData){
                    cData[key].commentUid = key;
                    allDataa.push(cData[key]);
                }
                console.log(allDataa)
           //this.setState({comments:allDataa});
                this.setState({comments: allDataa})
            }
            catch(e){
                console.log("error : " + e);
            }

            console.log("checking data");
            console.log(this.state.comments)
        });
        }
        else{
            console.log('foodlist..............')
            let itemRef = firebase.database().ref('rastaurants/' + this.props.res_id + "/category/" + this.props.cat_id + "/subcategory/" + this.props.subcat_id + "/menu/" + this.props.foodlistid + "/comments/");
                
                itemRef.on("value",(snapshot)=>{
                    var foodcomment = [];
                    this.setState({comments: []});
                    console.log(snapshot.val());
                var fcData = snapshot.val();
                try {
                    for(let key in fcData){
                        fcData[key].commentUid = key;
                        foodcomment.push(fcData[key]);
                    }
                console.log(foodcomment)
                this.setState({comments: foodcomment},
                    ()=> {console.log('callback......');
                        console.log(this.state.comments)
                    console.log('callback end')
                    });
            }
            catch(e){
                console.log("error : " + e);
            }
            });
        }
    }

    sendMessage() {
        
        if(this.props.Ttype == "res") {
          firebase.database().ref("rastaurants/" + this.props.id + "/comments/").push({messege:this.state.newComment,name:this.state.fullname,image:this.state.c_image,user_id:(firebase.auth().currentUser.uid)});
          this.setState({newComment: "", showloading: false});
        }
        else{

            console.log('props end............')
            firebase.database().ref('rastaurants/' + this.props.res_id + "/category/" + this.props.cat_id + "/subcategory/" + this.props.subcat_id + "/menu/" + this.props.foodlistid + "/comments/").push({messege:this.state.newComment,name:this.state.fullname,image:this.state.c_image,user_id:(firebase.auth().currentUser.uid)})
            .then((value)=>{
                this.setState({newComment: "", showloading: false});
            })
            
        }
        // this.setState({comments: [], newComment: ''});
        // Actions.refresh();
      }

    render() {
        return (
            <View>
                <CustomHeader Headershow={true} showFeedbackButton={false} onPressFeedback={()=>{this.goFeedback()}} headerName='Comments' showSearchButton={false} showLogoutButton={true} showBackbutton= {true}/>
            <View style={{height: height-80, 
            flexDirection: 'column', 
            justifyContent: 'space-between'
            }}>
            <ScrollView>
            {
                this.state.comments ? 
                this.state.comments.map((comment,key)=>{
                    return (             
                    <View key={key} style={styles.ListStyle}>
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
                <View style={{width: width, flexDirection: 'row', marginTop: 5, marginLeft: 10,marginRight: 10}}>
                    <View style={{width: '70%'}}>
                        <TextInput
                            style={{height: 50, padding: 10, fontSize: 15, backgroundColor: 'rgba(0, 86, 150, 0.2)'}}
                            placeholder="Add a Message..."
                            underlineColorAndroid='transparent'
                            placeholderTextColor='#000'
                            value={this.state.newComment}
                            onChangeText={(text) => this.setState({newComment: text})}
                        />
                    </View>
                    {
                    //     this.state.showloading ?
                    //     <Button
                    //     small
                    //     containerViewStyle={{marginLeft: 0,marginRight:0,width: '25%', }}
                    //     buttonStyle={{height: 50,}}
                    //     raised
                    //     backgroundColor='#012f51'
                    //     color="#fff"
                    //     fontSize={15}
                    //     textStyle={{fontWeight: 'bold'}}
                    //     // onPress={()=>{this.sendMessage();}}
                    //     title="" 
                    //     loading={this.state.showloading}
                    // />
                        
                    // :
                    <Button
                        small
                        containerViewStyle={{marginLeft: 0,marginRight:0,width: '25%', }}
                        buttonStyle={{height: 50,}}
                        raised
                        backgroundColor='#012f51'
                        color="#fff"
                        fontSize={15}
                        textStyle={{fontWeight: 'bold'}}
                        onPress={()=>{ this.setState({showloading: true},()=>{Actions.refresh(); this.sendMessage();});}}
                        title="Submit" 
                        // Component={TouchableOpacity}
                        loading={this.state.showloading}
                    />

                    }
                    
                    
                    
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
