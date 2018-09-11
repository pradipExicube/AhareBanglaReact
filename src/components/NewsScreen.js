import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  Linking,
  Share,
  ActivityIndicator,
  FlatList
} from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import CustomHeader from './common/CustomHeader';

var {width,height} = Dimensions.get('window');

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData:[ {
        "desc" : "Provide Rating and Feedback to the Restaurants and Menu items and help others to make best out of this festival",
        "head" : "Rate & Review",
        "img" : "https://firebasestorage.googleapis.com/v0/b/aharebangla-6f646.appspot.com/o/RateandReviw.png?alt=media&token=53f12891-d1ab-47d4-98c8-9c271b9de87b",
        "share_head" : "Rate & Review",
        "share_msg" : "Provide Rating and Feedback to the Restaurants and Menu items and help others to make best out of this festival",
        "url" : "http://www.wbfestivals.gov.in/"
      }, {
        "desc" : "Pithe and Puli Pithe - a unique tradition of Bengal by Bishakha Das",
        "head" : "Pithe and Puli Pithe",
        "img" : "https://firebasestorage.googleapis.com/v0/b/aharebangla-6f646.appspot.com/o/resturants_logo%2Fpithe.png?alt=media&token=71b34a24-365e-4f56-8f1b-cd3d03506a70",
        "share_head" : "Pithe and Puli Pithe",
        "share_msg" : "Pithe and Puli Pithe - a unique tradition of Bengal by Bishakha Das",
        "url" : "https://aharebangla-6f646.firebaseapp.com/puli-pithe"
      }, {
        "desc" : "An Innovative venture by Government of West Bengal in the form of a Fabulous Food Festival.",
        "head" : "Aahare Bangla - 2017 Openning",
        "img" : "https://firebasestorage.googleapis.com/v0/b/aharebangla-6f646.appspot.com/o/news%2F24291743_527694724251078_6035855101019475304_o.jpg?alt=media&token=0b4b0ab1-c1a6-4288-a4b3-3606761d661a",
        "share_head" : "Aahare Bangla - 2017 Openning",
        "share_msg" : "An Innovative venture by Government of West Bengal in the form of a Fabulous Food Festival.",
        "url" : "http://www.wbfestivals.gov.in/"
      }, {
        "desc" : "The Ahare Bangla 2017 is witnessing a phenomenal response at the Newtown Mela Grounds! The International Cuisine Hangar – C",
        "head" : "International Food at Ahare Bangla",
        "img" : "https://firebasestorage.googleapis.com/v0/b/aharebangla-6f646.appspot.com/o/news%2FScreen%20Shot%202017-12-10%20at%203.10.43%20PM.png?alt=media&token=04f9c5eb-4f77-4505-b4de-97c9636281d6",
        "share_head" : "International Food at Ahare Bangla",
        "share_msg" : "The Ahare Bangla 2017 is witnessing a phenomenal response at the Newtown Mela Grounds! The International Cuisine Hangar – C",
        "url" : "https://www.facebook.com/pg/aharebangla2017/photos/?tab=album&album_id=530302463990304"
      }, {
        "desc" : "Ahare bangle organized a Cookery Contest on Chhana based recipes on 8th December. The participants ranged from young college goers to housewives.",
        "head" : "Cooking Contest at Ahare Bangla",
        "img" : "https://firebasestorage.googleapis.com/v0/b/aharebangla-6f646.appspot.com/o/news%2FScreen%20Shot%202017-12-10%20at%203.20.37%20PM.png?alt=media&token=02030a70-4119-4f93-a557-2dcdda273391",
        "share_head" : "Cooking Contest at Ahare Bangla",
        "share_msg" : "Ahare bangle organized a Cookery Contest on Chhana based recipes on 8th December. The participants ranged from young college goers to housewives.",
        "url" : "https://m.facebook.com/story.php?story_fbid=529862834034267&id=310018232685396"
      } ],
      showloading: true,
    }
    
  }
  componentWillMount(){
    // let ref = firebase.database().ref('news');
    // ref.once('value',(snap)=>{
    //   if(snap.val()){
    //     this.setState({newsData:snap.val(), showloading:  false,})
    //   }
    // })
    this.setState({
      
    showloading:false
    })
  }
  shareIt(data,key) {
    console.log('clicked.....');
    Share.share(
      {title: 'Ahare Bangla News', message: data.share_head +","+" "+data.share_msg+". For More Details Visit "+data.url},
      {dialogTitle: 'Share Using'}
    )
    console.log('click end.....');
  }

  restaurants = ({item,index}) => {
    console.log('news strat')

    console.log(item)
    console.log('news end')


    return(
      // <Text>{news.head}</Text>
      <Card>
        <TouchableWithoutFeedback onPress={()=>{Linking.openURL(item.url)}}>
          <View style={{ margin: 10 }}>
            <Image
              style={styles.ImageStyle}
              resizeMode='stretch'
              source={{uri: item.img}}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{Linking.openURL(item.url)}}>
          <View style={styles.textStyle}>
            <Text style={styles.newsHeading}>{item.head}</Text>
            <Text style={styles.newsContent}>{item.desc}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{this.shareIt(item,index)}}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Icon
              name='md-share'
              type='ionicon'
              color='#005696'
              size= {20}
              containerStyle = {{ 
                marginLeft: 17, 
                marginBottom: 10, 
                marginRight: 6 
              }}
              onPress={() => this.shareIt(item,index)} 
            />
            <Text style={
              [styles.newsHeading,
                { 
              marginRight: 10, 
              marginBottom: 10, 
              fontWeight: 'bold' 
              }]}
            >
              SHARE
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Card>
    )

  }
  

  render() {
    return (
      <View>
        <CustomHeader Headershow={true} showFeedbackButton={false} headerName="Latest News" showSearchButton={false} showLogoutButton={true} showBackbutton= {false} onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{alert("back icon Clicked")}}/>
        {
          this.state.showloading ? 
            (<View style={{position:'absolute', alignSelf:'center',top:((height-100)/2)}}>
                <View style={[styles.loadingcontainer, styles.loadinghorizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>  
              </View>)
            : 
            
            this.state.newsData ?  
            <FlatList
              data={this.state.newsData}
              extraData={this.state}
              renderItem={this.restaurants}
              keyExtractor={(item, index) => index.toString()}
            />:null
      // (<ScrollView style={{width: width, height: height-135}}>

  //     {
  //       this.state.newsData ? 
  //       this.state.newsData.map((news,key)=>{
  //         // console.log('newsData');
  //         // console.log(news.desc);
   
      
  //   })

  //   : null

  // }
  //     </ScrollView>)
        }
      </View>

    );
  }
}

const styles = StyleSheet.create({
  ImageStyle: {
    width: '100%',
    height: (height-(height-160)), 
  },
  textStyle: {
    marginLeft: 15,
    marginRight: 10,
    marginBottom: 10
  },
  newsHeading: {
    fontSize: 16,
    color: '#005696',
    marginBottom: 5

  },
  newsContent: {
    fontSize: 16,
  },
  loadingcontainer: {
    flex: 1,
    justifyContent: 'center'
  },
  loadinghorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
});