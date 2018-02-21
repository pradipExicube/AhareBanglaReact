import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  Linking
} from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';

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
    ref.on('value',(snap)=>{
      if(snap.val()){
        this.setState({newsData:snap.val()})
      }
    })
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