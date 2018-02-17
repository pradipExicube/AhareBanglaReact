import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
    const { textStyle,viewStyle } = styles;
    return(
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    ); 
}
const styles = {
    viewStyle: {
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0 , height: 2 },
        shadowOpacity: 0.9,
        elevation: 4,
        position: 'relative',
    },
    textStyle: {
        fontSize: 30,
    }
}

export default Header;