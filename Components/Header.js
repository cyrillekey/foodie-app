/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React from "react";
import { View,Text, TouchableOpacity ,Image} from "react-native";
import { COLORS, FONTS, SIZES,icons } from "../constants";
import { TextIconButton } from ".";
import { useSelector } from "react-redux";
const Header = ({containerStye,title,leftComponent,rightComponent,quantity,navigation,isBackPresent=false,isCartpresent=true})=>{
    const qty = useSelector(state=>state.productReducer.qty);
    return (
        <View style={{
            flexDirection:"row",
            ...containerStye,
        }}>
            {!isBackPresent ? leftComponent :
                <TextIconButton
                iconLeft={icons.back}
                containerStyle={{
                    width:40,
                    height:40,
                    justifyContent:'center',
                    alignItems:'center',
                    borderWidth:1,
                    borderRadius:SIZES.radius,
                    borderColor:COLORS.gray2
                }}
                iconStyle={{
                    width:20,
                    height:20,
                    tintColor:COLORS.gray2,
                    marginRight:SIZES.base
                }}
                onPress={()=>{
                    navigation.pop()
                }}
            />
            }
            <View style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center',
            }}>
                <Text style={{...FONTS.h3,color:COLORS.black}}>{title.toUpperCase()}</Text>
            </View>
            {
            isCartpresent &&
            <TouchableOpacity
            style={{
                width:40,
                height:40,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.lightOrange2
            }}
            onPress={()=>{
                navigation.navigate("cart")
            }}
            >
                <Image
                source={icons.cart}
                style={{
                    width:20,
                    height:20,
                    tintColor:COLORS.black
                }}
                />
                <View
                style={{
                    position:'absolute',
                    top:5,
                    right:5,
                    height:15,
                    width:15,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:SIZES.radius,
                    backgroundColor:COLORS.primary,
                }}
                >
                <Text
                style={{
                ...FONTS.body5,
                fontSize:10,
                color:COLORS.white,
                textAlign:'center',

                }}
                >
                 {qty}
                </Text>
                </View>
            </TouchableOpacity>
            }
        </View>
    );
};
export default Header;
