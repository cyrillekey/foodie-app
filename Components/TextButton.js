/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../constants";
const TextButton = ({buttonContainerStyle,label,labelStyle,onPress,disabled=false,label2 = '',label2Style})=>{
    return (
        <TouchableOpacity
        disabled={disabled}
        style={{
            alignItems:'center',
            justifyContent:'center',
            backgroundColor: disabled ? COLORS.transparentPrimray : COLORS.primary,
            ...buttonContainerStyle,
        }}
        onPress={onPress}
        >
            <Text
            style={{
                ...FONTS.h3,
                color:COLORS.white,
                ...labelStyle,
            }}
            >
                {label}
            </Text>
            {label2 !== '' &&
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