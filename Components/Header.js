/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React from "react";
import { View,Text } from "react-native";
import { COLORS, FONTS } from "../constants";
const Header = ({containerStye,title,leftComponent,rightComponent})=>{
    return (
        <View style={{
            flexDirection:"row",
            ...containerStye,
        }}>
            {leftComponent}
            <View style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center',
            }}>
                <Text style={{...FONTS.h3,color:COLORS.black}}>{title.toUpperCase()}</Text>
            </View>
            {rightComponent}
        </View>
    );
};
export default Header;
