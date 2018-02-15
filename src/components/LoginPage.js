import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  View,
  Text,
  Dimensions,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Facebook, Google } from 'expo';
import firebase from 'firebase';
var {width,height} = Dimensions.get('window');
export default class LoginPage extends Component {
    FBlogIn = async () => {
      try{
          const { type, token } = await Facebook.logInWithReadPermissionsAsync('391312557981050', {
              permissions: ['public_profile','email', 'user_friends'],
              behavior:'web'
              });
              
          if (type === 'success') {
              console.log(token);
              const credential = await firebase.auth.FacebookAuthProvider.credential(token);
              console.log(credential);
              const response = await firebase.auth().signInWithCredential(credential)
              .then((user)=>{
                  console.log("success found"+user)
              })
              .catch(() => {
              console.log("error");
              });
              console.log(response)
          }
          else{
              alert("success false");
          }
      }catch(e){
          console.log(e);
      }
    }

    GooglelogIn = async () => {
      const result = await this.signInWithGoogleAsync()
      // if there is no result.error or result.cancelled, the user is logged in
      // do something with the result
      }
      signInWithGoogleAsync = async () => {
        try {
          console.log("google plus login start")
          const result = await Google.logInAsync({
            androidClientId: "818648944845-1blv3luuul3t2n0op4eluihgifvedhj0.apps.googleusercontent.com",
            iosClientId: "818648944845-u5pgfmuj7a8p5093udm0312r5l2dn1dh.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
            behavior:'web'
          });
          
          if (result.type === 'success') {
            //console.log("result");
            const credential = await firebase.auth.GoogleAuthProvider.credential(result.idToken);
              console.log(credential);
              const response = await firebase.auth().signInWithCredential(credential)
              .then((user)=>{
                  console.log(user)
              })
              .catch(() => {
              console.log("error");
              });
          } else {
            console.log(result);
          }
        } catch(e) {
          return {error: true};
        }
      }
 
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >

        <View
          style={{
            position: 'absolute',
            top: (height-(height-24)),
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            style={{
            width: '100%',
            height: '100%',
            }}
            source={require('../assets/images/loginBg.jpg')}
          />
        </View>

        <View
          style={{
            top: (height-(height-80)),
            backgroundColor: 'transparent',
          }}
        >
          <Image
            style={{
            width: '100%',
            height: 80,
            }}
            source={require('../assets/images/loginPlateBar.jpg')}
          />
        </View>

        <TouchableOpacity style={styles.fbbutton} 
            onPress={()=> {this.FBlogIn()} }
        >
            <Image style={styles.buttonImageStyle}
                source={require('../assets/images/facebookImg.png')}/>
            <Text style={styles.buttonTextStyle}>Sign In With Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googlebutton} 
            onPress={()=>{this.GooglelogIn()}}
        >
            <Image style={styles.buttonImageStyle}
                   source={require('../assets/images/googlePlusImg.png')}/>
            <Text style={styles.buttonTextStyle}>Sign In With Google</Text>
        </TouchableOpacity>

        <View
          style={{
            top: (height-480),
            justifyContent: 'center',
            alignItems: 'center',   
            backgroundColor: 'transparent',
          }}
        >
          <Image
            style={{
            justifyContent: 'center',
            alignItems: 'center',    
            width: '80%',
            height: 220,
            }}
            source={require('../assets/images/loginPlate.png')}
          />
        </View>

        <View
          style={{
            backgroundColor: 'transparent',
            left:15,
            position:'absolute',
            bottom:13
          }}
        >
            <TouchableOpacity onPress={()=>{alert("you clicked me")}}>
                <Text style={styles.staffLoginText}>Staff Login</Text>
            </TouchableOpacity>
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
    fbbutton: {
        margin:15,
        height:55,
        flexDirection:'row',
        backgroundColor: '#3d5a98',
        borderRadius: 35,
        padding: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: (height-(height-125)),
        elevation: 5,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
      },
      googlebutton: {
        margin:15,
        height:55,
        flexDirection:'row',
        backgroundColor: 'rgba(215, 31, 7, 1)',
        borderRadius: 35,
        padding: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: (height-(height-110)),
        elevation: 5,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
      },
      staffLoginText: {
        color: '#2c6ae6',
        fontWeight: 'bold',
        fontSize: 18,
        borderRadius: 4,
        marginRight: 230,
      },
      buttonImageStyle: {
        width: 22, 
        height: 22, 
        top:1  
      },
      buttonTextStyle: {
        color:'#fff', 
        left:10, 
        fontSize: 17, 
        letterSpacing: 1  
      }
})

// Android ClientId:: 818648944845-1blv3luuul3t2n0op4eluihgifvedhj0.apps.googleusercontent.com
// iOS ClientID::: 818648944845-u5pgfmuj7a8p5093udm0312r5l2dn1dh.apps.googleusercontent.com

/*//,
    //"android.config.googleSignIn.apiKey": "AIzaSyBovdcoqAtojPAndSqz2cSFlc0groOR5pk"*/