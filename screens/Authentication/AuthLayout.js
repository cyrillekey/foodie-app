/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View,Text ,KeyboardAvoidingView,Image} from "react-native";
import { COLORS, SIZES,images, FONTS } from "../../constants";

const AuthLayout = ({title,sutitle,titlecontainerStyle,children})=>{
    return (
            <KeyboardAvoidingView 
            behavior="height"
            style={{
                flex:1,
                paddingHorizontal:SIZES.padding
            }}>
                <View style={{
                    alignItems:'center',
                }}>
                    <Image
                     source={images.logo}
                     resizeMode="contain"
                     style={{
                         width:200,
                         height:100,
                     }}
                    />
                </View>
                <View 
                style={{
                    marginTop:SIZES.padding,
                    ...titlecontainerStyle
                }}>
                    <Text
                        style={{
                            textAlign:'center',
                            ...FONTS.h2
                        }}
                    >
                        {title}
                    </Text>
                    <Text style={{
                        textAlign:'center',
                        color:COLORS.darkGray,
                        marginTop:SIZES.base,
                        ...FONTS.body3
                    }}>
                        {sutitle}
                    </Text>
                </View>
                {children}
            </KeyboardAvoidingView>
    );
};
export default AuthLayout;