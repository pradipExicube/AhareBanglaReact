import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Icon } from 'react-native-elements'

var {width,height} = Dimensions.get('window');

const NewsScreen = () => {
  return (
    <ScrollView style={{width: width, height: height-135}}>
      <Card>
        <TouchableWithoutFeedback onPress={()=>{alert('news')}}>
          <View style={{ margin: 10 }}>
            <Image
              style={styles.ImageStyle}
              source={{uri: "https://firebasestorage.googleapis.com/v0/b/aharebangla-6f646.appspot.com/o/news%2F24291743_527694724251078_6035855101019475304_o.jpg?alt=media&token=0b4b0ab1-c1a6-4288-a4b3-3606761d661a"}}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{alert('news')}}>
          <View style={styles.textStyle}>
            <Text style={styles.newsHeading}>Aahare Bangla - 2017 Openning</Text>
            <Text style={styles.newsContent}>An Innovative venture by Government of West Bengal in the form of a Fabulous Food Festival.</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{alert('sharebutton')}}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Icon
              name='md-share'
              type='ionicon'
              color='#005696'
              size= {20}
              containerStyle = {{ marginLeft: 17, marginBottom: 10, marginRight: 6 }}
              onPress={() => alert('share')} 
            />
            <Text style={[styles.newsHeading,{ marginRight: 10, marginBottom: 10, fontWeight: 'bold' }]}>SHARE</Text>
          </View>
        </TouchableWithoutFeedback>
      </Card>
    </ScrollView>

  );
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

export default NewsScreen;