import React from 'react';
import { Text, View } from 'react-native';

const Card = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    )
}
const styles = {
    containerStyle: {
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0 , height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    }
}

export default Card;