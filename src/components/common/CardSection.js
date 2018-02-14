import React from 'react';
import { Text, View } from 'react-native';

const CardDetail = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    )
}
const styles = {
    containerStyle: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    }
}

export default CardDetail;