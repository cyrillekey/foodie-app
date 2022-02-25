import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { FONTS } from '../../constants';

const Favourite = () => {
    return (
        <View>
            <Text
            style={{
                ...FONTS.body3
            }}
            >Favourite</Text>
        </View>
    )
}

export default Favourite