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
  Share
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
      newsData:[]
    }
    
  }
  componentWillMount(){
    let ref = firebase.database().ref('news');
    ref.once('value',(snap)=>{
      if(snap.val()){
        this.setState({newsData:snap.val()})
      }
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
/*  
renderNewsData() {
    this.state.newsData.map((news,key)=>{
      console.log('newsData');
      console.log(news);
    return(
      <Card key={key}>
        <TouchableWithoutFeedback onPress={()=>{Linking.openURL(news.url)}}>
          <View style={{ margin: 10 }}>
            <Image
              style={styles.ImageStyle}
              source={{uri: "{news.img}"}}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{Linking.openURL(news.url)}}>
          <View style={styles.textStyle}>
            <Text style={styles.newsHeading}>{news.head}</Text>
            <Text style={styles.newsContent}>{news.desc}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{alert('sharebutton')}}>
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
              onPress={() => alert('share')} 
            />
            <Text style={
              [styles.newsHeading,
                { 
              marginRight: 10, 
              marginBottom: 10, 
              fontWeight: 'bold' 
              }]}
            >
              SHARE</Text>
          </View>
        </TouchableWithoutFeedback>
      </Card>
    )

    })
  // }
  }
  */
  render() {
    return (
      <View>
        <CustomHeader Headershow={true} showFeedbackButton={false} headerName="Latest News" showSearchButton={false} showLogoutButton={true} showBackbutton= {false} onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{alert("back icon Clicked")}}/>
      <ScrollView style={{width: width, height: height-135}}>

      {
        this.state.newsData ? 
        this.state.newsData.map((news,key)=>{
          // console.log('newsData');
          // console.log(news.desc);
   
      return(
        <Card key={key}>
          <TouchableWithoutFeedback onPress={()=>{Linking.openURL(news.url)}}>
            <View style={{ margin: 10 }}>
              <Image
                style={styles.ImageStyle}
                resizeMode='stretch'
                source={{uri: news.img}}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={()=>{Linking.openURL(news.url)}}>
            <View style={styles.textStyle}>
              <Text style={styles.newsHeading}>{news.head}</Text>
              <Text style={styles.newsContent}>{news.desc}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={()=>{this.shareIt(news,key)}}>
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
                onPress={() => this.shareIt(news,key)} 
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
    })

    : null

  }
      </ScrollView>
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
  }
});