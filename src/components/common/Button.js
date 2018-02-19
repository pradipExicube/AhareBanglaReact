import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;
    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};
const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#012f51',
        borderRadius: 8,
        // borderWidth: 5,
        // borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    }
}
export default Button;