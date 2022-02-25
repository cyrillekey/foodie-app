import React from 'react'
import { View ,StyleSheet,Image} from 'react-native';
import { COLORS,icons } from '../constants';
const Ratings = ({
    rating,
    iconStyle,
    activeColor=COLORS.orange,
    inactiveColor=COLORS.lightOrange
}) => {
  return (
    <View
    style={{
        flexDirection:'row'
    }}
    >
        <Image
        source={icons.star}
        style={{
            tintColor:rating >= 1 ? activeColor : inactiveColor,
            ...iconStyle,
            ...style.rateIcon,
        }}
        />
        <Image
        source={icons.star}
        style={{
            tintColor:rating >= 2 ? activeColor : inactiveColor,
            ...iconStyle,
            ...style.rateIcon,
        }}
        />
        <Image
        source={icons.star}
        style={{
            tintColor:rating >= 3 ? activeColor : inactiveColor,
            ...iconStyle,
            ...style.rateIcon,
        }}
        />
        <Image
        source={icons.star}
        style={{
            tintColor:rating >= 4 ? activeColor : inactiveColor,
            ...iconStyle,
            ...style.rateIcon,
        }}
        />
        <Image
        source={icons.star}
        style={{
            tintColor:rating >= 5 ? activeColor : inactiveColor,
            ...iconStyle,
            ...style.rateIcon,
        }}
        />
    </View>
  )
}

const style=StyleSheet.create({
    rateIcon:{
        height:15,
        width:15
    }
});

export default Ratings;