/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View,Image,TouchableOpacity,Text} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
const HorizontalFoodCard = ({item,imageStyle,containerStyle,onPress})=>{
    return (
        <TouchableOpacity style={{
            flexDirection:'row',
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.lightGray2,
            ...containerStyle,
        }}
        onPress={onPress}>
            <Image
            source={item.image}
                style={
                    imageStyle
                }
            />
            <View style={{
                flex:1,
            }}>
                <Text style={{
                    ...FONTS.h3,fontSize:17,color:COLORS.black,
                }}>
                    {item.name}
                </Text>
                <Text style={{color:COLORS.darkGray2,...FONTS.body4}}>
                    {item.description}
                </Text>
                <Text style={{
                    marginTop:SIZES.base,...FONTS.h2,
                }}>
                    {item.price}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
export default HorizontalFoodCard;
