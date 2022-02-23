import React from 'react'
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { COLORS, FONTS } from '../constants'
const TextIconButton = ({label,containerStyle,iconLeft,iconRight,onPress,iconStyle,labelStyle}) => {
  return (
    <TouchableOpacity
        style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            ...containerStyle
        }}
        onPress={onPress}
    >{iconLeft &&
        <Image
            source={iconLeft}
            style={{
                ...styles.image,
                ...iconStyle
            }}
        />}
        <Text
            style={{
                ...FONTS.body3,
                ...labelStyle
            }}
        >{label}
        </Text>
        {iconRight &&
        <Image
            source={iconRight}
            style={{
                ...styles.image,
                ...iconStyle
            }}
        />}
    </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
    image:{
        marginLeft:5,
        width:20,
        height:20,
        tintColor:COLORS.black
    }
})

export default TextIconButton