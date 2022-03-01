/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View,Text ,KeyboardAvoidingView,Image, SafeAreaView} from "react-native";
import { COLORS, SIZES,images, FONTS } from "../../constants";
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';


const AuthLayout = ({title,sutitle,titlecontainerStyle,children})=>{
    return (
            <KeyboardAvoidingScrollView
            behaviour="padding"
            keyboardDismissMode="on-drag"
            en
            contentContainerStyle={{
                flex:1,
                paddingHorizontal:SIZES.padding,
            }}>
                <View style={{
                    alignItems:'center',
                }}>
                    <Image
                     source={images.logo}
                     resizeMode="contain"
                     style={{
                        height:100,
                         width:200,
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
                        ...FONTS.body3,
                    }}>
                        {sutitle}
                    </Text>
                </View>
                {children}
            </KeyboardAvoidingScrollView>
    );
};
export default AuthLayout;