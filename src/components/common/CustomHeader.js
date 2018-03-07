import React from 'react';
import {Text, View, TouchableOpacity,Dimensions} from 'react-native';
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
  } from 'react-native-popup-menu';
  import * as firebase from 'firebase';
import { lo } from 'react-native-popup-menu/src/helpers';


//make a compontent

// { onPressLogout } props is for logout button click function
// { onPressBack } props is for back button click function
// { Textwelcome } props and { showDataWelcome } props is for showing Wellcome View
// { showBackbutton } props is for showing Back button
// { showLogoutButton } props is for showing Logout Button
// { Headershow } props and { headerName } props is for showing only Header view

/* for Example
<CustomHeader Headershow={true} headerName="Home Page" showDataWelcome={true} showLogoutButton={true} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{alert("back icon Clicked")}}/>
*/

const CustomHeader = ({
 onPressFeedback,
 props,  
 showBackbutton,
 showLogoutButton,
 showSearchButton,
 Headershow,
 headerName,
 showFeedbackButton,
 }) =>{
 
 const {
    mainView, 
    mainFlex, 
    childFlex,
    menuOptions, 
    backIconView,
    welcomeText,
    feedbackTouch,
    feedbackview,
    feedbackText, 
    logoutView, 
    logoutTouch, 
    headerView,
    logoutText 
} = styles;
 const { Popover } = renderers;

 showbackbutton=()=>{
 if(showBackbutton){
 return(
 <View style={backIconView}>
    <TouchableOpacity onPress={() => {this.backPress()}} >
        <Icon size={25} color='#fff' name='md-arrow-back' type='ionicon' />
    </TouchableOpacity>
 </View>
 )
 }
 }
 backPress=()=>{
     Actions.pop();
 }

 showLogout=()=>{
 if(showLogoutButton){
 return(
 <View style={logoutView} >
    <Menu renderer={Popover} rendererProps={{ placement: 'bottom', preferredPlacement: 'bottom' }}>
        <MenuTrigger> 
            <Icon size={30} color='#fff' name='md-more' type='ionicon' containerStyle={logoutTouch}/>
        </MenuTrigger>
    
        <MenuOptions style={menuOptions}>
            <MenuOption onSelect={() => {this.logout()}} >
                <Text style={logoutText}>Logout</Text>
            </MenuOption>
        </MenuOptions>

    </Menu>
 </View>
 )
 }
 }
 logout=()=>{
    firebase.auth().signOut().then(()=>{
        // Actions.reset('login')
        Actions.reset('Login');
    })
    
 }
 showSearch=()=>{
    if(showSearchButton){
    return(
    <View style={logoutView} >
        <TouchableOpacity onPress={() => {this.searchPress()}} style={logoutTouch} > 
            <Icon size={30} color='#fff' name='md-search' type='ionicon' />
        </TouchableOpacity>
    </View>
    )
    }
    }
    searchPress=()=>{
        Actions.search();
    }
showFeedback=()=>{
    if(showFeedbackButton) {
        return (
            <View style={feedbackview} >
                <TouchableOpacity onPress={onPressFeedback} style={feedbackTouch} > 
                    <Text style={feedbackText}>FEEDBACK</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

 showHeader=()=>{
 if(Headershow){
 return (
 <View style={headerView}>
    <Text style={welcomeText} numberOfLines={1} ellipsizeMode={'tail'}>{headerName}</Text>
 </View>
 )
 }

 }

 
 return (
 <View>
    <View style={mainView}>
        <View style={mainFlex}>
            <View style={childFlex}>
                {this.showbackbutton()}
                {this.showHeader()}
            </View>
            <View style={{flexDirection: 'row'}}>
            {this.showSearch()}
            {this.showFeedback()}
            {this.showLogout()}
            </View>
        </View>
    </View>
 </View>
 );
};

const styles = {
 mainView:{height:60, backgroundColor:'#005696'},
 mainFlex: { flexDirection: 'row', justifyContent:'space-between', width: Dimensions.get('window').width },
 childFlex:{ flexDirection: 'row' },
 backIconView:{marginTop:12,left:15, marginBottom:10},
 welcomeText:{color:'#fff',fontWeight:'bold', fontSize: 18,},
 headerView:{marginLeft:35,marginTop: 12,width:210},
 logoutView:{marginTop:12, marginBottom:10, marginRight: 15},
 feedbackview:{marginTop:15, marginBottom:10, marginRight: 1},
 feedbackText:{color:'#fff',fontSize: 16},
 logoutTouch:{width:30, height:30},
 feedbackTouch:{width:80, height:30},
 menuOptions: {
    width: 250,
    height: 45,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2
  },
  logoutText: { 
      color: 'red', 
      fontSize: 18,
      fontWeight: 'bold', 
      alignSelf: 'center',
      padding: 5
    }
}
//make the component available to other parts of the app
export default CustomHeader;