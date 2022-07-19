/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View,Image,TouchableOpacity,Text} from "react-native";
import { COLORS, FONTS, images, SIZES } from "../constants";
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
            source={{uri:item.food_image}}
                style={
                    imageStyle
                }
                loadingIndicatorSource={<ActivityIndicator size={'large'} color={COLORS.white}/>}
            />
            <View style={{
                flex:1,
            }}>
                <Text style={{
                    ...FONTS.h3,fontSize:17,color:COLORS.black,
                }}>
                    {item.food_name}
                </Text>
                <Text style={{color:COLORS.darkGray2,...FONTS.body4}}>
                    {item?.food_desc?.substring(0,20) ?? 'Temp'}
                </Text>
                <Text style={{
                    marginTop:SIZES.base,...FONTS.h2,
                }}>
                  Kes  {item.food_price}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
export default HorizontalFoodCard;
