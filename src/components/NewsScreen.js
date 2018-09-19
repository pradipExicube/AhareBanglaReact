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
  FlatList,
  StatusBar
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
      newsData:[],
      showloading: true,
    }
    
  }
  componentWillMount(){
    let ref = firebase.database().ref('news');
    ref.once('value',(snap)=>{
      if(snap.val()){
        this.setState({newsData:snap.val(), showloading:  false,})
      }
    })
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

    // console.log(item)
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
      <View style={{width: width, height: height-73}}>
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