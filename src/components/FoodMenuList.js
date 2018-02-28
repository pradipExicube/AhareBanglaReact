import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  Button, 
  Modal,
} from 'react-native';
import { Icon } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import StarRate from './common/StarRating';

var {width,height} = Dimensions.get('window');

export default class FoodMenuList extends Component {

constructor(props) {
 super(props);
    this.state = {
        starCount: 0,
        foodData: [],
        modalVisible: false,
        menu_id: '',
        logintype: ''
    };
}

componentWillMount() {

    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
      let checkref = firebase.database().ref('users/' + (firebase.auth().currentUser.uid));
      checkref.on('value',(snap1)=>{
      if(snap1.val()){
        let data = snap1.val();
        if(data.usertype){
          this.setState({logintype: data.usertype},()=>{console.log(this.state.logintype)});
           }
          }
        })
      }
    });


    var ref = firebase.database().ref('rastaurants/' + this.props.res_id + "/category/" + this.props.cat_id + "/subcategory/" + this.props.id + "/menu" );
    
    alldata=[];

    ref.on("value",(snapshot)=>{
        
        let menu=snapshot.val();
        for(let i=0;i<menu.length;i++){
          if(menu[i].ratings){
              let obj = menu[i].ratings;
              let rating = 0;
              let count = 0;
              for(let key in obj){
                  rating = rating + parseInt(obj[key].rate);
                  count++;
              }
              menu[i].user_rating = rating/count;
              alldata.push(menu[i]);
          }else{
            menu[i].user_rating = 0;
            alldata.push(menu[i]);
        }

      }
      this.setState({foodData: alldata});
    });
}
openModal(key) {
    this.setState({
        modalVisible:true,
        menu_id: key
    });
  }
  closeModal() {
    this.setState({modalVisible:false});
  }

onStarRatingPress(rating) {
    firebase.database().ref('rastaurants/' + this.props.res_id + "/category/" + this.props.cat_id + "/subcategory/" + this.props.id + "/menu/" + this.state.menu_id + "/ratings/" +  (firebase.auth().currentUser.uid)).set({rate: rating});
    this.setState({
      starCount: rating,
      modalVisible: false
    });
}

 render() {
    return (
        <ScrollView style={{ top: 10, bottom: 30, height:(height), width: width }}>

        {
         
        this.state.foodData ? 
        this.state.foodData.map((foodlist,key)=>{
          // console.log('newsData');
          // console.log(news.desc);             
      return(

            <View key={key} style={styles.ListStyle}>
                <View style={{flexDirection:'column', width: width}}>
                    <Text style={styles.foodMenuHeader}>{foodlist.name}</Text>
                    <View style={{width: width, flexDirection: 'row',justifyContent:'space-between'}}> 
                        <View style={{width: 230}}>
                            <Text style={styles.foodMenuQuantity}>{foodlist.description}</Text>
                        </View>
                    <View style={{marginRight: 10}}>
                        <Text style={styles.foodMenuRate}>₹{foodlist.rate}</Text>
                    </View>
                    </View>

            {
                (this.state.logintype == "staff") ?

                    <View style={{flexDirection: 'row'}}>
                        <View style={{
                            marginTop: 10, 
                            marginLeft: 20, 
                            marginBottom: 10}}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={foodlist.user_rating}
                                selectedStar={
                                    () => this.openModal(key)
                                    // (rating) => this.onStarRatingPress(rating)
                                }
                                fullStarColor = {'#ffb400'}
                                starSize= {26}
                                starStyle= {{ margin: 4 }}
                                emptyStarColor= '#ffb400'
                            />
                        </View>
                    </View>
                    :
                    <View style={{flexDirection: 'row'}}>
                    <Icon
                        name='md-chatbubbles'
                        type='ionicon'
                        color='#005696'
                        size= {28}
                        containerStyle = {{
                            marginTop: 10,
                            marginLeft: 20, 
                            marginBottom: 5}}
                        onPress={() => {Actions.comment({
                            foodlistdata: foodlist.comments,
                            foodlistid: key, 
                            Ttype: 'foodlist', 
                            cat_id: this.props.cat_id, 
                            subcat_id: this.props.id,
                            res_id: this.props.res_id
                            })}} 
                    />
                        <View style={{
                            marginTop: 10, 
                            marginLeft: 20, 
                            marginBottom: 10}}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={foodlist.user_rating}
                                selectedStar={
                                    () => this.openModal(key)
                                    // (rating) => this.onStarRatingPress(rating)
                                }
                                fullStarColor = {'#ffb400'}
                                starSize= {26}
                                starStyle= {{ margin: 4 }}
                                emptyStarColor= '#ffb400'
                            />
                        </View>
                    </View>
            }
                </View>

            </View>
            )
        })
            : null
        }
        
        <Modal
            visible={this.state.modalVisible}
            animationType={'slide'}
            transparent={true}
            onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
          {/* <StarRate /> */}
            <View style={styles.innerContainer}>
                <View style={{
                    flexDirection: 'row'
                }}>
                <Text style={{
                    color: '#f6341a',
                    fontSize: 24
                }}>Give Us Feedback</Text>
                <Button
                    onPress={() => this.closeModal()}
                    title="x"
                    color='#ddd'
                >
                </Button>
                </View>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={
                    // () => this.openModal()
                    (rating) => this.onStarRatingPress(rating)
                }
                fullStarColor = {'#ddc600'}
                starSize= {26}
                starStyle= {{ margin: 4 }}
                emptyStarColor= '#ddc600'
            />
              
            </View>
          </View>
        </Modal>

        </ScrollView>
        
        );      
    }
}

const styles = StyleSheet.create({
    ListStyle:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        borderBottomColor:'rgba(0, 86, 150, 0.3)', 
        borderBottomWidth: 1,
    },
      foodMenuHeader: {
        fontSize: 20,
        color: "rgba(0, 86, 150, 0.9)",
        marginTop: 10, 
        marginLeft: 20, 
        marginBottom: 5
    },
      foodMenuQuantity: {
        lineHeight: 22,
        color: '#012f51',
        fontSize: 15,
        paddingTop: 6,
        marginTop: 5,
        marginLeft: 20,
        marginBottom: 5
    },
    foodMenuRate: {
        fontWeight: 'bold',
        color: 'rgba(0, 86, 150, 0.9)',
        fontSize: 22,
        minWidth: '20%',
        textAlign: 'center'
    },
      modalContainer: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
      innerContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
      },
});

