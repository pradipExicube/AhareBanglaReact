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
            newComment: '',
            comments: [],
            user_id: '',
            fullname: '',
            c_image: ''
        };
        console.log(this.props.id);
    }
    componentWillMount(){
        this.setState({comments: [], newComment: ''});
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
                var foodcomment = [];
                itemRef.on("value",(snapshot)=>{
                    console.log(snapshot.val())
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
          this.setState({newComment: ""});
        }
        else{
            console.log(this.props.res_id);
            console.log(this.props.cat_id);
            console.log(this.props.subcat_id);
            console.log(this.props.foodlistid);
            console.log('props end............')
            firebase.database().ref('rastaurants/' + this.props.res_id + "/category/" + this.props.cat_id + "/subcategory/" + this.props.subcat_id + "/menu/" + this.props.foodlistid + "/comments/").push({messege:this.state.newComment,name:this.state.fullname,image:this.state.c_image,user_id:(firebase.auth().currentUser.uid)});
            this.setState({newComment: ""});
        }
        // this.setState({comments: [], newComment: ''});
        // Actions.refresh();
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
                <View style={{flexDirection: 'row',marginLeft: 10}}>
                    <TextInput
                        style={{height: 50, padding: 10, fontSize: 15, width: '78%', backgroundColor: 'rgba(0, 86, 150, 0.2)'}}
                        placeholder="Add a Message..."
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#000'
                        value={this.state.newComment}
                        onChangeText={(text) => this.setState({newComment: text})}
                    />
                    <View style={{width: 68, alignSelf:'flex-end'}}>
                        <Button
                            onPress={()=>{this.sendMessage();}}
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
