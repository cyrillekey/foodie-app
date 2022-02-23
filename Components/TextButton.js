/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../constants";
const TextButton=({buttonContainerStyle,label,labelStyle,onPress,disabled})=>{
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
        </TouchableOpacity>
    )
};

export default TextButton;