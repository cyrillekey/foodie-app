/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../constants";
const TextButton=({buttonContainerStyle,label,labelStyle,onPress,disabled,label2="",label2Style})=>{
    return (
        <TouchableOpacity
        style={{
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:COLORS.primary,
            ...buttonContainerStyle,
        }}
        onPress={onPress}
        disabled={disabled}
        >
            <Text
            style={{
                ...FONTS.h3,
                color:COLORS.white,
                ...labelStyle
            }}
            >
                {label}
            </Text>
            {label2 !="" &&
            <Text
                style={{
                    flex:1,
                    textAlign:'right',
                    ...FONTS.h3,
                    ...label2Style,
                    color:COLORS.white,
                }}
            >
                {label2}
            </Text>
            }
        </TouchableOpacity>
    )
};

export default TextButton;