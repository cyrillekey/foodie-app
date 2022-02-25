import React from 'react';
import {
    View,Text
} from 'react-native';
import { FONTS } from '../../constants';

const Notification = () => {
    return (
        <View>
            <Text
            style={{
                ...FONTS.body1
            }}
            >notification</Text>
        </View>
    )
}

export default Notification;