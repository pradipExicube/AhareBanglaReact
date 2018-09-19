import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Facebook, Google } from 'expo';
import firebase from 'firebase';
import { Button } from 'react-native-elements'

var {width,height} = Dimensions.get('window');
export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      staffEmail: '',
      staffPass: '',
      showloading:false,
    }
  }

  openModal() {
    this.setState({
        modalVisible:true,
    });
  }
  closeModal() {
    this.setState({modalVisible:false});
  }

    FBlogIn = async () => {
      try{
          const { type, token } = await Facebook.logInWithReadPermissionsAsync('391312557981050', {
              permissions: ['public_profile','email', 'user_friends'],
              behavior:'web'
              });
              this.setState({showloading:true});
          if (type === 'success') {
              console.log(token);
              const credential = await firebase.auth.FacebookAuthProvider.credential(token);
              console.log(credential);
              const response = await firebase.auth().signInWithCredential(credential)
              .then((user)=>{
                console.log(user);
                firebase.database().ref('users').child(user.uid).set({
                  username: user.displayName,
                  useremail: user.email,
                  userimage: user.photoURL,
                  facebookToken: token,
                  logintype:"facebook",
                  usertype:"basic"
                }).then((success)=>{this.setState({showloading:false}); Actions.reset('tabs')})
              })
              .catch(() => {
                this.setState({showloading:false});
              console.log("error");
              });
              //console.log(response)
          }
          else{
              this.setState({showloading:false});
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
          this.setState({showloading:true});
          if (result.type === 'success') {
            //console.log("result");
            const credential = await firebase.auth.GoogleAuthProvider.credential(result.idToken);
              console.log(credential);
              const response = await firebase.auth().signInWithCredential(credential)
              .then((user)=>{
                console.log(user);
                console.log(result);
                var userData = result.user;
                firebase.database().ref('users').child(user.uid).set({
                  username: user.displayName,
                  useremail: userData.email,
                  userimage: userData.photoUrl,
                  googleUserId: userData.id,
                  googleToken: result.idToken,
                  logintype: "google",
                  usertype: "basic"
                }).then((success)=>{this.setState({showloading:false});Actions.reset('tabs')})
              })
              .catch(() => {
              console.log("error");
              this.setState({showloading:false});
              });
              console.log(response);
            } 
          else {
            this.setState({showloading:false});
            console.log(result);
          }
        } catch(e) {
          return {error: true};
        }
      }

    staffLogin = async () => {
      // this.setState({showloading:true});
      // loginWithStaff(email, password)
          this.setState({showloading:true,modalVisible: false});
          await firebase.auth().signInWithEmailAndPassword(this.state.staffEmail, this.state.staffPass)
            .then((authenticatedUser) => {
              if(authenticatedUser){
                console.log("Authenticate user found..")
                firebase.database().ref('users').child(authenticatedUser.uid + '/logintype/')
                .set("basic");	
                firebase.database().ref('users').child(authenticatedUser.uid + '/usertype/')
                .set("staff");	
                firebase.database().ref('users').child(authenticatedUser.uid + '/userimage/')
                .set('https://firebasestorage.googleapis.com/v0/b/aharebangla-6f646.appspot.com/o/default_user%2Fuser.png?alt=media&token=fd2a04a7-8839-43b4-916e-b4bca9a4106e')
                .then(()=>{
                  Actions.reset('tabs')
                })
              }else{
                console.log("Authenticate user not found..")
              }


                
          }).catch((error)=>{this.setState({showloading:false}); console.log("error found.." + error)})
        


    
      }

      /*        {this.state.showloading ? 
          <View style={[styles.loadingcontainer, styles.loadinghorizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View> 
          :null       
        }*/
 
  render() {
    return (
        <View style={{ flex: 1, }} >
            <View style={{ position: 'absolute', width: '100%', height: '100%', }} >
                <Image style={{ width: '100%', height: '100%', }}
                source={require('../assets/images/loginBg.jpg')}
                />
            </View>

            <View style={{ top: (height-(height-80)), backgroundColor: 'transparent', }}>
                <Image
                style={{ width: '100%', height: 80, }}
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
                  {this.state.showloading ? 
                    <View style={{position:'absolute', alignSelf:'center',top:((height + 44)/2)}}>
                      <View style={[styles.loadingcontainer, styles.loadinghorizontal]}>
                          <ActivityIndicator size="large" color="#0000ff" />
                      </View>  
                      </View>
                    :null        
                    }
            <View
                style={{ top: (height-505), justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
                <Image
                  style={{ justifyContent: 'center', alignItems: 'center', width: '80%', height: 220}}
                  resizeMode={'stretch'}
                  source={require('../assets/images/loginPlate.png')}
                />
            </View>

            <View style={{backgroundColor: 'transparent',left:17,position:'absolute',bottom: (height-(height-37))}}>
                <TouchableOpacity onPress={()=>{this.openModal()}}>
                    <Text style={styles.staffLoginText}>Staff Login</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={this.state.modalVisible}
                animationType={'slide'}
                transparent={true}
                onRequestClose={() => this.closeModal()}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.innerContainer}>
                        <View style={{ backgroundColor: '#005696',width: '100%',height: 50,justifyContent: 'center',alignItems: 'center',borderTopLeftRadius: 5,borderTopRightRadius: 5 }}>
                            <Text style={{alignSelf: 'center',color: '#fff',fontSize: 20,fontWeight: 'bold'}}>Staff Login</Text>
                        </View>
                        <View style={{width: '80%',borderBottomWidth: 1,borderBottomColor: 'rgba(0, 86, 150, 0.3)',backgroundColor:'#fff', marginTop: 10,margin: 20,height: 40}}>
                            <TextInput
                                style={{padding: 10, fontSize: 15}}
                                placeholder="Please Enter Email"
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#ddd'
                                onChangeText={(text) => this.setState({staffEmail: text})}
                            />
                        </View>
                        <View style={{width: '80%',borderBottomWidth: 1,borderBottomColor: 'rgba(0, 86, 150, 0.3)',backgroundColor: '#fff', marginTop: 10,margin: 20,height: 40}}>
                            <TextInput
                                style={{padding: 10, fontSize: 15}}
                                placeholder="Please Enter Password"
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#ddd'
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({staffPass: text})}
                            />
                        </View>
                        <View style={{flexDirection: 'row', alignSelf:'flex-end', justifyContent: 'flex-end'}}>
                            <Button
                                small
                                backgroundColor='#fff'
                                color='#005696'
                                fontSize={13}
                                textStyle={{fontWeight: 'bold'}}
                                onPress={()=>{this.closeModal()}}
                                title='Cancel' />
                            <Button
                                small
                                backgroundColor='#fff'
                                color='#005696'
                                fontSize={13}
                                textStyle={{fontWeight: 'bold'}}
                                onPress={()=>{this.staffLogin()}}
                                title='Login' />
                        </View>

                    </View>
                </View>
            </Modal>

        </View>
    );
  }
}
const styles = StyleSheet.create({
    loadingcontainer: {
      flex: 1,
      justifyContent: 'center',
      //top:30
      //position:'absolute',
    },
    loadinghorizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
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
        width: '75%',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5
      },
})

// Android ClientId:: 818648944845-1blv3luuul3t2n0op4eluihgifvedhj0.apps.googleusercontent.com
// iOS ClientID::: 818648944845-u5pgfmuj7a8p5093udm0312r5l2dn1dh.apps.googleusercontent.com

/*//,
    //"android.config.googleSignIn.apiKey": "AIzaSyBovdcoqAtojPAndSqz2cSFlc0groOR5pk"*/